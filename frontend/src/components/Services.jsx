import React from 'react';
import { GraduationCap, Users, Heart, Lightbulb, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

const Services = () => {
  const services = [
    {
      icon: GraduationCap,
      title: 'School Mental Health Programs',
      duration: 'Interactive Workshops',
      description: 'Age-appropriate, interactive workshops in schools focusing on emotional literacy, stress management, self-awareness, and healthy coping skills',
      features: [
        'Emotional literacy training',
        'Stress management techniques',
        'Self-awareness building',
        'Culturally relevant content'
      ],
      color: '#00CED1'
    },
    {
      icon: Users,
      title: "Men's Mental Health Focus",
      duration: 'Community Engagement',
      description: 'Opening conversations around men\'s emotional wellbeing by promoting healthier ways of expressing stress, vulnerability, and help-seeking',
      features: [
        'Breaking stigma around masculinity',
        'Emotional expression support',
        'Community awareness initiatives',
        'Safe space creation'
      ],
      color: '#FFB6C1'
    },
    {
      icon: Heart,
      title: 'Counselling & Support',
      duration: 'Confidential Sessions',
      description: 'Basic psychological support, guidance, and referral pathways for individuals seeking help, maintaining ethical boundaries and confidentiality',
      features: [
        'One-on-one support',
        'Guidance and referrals',
        '100% confidential',
        'Ethical practice'
      ],
      color: '#FFDA9F'
    },
    {
      icon: Lightbulb,
      title: 'Youth Leadership & Internships',
      duration: 'Capacity Building',
      description: 'Training young people as mental health advocates through structured internships, capacity building, and community engagement opportunities',
      features: [
        'Leadership training',
        'Mental health advocacy',
        'Hands-on internships',
        'Community engagement'
      ],
      color: '#00CED1'
    }
  ];

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="px-4 py-2 bg-[#00CED1]/10 text-[#00CED1] rounded-full text-sm font-semibold inline-block">
            What We Do
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
            Our Programs & Initiatives
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Community-based mental health programs designed to be accessible, stigma-free, and youth-driven
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card 
                key={index}
                className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white hover:-translate-y-2"
              >
                <CardHeader className="space-y-4">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${service.color}20` }}
                  >
                    <IconComponent 
                      className="h-8 w-8" 
                      style={{ color: service.color }}
                    />
                  </div>
                  <div>
                    <CardTitle className="text-2xl mb-2">{service.title}</CardTitle>
                    <div className="flex items-center space-x-2 text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">{service.duration}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <CardDescription className="text-base leading-relaxed">
                    {service.description}
                  </CardDescription>
                  
                  <div className="space-y-3 pt-4 border-t border-gray-100">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <CheckCircle 
                          className="h-5 w-5 flex-shrink-0" 
                          style={{ color: service.color }}
                        />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to action */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6">
            Want to bring mental health awareness to your school or community?
          </p>
          <button
            onClick={() => document.getElementById('booking').scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 bg-[#00CED1] text-white rounded-full font-semibold hover:bg-[#00CED1]/90 transition-colors shadow-lg hover:shadow-xl"
          >
            Get in Touch
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
