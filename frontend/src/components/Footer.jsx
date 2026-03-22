import React from 'react';
import { Mail, Phone, MapPin, Clock, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <img 
                src="https://customer-assets.emergentagent.com/job_umatter-book/artifacts/3qle7ggn_WhatsApp%20Image%202026-03-03%20at%2011.50.53%20AM.jpeg" 
                alt="UMatter Logo" 
                className="h-12 w-12 object-contain"
              />
              <span className="text-2xl font-bold text-white">
                U.Matter
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              U Matter Multipurpose Cooperative Society - Youth-led mental health initiative creating safe, stigma-free spaces for emotional wellbeing across Meghalaya.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#00CED1] transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#00CED1] transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/umatter.shillong/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#00CED1] transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#00CED1] transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => document.getElementById('home').scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-[#00CED1] transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-[#00CED1] transition-colors"
                >
                  Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-[#00CED1] transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('team').scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-[#00CED1] transition-colors"
                >
                  Our Team
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('booking').scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-[#00CED1] transition-colors"
                >
                  Book Appointment
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Our Programs</h3>
            <ul className="space-y-3">
              <li className="hover:text-[#00CED1] transition-colors cursor-pointer">
                School Mental Health Programs
              </li>
              <li className="hover:text-[#00CED1] transition-colors cursor-pointer">
                Men's Mental Health Focus
              </li>
              <li className="hover:text-[#00CED1] transition-colors cursor-pointer">
                Counselling & Support
              </li>
              <li className="hover:text-[#00CED1] transition-colors cursor-pointer">
                Youth Leadership & Internships
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-[#00CED1] flex-shrink-0 mt-1" />
                <span>Shillong, Meghalaya</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-[#00CED1] flex-shrink-0" />
                <div>
                  <a href="tel:+918259014044" className="hover:text-[#00CED1] transition-colors block">
                    8259014044
                  </a>
                  <a href="tel:+918837249340" className="hover:text-[#00CED1] transition-colors block">
                    8837249340
                  </a>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-[#00CED1] flex-shrink-0" />
                <a href="mailto:umatter.shillong.21@gmail.com" className="hover:text-[#00CED1] transition-colors break-all">
                  umatter.shillong.21@gmail.com
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-[#00CED1] flex-shrink-0 mt-1" />
                <div>
                  <p>Mon - Sat: 9:00 AM - 6:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-400 text-sm">
            © 2026 U Matter Multipurpose Cooperative Society. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="hover:text-[#00CED1] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#00CED1] transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-[#00CED1] transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
