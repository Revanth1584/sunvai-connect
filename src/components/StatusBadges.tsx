import { ComplaintStatus, UrgencyLevel } from '@/lib/types';
import { Badge } from '@/components/ui/badge';

export const StatusBadge = ({ status }: { status: ComplaintStatus }) => {
  const classes: Record<ComplaintStatus, string> = {
    'Pending Review': 'status-pending',
    'Under Investigation': 'status-review',
    'Community Review': 'status-review',
    'Escalated': 'status-escalated',
    'Resolved': 'status-resolved',
    'Dismissed': 'bg-muted text-muted-foreground',
  };
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${classes[status]}`}>{status}</span>;
};

export const UrgencyBadge = ({ urgency }: { urgency: UrgencyLevel }) => {
  const classes: Record<UrgencyLevel, string> = {
    Low: 'bg-success/10 text-success',
    Medium: 'bg-warning/10 text-warning',
    High: 'bg-destructive/10 text-destructive',
  };
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${classes[urgency]}`}>{urgency}</span>;
};

export const AIRiskMeter = ({ score }: { score: number }) => {
  const color = score > 70 ? 'bg-destructive' : score > 40 ? 'bg-warning' : 'bg-success';
  return (
    <div className="flex items-center gap-2">
      <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${color} transition-all duration-1000`}
          style={{ width: `${score}%`, '--progress-width': `${score}%` } as React.CSSProperties}
        />
      </div>
      <span className="text-xs font-medium text-muted-foreground">{score}/100</span>
    </div>
  );
};
