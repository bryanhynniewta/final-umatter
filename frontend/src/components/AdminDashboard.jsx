import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Mail, Phone, User, Trash2, CheckCircle, XCircle, Search, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { toast } from 'sonner';
import axios from 'axios';

const AdminDashboard = ({ onLogout }) => {
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const API = `${BACKEND_URL}/api`;

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API}/bookings`);
      setAppointments(response.data || []);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast.error('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/bookings/${id}`);
      toast.success('Appointment deleted successfully');
      fetchAppointments(); // Reload appointments
    } catch (error) {
      console.error('Error deleting appointment:', error);
      toast.error('Failed to delete appointment');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.patch(`${API}/bookings/${id}`, { status: newStatus });
      toast.success(`Appointment ${newStatus}`);
      fetchAppointments(); // Reload appointments
    } catch (error) {
      console.error('Error updating appointment:', error);
      toast.error('Failed to update appointment');
    }
  };

  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = 
      apt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.phone.includes(searchTerm);
    
    const matchesFilter = filterStatus === 'all' || apt.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: appointments.length,
    confirmed: appointments.filter(apt => apt.status === 'confirmed').length,
    cancelled: appointments.filter(apt => apt.status === 'cancelled').length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src="https://customer-assets.emergentagent.com/job_umatter-book/artifacts/3qle7ggn_WhatsApp%20Image%202026-03-03%20at%2011.50.53%20AM.jpeg" 
                alt="UMatter Logo" 
                className="h-12 w-12 object-contain"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-600">Manage appointments and bookings</p>
              </div>
            </div>
            <Button
              onClick={onLogout}
              variant="outline"
              className="border-red-300 text-red-600 hover:bg-red-50"
            >
              Logout
            </Button>
            <Button
              onClick={() => window.location.href = '/'}
              variant="outline"
              className="border-[#00CED1] text-[#00CED1] hover:bg-[#00CED1] hover:text-white"
            >
              Back to Website
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Appointments</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stats.total}</p>
                </div>
                <div className="w-12 h-12 bg-[#00CED1]/10 rounded-full flex items-center justify-center">
                  <Calendar className="h-6 w-6" style={{ color: '#00CED1' }} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Confirmed</p>
                  <p className="text-3xl font-bold text-green-600 mt-1">{stats.confirmed}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Cancelled</p>
                  <p className="text-3xl font-bold text-red-600 mt-1">{stats.cancelled}</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <XCircle className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="border-0 shadow-lg mb-6">
          <CardHeader>
            <CardTitle>Appointments</CardTitle>
            <CardDescription>View and manage all bookings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-11 h-12"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filterStatus === 'all' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('all')}
                  className={filterStatus === 'all' ? 'bg-[#00CED1] hover:bg-[#00CED1]/90' : ''}
                >
                  All
                </Button>
                <Button
                  variant={filterStatus === 'confirmed' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('confirmed')}
                  className={filterStatus === 'confirmed' ? 'bg-green-600 hover:bg-green-700' : ''}
                >
                  Confirmed
                </Button>
                <Button
                  variant={filterStatus === 'cancelled' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('cancelled')}
                  className={filterStatus === 'cancelled' ? 'bg-red-600 hover:bg-red-700' : ''}
                >
                  Cancelled
                </Button>
              </div>
            </div>

            {/* Appointments List */}
            <div className="space-y-4">
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-[#00CED1]" />
                  <span className="ml-3 text-gray-600">Loading appointments...</span>
                </div>
              ) : filteredAppointments.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg">No appointments found</p>
                </div>
              ) : (
                filteredAppointments.map((appointment) => (
                  <Card key={appointment.id} className="border border-gray-200 hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="space-y-3 flex-1">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-[#00CED1]/10 rounded-full flex items-center justify-center">
                                <User className="h-5 w-5" style={{ color: '#00CED1' }} />
                              </div>
                              <div>
                                <h3 className="font-semibold text-lg text-gray-900">{appointment.name}</h3>
                                <Badge 
                                  className={
                                    appointment.status === 'confirmed' 
                                      ? 'bg-green-100 text-green-700 hover:bg-green-100' 
                                      : 'bg-red-100 text-red-700 hover:bg-red-100'
                                  }
                                >
                                  {appointment.status}
                                </Badge>
                              </div>
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-600">
                            <div className="flex items-center space-x-2">
                              <Mail className="h-4 w-4" />
                              <span>{appointment.email}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Phone className="h-4 w-4" />
                              <span>{appointment.phone}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-4 w-4" />
                              <span>{appointment.date}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4" />
                              <span>{appointment.time}</span>
                            </div>
                          </div>

                          <div className="pt-2">
                            <span className="text-sm font-medium text-gray-700">
                              Service: <span className="text-[#00CED1]">{appointment.service}</span>
                            </span>
                          </div>
                        </div>

                        <div className="flex lg:flex-col gap-2">
                          {appointment.status !== 'cancelled' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleStatusChange(appointment.id, 'cancelled')}
                              className="border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700"
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Cancel
                            </Button>
                          )}
                          {appointment.status === 'cancelled' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleStatusChange(appointment.id, 'confirmed')}
                              className="border-green-300 text-green-600 hover:bg-green-50 hover:text-green-700"
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Restore
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(appointment.id)}
                            className="border-gray-300 text-gray-600 hover:bg-gray-50 hover:text-gray-700"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
