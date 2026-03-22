from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from datetime import datetime
import uuid

class BookingCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    service: str
    date: str  # YYYY-MM-DD format
    time: str  # e.g., "9:00 AM - 10:00 AM"

class Booking(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: str
    service: str
    date: str
    time: str
    status: str = "confirmed"
    createdAt: datetime = Field(default_factory=datetime.utcnow)

class BookingUpdate(BaseModel):
    status: Optional[str] = None

class AvailableSlots(BaseModel):
    date: str
    slots: list
