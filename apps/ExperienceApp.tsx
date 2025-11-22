import React from 'react';
import { RESUME_DATA } from '../constants';
import { Briefcase } from 'lucide-react';

const ExperienceApp: React.FC = () => {
  return (
    <div className="p-8 min-h-full bg-white font-ubuntu">
      <h2 className="text-3xl font-bold text-ubuntu-dark mb-10 border-b-4 border-ubuntu-orange inline-block pb-2">Work Experience</h2>
      
      <div className="relative border-l-2 border-gray-200 ml-3 space-y-12">
        {RESUME_DATA.experience.map((exp, index) => (
            <div key={index} className="mb-10 ml-8 relative">
                <span className="absolute -left-12 flex items-center justify-center w-8 h-8 bg-ubuntu-purple rounded-full ring-4 ring-white text-white">
                    <Briefcase size={14} />
                </span>
                
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:border-ubuntu-orange transition-colors duration-300">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">{exp.role}</h3>
                            <h4 className="text-lg text-ubuntu-orange font-medium">{exp.company}</h4>
                        </div>
                        <div className="text-right mt-2 md:mt-0">
                            <span className="block text-sm font-bold text-gray-600">{exp.period}</span>
                            <span className="block text-xs text-gray-500">{exp.location}</span>
                        </div>
                    </div>
                    
                    <ul className="space-y-2">
                        {exp.points.map((point, pIdx) => (
                            <li key={pIdx} className="flex items-start text-gray-700 text-sm md:text-base">
                                <span className="mr-2 mt-1.5 text-ubuntu-orange">▪</span>
                                {point}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceApp;