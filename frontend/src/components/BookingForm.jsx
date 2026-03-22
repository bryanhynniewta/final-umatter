import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, User, Mail, Phone, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { format } from 'date-fns';
import { isDateAvailable } from '../mock/appointmentData';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const BookingFormIntegrated = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: null,
    time: '',
    service: ''
  });
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch available slots when date changes
  useEffect(() => {
    if (formData.date) {
      fetchAvailableSlots(format(formData.date, 'yyyy-MM-dd'));
    } else {
      setAvailableSlots([]);
    }
  }, [formData.date]);

  const fetchAvailableSlots = async (date) => {
    setLoadingSlots(true);
    try {
      const response = await axios.get(`${API}/bookings/available-slots`, {
        params: { date }
      });
      setAvailableSlots(response.data.slots || []);
    } catch (error) {
      console.error('Error fetching slots:', error);
      toast.error('Failed to load available slots');
      setAvailableSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.date || !formData.time || !formData.service) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const bookingData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        date: format(formData.date, 'yyyy-MM-dd'),
        time: formData.time
      };

      const response = await axios.post(`${API}/bookings`, bookingData);

      if (response.data) {
        setIsSubmitted(true);
        toast.success('Booking submitted successfully!');

        // Reset form after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            name: '',
            email: '',
            phone: '',
            date: null,
            time: '',
            service: ''
          });
        }, 5000);
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      const errorMessage = error.response?.data?.detail || 'Failed to create booking. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const disabledDays = (date) => {
    return !isDateAvailable(date) || date < new Date(new Date().setHours(0, 0, 0, 0));
  };

  if (isSubmitted) {
    return (
      <section id="booking" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto max-w-2xl">
          <Card className="border-0 shadow-2xl">
            <CardContent className="pt-12 pb-12 text-center">
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Request Submitted!
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Thank you, {formData.name}! We've received your request and will get back to you within 24-48 hours.
              </p>
              <div className="bg-[#00CED1]/5 rounded-xl p-6 mb-6 space-y-2">
                <p className="text-gray-700">
                  <span className="font-semibold">Program/Service:</span> {formData.service}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Date:</span> {format(formData.date, 'MMMM dd, yyyy')}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Time:</span> {formData.time}
                </p>
              </div>
              <p className="text-sm text-gray-500">
                A confirmation will be sent to {formData.email}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="container mx-auto max-w-4xl">
        {/* Section Header */}
        <div className="text-center mb-12 space-y-4">
          <span className="px-4 py-2 bg-[#FFDA9F]/30 text-[#00CED1] rounded-full text-sm font-semibold inline-block">
            Get in Touch
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
            Book a Session or Workshop
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Reach out to us for workshops, counselling support, or to learn more about our programs
          </p>
        </div>

        {/* Booking Form */}
        <Card className="border-0 shadow-2xl">
          <CardHeader className="space-y-2 pb-8">
            <CardTitle className="text-2xl">Contact Details</CardTitle>
            <CardDescription className="text-base">
              Share your information and we'll get back to you soon
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-base font-medium">
                    Full Name *
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="pl-11 h-12 text-base"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-base font-medium">
                    Email Address *
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="pl-11 h-12 text-base"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-base font-medium">
                  Phone Number *
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 1234567890"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="pl-11 h-12 text-base"
                    required
                  />
                </div>
              </div>

              {/* Service Selection */}
              <div className="space-y-2">
                <Label htmlFor="service" className="text-base font-medium">
                  What are you interested in? *
                </Label>
                <Select
                  value={formData.service}
                  onValueChange={(value) => setFormData({ ...formData, service: value })}
                >
                  <SelectTrigger className="h-12 text-base">
                    <SelectValue placeholder="Select a program or service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mental Health Counselling">Mental Health Counselling</SelectItem>
                    <SelectItem value="School & College Mental Health Programs">School & College Mental Health Programs</SelectItem>
                    <SelectItem value="Workshops & Training">Workshops & Training</SelectItem>
                    <SelectItem value="Community Outreach & Awareness Programs">Community Outreach & Awareness Programs</SelectItem>
                    <SelectItem value="Youth Leadership & Internship Programs">Youth Leadership & Internship Programs</SelectItem>
                    <SelectItem value="Events & Safe Spaces">Events & Safe Spaces</SelectItem>
                    <SelectItem value="General Inquiry">General Inquiry</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Date and Time Selection */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-base font-medium">
                    Preferred Date *
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full h-12 justify-start text-left font-normal text-base"
                      >
                        <CalendarIcon className="mr-3 h-5 w-5 text-gray-400" />
                        {formData.date ? format(formData.date, 'PPP') : 'Select a date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.date}
                        onSelect={(date) => {
                          setFormData({ ...formData, date, time: '' });
                        }}
                        disabled={disabledDays}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <p className="text-sm text-gray-500">
                    * Closed on Sundays
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time" className="text-base font-medium">
                    Preferred Time *
                  </Label>
                  {loadingSlots ? (
                    <div className="h-12 flex items-center justify-center border rounded-md">
                      <Loader2 className="h-5 w-5 animate-spin text-[#00CED1]" />
                      <span className="ml-2 text-sm text-gray-500">Loading slots...</span>
                    </div>
                  ) : formData.date ? (
                    <Select
                      value={formData.time}
                      onValueChange={(value) => setFormData({ ...formData, time: value })}
                      disabled={!formData.date || availableSlots.length === 0}
                    >
                      <SelectTrigger className="h-12 text-base">
                        <SelectValue placeholder="Select a time" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60">
                        {availableSlots.map((slot) => (
                          <SelectItem 
                            key={slot.time} 
                            value={slot.time}
                            disabled={!slot.available}
                          >
                            {slot.time} {!slot.available && '(Booked)'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="h-12 flex items-center justify-center border rounded-md bg-gray-50">
                      <span className="text-sm text-gray-500">Select a date first</span>
                    </div>
                  )}
                  <p className="text-sm text-gray-500">
                    * Available 9 AM - 6 PM
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 text-lg bg-[#00CED1] hover:bg-[#00CED1]/90 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CalendarIcon className="mr-2 h-5 w-5" />
                      Submit Request
                    </>
                  )}
                </Button>
              </div>

              <p className="text-sm text-gray-500 text-center pt-4">
                We'll reach out to you within 24-48 hours to confirm the details
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default BookingFormIntegrated;
