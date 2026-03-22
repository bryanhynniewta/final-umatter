import React, { useState } from 'react';
import { GraduationCap, Users, Heart, Lightbulb, Calendar, Megaphone, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

const ServicesWithPricing = () => {
  const services = [
    {
      icon: Heart,
      title: 'Mental Health Counselling',
      description: 'Professional counselling support for individuals dealing with stress, anxiety, emotional challenges, and personal growth',
      color: '#00CED1',
      pricing: [
        { type: 'Individual counselling session', price: '₹800 to ₹1,200 per session' },
        { type: 'Student counselling session', price: '₹500 to ₹800 per session' },
        { type: 'Relationship / couple counselling', price: '₹1,500 per session' }
      ]
    },
    {
      icon: GraduationCap,
      title: 'School & College Mental Health Programs',
      description: 'Interactive sessions designed to help students understand emotions, manage stress, and develop healthy coping skills',
      color: '#FFB6C1',
      pricing: [
        { type: 'Awareness session (1–2 hours)', price: '₹5,000 to ₹8,000' },
        { type: 'Half-day workshop', price: '₹8,000 to ₹12,000' },
        { type: 'Full-day program', price: '₹12,000 to ₹18,000' }
      ]
    },
    {
      icon: Lightbulb,
      title: 'Workshops & Training',
      description: 'Skill-based workshops focused on mental wellbeing, communication, and emotional intelligence',
      topics: [
        'Stress management',
        'Emotional intelligence',
        'Building resilience',
        'Mental health awareness'
      ],
      color: '#FFDA9F',
      pricing: [
        { type: 'Workshop for organisations', price: '₹10,000 to ₹20,000' }
      ]
    },
    {
      icon: Megaphone,
      title: 'Community Outreach & Awareness Programs',
      description: 'Community-based initiatives aimed at increasing awareness about mental health and reducing stigma',
      color: '#00CED1',
      pricing: [
        { type: 'Community awareness programs', price: '₹5,000 onwards (depending on scale)' }
      ]
    },
    {
      icon: Users,
      title: 'Youth Leadership & Internship Programs',
      description: 'Opportunities for young people to learn about mental health advocacy, leadership, and community engagement',
      color: '#FFB6C1',
      pricing: [
        { type: 'Internship / training programs', price: 'Customised based on duration' }
      ]
    },
    {
      icon: Calendar,
      title: 'Events & Safe Spaces',
      description: 'Events that encourage expression, dialogue, and healing within the community',
      examples: [
        'Open mic for mental health',
        'Community dialogue circles',
        'Youth engagement events'
      ],
      color: '#FFDA9F',
      pricing: [
        { type: 'Event collaboration', price: 'Customised based on event scale' }
      ]
    }
  ];

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="px-4 py-2 bg-[#00CED1]/10 text-[#00CED1] rounded-full text-sm font-semibold inline-block">
            Services Offered
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
            Our Programs & Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Programs can be customised for schools, colleges, organisations, and communities based on their needs
          </p>
        </div>

        {/* Services Accordion */}
        <div className="max-w-5xl mx-auto space-y-4">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card 
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <Accordion type="single" collapsible>
                  <AccordionItem value={`item-${index}`} className="border-none">
                    <AccordionTrigger className="hover:no-underline px-6 py-6">
                      <div className="flex items-center space-x-4 w-full">
                        <div 
                          className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${service.color}20` }}
                        >
                          <IconComponent 
                            className="h-7 w-7" 
                            style={{ color: service.color }}
                          />
                        </div>
                        <div className="text-left flex-1">
                          <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                          <p className="text-gray-600 text-sm mt-1">{service.description}</p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    
                    <AccordionContent className="px-6 pb-6">
                      <div className="ml-[72px] space-y-4">
                        {/* Topics if available */}
                        {service.topics && (
                          <div className="mb-4">
                            <p className="font-semibold text-gray-900 mb-2">Topics include:</p>
                            <ul className="space-y-1">
                              {service.topics.map((topic, idx) => (
                                <li key={idx} className="text-gray-700 flex items-center space-x-2">
                                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: service.color }}></span>
                                  <span>{topic}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {/* Examples if available */}
                        {service.examples && (
                          <div className="mb-4">
                            <p className="font-semibold text-gray-900 mb-2">Examples:</p>
                            <ul className="space-y-1">
                              {service.examples.map((example, idx) => (
                                <li key={idx} className="text-gray-700 flex items-center space-x-2">
                                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: service.color }}></span>
                                  <span>{example}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {/* Pricing */}
                        <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-100">
                          <p className="font-semibold text-gray-900 mb-3 flex items-center">
                            <Clock className="h-4 w-4 mr-2" style={{ color: service.color }} />
                            Pricing
                          </p>
                          <div className="space-y-2">
                            {service.pricing.map((item, idx) => (
                              <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                                <span className="text-gray-700">{item.type}</span>
                                <span className="font-semibold" style={{ color: service.color }}>
                                  {item.price}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </Card>
            );
          })}
        </div>

        {/* Call to action */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6 text-lg">
            Want to bring mental health awareness to your school, college, or community?
          </p>
          <button
            onClick={() => document.getElementById('booking').scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-[#00CED1] text-white rounded-full font-semibold hover:bg-[#00CED1]/90 transition-colors shadow-lg hover:shadow-xl text-lg"
          >
            Book a Session or Workshop
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesWithPricing;
