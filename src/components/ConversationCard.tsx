import { ChatbotLogEntry } from '@/types/chatbot';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageSquare, AlertTriangle, CheckCircle, Clock, MapPin, Mic, Image, Flag } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ConversationCardProps {
  entry: ChatbotLogEntry;
  onSelect: (entry: ChatbotLogEntry) => void;
  onTriage: (entry: ChatbotLogEntry) => void;
  isSelected?: boolean;
}

const getStatusConfig = (status: ChatbotLogEntry['status']) => {
  switch (status) {
    case 'approved':
      return { color: 'success', icon: CheckCircle, label: 'Approved' };
    case 'flagged':
      return { color: 'destructive', icon: AlertTriangle, label: 'Flagged' };
    case 'needs_review':
      return { color: 'warning', icon: Clock, label: 'Needs Review' };
    case 'triaged':
      return { color: 'secondary', icon: Flag, label: 'Triaged' };
    case 'unreviewed':
      return { color: 'secondary', icon: MessageSquare, label: 'Unreviewed' };
    default:
      return { color: 'secondary', icon: MessageSquare, label: 'Unknown' };
  }
};

export function ConversationCard({ entry, onSelect, onTriage, isSelected = false }: ConversationCardProps) {
  const statusConfig = getStatusConfig(entry.status);
  const StatusIcon = statusConfig.icon;
  
  return (
    <div 
      className={cn(
        "p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md",
        isSelected ? "border-primary bg-primary/5" : "border-border bg-card"
      )}
      onClick={() => onSelect(entry)}
    >
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <StatusIcon className={cn("h-4 w-4", `text-${statusConfig.color}`)} />
            <Badge variant={statusConfig.color as any} className="text-xs">
              {statusConfig.label}
            </Badge>
          </div>
          <div className="flex items-center gap-1">
            {entry.audio_url && (
              <Mic className="h-3 w-3 text-muted-foreground" />
            )}
            {entry.image_url && (
              <Image className="h-3 w-3 text-muted-foreground" />
            )}
          </div>
        </div>

        {/* Source and Timestamp */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            <span>{entry.chatbot_source}</span>
          </div>
          <span>{new Date(entry.timestamp).toLocaleDateString()}</span>
        </div>

        {/* Question Type and Answer Type */}
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs">
            {entry.question_type}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {entry.answer_type}
          </Badge>
        </div>

        {/* User Query */}
        <div>
          <p className="text-sm font-medium text-foreground mb-1">User Query</p>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {entry.user_query_english || entry.user_query}
          </p>
        </div>

        {/* Classification and Review Status */}
        <div className="flex items-center justify-between">
          {entry.classification && (
            <Badge variant="secondary" className="text-xs">
              {entry.classification}
            </Badge>
          )}
          <div className="flex items-center gap-2">
            <span className={cn("text-xs", entry.commentary ? "text-primary" : "text-muted-foreground")}>
              {entry.commentary ? 'Reviewed' : 'No Review'}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onTriage(entry);
              }}
            >
              <Flag className="h-3 w-3 mr-1" />
              Triage
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}