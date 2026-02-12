export type UserRole = 'student' | 'faculty' | 'hod' | 'committee' | 'admin' | 'ombudsman';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  department: string;
  rollNumber?: string;
  employeeId?: string;
  email: string;
  avatar?: string;
}

export type ComplaintCategory =
  | 'Academic Issue'
  | 'Faculty Misconduct'
  | 'Harassment'
  | 'Infrastructure'
  | 'Exam/Marks Issue'
  | 'Administration Delay'
  | 'Others';

export type ComplaintStatus = 'Pending Review' | 'Under Investigation' | 'Community Review' | 'Escalated' | 'Resolved' | 'Dismissed';
export type UrgencyLevel = 'Low' | 'Medium' | 'High';

export interface Complaint {
  id: string;
  ticketId: string;
  studentName: string;
  rollNumber: string;
  department: string;
  year: string;
  category: ComplaintCategory;
  title: string;
  description: string;
  anonymous: boolean;
  urgency: UrgencyLevel;
  status: ComplaintStatus;
  createdAt: string;
  updatedAt: string;
  supportVotes: number;
  rejectVotes: number;
  totalEligibleVoters: number;
  votingDeadline?: string;
  aiSentiment?: 'Low' | 'Moderate' | 'High Risk';
  aiToxicity?: boolean;
  aiRiskScore?: number;
  aiDuplicate?: boolean;
  evidence?: string[];
  timeline: TimelineEvent[];
}

export interface TimelineEvent {
  id: string;
  action: string;
  actor: string;
  timestamp: string;
  note?: string;
}

export interface DashboardStats {
  total: number;
  pending: number;
  resolved: number;
  escalated: number;
  underReview: number;
}

export const DEPARTMENTS = [
  'Computer Science & Engineering',
  'CSE (Data Science)',
  'CSE (AI & ML)',
  'Electronics & Communication Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Master of Business Administration',
];

export const DEMO_USERS: User[] = [
  { id: '1', name: 'Arjun Reddy', role: 'student', department: 'Computer Science & Engineering', rollNumber: '22B01A0501', email: 'arjun@kgr.ac.in' },
  { id: '2', name: 'Priya Sharma', role: 'student', department: 'CSE (AI & ML)', rollNumber: '22B01A0612', email: 'priya@kgr.ac.in' },
  { id: '3', name: 'Dr. Bharath Reddy', role: 'hod', department: 'Computer Science & Engineering', employeeId: 'FAC001', email: 'bharath@kgr.ac.in' },
  { id: '4', name: 'Dr. M. N. Narsaiah', role: 'faculty', department: 'Computer Science & Engineering', employeeId: 'FAC002', email: 'narsaiah@kgr.ac.in' },
  { id: '5', name: 'Dr. S. Sai Satyanarayana Reddy', role: 'admin', department: 'Administration', employeeId: 'ADM001', email: 'principal@kgr.ac.in' },
  { id: '6', name: 'Dr. L. Jayahari', role: 'committee', department: 'R&D', employeeId: 'FAC003', email: 'jayahari@kgr.ac.in' },
  { id: '7', name: 'Inspector – Moinabad', role: 'ombudsman', department: 'External', employeeId: 'EXT001', email: 'ombudsman@kgr.ac.in' },
];
