import { Complaint, DashboardStats } from './types';

export const MOCK_COMPLAINTS: Complaint[] = [
  {
    id: '1', ticketId: 'SUN-2026-0001', studentName: 'Arjun Reddy', rollNumber: '22B01A0501',
    department: 'Computer Science & Engineering', year: '3rd', category: 'Academic Issue',
    title: 'Unfair Internal Marks Distribution in DBMS',
    description: 'The internal marks for DBMS subject were distributed without transparency. Several students who attended all classes and submitted assignments on time received lower marks than those who did not. There was no rubric shared beforehand and the faculty refused to show the breakdown when asked. This is affecting the overall GPA of sincere students.',
    anonymous: false, urgency: 'High', status: 'Community Review',
    createdAt: '2026-02-01T10:30:00', updatedAt: '2026-02-05T14:20:00',
    supportVotes: 24, rejectVotes: 3, totalEligibleVoters: 120,
    votingDeadline: '2026-02-19T10:30:00',
    aiSentiment: 'Moderate', aiToxicity: false, aiRiskScore: 62, aiDuplicate: false,
    timeline: [
      { id: 't1', action: 'Complaint Submitted', actor: 'Arjun Reddy', timestamp: '2026-02-01T10:30:00' },
      { id: 't2', action: 'Status changed to Under Investigation', actor: 'System', timestamp: '2026-02-02T09:00:00' },
      { id: 't3', action: 'Marked for Community Review', actor: 'Dr. Bharath Reddy', timestamp: '2026-02-05T14:20:00' },
    ],
  },
  {
    id: '2', ticketId: 'SUN-2026-0002', studentName: 'Anonymous', rollNumber: 'HIDDEN',
    department: 'CSE (AI & ML)', year: '2nd', category: 'Harassment',
    title: 'Verbal Harassment by Lab Instructor',
    description: 'A lab instructor has been using derogatory language and singling out certain students during practical sessions. Multiple students have witnessed this but are afraid to speak up. The behavior has been ongoing for over two months and is creating a hostile learning environment that affects concentration and mental health.',
    anonymous: true, urgency: 'High', status: 'Escalated',
    createdAt: '2026-01-25T08:15:00', updatedAt: '2026-02-08T11:00:00',
    supportVotes: 45, rejectVotes: 2, totalEligibleVoters: 90,
    aiSentiment: 'High Risk', aiToxicity: false, aiRiskScore: 88, aiDuplicate: false,
    timeline: [
      { id: 't1', action: 'Complaint Submitted (Anonymous)', actor: 'Anonymous', timestamp: '2026-01-25T08:15:00' },
      { id: 't2', action: 'Escalated to Grievance Committee', actor: 'System', timestamp: '2026-02-08T11:00:00' },
    ],
  },
  {
    id: '3', ticketId: 'SUN-2026-0003', studentName: 'Kavitha Nair', rollNumber: '23B01A0315',
    department: 'Civil Engineering', year: '2nd', category: 'Infrastructure',
    title: 'Broken AC and Poor Ventilation in Block C Classrooms',
    description: 'The air conditioning in Block C classrooms has not been functional for over 3 weeks. Students are finding it difficult to concentrate during afternoon lectures due to extreme heat. Multiple complaints to the maintenance department have gone unanswered. Requesting urgent repair.',
    anonymous: false, urgency: 'Medium', status: 'Pending Review',
    createdAt: '2026-02-10T16:45:00', updatedAt: '2026-02-10T16:45:00',
    supportVotes: 0, rejectVotes: 0, totalEligibleVoters: 60,
    aiSentiment: 'Low', aiToxicity: false, aiRiskScore: 25, aiDuplicate: false,
    timeline: [
      { id: 't1', action: 'Complaint Submitted', actor: 'Kavitha Nair', timestamp: '2026-02-10T16:45:00' },
    ],
  },
  {
    id: '4', ticketId: 'SUN-2026-0004', studentName: 'Ravi Kumar', rollNumber: '21B01A0401',
    department: 'Electronics & Communication Engineering', year: '4th', category: 'Exam/Marks Issue',
    title: 'Exam Answer Sheet Not Evaluated Properly',
    description: 'My answer sheet for the mid-semester exam in Digital Signal Processing was not evaluated properly. I answered all 5 questions, but marks were given only for 3 answers. When I approached the faculty, they dismissed me saying the answers were incorrect, but I have screenshots of the textbook references. Requesting re-evaluation.',
    anonymous: false, urgency: 'Medium', status: 'Resolved',
    createdAt: '2026-01-15T12:00:00', updatedAt: '2026-02-01T10:00:00',
    supportVotes: 12, rejectVotes: 8, totalEligibleVoters: 75,
    aiSentiment: 'Moderate', aiToxicity: false, aiRiskScore: 40, aiDuplicate: true,
    timeline: [
      { id: 't1', action: 'Complaint Submitted', actor: 'Ravi Kumar', timestamp: '2026-01-15T12:00:00' },
      { id: 't2', action: 'Assigned to Faculty', actor: 'HOD', timestamp: '2026-01-16T09:00:00' },
      { id: 't3', action: 'Re-evaluation completed. Marks updated.', actor: 'Faculty', timestamp: '2026-02-01T10:00:00' },
    ],
  },
  {
    id: '5', ticketId: 'SUN-2026-0005', studentName: 'Sneha Patel', rollNumber: '22B01A0218',
    department: 'Mechanical Engineering', year: '3rd', category: 'Administration Delay',
    title: 'Scholarship Amount Not Credited for 3 Months',
    description: 'My government scholarship amount has not been credited for the past 3 months. The administration office keeps saying they will look into it but no action has been taken. This is causing financial difficulties and I may not be able to continue my studies if this is not resolved immediately.',
    anonymous: false, urgency: 'High', status: 'Under Investigation',
    createdAt: '2026-02-05T09:30:00', updatedAt: '2026-02-09T15:00:00',
    supportVotes: 8, rejectVotes: 0, totalEligibleVoters: 80,
    aiSentiment: 'High Risk', aiToxicity: false, aiRiskScore: 75, aiDuplicate: false,
    timeline: [
      { id: 't1', action: 'Complaint Submitted', actor: 'Sneha Patel', timestamp: '2026-02-05T09:30:00' },
      { id: 't2', action: 'Forwarded to Accounts Department', actor: 'Admin', timestamp: '2026-02-06T10:00:00' },
      { id: 't3', action: 'Under Investigation by Accounts', actor: 'Accounts', timestamp: '2026-02-09T15:00:00' },
    ],
  },
];

export const MOCK_STATS: DashboardStats = {
  total: 47,
  pending: 12,
  resolved: 23,
  escalated: 5,
  underReview: 7,
};

export const DEPARTMENT_STATS = [
  { department: 'CSE', complaints: 15, resolved: 10 },
  { department: 'CSE (DS)', complaints: 8, resolved: 5 },
  { department: 'CSE (AI/ML)', complaints: 7, resolved: 4 },
  { department: 'ECE', complaints: 6, resolved: 4 },
  { department: 'ME', complaints: 5, resolved: 3 },
  { department: 'CE', complaints: 4, resolved: 2 },
  { department: 'MBA', complaints: 2, resolved: 1 },
];

export const MONTHLY_STATS = [
  { month: 'Sep', submitted: 5, resolved: 3 },
  { month: 'Oct', submitted: 8, resolved: 6 },
  { month: 'Nov', submitted: 6, resolved: 5 },
  { month: 'Dec', submitted: 4, resolved: 4 },
  { month: 'Jan', submitted: 12, resolved: 7 },
  { month: 'Feb', submitted: 12, resolved: 4 },
];

export const GGC_MEMBERS = [
  { name: 'Dr. S. Sai Satyanarayana Reddy', role: 'Chairperson / Principal', phone: '+91 9100144055', email: 'principal@kgr.ac.in' },
  { name: 'Dr. M. N. Narsaiah', role: 'Vice Principal', email: 'narsaiah@kgr.ac.in' },
  { name: 'Dr. L. Jayahari', role: 'Dean – R&D', email: 'jayahari@kgr.ac.in' },
  { name: 'Dr. M. Madhusoodhanan Nair', role: 'Dean – First Year & IQAC', email: 'nair@kgr.ac.in' },
  { name: 'Dr. L. V. Reddy', role: 'HOD – CSE (DS)', email: 'lvreddy@kgr.ac.in' },
  { name: 'Dr. Bharath Reddy', role: 'HOD – CSE', email: 'bharath@kgr.ac.in' },
  { name: 'Dr. Sowjanya Ramisetty', role: 'HOD – CSE (AI & ML)', email: 'sowjanya@kgr.ac.in' },
  { name: 'Dr. Sowmya S. Singha', role: 'HOD – Civil Engineering', email: 'sowmya@kgr.ac.in' },
  { name: 'Mrs. Chandana CH', role: 'HOD – MBA', email: 'chandana@kgr.ac.in' },
  { name: 'Mr. A. Saida', role: 'Dept. of ECE', email: 'saida@kgr.ac.in' },
  { name: 'Mrs. K. Udaya Sree', role: 'Dept. of ME', email: 'udayasree@kgr.ac.in' },
  { name: 'Mr. B. Ravi Kiran Reddy', role: 'Office Superintendent', email: 'ravikiran@kgr.ac.in' },
  { name: 'Ms. Kaveri', role: 'Physical Director', email: 'kaveri@kgr.ac.in' },
  { name: 'Inspector of Police – Moinabad', role: 'External Oversight', email: 'N/A' },
];
