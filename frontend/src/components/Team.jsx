import React from 'react';
import { Heart, Users, Sparkles } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const Team = () => {
  const teamMembers = [
    {
      name: 'Riyaka Verma Surong',
      role: 'Founder & Chairman',
      image: 'https://customer-assets.emergentagent.com/job_umatter-book/artifacts/fjb6m1vp_WhatsApp%20Image%202026-03-03%20at%2011.42.03%20PM%20%283%29.jpeg',
      bio: 'Riyaka Surong is a psychologist, PhD scholar, and mental health advocate committed to building community-based emotional wellbeing ecosystems. With over a decade of reflective practice and academic engagement, she brings both professional expertise and lived sensitivity to U Matter. Her vision is to create youth-driven mental health spaces across Meghalaya.'
    },
    {
      name: 'Afilia',
      role: 'Vice Chairman',
      image: 'https://customer-assets.emergentagent.com/job_umatter-book/artifacts/a9gn33dj_WhatsApp%20Image%202026-03-03%20at%2011.42.03%20PM%20%282%29.jpeg',
      bio: 'Afilia is a psychologist with hands-on experience working with children and school environments. She plays a key role in programme design and ensures that U Matter\'s interventions remain developmentally sensitive and child-friendly.'
    },
    {
      name: 'Manphika',
      role: 'Social Media Manager & Creative Head',
      image: 'https://customer-assets.emergentagent.com/job_umatter-book/artifacts/bubp3zyp_WhatsApp%20Image%202026-03-03%20at%2011.42.03%20PM%20%281%29.jpeg',
      bio: 'Manphika leads digital strategy, branding, and campaign initiatives. She ensures that mental health conversations are relatable, engaging, and accessible to young people.'
    },
    {
      name: 'Iohun',
      role: 'Joint Secretary & Counselling Lead',
      image: 'https://customer-assets.emergentagent.com/job_umatter-book/artifacts/zh2b6s6p_WhatsApp%20Image%202026-03-03%20at%2011.42.03%20PM.jpeg',
      bio: 'Iohun oversees counselling initiatives and supports ethical, compassionate programme implementation. Her grounded leadership ensures emotional safety in all services.'
    }
  ];

  const supportingMembers = [
    'Wanlang', 'Jeneth', 'Riwanka', 'Diksha', 'San'
  ];

  return (
    <section id="team" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="px-4 py-2 bg-[#FFDA9F]/20 text-[#00CED1] rounded-full text-sm font-semibold inline-block">
            Our Team
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
            Meet the People Behind U.Matter
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A dedicated team of mental health professionals and advocates committed to youth wellbeing across Meghalaya
          </p>
        </div>

        {/* Team Members Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <Card 
              key={index}
              className="group hover:shadow-2xl transition-all duration-300 border-0 overflow-hidden"
            >
              <CardContent className="p-0">
                <div className="grid md:grid-cols-5 gap-0">
                  {/* Image */}
                  <div className="md:col-span-2 relative overflow-hidden">
                    <img 
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover min-h-[300px] md:min-h-full group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#00CED1]/20 to-transparent"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="md:col-span-3 p-6 flex flex-col justify-center">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">
                        {member.name}
                      </h3>
                      <p className="text-[#00CED1] font-semibold text-lg">
                        {member.role}
                      </p>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Supporting Members */}
        <div className="bg-gradient-to-br from-[#00CED1]/5 to-[#FFB6C1]/5 rounded-3xl p-8 md:p-12 mb-12">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Users className="h-6 w-6" style={{ color: '#00CED1' }} />
            <h3 className="text-2xl font-bold text-gray-900">
              Supporting Members & Volunteers
            </h3>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            {supportingMembers.map((name, index) => (
              <span 
                key={index}
                className="px-6 py-3 bg-white rounded-full text-gray-700 font-medium shadow-sm hover:shadow-md transition-shadow"
              >
                {name}
              </span>
            ))}
          </div>
          <p className="text-center text-gray-600 max-w-2xl mx-auto">
            Along with dedicated volunteers who contribute behind the scenes in logistics, coordination, and outreach
          </p>
        </div>

        {/* Community Engagement Highlight */}
        <Card className="border-0 shadow-2xl overflow-hidden">
          <CardContent className="p-0">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="relative h-[400px] lg:h-auto">
                <img 
                  src="https://customer-assets.emergentagent.com/job_umatter-book/artifacts/5vug6tnv_WhatsApp%20Image%202026-03-03%20at%203.19.12%20PM.jpeg"
                  alt="U Matter with Chief Minister"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-br from-[#00CED1]/5 to-white">
                <div className="inline-flex items-center space-x-2 mb-4">
                  <Sparkles className="h-5 w-5" style={{ color: '#FFDA9F' }} />
                  <span className="text-[#00CED1] font-semibold">Community Impact</span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Strengthening Mental Health Together
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  U Matter engaging with the Hon'ble Chief Minister of Meghalaya on strengthening mental health initiatives for young people.
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[#FFB6C1]/20 rounded-full flex items-center justify-center">
                    <Heart className="h-6 w-6" style={{ color: '#FFB6C1' }} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Building Youth-Driven Spaces</p>
                    <p className="text-sm text-gray-600">Creating community-based emotional wellbeing ecosystems</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Team;
