import React from 'react';
import { RESUME_DATA } from '../constants';
import { Terminal, Code, Database, Cloud, BookOpen } from 'lucide-react';

const SkillsApp: React.FC = () => {
  const iconMap = {
    languages: <Code className="text-blue-600" />,
    frontend: <Terminal className="text-green-600" />,
    backend: <Database className="text-purple-600" />,
    tools: <Cloud className="text-orange-600" />,
    core: <BookOpen className="text-red-600" />
  };

  const categories = {
    "Languages": { data: RESUME_DATA.skills.languages, icon: iconMap.languages },
    "Frontend": { data: RESUME_DATA.skills.frontend, icon: iconMap.frontend },
    "Backend & DB": { data: RESUME_DATA.skills.backend, icon: iconMap.backend },
    "Tools & Cloud": { data: RESUME_DATA.skills.tools, icon: iconMap.tools },
    "CS Fundamentals": { data: RESUME_DATA.skills.core, icon: iconMap.core },
  };

  return (
    <div className="p-8 min-h-full bg-gradient-to-br from-gray-50 to-gray-100 font-ubuntu">
        <h2 className="text-3xl font-bold text-center mb-10 text-ubuntu-dark">Technical Arsenal</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(categories).map(([title, { data, icon }], idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center gap-3 mb-4 border-b border-gray-100 pb-3">
                        <div className="p-2 bg-gray-50 rounded-lg">
                            {icon}
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {data.map((skill, sIdx) => (
                            <span 
                                key={sIdx} 
                                className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md text-sm font-medium hover:bg-ubuntu-orange hover:text-white transition-colors cursor-default"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default SkillsApp;