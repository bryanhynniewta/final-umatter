import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import LoginModal from './LoginModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userData = JSON.parse(localStorage.getItem('userData') || 'null');

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    window.location.reload();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src="https://customer-assets.emergentagent.com/job_umatter-book/artifacts/3qle7ggn_WhatsApp%20Image%202026-03-03%20at%2011.50.53%20AM.jpeg" 
              alt="UMatter Logo" 
              className="h-12 w-12 object-contain"
            />
            <span className="text-2xl font-bold" style={{ color: '#00CED1' }}>
              U.Matter
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-gray-700 hover:text-[#00CED1] transition-colors font-medium"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="text-gray-700 hover:text-[#00CED1] transition-colors font-medium"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-gray-700 hover:text-[#00CED1] transition-colors font-medium"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('team')}
              className="text-gray-700 hover:text-[#00CED1] transition-colors font-medium"
            >
              Team
            </button>
            <button 
              onClick={() => scrollToSection('booking')}
              className="text-gray-700 hover:text-[#00CED1] transition-colors font-medium"
            >
              Book Appointment
            </button>
            
            {userData ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Hi, {userData.name}</span>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="border-red-300 text-red-600 hover:bg-red-50"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <LoginModal />
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-gray-700 hover:text-[#00CED1] transition-colors font-medium text-left"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="text-gray-700 hover:text-[#00CED1] transition-colors font-medium text-left"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-gray-700 hover:text-[#00CED1] transition-colors font-medium text-left"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('team')}
                className="text-gray-700 hover:text-[#00CED1] transition-colors font-medium text-left"
              >
                Team
              </button>
              <button 
                onClick={() => scrollToSection('booking')}
                className="text-gray-700 hover:text-[#00CED1] transition-colors font-medium text-left"
              >
                Book Appointment
              </button>
              {userData ? (
                <>
                  <span className="text-gray-700">Hi, {userData.name}</span>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="border-red-300 text-red-600 hover:bg-red-50 w-full"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <LoginModal />
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
