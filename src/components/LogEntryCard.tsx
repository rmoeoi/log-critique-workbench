import { ChatbotLogEntry } from '@/types/chatbot';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageSquare, AlertTriangle, CheckCircle, Clock, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogEntryCardProps {
  entry: ChatbotLogEntry;
  onViewDetails: (entry: ChatbotLogEntry) => void;
}

const getStatusConfig = (status: ChatbotLogEntry['status']) => {
  switch (status) {
    case 'approved':
      return {
        color: 'success',
        icon: CheckCircle,
        label: 'Approved'
      };
    case 'flagged':
      return {
        color: 'destructive',
        icon: AlertTriangle,
        label: 'Flagged'
      };
    case 'needs_review':
      return {
        color: 'warning',
        icon: Clock,
        label: 'Needs Review'
      };
    case 'unreviewed':
      return {
        color: 'secondary',
        icon: MessageSquare,
        label: 'Unreviewed'
      };
    default:
      return {
        color: 'secondary',
        icon: MessageSquare,
        label: 'Unknown'
      };
  }
};

const getConfidenceColor = (score: number) => {
  if (score >= 0.8) return 'text-success';
  if (score >= 0.6) return 'text-warning';
  return 'text-destructive';
};

export function LogEntryCard({ entry, onViewDetails }: LogEntryCardProps) {
  const statusConfig = getStatusConfig(entry.status);
  const StatusIcon = statusConfig.icon;
  
  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <StatusIcon className={cn("h-4 w-4", `text-${statusConfig.color}`)} />
            <Badge variant={statusConfig.color as any} className="text-xs">
              {statusConfig.label}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {new Date(entry.timestamp).toLocaleDateString()} {new Date(entry.timestamp).toLocaleTimeString()}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className={cn("text-sm font-medium", getConfidenceColor(entry.confidence_score))}>
              {Math.round(entry.confidence_score * 100)}%
            </span>
            <Button variant="outline" size="sm" onClick={() => onViewDetails(entry)}>
              <Eye className="h-3 w-3 mr-1" />
              View
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-foreground mb-1">User Query</p>
            <p className="text-sm text-muted-foreground line-clamp-2">{entry.user_query}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground mb-1">Bot Response</p>
            <p className="text-sm text-muted-foreground line-clamp-3">{entry.bot_response}</p>
          </div>
          {entry.commentary && (
            <div className="bg-muted/50 rounded-md p-2">
              <p className="text-xs font-medium text-foreground mb-1">Reviewer Commentary</p>
              <p className="text-xs text-muted-foreground">{entry.commentary}</p>
            </div>
          )}
          <div className="flex items-center gap-2 flex-wrap">
            {entry.category && (
              <Badge variant="outline" className="text-xs">
                {entry.category.replace('_', ' ')}
              </Badge>
            )}
            {entry.tags?.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {entry.tags && entry.tags.length > 3 && (
              <span className="text-xs text-muted-foreground">+{entry.tags.length - 3} more</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}