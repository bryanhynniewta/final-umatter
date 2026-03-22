import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import ServicesWithPricing from '../components/ServicesWithPricing';
import About from '../components/About';
import Team from '../components/Team';
import BookingForm from '../components/BookingForm';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <ServicesWithPricing />
      <About />
      <Team />
      <BookingForm />
      <Footer />
    </div>
  );
};

export default HomePage;
