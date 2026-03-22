import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { User, Mail, Phone, Lock, AlertCircle, Loader2, Shield } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const LoginModal = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const navigate = useNavigate();

  // User Login State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // User Register State
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  // Forgot Password State
  const [forgotEmail, setForgotEmail] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  // Admin Login State
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  const handleUserLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${API}/users/login`, {
        email: loginEmail,
        password: loginPassword
      });

      localStorage.setItem('userToken', response.data.access_token);
      localStorage.setItem('userData', JSON.stringify(response.data.user));
      
      toast.success('Login successful!');
      setOpen(false);
      window.location.reload();
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleUserRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const registerResponse = await axios.post(`${API}/users/register`, {
        name: registerName,
        email: registerEmail,
        phone: registerPhone,
        password: registerPassword
      });

      // Auto login after registration
      const loginResponse = await axios.post(`${API}/users/login`, {
        email: registerEmail,
        password: registerPassword
      });

      localStorage.setItem('userToken', loginResponse.data.access_token);
      localStorage.setItem('userData', JSON.stringify(loginResponse.data.user));
      
      toast.success('Account created successfully!');
      setOpen(false);
      window.location.reload();
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${API}/users/forgot-password`, { email: forgotEmail });
      toast.success('Password reset link sent to your email');
      setShowForgotPassword(false);
      setForgotEmail('');
    } catch (err) {
      toast.error('Failed to send reset link');
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${API}/admin/login`, {
        username: adminUsername,
        password: adminPassword
      });

      localStorage.setItem('adminToken', response.data.access_token);
      localStorage.setItem('adminUsername', adminUsername);
      
      toast.success('Admin login successful!');
      setOpen(false);
      navigate('/admin/dashboard');
    } catch (err) {
      toast.error('Invalid admin credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline"
          className="border-[#00CED1] text-[#00CED1] hover:bg-[#00CED1] hover:text-white"
        >
          Login
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        {/* Admin Login Button in Corner */}
        <button
          onClick={() => setShowAdminLogin(!showAdminLogin)}
          className="absolute top-4 right-12 p-2 rounded-full hover:bg-gray-100 transition-colors"
          title="Admin Login"
        >
          <Shield className="h-5 w-5 text-gray-600" />
        </button>

        {showAdminLogin ? (
          // Admin Login Form
          <div>
            <DialogHeader>
              <DialogTitle className="text-2xl flex items-center space-x-2">
                <Shield className="h-6 w-6 text-[#00CED1]" />
                <span>Admin Login</span>
              </DialogTitle>
              <DialogDescription>
                Access admin dashboard
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleAdminLogin} className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="admin-username">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="admin-username"
                    type="text"
                    value={adminUsername}
                    onChange={(e) => setAdminUsername(e.target.value)}
                    className="pl-11"
                    placeholder="Enter admin username"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="admin-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="admin-password"
                    type="password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="pl-11"
                    placeholder="Enter admin password"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#00CED1] hover:bg-[#00CED1]/90"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Login as Admin'}
              </Button>

              <button
                type="button"
                onClick={() => setShowAdminLogin(false)}
                className="w-full text-sm text-gray-600 hover:text-[#00CED1]"
              >
                ← Back to User Login
              </button>
            </form>
          </div>
        ) : showForgotPassword ? (
          // Forgot Password Form
          <div>
            <DialogHeader>
              <DialogTitle className="text-2xl">Reset Password</DialogTitle>
              <DialogDescription>
                Enter your email to receive a password reset link
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleForgotPassword} className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="forgot-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="forgot-email"
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    className="pl-11"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#00CED1] hover:bg-[#00CED1]/90"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Send Reset Link'}
              </Button>

              <button
                type="button"
                onClick={() => setShowForgotPassword(false)}
                className="w-full text-sm text-gray-600 hover:text-[#00CED1]"
              >
                ← Back to Login
              </button>
            </form>
          </div>
        ) : (
          // User Login/Register Tabs
          <div>
            <DialogHeader>
              <DialogTitle className="text-2xl">Welcome to U Matter</DialogTitle>
              <DialogDescription>
                Login or create an account to book appointments
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="login" className="mt-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Create Account</TabsTrigger>
              </TabsList>

              {/* Login Tab */}
              <TabsContent value="login">
                <form onSubmit={handleUserLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="login-email"
                        type="email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        className="pl-11"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="login-password"
                        type="password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="pl-11"
                        placeholder="Enter password"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-sm text-[#00CED1] hover:underline"
                  >
                    Forgot Password?
                  </button>

                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-[#00CED1] hover:bg-[#00CED1]/90"
                  >
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Login'}
                  </Button>
                </form>
              </TabsContent>

              {/* Register Tab */}
              <TabsContent value="register">
                <form onSubmit={handleUserRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="register-name"
                        type="text"
                        value={registerName}
                        onChange={(e) => setRegisterName(e.target.value)}
                        className="pl-11"
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="register-email"
                        type="email"
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                        className="pl-11"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="register-phone"
                        type="tel"
                        value={registerPhone}
                        onChange={(e) => setRegisterPhone(e.target.value)}
                        className="pl-11"
                        placeholder="+91 1234567890"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="register-password"
                        type="password"
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                        className="pl-11"
                        placeholder="Create a password"
                        required
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-[#00CED1] hover:bg-[#00CED1]/90"
                  >
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Create Account'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
