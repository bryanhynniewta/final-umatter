# Umatter - Appointment Booking Website PRD

## Original Problem Statement
Build a website for Umatter startup where people can book appointments for psychology services (counseling, therapy, and consulting).

## User Personas
1. **Clients/Patients**: Individuals seeking mental health support who need to book appointments
2. **Admin Staff**: Practice administrators who manage and oversee appointment bookings

## Core Requirements (Static)

### Services Offered
- Counseling Sessions (50 minutes)
- Therapy Sessions (60 minutes)
- Psychological Consulting (45 minutes)

### Booking Constraints
- Business hours: 9:00 AM - 6:00 PM
- Closed on Sundays
- No bookings after 6 PM

### Booking Information
- Name (required)
- Email (required)
- Phone (required)
- Preferred Date (required, excluding Sundays)
- Preferred Time (required, 9 AM - 6 PM slots)
- Service Type (required)

### Design Requirements
- Brand Colors from Logo:
  - Primary Turquoise: #00CED1
  - Pink: #FFB6C1
  - Yellow/Peach: #FFDA9F

## What's Been Implemented (March 2026)

### Frontend (March 3, 2026)
- ✅ **Landing Page Components**:
  - Header with navigation and logo
  - Hero section with compelling CTA
  - Services section showcasing all 3 service types
  - About section with trust indicators and stats
  - Team section with real team photos and bios
  - Booking form with date/time selection
  - Footer with contact information

- ✅ **Booking System**:
  - Shadcn Calendar component with Sunday restrictions
  - Time slot selection (9 AM - 6 PM)
  - Form validation
  - Success confirmation screen
  - Mock data storage in localStorage

- ✅ **Admin Dashboard**:
  - Statistics overview (total, confirmed, cancelled)
  - Appointment list with search functionality
  - Filter by status (all, confirmed, cancelled)
  - Cancel/Restore appointment actions
  - Delete appointment functionality

- ✅ **Team Section**:
  - 4 key team members with photos and detailed bios
    - Riyaka Verma Surong (Founder & Chairman)
    - Afilia (Vice Chairman)
    - Manphika (Social Media Manager & Creative Head)
    - Iohun (Joint Secretary & Counselling Lead)
  - Supporting members showcase (Wanlang, Jeneth, Riwanka, Diksha, San)
  - Community engagement highlight with Chief Minister of Meghalaya
  - Professional layout with hover effects

- ✅ **Design Implementation**:
  - Brand colors applied throughout
  - Responsive design (mobile, tablet, desktop)
  - Smooth scrolling navigation
  - Hover effects and transitions
  - Custom scrollbar styling
  - Toast notifications using Sonner

### Current State
- Frontend fully functional with mock data
- Appointments stored in browser localStorage
- Admin can manage appointments (CRUD operations)
- Calendar properly restricts Sundays
- Time slots limited to business hours

## Prioritized Backlog

### P0 - Backend Development (Next Phase)
1. **MongoDB Models**:
   - Appointment schema (name, email, phone, date, time, service, status, createdAt)
   
2. **API Endpoints**:
   - `POST /api/appointments` - Create new appointment
   - `GET /api/appointments` - Get all appointments (admin)
   - `PATCH /api/appointments/:id` - Update appointment status
   - `DELETE /api/appointments/:id` - Delete appointment
   - `GET /api/appointments/available-slots` - Check slot availability

3. **Backend Logic**:
   - Validate business hours (9 AM - 6 PM)
   - Prevent Sunday bookings
   - Check for duplicate bookings (same date/time)
   - Status management (confirmed, cancelled)

4. **Integration**:
   - Connect frontend booking form to backend API
   - Remove mock data and localStorage logic
   - Implement proper error handling
   - Add loading states

### P1 - Enhancement Features
1. Email notifications (booking confirmations)
2. SMS reminders
3. Google Calendar integration
4. Admin authentication/login
5. Appointment rescheduling
6. Multiple practitioners/rooms handling
7. Waiting list management

### P2 - Nice-to-Have
1. Client portal (view past appointments)
2. Payment integration
3. Video consultation integration
4. Appointment notes for practitioners
5. Analytics dashboard
6. Export appointments to CSV

## API Contracts (To Be Implemented)

### Create Appointment
```
POST /api/appointments
Body: {
  name: string,
  email: string,
  phone: string,
  date: string (YYYY-MM-DD),
  time: string (HH:MM AM/PM),
  service: string
}
Response: {
  success: boolean,
  appointment: { id, ...data, status: 'confirmed', createdAt }
}
```

### Get All Appointments (Admin)
```
GET /api/appointments
Response: {
  success: boolean,
  appointments: [...]
}
```

### Update Appointment Status
```
PATCH /api/appointments/:id
Body: { status: 'confirmed' | 'cancelled' }
Response: {
  success: boolean,
  appointment: {...updated data}
}
```

### Delete Appointment
```
DELETE /api/appointments/:id
Response: {
  success: boolean,
  message: string
}
```

## Next Tasks
1. Implement backend MongoDB models for appointments
2. Create backend API endpoints with validation
3. Add business logic for time restrictions
4. Integrate frontend with backend APIs
5. Remove mock data and localStorage
6. Test end-to-end appointment booking flow
7. Add proper error handling and loading states

## Notes
- Mock data currently includes 3 sample appointments
- LocalStorage used for temporary data persistence
- Calendar component from shadcn/ui properly configured
- No authentication implemented yet (admin dashboard is public)
- All times are displayed in 12-hour format with AM/PM
