import { Complaint, DashboardStats } from './types';

export const MOCK_COMPLAINTS: Complaint[] = [
  {
    id: '1', ticketId: 'SUN-2026-0001', studentName: 'Kaushik', rollNumber: '24QM1A05P8',
    department: 'Computer Science & Engineering', year: '3rd', category: 'Academic Issue',
    title: 'Unfair Internal Marks Distribution in DBMS',
    description: 'The internal marks for DBMS subject were distributed without transparency. Several students who attended all classes and submitted assignments on time received lower marks than those who did not. There was no rubric shared beforehand and the faculty refused to show the breakdown when asked. This is affecting the overall GPA of sincere students.',
    anonymous: false, urgency: 'High', status: 'Community Review',
    createdAt: '2026-02-01T10:30:00', updatedAt: '2026-02-05T14:20:00',
    supportVotes: 24, rejectVotes: 3, totalEligibleVoters: 120,
    votingDeadline: '2026-02-19T10:30:00',
    aiSentiment: 'Moderate', aiToxicity: false, aiRiskScore: 62, aiDuplicate: false,
    timeline: [
      { id: 't1', action: 'Complaint Submitted', actor: 'Kaushik', timestamp: '2026-02-01T10:30:00' },
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
      { id: 't2', action: 'Community Voting Completed – 96% Support', actor: 'System', timestamp: '2026-02-05T08:15:00' },
      { id: 't3', action: 'Escalated to Grievance Committee', actor: 'System', timestamp: '2026-02-08T11:00:00' },
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

// Faculty-specific complaints (complaints related to faculty members)
export const FACULTY_COMPLAINTS: Complaint[] = [
  {
    id: 'f1', ticketId: 'SUN-2026-0010', studentName: 'Anonymous', rollNumber: 'HIDDEN',
    department: 'Computer Science & Engineering', year: '2nd', category: 'Faculty Misconduct',
    title: 'Faculty Not Following Syllabus Schedule',
    description: 'The faculty member teaching Data Structures has deviated significantly from the syllabus schedule. Over 40% of the syllabus remains uncovered with only 3 weeks left before exams. Students are concerned about exam preparation as the topics covered in class do not align with the university question paper pattern.',
    anonymous: true, urgency: 'Medium', status: 'Pending Review',
    createdAt: '2026-02-08T11:00:00', updatedAt: '2026-02-08T11:00:00',
    supportVotes: 0, rejectVotes: 0, totalEligibleVoters: 65,
    aiSentiment: 'Moderate', aiToxicity: false, aiRiskScore: 45, aiDuplicate: false,
    timeline: [
      { id: 't1', action: 'Complaint Submitted (Anonymous)', actor: 'Anonymous', timestamp: '2026-02-08T11:00:00' },
    ],
  },
  {
    id: 'f2', ticketId: 'SUN-2026-0011', studentName: 'Meera Joshi', rollNumber: '22B01A0509',
    department: 'Computer Science & Engineering', year: '3rd', category: 'Academic Issue',
    title: 'Late Assignment Grading – No Feedback Given',
    description: 'Assignment submissions for Software Engineering were collected 6 weeks ago but no marks or feedback have been returned. When students inquired, the faculty said they are busy. This delays our ability to improve in subsequent assignments and impacts internal marks calculation.',
    anonymous: false, urgency: 'Low', status: 'Under Investigation',
    createdAt: '2026-02-03T14:00:00', updatedAt: '2026-02-10T09:00:00',
    supportVotes: 5, rejectVotes: 1, totalEligibleVoters: 70,
    aiSentiment: 'Low', aiToxicity: false, aiRiskScore: 30, aiDuplicate: false,
    timeline: [
      { id: 't1', action: 'Complaint Submitted', actor: 'Meera Joshi', timestamp: '2026-02-03T14:00:00' },
      { id: 't2', action: 'Forwarded to Faculty for Response', actor: 'HOD – CSE', timestamp: '2026-02-10T09:00:00' },
    ],
  },
  {
    id: 'f3', ticketId: 'SUN-2026-0012', studentName: 'Anonymous', rollNumber: 'HIDDEN',
    department: 'Computer Science & Engineering', year: '3rd', category: 'Faculty Misconduct',
    title: 'Discrimination in Lab Viva Evaluation',
    description: 'During the Operating Systems lab viva, certain students were asked significantly easier questions while others were grilled on advanced topics. There appears to be bias in evaluation. Multiple students have noticed this pattern across several viva sessions this semester.',
    anonymous: true, urgency: 'High', status: 'Community Review',
    createdAt: '2026-01-28T09:30:00', updatedAt: '2026-02-06T12:00:00',
    supportVotes: 32, rejectVotes: 5, totalEligibleVoters: 70,
    votingDeadline: '2026-02-20T09:30:00',
    aiSentiment: 'High Risk', aiToxicity: false, aiRiskScore: 72, aiDuplicate: false,
    timeline: [
      { id: 't1', action: 'Complaint Submitted (Anonymous)', actor: 'Anonymous', timestamp: '2026-01-28T09:30:00' },
      { id: 't2', action: 'Marked for Community Review', actor: 'Dr. Bharath Reddy', timestamp: '2026-02-06T12:00:00' },
    ],
  },
];

// HOD-specific complaints (department-level issues, different from faculty complaints)
export const HOD_COMPLAINTS: Complaint[] = [
  {
    id: 'h1', ticketId: 'SUN-2026-0020', studentName: 'Priya Sharma', rollNumber: '22B01A0612',
    department: 'CSE (AI & ML)', year: '2nd', category: 'Infrastructure',
    title: 'AI Lab Computers Running Outdated Software',
    description: 'The AI & ML lab computers are running Python 3.6 and TensorFlow 1.x which are severely outdated. Students cannot run modern deep learning frameworks. Lab exercises from the textbook require Python 3.10+ and PyTorch 2.0. This is hindering practical learning in the department.',
    anonymous: false, urgency: 'High', status: 'Under Investigation',
    createdAt: '2026-02-04T10:00:00', updatedAt: '2026-02-07T14:00:00',
    supportVotes: 18, rejectVotes: 0, totalEligibleVoters: 60,
    aiSentiment: 'Moderate', aiToxicity: false, aiRiskScore: 55, aiDuplicate: false,
    timeline: [
      { id: 't1', action: 'Complaint Submitted', actor: 'Priya Sharma', timestamp: '2026-02-04T10:00:00' },
      { id: 't2', action: 'Forwarded to IT Department', actor: 'HOD – CSE (AI&ML)', timestamp: '2026-02-07T14:00:00' },
    ],
  },
  {
    id: 'h2', ticketId: 'SUN-2026-0021', studentName: 'Vikram Rao', rollNumber: '23B01A0508',
    department: 'Computer Science & Engineering', year: '2nd', category: 'Academic Issue',
    title: 'Timetable Clash Between Core Subjects',
    description: 'There is a timetable clash between Computer Networks and Database Management System labs for Section B. Both are scheduled on Wednesday 2-5 PM. Students have been shuttling between labs for 3 weeks. The timetable committee has not responded to emails.',
    anonymous: false, urgency: 'Medium', status: 'Pending Review',
    createdAt: '2026-02-09T08:30:00', updatedAt: '2026-02-09T08:30:00',
    supportVotes: 0, rejectVotes: 0, totalEligibleVoters: 65,
    aiSentiment: 'Moderate', aiToxicity: false, aiRiskScore: 48, aiDuplicate: false,
    timeline: [
      { id: 't1', action: 'Complaint Submitted', actor: 'Vikram Rao', timestamp: '2026-02-09T08:30:00' },
    ],
  },
  {
    id: 'h3', ticketId: 'SUN-2026-0022', studentName: 'Anonymous', rollNumber: 'HIDDEN',
    department: 'Computer Science & Engineering', year: '4th', category: 'Administration Delay',
    title: 'Placement Cell Not Sharing Interview Schedules on Time',
    description: 'The placement cell is sharing company interview schedules with less than 12 hours notice. Several final-year students have missed opportunities because they could not prepare on such short notice. Some companies visited without any prior announcement on the department notice board.',
    anonymous: true, urgency: 'High', status: 'Community Review',
    createdAt: '2026-01-30T07:00:00', updatedAt: '2026-02-05T10:00:00',
    supportVotes: 38, rejectVotes: 4, totalEligibleVoters: 85,
    votingDeadline: '2026-02-18T07:00:00',
    aiSentiment: 'High Risk', aiToxicity: false, aiRiskScore: 70, aiDuplicate: false,
    timeline: [
      { id: 't1', action: 'Complaint Submitted (Anonymous)', actor: 'Anonymous', timestamp: '2026-01-30T07:00:00' },
      { id: 't2', action: 'Marked for Community Review', actor: 'Dr. L Raghu Kumar', timestamp: '2026-02-05T10:00:00' },
    ],
  },
  {
    id: 'h4', ticketId: 'SUN-2026-0023', studentName: 'Aditya Verma', rollNumber: '22B01A0503',
    department: 'Computer Science & Engineering', year: '3rd', category: 'Others',
    title: 'No Wi-Fi Access in Hostel Block D',
    description: 'Hostel Block D has had no Wi-Fi connectivity for over a month. Students staying in this block cannot access online learning resources, submit assignments, or attend online sessions. The issue has been reported to the IT department multiple times with no resolution.',
    anonymous: false, urgency: 'Medium', status: 'Resolved',
    createdAt: '2026-01-20T18:00:00', updatedAt: '2026-02-03T16:00:00',
    supportVotes: 22, rejectVotes: 1, totalEligibleVoters: 50,
    aiSentiment: 'Low', aiToxicity: false, aiRiskScore: 35, aiDuplicate: false,
    timeline: [
      { id: 't1', action: 'Complaint Submitted', actor: 'Aditya Verma', timestamp: '2026-01-20T18:00:00' },
      { id: 't2', action: 'Assigned to IT Department', actor: 'HOD – CSE', timestamp: '2026-01-21T09:00:00' },
      { id: 't3', action: 'Wi-Fi router replaced and connectivity restored', actor: 'IT Dept', timestamp: '2026-02-03T16:00:00' },
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
  { name: 'Dr. L Raghu Kumar', role: 'HOD – CSE', email: 'raghu@kgr.ac.in' },
  { name: 'Dr. Sowjanya Ramisetty', role: 'HOD – CSE (AI & ML)', email: 'sowjanya@kgr.ac.in' },
  { name: 'Dr. Sowmya S. Singha', role: 'HOD – Civil Engineering', email: 'sowmya@kgr.ac.in' },
  { name: 'Mrs. Chandana CH', role: 'HOD – MBA', email: 'chandana@kgr.ac.in' },
  { name: 'Mr. A. Saida', role: 'Dept. of ECE', email: 'saida@kgr.ac.in' },
  { name: 'Mrs. K. Udaya Sree', role: 'Dept. of ME', email: 'udayasree@kgr.ac.in' },
  { name: 'Mr. B. Ravi Kiran Reddy', role: 'Office Superintendent', email: 'ravikiran@kgr.ac.in' },
  { name: 'Ms. Kaveri', role: 'Physical Director', email: 'kaveri@kgr.ac.in' },
  { name: 'Inspector of Police – Moinabad', role: 'External Oversight', email: 'N/A' },
];

// All complaints combined for admin/principal view
export const ALL_COMPLAINTS = [...MOCK_COMPLAINTS, ...FACULTY_COMPLAINTS, ...HOD_COMPLAINTS];

// Major complaints only (High urgency or High Risk AI sentiment or escalated) for ombudsman
export const OMBUDSMAN_COMPLAINTS = ALL_COMPLAINTS.filter(
  c => c.urgency === 'High' || c.aiSentiment === 'High Risk' || c.status === 'Escalated'
);
