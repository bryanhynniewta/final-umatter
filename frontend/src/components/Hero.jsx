import React from 'react';
import { Calendar, Heart, Shield } from 'lucide-react';
import { Button } from './ui/button';

const Hero = () => {
  const scrollToBooking = () => {
    const element = document.getElementById('booking');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFB6C1]/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00CED1]/10 rounded-full blur-3xl -z-10"></div>

      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-block">
              <span className="px-4 py-2 bg-[#FFDA9F]/20 text-[#00CED1] rounded-full text-sm font-semibold">
                Youth-Led Mental Health Initiative in Shillong
              </span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
              <span style={{ color: '#00CED1' }}>U Matter</span>
            </h1>
            
            <p className="text-2xl font-semibold text-gray-800 leading-relaxed">
              Echoing the voices that were never heard.
            </p>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              At U Matter, we work towards creating safe and supportive spaces where individuals can talk openly about their mental health, build emotional resilience, and access the support they need.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={scrollToBooking}
                className="text-lg px-8 py-6 bg-[#00CED1] hover:bg-[#00CED1]/90 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Book a Workshop
              </Button>
              <Button 
                variant="outline"
                onClick={scrollToBooking}
                className="text-lg px-8 py-6 border-2 border-[#00CED1] text-[#00CED1] hover:bg-[#00CED1] hover:text-white rounded-full transition-all duration-300"
              >
                Get Support
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-8 pt-8 border-t border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-[#FFB6C1]/20 rounded-lg">
                  <Shield className="h-5 w-5" style={{ color: '#FFB6C1' }} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">100% Confidential</p>
                  <p className="text-sm text-gray-500">Your privacy matters</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-[#FFDA9F]/30 rounded-lg">
                  <Heart className="h-5 w-5" style={{ color: '#00CED1' }} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Youth-Led Initiative</p>
                  <p className="text-sm text-gray-500">Community-driven care</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1573497491208-6b1acb260507?w=800&q=80" 
                alt="Mental wellness" 
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#00CED1]/20 to-transparent"></div>
            </div>
            
            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-[#00CED1]/10 rounded-full">
                  <Calendar className="h-8 w-8" style={{ color: '#00CED1' }} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">3000+</p>
                  <p className="text-gray-600">Minds Impacted</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
