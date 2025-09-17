import { useState, useEffect } from 'react';
import { ChatbotLogEntry } from '@/types/chatbot';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { MessageSquare, AlertTriangle, CheckCircle, Clock, User, Hash, Calendar, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogDetailModalProps {
  entry: ChatbotLogEntry | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (entry: ChatbotLogEntry) => void;
}

const getStatusConfig = (status: ChatbotLogEntry['status']) => {
  switch (status) {
    case 'approved':
      return { color: 'success', icon: CheckCircle, label: 'Approved' };
    case 'flagged':
      return { color: 'destructive', icon: AlertTriangle, label: 'Flagged' };
    case 'needs_review':
      return { color: 'warning', icon: Clock, label: 'Needs Review' };
    case 'unreviewed':
      return { color: 'secondary', icon: MessageSquare, label: 'Unreviewed' };
    default:
      return { color: 'secondary', icon: MessageSquare, label: 'Unknown' };
  }
};

export function LogDetailModal({ entry, isOpen, onClose, onSave }: LogDetailModalProps) {
  const [editedEntry, setEditedEntry] = useState<ChatbotLogEntry | null>(null);

  useEffect(() => {
    if (entry) {
      setEditedEntry({ ...entry });
    }
  }, [entry]);

  if (!entry || !editedEntry) return null;

  const statusConfig = getStatusConfig(entry.status);
  const StatusIcon = statusConfig.icon;

  const handleSave = () => {
    if (editedEntry) {
      onSave(editedEntry);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <StatusIcon className={cn("h-5 w-5", `text-${statusConfig.color}`)} />
            Log Entry Details
            <Badge variant={statusConfig.color as any}>
              {statusConfig.label}
            </Badge>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Metadata */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2">
              <Hash className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">ID</p>
                <p className="text-sm font-mono">{entry.id}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Timestamp</p>
                <p className="text-sm">{new Date(entry.timestamp).toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Chatbot Source</p>
                <p className="text-sm font-semibold">{entry.chatbot_source}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">User ID</p>
                <p className="text-sm font-mono">{entry.context?.user_id || 'Unknown'}</p>
              </div>
            </div>
          </div>

          {/* Conversation */}
          <div className="space-y-4">
            <div>
              <Label className="text-base font-semibold">User Query</Label>
              <div className="mt-2 p-3 bg-muted/30 rounded-md">
                <p className="text-sm">{entry.user_query}</p>
              </div>
            </div>
            
            <div>
              <Label className="text-base font-semibold">Bot Response</Label>
              <div className="mt-2 p-3 bg-primary/5 rounded-md border-l-4 border-primary">
                <p className="text-sm">{entry.bot_response}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Review Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Review & Commentary</h3>
            
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
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={editedEntry.category || ''} 
                  onValueChange={(value) => setEditedEntry({ ...editedEntry, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="crop_management">Crop Management</SelectItem>
                    <SelectItem value="pest_disease">Pest & Disease</SelectItem>
                    <SelectItem value="fertilizer_advice">Fertilizer Advice</SelectItem>
                    <SelectItem value="market_access">Market Access</SelectItem>
                    <SelectItem value="market_prices">Market Prices</SelectItem>
                    <SelectItem value="government_support">Government Support</SelectItem>
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

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}