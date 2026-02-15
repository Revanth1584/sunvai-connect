import { motion } from 'framer-motion';
import { Scale, BookOpen, Shield, Phone, AlertTriangle, FileText, Users, ChevronRight, ExternalLink } from 'lucide-react';

const sections = [
  {
    icon: Scale,
    title: 'Your Fundamental Rights as a Student',
    color: 'from-emerald-500 to-teal-600',
    items: [
      'Right to fair and transparent evaluation of academic work',
      'Right to be treated with dignity and respect by faculty and staff',
      'Right to access information about grading criteria before assessments',
      'Right to appeal against unfair grades or disciplinary actions',
      'Right to a safe, harassment-free campus environment',
      'Right to access institutional facilities equally',
    ],
  },
  {
    icon: Shield,
    title: 'Anti-Ragging Protection',
    color: 'from-rose-500 to-red-600',
    items: [
      'UGC Regulation on Curbing Menace of Ragging (2009) — ragging is a criminal offence',
      'Punishment includes expulsion, suspension, FIR, and imprisonment up to 3 years',
      'National Anti-Ragging Helpline: 1800-180-5522 (24/7, toll-free)',
      'All institutions must have an Anti-Ragging Committee and Squad',
      'Anonymous complaints are legally valid and protected',
      'Online complaint portal: antiragging.in',
    ],
  },
  {
    icon: BookOpen,
    title: 'UGC & AICTE Guidelines',
    color: 'from-blue-500 to-indigo-600',
    items: [
      'UGC mandates every institution to have a Student Grievance Redressal Cell',
      'AICTE requires a Grievance Committee with student representation',
      'Complaints must be resolved within 30 working days',
      'Students have the right to be heard before any disciplinary action',
      'Institutions must publish the grievance procedure prominently',
      'Internal Complaints Committee (ICC) for sexual harassment cases (as per UGC 2015)',
    ],
  },
  {
    icon: Phone,
    title: 'Emergency Helplines',
    color: 'from-amber-500 to-orange-600',
    items: [
      'Women Helpline: 181 (24/7)',
      'Police Emergency: 112',
      'UGC Grievance Portal: ugc.ac.in/grievance',
      'AICTE Grievance Portal: grievance.aicte-india.org',
      'Cyber Crime Helpline: 1930',
      'Mental Health Helpline (iCall): 9152987821',
    ],
  },
  {
    icon: FileText,
    title: 'How the Grievance Process Works at KGRCET',
    color: 'from-violet-500 to-purple-600',
    items: [
      'Step 1: Submit a complaint via SUNVAI (anonymous or verified)',
      'Step 2: Complaint is reviewed by the respective authority (Faculty/HOD)',
      'Step 3: If escalated, it goes to the Governing Grievance Committee (GGC)',
      'Step 4: Community voting may be initiated for departmental issues',
      'Step 5: Committee reviews evidence and makes a decision',
      'Step 6: Decision is communicated and implemented with a timeline',
    ],
  },
  {
    icon: Users,
    title: 'Your Rights in the Voting System',
    color: 'from-cyan-500 to-sky-600',
    items: [
      'Every verified student gets one vote per complaint',
      'Voting is anonymous — your identity is never revealed',
      'If 60%+ support a complaint, it is auto-escalated to the committee',
      'You cannot be penalized for voting on any complaint',
      'Voting windows are fixed at 7 days for fairness',
      'Anti-manipulation safeguards protect the integrity of every vote',
    ],
  },
];

const KnowYourRightsPage = () => {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-2xl p-8 text-center"
      >
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mx-auto mb-4">
          <Scale className="h-8 w-8 text-primary-foreground" />
        </div>
        <h1 className="text-3xl font-bold font-display text-gradient mb-2">Know Your Rights</h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          As a student of KGRCET, you are protected by national regulations and institutional policies. 
          Understanding your rights empowers you to use the grievance system effectively.
        </p>
      </motion.div>

      {/* Sections Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {sections.map((section, i) => {
          const Icon = section.icon;
          return (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass-card rounded-2xl overflow-hidden"
            >
              <div className={`bg-gradient-to-r ${section.color} px-5 py-4 flex items-center gap-3`}>
                <Icon className="h-5 w-5 text-white" />
                <h2 className="text-sm font-bold text-white">{section.title}</h2>
              </div>
              <div className="p-5 space-y-2.5">
                {section.items.map((item, j) => (
                  <motion.div
                    key={j}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 + j * 0.03 }}
                    className="flex items-start gap-2.5"
                  >
                    <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-foreground leading-relaxed">{item}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* External Links */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="glass-card rounded-2xl p-6"
      >
        <h3 className="font-bold font-display text-foreground mb-4">Useful External Resources</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { label: 'UGC Grievance Portal', url: 'https://www.ugc.ac.in' },
            { label: 'AICTE Grievance', url: 'https://www.aicte-india.org' },
            { label: 'Anti-Ragging Portal', url: 'https://www.antiragging.in' },
            { label: 'National Commission for Women', url: 'https://ncw.nic.in' },
            { label: 'Cyber Crime Portal', url: 'https://cybercrime.gov.in' },
            { label: 'Right to Information', url: 'https://rtionline.gov.in' },
          ].map(link => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-3 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all group"
            >
              <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{link.label}</span>
            </a>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default KnowYourRightsPage;
