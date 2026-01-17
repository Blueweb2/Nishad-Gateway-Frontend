import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function ServiceTemplate() {
  const sections = [
    {
      id: 'C',
      title: 'Company Setup Overview',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop'
    },
    {
      id: 'E',
      title: 'Entity Types',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=400&fit=crop',
      titleColor: 'text-green-600'
    },
    {
      id: 'L',
      title: 'Licensing & Approvals',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=400&fit=crop'
    },
    {
      id: 'O',
      title: 'Ownership & Capital',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=400&fit=crop'
    },
    {
      id: 'S',
      title: 'Setup Timeline',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy',
      image: 'https://images.unsplash.com/photo-1552581234-26160f608093?w=400&h=400&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <button className="flex items-center text-gray-600 hover:text-gray-900 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span className="text-sm">Back</span>
        </button>

        <div className="flex justify-between items-start mb-12">
          <h1 className="text-5xl font-bold text-gray-800">
            Company<br />Formation
          </h1>
          <div className="text-right">
            <div className="text-sm text-gray-500">All</div>
            <div className="text-5xl font-light text-gray-400">6</div>
          </div>
        </div>

        {/* Intro Text */}
        <div className="max-w-md ml-auto mb-16">
          <p className="text-gray-500 text-sm leading-relaxed">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
          </p>
        </div>

        {/* Sections List */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <div key={index} className="border-t border-gray-200 pt-6">
              <div className="flex items-start gap-6">
                {/* Left Letter */}
                <div className="text-gray-300 font-light text-lg pt-2 w-8">
                  {section.id}
                </div>

                {/* Image */}
                <div className="flex-shrink-0">
                  <img 
                    src={section.image} 
                    alt={section.title}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>

                {/* Title */}
                <div className="flex-grow">
                  <h2 className={`text-xl font-semibold ${section.titleColor || 'text-gray-900'}`}>
                    {section.title}
                  </h2>
                </div>

                {/* Description */}
                <div className="flex-grow max-w-md">
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {section.description}
                  </p>
                </div>

                {/* Arrow Button */}
                <button className="flex-shrink-0 w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
                  <ArrowRight className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}