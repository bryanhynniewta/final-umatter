// Mock data for appointments
export const mockAppointments = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '+1 234-567-8901',
    date: '2026-03-10',
    time: '10:00 AM',
    service: 'Counseling Session',
    status: 'confirmed',
    createdAt: '2026-03-05T10:30:00Z'
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'mchen@email.com',
    phone: '+1 234-567-8902',
    date: '2026-03-12',
    time: '2:00 PM',
    service: 'Therapy Session',
    status: 'confirmed',
    createdAt: '2026-03-06T14:20:00Z'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily.r@email.com',
    phone: '+1 234-567-8903',
    date: '2026-03-15',
    time: '11:30 AM',
    service: 'Consulting',
    status: 'confirmed',
    createdAt: '2026-03-07T09:15:00Z'
  }
];

// Time slots from 9 AM to 6 PM
export const timeSlots = [
  "9:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "12:00 PM - 1:00 PM",
  "1:00 PM - 2:00 PM",
  "2:00 PM - 3:00 PM",
  "3:00 PM - 4:00 PM",
  "4:00 PM - 5:00 PM",
  "5:00 PM - 6:00 PM"
];

export const services = [
  'Mental Health Counselling',
  'School & College Mental Health Programs',
  'Workshops & Training',
  'Community Outreach & Awareness Programs',
  'Youth Leadership & Internship Programs',
  'Events & Safe Spaces',
  'General Inquiry'
];

// Helper function to check if date is available (no Sundays)
export const isDateAvailable = (date) => {
  const day = date.getDay();
  return day !== 0; // 0 is Sunday
};

// Helper to generate next available dates
export const getNextAvailableDates = (count = 30) => {
  const dates = [];
  const today = new Date();
  let currentDate = new Date(today);
  
  while (dates.length < count) {
    if (isDateAvailable(currentDate)) {
      dates.push(new Date(currentDate));
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return dates;
};
