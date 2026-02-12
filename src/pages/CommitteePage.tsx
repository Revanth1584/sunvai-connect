import { motion } from 'framer-motion';
import { GGC_MEMBERS } from '@/lib/mock-data';
import { Users, Mail, Shield } from 'lucide-react';

const CommitteePage = () => {
  return (
    <div className="space-y-6">
      <div className="glass-card rounded-xl p-5">
        <h2 className="text-xl font-bold font-display text-foreground flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" /> Governing Grievance Committee (GGC)
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          KG Reddy College of Engineering & Technology, Hyderabad
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {GGC_MEMBERS.map((member, i) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card rounded-xl p-5 hover-glow"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-xs flex-shrink-0">
                {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-foreground text-sm">{member.name}</p>
                <p className="text-xs text-primary font-medium mt-0.5">{member.role}</p>
                {member.email !== 'N/A' && (
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1 truncate">
                    <Mail className="h-3 w-3" /> {member.email}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CommitteePage;
