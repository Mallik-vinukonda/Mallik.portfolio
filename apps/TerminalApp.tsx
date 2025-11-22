import React, { useState, useRef, useEffect } from 'react';
import { RESUME_DATA } from '../constants';

const TerminalApp: React.FC = () => {
  const [history, setHistory] = useState<string[]>([
    "Welcome to Ubuntu 24.04 LTS (Mallik-Portfolio)",
    "Type 'help' to see available commands.",
    ""
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newHistory = [...history, `mallik@ubuntu:~$ ${cmd}`];

    switch (trimmed) {
      case 'help':
        newHistory.push(
          "Available commands:",
          "  about     - Display summary info",
          "  skills    - List technical skills",
          "  projects  - List projects",
          "  contact   - Show contact info",
          "  clear     - Clear terminal",
          "  ls        - List directory"
        );
        break;
      case 'about':
        newHistory.push(RESUME_DATA.summary);
        break;
      case 'skills':
        newHistory.push(
          "Languages: " + RESUME_DATA.skills.languages.join(', '),
          "Frontend: " + RESUME_DATA.skills.frontend.join(', '),
          "Backend: " + RESUME_DATA.skills.backend.join(', ')
        );
        break;
      case 'projects':
        RESUME_DATA.projects.forEach(p => {
          newHistory.push(`* ${p.title} [${p.tech.join(', ')}]`);
        });
        break;
      case 'contact':
        newHistory.push(
          `Email: ${RESUME_DATA.contact.email}`,
          `Phone: ${RESUME_DATA.contact.phone}`,
          `GitHub: ${RESUME_DATA.contact.github}`
        );
        break;
      case 'ls':
        newHistory.push("Documents  Downloads  Projects  Resume.pdf  secrets.txt");
        break;
      case 'cat secrets.txt':
        newHistory.push("Error: Permission denied. You are not sudo.");
        break;
      case 'sudo cat secrets.txt':
        newHistory.push("Mallik is actually Batman.");
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case '':
        break;
      default:
        newHistory.push(`Command not found: ${cmd}. Type 'help' for list.`);
    }
    
    setHistory(newHistory);
    setInput('');
  };

  return (
    <div className="h-full bg-[#300A24] text-white font-mono text-sm p-4 overflow-hidden flex flex-col" onClick={() => document.getElementById('term-input')?.focus()}>
      <div className="flex-1 overflow-auto custom-scrollbar space-y-1">
        {history.map((line, i) => (
          <div key={i} className="break-words">{line}</div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="mt-2 flex items-center">
        <span className="text-[#87D441] font-bold mr-2">mallik@ubuntu:~$</span>
        <input 
          id="term-input"
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleCommand(input);
          }}
          className="bg-transparent outline-none flex-1 text-white"
          autoComplete="off"
          autoFocus
        />
      </div>
    </div>
  );
};

export default TerminalApp;