import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface Project {
  title: string;
  tech: string[];
  description: string[];
  link?: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  location: string;
  points: string[];
}

export interface Education {
  degree: string;
  school: string;
  year: string;
  details: string;
}

export interface AppDefinition {
  id: string;
  title: string;
  icon: LucideIcon;
  color: string;
  component: React.ReactNode;
  width?: string; // Tailwind width class
  height?: string; // Tailwind height class
}

export interface WindowState {
  id: string;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
}

export type WindowAction = 'MINIMIZE' | 'MAXIMIZE' | 'CLOSE';