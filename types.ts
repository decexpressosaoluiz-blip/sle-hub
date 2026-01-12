import { LucideIcon } from 'lucide-react';

export interface Project {
  id: string;
  name: string;
  description: string;
  details: string; // Extra info for tooltip
  url: string;
  icon: LucideIcon;
  colorTheme: 'blue' | 'red';
}