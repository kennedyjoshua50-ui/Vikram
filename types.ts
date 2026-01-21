
export interface Child {
  id: string;
  name: string;
  dob: string;
  gender: 'boy' | 'girl' | 'other';
  avatar: string;
}

export interface TimelineItem {
  id: string;
  childId: string;
  date: string; // YYYY-MM-DD (Local)
  time: string;
  title: string;
  description: string;
  status: 'pending' | 'completed';
  icon: string;
  category: 'meds' | 'food' | 'play' | 'school' | 'sleep';
  color?: string;
  repeatType: 'once' | 'daily' | 'custom';
  repeatDays?: number[]; // 0-6 (Sun-Sat)
}

export interface OnboardingData {
  children: Child[];
  needs: string[];
}

export interface Notification {
  id: string;
  type: 'completed' | 'alert' | 'community';
  title: string;
  message: string;
  timestamp: string;
  group: 'Today' | 'Yesterday';
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: string;
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export interface GuideArticle {
  id: string;
  title: string;
  category: string;
  summary: string;
  imageUrl: string;
  source: string;
  fullContent: string;
  sourceUrl?: string;
}
