import React from 'react';
import { Target, Compass, BookOpen, TrendingUp } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: TrendingUp, value: '3000+', label: 'Minds Impacted' },
    { icon: BookOpen, value: '30+', label: 'Workshops Conducted' },
    { icon: Target, value: '300+', label: 'Support Interactions' },
    { icon: Compass, value: '50+', label: 'Interns Trained' }
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto">
        {/* Vision Section */}
        <div className="text-center mb-16 space-y-6">
          <span className="px-4 py-2 bg-[#FFB6C1]/20 text-[#00CED1] rounded-full text-sm font-semibold inline-block">
            Our Vision
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 max-w-4xl mx-auto leading-tight">
            Echoing the voices that were never heard and creating spaces where every story matters
          </h2>
        </div>

        {/* Mission Section */}
        <div className="bg-gradient-to-br from-[#00CED1]/5 to-[#FFB6C1]/5 rounded-3xl p-8 lg:p-12 mb-16">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center space-x-2 mb-4">
              <Target className="h-6 w-6" style={{ color: '#00CED1' }} />
              <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              U Matter is committed to normalising conversations around mental health by creating safe, inclusive, and youth-led spaces across Meghalaya. Through school programs, community initiatives, and youth leadership training, we aim to make emotional wellbeing accessible, stigma-free, and community-driven.
            </p>
          </div>
        </div>

        {/* About Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          {/* Left Content - Images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img 
                  src="https://customer-assets.emergentagent.com/job_umatter-book/artifacts/pjlun3pv_WhatsApp%20Image%202026-03-16%20at%2012.43.14%20PM.jpeg" 
                  alt="U Matter workshop session" 
                  className="w-full h-64 object-cover rounded-2xl shadow-lg"
                />
                <img 
                  src="https://customer-assets.emergentagent.com/job_umatter-book/artifacts/pitt7fv7_WhatsApp%20Image%202026-03-16%20at%2012.43.12%20PM.jpeg" 
                  alt="U Matter team presenting" 
                  className="w-full h-48 object-cover rounded-2xl shadow-lg"
                />
              </div>
              <div className="space-y-4 pt-12">
                <img 
                  src="https://customer-assets.emergentagent.com/job_umatter-book/artifacts/760vmvnq_WhatsApp%20Image%202026-03-16%20at%2012.43.08%20PM.jpeg" 
                  alt="U Matter team members" 
                  className="w-full h-48 object-cover rounded-2xl shadow-lg"
                />
                <img 
                  src="https://customer-assets.emergentagent.com/job_umatter-book/artifacts/9p7m94b1_WhatsApp%20Image%202026-03-16%20at%2012.43.05%20PM.jpeg" 
                  alt="U Matter community engagement" 
                  className="w-full h-64 object-cover rounded-2xl shadow-lg"
                />
              </div>
            </div>
            
            {/* Decorative element */}
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#FFDA9F]/30 rounded-full blur-2xl -z-10"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#FFB6C1]/30 rounded-full blur-2xl -z-10"></div>
          </div>

          {/* Right Content - Text */}
          <div className="space-y-6">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
              About <span style={{ color: '#00CED1' }}>U Matter</span>
            </h2>
            
            <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
              <p>
                U Matter is a youth-led mental health initiative based in Shillong, Meghalaya, working to make conversations around emotional wellbeing more open, accessible, and stigma-free.
              </p>
              <p>
                Founded with the belief that every individual deserves to feel seen, heard, and supported, U Matter focuses on preventive mental health, early emotional literacy, and community-based support systems.
              </p>
              <p>
                Over time, our work has expanded across schools, youth groups, and community spaces where we conduct interactive workshops, awareness initiatives, and leadership programs for young changemakers. Our approach is culturally sensitive, locally rooted, and grounded in psychological understanding.
              </p>
              <p className="font-medium text-gray-700">
                While we recognise that the mental health gap in our region is large, we continue to contribute our part by creating safe spaces, building awareness, and strengthening community resilience one conversation at a time.
              </p>
            </div>
          </div>
        </div>

        {/* Impact Stats */}
        <div className="bg-gradient-to-r from-[#00CED1] to-[#00B5B8] rounded-3xl p-8 lg:p-12 text-white">
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold mb-3">Our Impact</h3>
            <p className="text-xl opacity-90">Active presence in schools and colleges across Shillong</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div 
                  key={index}
                  className="text-center space-y-3"
                >
                  <div className="flex justify-center">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                      <IconComponent className="h-8 w-8" />
                    </div>
                  </div>
                  <p className="text-4xl font-bold">
                    {stat.value}
                  </p>
                  <p className="text-lg opacity-90">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;