from fastapi import APIRouter, HTTPException, Query
from typing import List
from datetime import datetime, timedelta
from models.booking import Booking, BookingCreate, BookingUpdate
from services.email_service import send_booking_confirmation, send_admin_notification
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/bookings", tags=["bookings"])

# Time slots from 9 AM to 6 PM
TIME_SLOTS = [
    "9:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 1:00 PM",
    "1:00 PM - 2:00 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM",
    "4:00 PM - 5:00 PM",
    "5:00 PM - 6:00 PM"
]

# Import database
from server import db

@router.get("/available-slots")
async def get_available_slots(date: str = Query(..., description="Date in YYYY-MM-DD format")):
    """Get available time slots for a given date"""
    try:
        # Check if date is valid and not in the past
        booking_date = datetime.strptime(date, '%Y-%m-%d').date()
        today = datetime.utcnow().date()
        
        # Allow today and future dates
        if booking_date < today:
            logger.info(f"Date {date} is in the past (today: {today})")
            return {"date": date, "slots": []}
        
        # Check if it's Sunday (weekday 6)
        if booking_date.weekday() == 6:
            logger.info(f"Date {date} is Sunday")
            return {"date": date, "slots": []}
        
        # Get all bookings for this date
        booked_slots = await db.bookings.find(
            {"date": date, "status": {"$ne": "cancelled"}}
        ).to_list(100)
        
        # Extract booked time slots
        booked_times = [booking['time'] for booking in booked_slots]
        
        # Return available slots
        available_slots = [
            {"time": slot, "available": slot not in booked_times}
            for slot in TIME_SLOTS
        ]
        
        logger.info(f"Returning {len(available_slots)} slots for {date}")
        return {"date": date, "slots": available_slots}
        
    except ValueError as e:
        logger.error(f"Invalid date format: {date}")
        raise HTTPException(status_code=400, detail="Invalid date format. Use YYYY-MM-DD")
    except Exception as e:
        logger.error(f"Error fetching available slots: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch available slots: {str(e)}")


@router.post("/", response_model=Booking)
async def create_booking(booking_input: BookingCreate):
    """Create a new booking"""
    try:
        logger.info(f"Received booking request: {booking_input.dict()}")
        
        # Validate the date
        booking_date = datetime.strptime(booking_input.date, '%Y-%m-%d').date()
        logger.info(f"Booking date: {booking_date}, Today: {datetime.utcnow().date()}")
        
        # Check if date is in the past
        if booking_date < datetime.utcnow().date():
            raise HTTPException(status_code=400, detail="Cannot book for past dates")
        
        # Check if it's Sunday
        if booking_date.weekday() == 6:
            raise HTTPException(status_code=400, detail="Bookings not available on Sundays")
        
        # Check if time slot is valid
        if booking_input.time not in TIME_SLOTS:
            logger.error(f"Invalid time slot: {booking_input.time}")
            raise HTTPException(status_code=400, detail=f"Invalid time slot: {booking_input.time}")
        
        # Check if slot is already booked
        existing_booking = await db.bookings.find_one({
            "date": booking_input.date,
            "time": booking_input.time,
            "status": {"$ne": "cancelled"}
        })
        
        if existing_booking:
            raise HTTPException(status_code=400, detail="This time slot is already booked")
        
        # Create booking object
        booking_dict = booking_input.dict()
        booking = Booking(**booking_dict)
        
        logger.info(f"Creating booking with ID: {booking.id}")
        
        # Save to database
        result = await db.bookings.insert_one(booking.dict())
        logger.info(f"Booking saved to database: {result.inserted_id}")
        
        # Send confirmation email to customer (non-blocking)
        try:
            email_sent = send_booking_confirmation(booking.dict())
            logger.info(f"Customer email sent: {email_sent}")
        except Exception as e:
            logger.error(f"Failed to send customer email: {str(e)}")
        
        # Send notification to admin (non-blocking)
        try:
            admin_email_sent = send_admin_notification(booking.dict())
            logger.info(f"Admin email sent: {admin_email_sent}")
        except Exception as e:
            logger.error(f"Failed to send admin email: {str(e)}")
        
        logger.info(f"Booking created successfully: {booking.id}")
        return booking
        
    except ValueError as e:
        logger.error(f"Date validation error: {str(e)}")
        raise HTTPException(status_code=400, detail="Invalid date format")
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error creating booking: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Failed to create booking: {str(e)}")


@router.get("/", response_model=List[Booking])
async def get_all_bookings():
    """Get all bookings (Admin)"""
    try:
        bookings = await db.bookings.find().sort("createdAt", -1).to_list(1000)
        return [Booking(**booking) for booking in bookings]
    except Exception as e:
        logger.error(f"Error fetching bookings: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch bookings")


@router.patch("/{booking_id}", response_model=Booking)
async def update_booking(booking_id: str, booking_update: BookingUpdate):
    """Update booking status"""
    try:
        update_data = {k: v for k, v in booking_update.dict().items() if v is not None}
        
        if not update_data:
            raise HTTPException(status_code=400, detail="No update data provided")
        
        result = await db.bookings.find_one_and_update(
            {"id": booking_id},
            {"$set": update_data},
            return_document=True
        )
        
        if not result:
            raise HTTPException(status_code=404, detail="Booking not found")
        
        return Booking(**result)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating booking: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update booking")


@router.delete("/{booking_id}")
async def delete_booking(booking_id: str):
    """Delete a booking"""
    try:
        result = await db.bookings.delete_one({"id": booking_id})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Booking not found")
        
        return {"message": "Booking deleted successfully"}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting booking: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to delete booking")
