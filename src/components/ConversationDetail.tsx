import { useState, useEffect } from 'react';
import { ChatbotLogEntry, ConversationMessage } from '@/types/chatbot';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  MessageSquare, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  User, 
  Bot, 
  ThumbsUp, 
  ThumbsDown,
  ChevronLeft,
  ChevronRight,
  Flag,
  Mic,
  Image as ImageIcon,
  Play,
  Volume2
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ConversationDetailProps {
  entry: ChatbotLogEntry | null;
  entries: ChatbotLogEntry[];
  onSave: (entry: ChatbotLogEntry) => void;
  onNext: () => void;
  onPrevious: () => void;
  onTriage: (entry: ChatbotLogEntry) => void;
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

export function ConversationDetail({ 
  entry, 
  entries, 
  onSave, 
  onNext, 
  onPrevious, 
  onTriage 
}: ConversationDetailProps) {
  const [editedEntry, setEditedEntry] = useState<ChatbotLogEntry | null>(null);
  const [showConversationHistory, setShowConversationHistory] = useState(false);

  useEffect(() => {
    if (entry) {
      setEditedEntry({ ...entry });
    }
  }, [entry]);

  if (!entry || !editedEntry) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        <div className="text-center">
          <MessageSquare className="h-12 w-12 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Conversation Selected</h3>
          <p>Select a conversation from the left panel to view details</p>
        </div>
      </div>
    );
  }

  const statusConfig = getStatusConfig(entry.status);
  const StatusIcon = statusConfig.icon;
  const currentIndex = entries.findIndex(e => e.id === entry.id);

  const handleSave = () => {
    if (editedEntry) {
      onSave(editedEntry);
    }
  };

  const handleThumbsToggle = (type: 'up' | 'down') => {
    if (!editedEntry) return;
    
    if (type === 'up') {
      setEditedEntry({
        ...editedEntry,
        thumbs_up: !editedEntry.thumbs_up,
        thumbs_down: editedEntry.thumbs_up ? editedEntry.thumbs_down : false
      });
    } else {
      setEditedEntry({
        ...editedEntry,
        thumbs_down: !editedEntry.thumbs_down,
        thumbs_up: editedEntry.thumbs_down ? editedEntry.thumbs_up : false
      });
    }
  };

  return (
    <div className="h-full flex flex-col bg-card">
      {/* Header */}
      <div className="p-6 border-b">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <StatusIcon className={cn("h-5 w-5", `text-${statusConfig.color}`)} />
            <h2 className="text-xl font-semibold">Conversation Detail</h2>
            <Badge variant={statusConfig.color as any}>
              {statusConfig.label}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {currentIndex + 1} of {entries.length}
            </span>
          </div>
        </div>

        {/* Metadata */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg">
          <div>
            <p className="text-xs text-muted-foreground">Source</p>
            <p className="text-sm font-medium">{entry.chatbot_source}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Question Type</p>
            <p className="text-sm font-medium">{entry.question_type}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Answer Type</p>
            <p className="text-sm font-medium">{entry.answer_type}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Language</p>
            <p className="text-sm font-medium">{entry.original_language.toUpperCase()}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Conversation History Toggle */}
        <Button
          variant="outline"
          onClick={() => setShowConversationHistory(!showConversationHistory)}
        >
          {showConversationHistory ? 'Hide' : 'Show'} Conversation History ({entry.conversation_history.length} messages)
        </Button>

        {/* Conversation History */}
        {showConversationHistory && (
          <div className="space-y-3 p-4 bg-muted/20 rounded-lg">
            <h4 className="font-semibold">Full Conversation</h4>
            {entry.conversation_history.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3 p-3 rounded-lg",
                  message.type === 'user' ? "bg-primary/10" : "bg-muted/50"
                )}
              >
                {message.type === 'user' ? (
                  <User className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                ) : (
                  <Bot className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
                )}
                <div className="space-y-1 flex-1">
                  <div className="text-xs text-muted-foreground">
                    {message.type === 'user' ? 'User' : 'Assistant'} • {new Date(message.timestamp).toLocaleTimeString()}
                  </div>
                  <p className="text-sm">{message.content_english}</p>
                  {message.content_original !== message.content_english && (
                    <p className="text-sm text-muted-foreground italic">
                      Original ({message.language}): {message.content_original}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Current Q&A Pair */}
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold flex items-center gap-2">
                <User className="h-4 w-4" />
                User Message
              </Label>
              <div className="flex items-center gap-1">
                {entry.audio_url && (
                  <Button variant="outline" size="sm">
                    <Play className="h-3 w-3 mr-1" />
                    Play Audio
                  </Button>
                )}
                {entry.image_url && (
                  <Button variant="outline" size="sm">
                    <ImageIcon className="h-3 w-3 mr-1" />
                    View Image
                  </Button>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="p-3 bg-primary/5 rounded-md border-l-4 border-primary">
                <p className="text-sm font-medium">English</p>
                <p className="text-sm">{entry.user_query_english}</p>
              </div>
              {entry.user_query !== entry.user_query_english && (
                <div className="p-3 bg-muted/30 rounded-md">
                  <p className="text-sm font-medium">Original ({entry.original_language.toUpperCase()})</p>
                  <p className="text-sm">{entry.user_query}</p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold flex items-center gap-2">
                <Bot className="h-4 w-4" />
                Assistant Message
              </Label>
              <div className="flex items-center gap-2">
                <Button
                  variant={editedEntry.thumbs_up ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleThumbsToggle('up')}
                >
                  <ThumbsUp className="h-3 w-3" />
                </Button>
                <Button
                  variant={editedEntry.thumbs_down ? "destructive" : "outline"}
                  size="sm"
                  onClick={() => handleThumbsToggle('down')}
                >
                  <ThumbsDown className="h-3 w-3" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="p-3 bg-success/5 rounded-md border-l-4 border-success">
                <p className="text-sm font-medium">English</p>
                <p className="text-sm">{entry.bot_response_english}</p>
              </div>
              {entry.bot_response !== entry.bot_response_english && (
                <div className="p-3 bg-muted/30 rounded-md">
                  <p className="text-sm font-medium">Original ({entry.original_language.toUpperCase()})</p>
                  <p className="text-sm">{entry.bot_response}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <Separator />

        {/* Expert Review Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Expert Review</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="status">Status</Label>
              <Select 
                value={editedEntry.status} 
                onValueChange={(value: ChatbotLogEntry['status']) => 
                  setEditedEntry({ ...editedEntry, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unreviewed">Unreviewed</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="flagged">Flagged</SelectItem>
                  <SelectItem value="needs_review">Needs Review</SelectItem>
                  <SelectItem value="triaged">Triaged</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="classification">Classification</Label>
              <Select 
                value={editedEntry.classification || ''} 
                onValueChange={(value) => setEditedEntry({ ...editedEntry, classification: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select classification" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Technical Query">Technical Query</SelectItem>
                  <SelectItem value="Disease Identification">Disease Identification</SelectItem>
                  <SelectItem value="Price Inquiry">Price Inquiry</SelectItem>
                  <SelectItem value="Government Program">Government Program</SelectItem>
                  <SelectItem value="Planting Schedule">Planting Schedule</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="commentary">Commentary</Label>
            <Textarea
              id="commentary"
              placeholder="Add your review commentary here..."
              value={editedEntry.commentary || ''}
              onChange={(e) => setEditedEntry({ ...editedEntry, commentary: e.target.value })}
              className="mt-2"
              rows={4}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 border-t bg-muted/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={onPrevious}
              disabled={currentIndex <= 0}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <Button
              variant="outline"
              onClick={onNext}
              disabled={currentIndex >= entries.length - 1}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => onTriage(editedEntry)}
            >
              <Flag className="h-4 w-4 mr-1" />
              Start Triage
            </Button>
            <Button onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}