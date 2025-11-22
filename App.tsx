import React, { useState } from 'react';
import { User, Briefcase, Code2, Terminal, Cpu, Bot, Grid3x3, Trash2 } from 'lucide-react';
import TopBar from './components/TopBar';
import Window from './components/Window';
import AboutApp from './apps/AboutApp';
import ProjectsApp from './apps/ProjectsApp';
import SkillsApp from './apps/SkillsApp';
import ExperienceApp from './apps/ExperienceApp';
import TerminalApp from './apps/TerminalApp';
import GeminiChatApp from './apps/GeminiChatApp';
import { AppDefinition, WindowState, WindowAction } from './types';

// App Definitions
const APPS: AppDefinition[] = [
  { id: 'about', title: 'About Me', icon: User, color: 'bg-orange-500', component: <AboutApp /> },
  { id: 'experience', title: 'Experience', icon: Briefcase, color: 'bg-blue-500', component: <ExperienceApp /> },
  { id: 'projects', title: 'Projects', icon: Code2, color: 'bg-green-600', component: <ProjectsApp />, width: "w-11/12" },
  { id: 'skills', title: 'Skills', icon: Cpu, color: 'bg-purple-600', component: <SkillsApp /> },
  { id: 'terminal', title: 'Terminal', icon: Terminal, color: 'bg-gray-800', component: <TerminalApp />, width: "w-full md:w-3/4", height: "h-3/4 md:h-[500px]" },
  { id: 'ai_chat', title: 'AI Assistant', icon: Bot, color: 'bg-indigo-600', component: <GeminiChatApp />, width: "w-full md:w-[400px]", height: "h-3/4 md:h-[600px]" }
];

const App: React.FC = () => {
  // State for window management
  const [windows, setWindows] = useState<Record<string, WindowState>>({});
  const [activeZIndex, setActiveZIndex] = useState(10);

  const handleAppClick = (appId: string) => {
    setWindows(prev => {
      const newZ = activeZIndex + 1;
      setActiveZIndex(newZ);

      // If open but minimized, maximize it. If closed, open it.
      if (prev[appId]) {
        return {
          ...prev,
          [appId]: { ...prev[appId], isOpen: true, isMinimized: false, zIndex: newZ }
        };
      } else {
        return {
          ...prev,
          [appId]: { id: appId, isOpen: true, isMinimized: false, zIndex: newZ }
        };
      }
    });
  };

  const handleWindowAction = (appId: string, action: WindowAction) => {
    setWindows(prev => {
      const current = prev[appId];
      if (!current) return prev;

      switch (action) {
        case 'CLOSE':
          return { ...prev, [appId]: { ...current, isOpen: false } };
        case 'MINIMIZE':
          return { ...prev, [appId]: { ...current, isMinimized: true } };
        case 'MAXIMIZE': // We just restore if minimized, handled by click usually
          return { ...prev, [appId]: { ...current, isMinimized: false } };
        default:
          return prev;
      }
    });
  };

  const bringToFront = (appId: string) => {
    const newZ = activeZIndex + 1;
    setActiveZIndex(newZ);
    setWindows(prev => ({
      ...prev,
      [appId]: { ...prev[appId], zIndex: newZ }
    }));
  };

  return (
    <div className="h-screen w-screen overflow-hidden relative flex flex-col">
      
      <TopBar />

      <div className="flex-1 flex relative">
        {/* Ubuntu Dock (Sidebar) */}
        <div className="w-16 md:w-20 bg-[#000000aa] h-full flex flex-col items-center py-4 gap-3 z-40 backdrop-blur-md border-r border-white/5 shadow-2xl">
          {APPS.map((app) => {
            const isOpen = windows[app.id]?.isOpen;
            const isFocused = windows[app.id]?.isOpen && !windows[app.id]?.isMinimized && windows[app.id]?.zIndex === activeZIndex;

            return (
              <div key={app.id} className="relative group w-full flex justify-center items-center py-2 cursor-pointer" onClick={() => handleAppClick(app.id)}>
                
                {/* Hover Background Highlight */}
                <div className="absolute w-12 h-12 md:w-14 md:h-14 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-200 scale-90 group-hover:scale-100 pointer-events-none border border-white/10 shadow-lg" />

                {/* Active Indicators */}
                {isOpen && (
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-3 bg-orange-500 rounded-r shadow-[0_0_8px_rgba(233,84,32,0.8)] transition-all duration-200" />
                )}
                
                {/* Tooltip */}
                <div className="absolute left-full ml-5 top-1/2 transform -translate-y-1/2 bg-[#222] text-white text-sm font-medium px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-50 border border-white/10 shadow-xl translate-x-[-10px] group-hover:translate-x-0 pointer-events-none">
                  {app.title}
                  {/* Tooltip Arrow */}
                  <div className="absolute left-0 top-1/2 transform -translate-x-full -translate-y-1/2 border-[6px] border-transparent border-r-[#222]" />
                </div>

                {/* Icon Container */}
                <div className={`relative w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-white transition-all duration-200 ease-in-out shadow-lg z-10
                  ${app.color} ${isFocused ? 'scale-110 ring-2 ring-white/60 brightness-110' : ''} group-hover:scale-125 group-hover:brightness-110
                `}>
                  <app.icon size={24} strokeWidth={1.5} />
                </div>
              </div>
            );
          })}

          {/* Spacer to push items to bottom */}
          <div className="flex-1" />

          {/* Trash Icon (Static) */}
           <div className="relative group w-full flex justify-center items-center py-2 cursor-pointer">
                <div className="absolute w-12 h-12 md:w-14 md:h-14 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-200 scale-90 group-hover:scale-100 pointer-events-none border border-white/10 shadow-lg" />
                <div className="absolute left-full ml-5 top-1/2 transform -translate-y-1/2 bg-[#222] text-white text-sm font-medium px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-50 border border-white/10 shadow-xl translate-x-[-10px] group-hover:translate-x-0 pointer-events-none">
                  Trash
                  <div className="absolute left-0 top-1/2 transform -translate-x-full -translate-y-1/2 border-[6px] border-transparent border-r-[#222]" />
                </div>
                <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-white transition-all duration-200 ease-in-out shadow-lg z-10 bg-gray-700 group-hover:scale-125 group-hover:brightness-110">
                  <Trash2 size={24} strokeWidth={1.5} />
                </div>
           </div>

          {/* Show Applications (Grid) Icon */}
           <div 
             className="relative group w-full flex justify-center items-center py-2 mb-2 cursor-pointer"
             onClick={() => window.open('https://drive.google.com/file/d/1L7P_ROumJuFVTNjBzeLFwmMCQh9Tl411/view', '_blank')}
           >
                <div className="absolute w-12 h-12 md:w-14 md:h-14 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-200 scale-90 group-hover:scale-100 pointer-events-none border border-white/10 shadow-lg" />
                <div className="absolute left-full ml-5 top-1/2 transform -translate-y-1/2 bg-[#222] text-white text-sm font-medium px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-50 border border-white/10 shadow-xl translate-x-[-10px] group-hover:translate-x-0 pointer-events-none">
                  Resume (PDF)
                  <div className="absolute left-0 top-1/2 transform -translate-x-full -translate-y-1/2 border-[6px] border-transparent border-r-[#222]" />
                </div>
                <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-white transition-all duration-200 ease-in-out shadow-lg z-10 bg-white/10 group-hover:scale-125 group-hover:brightness-110">
                  <Grid3x3 size={24} strokeWidth={1.5} />
                </div>
           </div>

        </div>

        {/* Desktop Area */}
        <div className="flex-1 relative">
          {/* Desktop Shortcut Icons (just visual for aesthetics) */}
          <div className="absolute top-4 left-4 grid grid-cols-1 gap-6">
             <div className="flex flex-col items-center group cursor-pointer transition-transform duration-200 hover:scale-105" onClick={() => handleAppClick('terminal')}>
                <Terminal size={48} className="text-white drop-shadow-lg filter" />
                <span className="text-white text-xs mt-1 bg-black/30 px-2 py-0.5 rounded shadow-sm backdrop-blur-sm">Terminal</span>
             </div>
             <div className="flex flex-col items-center group cursor-pointer transition-transform duration-200 hover:scale-105" onClick={() => handleAppClick('projects')}>
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
                    <Code2 size={28} className="text-white" />
                </div>
                <span className="text-white text-xs mt-1 bg-black/30 px-2 py-0.5 rounded shadow-sm backdrop-blur-sm">My Work</span>
             </div>
          </div>

          {/* Windows */}
          {APPS.map(app => {
            const state = windows[app.id];
            if (!state) return null;

            return (
              <Window
                key={app.id}
                title={app.title}
                isOpen={state.isOpen}
                isMinimized={state.isMinimized}
                zIndex={state.zIndex}
                onAction={(action) => handleWindowAction(app.id, action)}
                onFocus={() => bringToFront(app.id)}
                width={app.width}
                height={app.height}
              >
                {app.component}
              </Window>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;