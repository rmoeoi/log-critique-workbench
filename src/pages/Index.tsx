import { useState, useMemo } from 'react';
import { ChatbotLogEntry, FilterOptions } from '@/types/chatbot';
import { mockChatbotLogs } from '@/data/mockData';
import { ConversationCard } from '@/components/ConversationCard';
import { ConversationDetail } from '@/components/ConversationDetail';
import { LogFilters } from '@/components/LogFilters';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { BarChart3, MessageSquare, AlertTriangle, CheckCircle, Clock, RefreshCw, Flag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [logs, setLogs] = useState<ChatbotLogEntry[]>(mockChatbotLogs);
  const [selectedEntry, setSelectedEntry] = useState<ChatbotLogEntry | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({});
  const { toast } = useToast();

  // Filter logs based on current filters
  const filteredLogs = useMemo(() => {
    return logs.filter(log => {
      // Status filter
      if (filters.status && filters.status.length > 0) {
        if (!filters.status.includes(log.status)) return false;
      }

      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        if (
          !log.user_query.toLowerCase().includes(searchTerm) &&
          !log.user_query_english.toLowerCase().includes(searchTerm) &&
          !log.bot_response.toLowerCase().includes(searchTerm) &&
          !log.bot_response_english.toLowerCase().includes(searchTerm) &&
          !log.commentary?.toLowerCase().includes(searchTerm)
        ) {
          return false;
        }
      }

      // Category filter
      if (filters.category && filters.category.length > 0) {
        if (!log.category || !filters.category.includes(log.category)) return false;
      }

      // Chatbot source filter
      if (filters.chatbot_source && filters.chatbot_source.length > 0) {
        if (!filters.chatbot_source.includes(log.chatbot_source)) return false;
      }

      return true;
    });
  }, [logs, filters]);

  // Statistics
  const stats = useMemo(() => {
    const total = logs.length;
    const unreviewed = logs.filter(l => l.status === 'unreviewed').length;
    const flagged = logs.filter(l => l.status === 'flagged').length;
    const needsReview = logs.filter(l => l.status === 'needs_review').length;
    const approved = logs.filter(l => l.status === 'approved').length;
    const triaged = logs.filter(l => l.status === 'triaged').length;
    const reviewed = logs.filter(l => l.commentary).length;

    return { total, unreviewed, flagged, needsReview, approved, triaged, reviewed };
  }, [logs]);

  const handleSelectEntry = (entry: ChatbotLogEntry) => {
    setSelectedEntry(entry);
  };

  const handleSaveEntry = (updatedEntry: ChatbotLogEntry) => {
    setLogs(prev => prev.map(log => 
      log.id === updatedEntry.id ? updatedEntry : log
    ));
    setSelectedEntry(updatedEntry);
    toast({
      title: "Entry Updated",
      description: "The conversation entry has been successfully updated.",
    });
  };

  const handleTriage = (entry: ChatbotLogEntry) => {
    const updatedEntry = { ...entry, status: 'triaged' as const };
    handleSaveEntry(updatedEntry);
    toast({
      title: "Entry Triaged",
      description: "The conversation has been marked for triage.",
    });
  };

  const handleNext = () => {
    if (!selectedEntry) return;
    const currentIndex = filteredLogs.findIndex(log => log.id === selectedEntry.id);
    if (currentIndex < filteredLogs.length - 1) {
      setSelectedEntry(filteredLogs[currentIndex + 1]);
    }
  };

  const handlePrevious = () => {
    if (!selectedEntry) return;
    const currentIndex = filteredLogs.findIndex(log => log.id === selectedEntry.id);
    if (currentIndex > 0) {
      setSelectedEntry(filteredLogs[currentIndex - 1]);
    }
  };

  const handleRefresh = () => {
    // In a real app, this would fetch new data from the API
    toast({
      title: "Data Refreshed",
      description: "Latest conversation data has been loaded.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Agricultural Chatbot Log Dashboard</h1>
                <p className="text-muted-foreground">Review and analyze agricultural chatbot conversations</p>
              </div>
            </div>
            <Button onClick={handleRefresh} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-7 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="text-lg font-semibold">{stats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Unreviewed</p>
                  <p className="text-lg font-semibold">{stats.unreviewed}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                <div>
                  <p className="text-sm text-muted-foreground">Flagged</p>
                  <p className="text-lg font-semibold text-destructive">{stats.flagged}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-warning" />
                <div>
                  <p className="text-sm text-muted-foreground">Needs Review</p>
                  <p className="text-lg font-semibold text-warning">{stats.needsReview}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <div>
                  <p className="text-sm text-muted-foreground">Approved</p>
                  <p className="text-lg font-semibold text-success">{stats.approved}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Flag className="h-4 w-4 text-secondary" />
                <div>
                  <p className="text-sm text-muted-foreground">Triaged</p>
                  <p className="text-lg font-semibold text-secondary">{stats.triaged}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <div>
                  <p className="text-sm text-muted-foreground">Reviewed</p>
                  <p className="text-lg font-semibold text-success">{stats.reviewed}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content - Two Pane Layout */}
        <div className="h-[calc(100vh-320px)]">
          <ResizablePanelGroup direction="horizontal" className="border rounded-lg">
            {/* Left Panel - Card List */}
            <ResizablePanel defaultSize={35} minSize={25}>
              <div className="h-full flex flex-col">
                {/* Filters */}
                <div className="p-4 border-b">
                  <LogFilters 
                    filters={filters}
                    onFiltersChange={setFilters}
                    totalCount={logs.length}
                    filteredCount={filteredLogs.length}
                  />
                </div>
                
                {/* Card List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {filteredLogs.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No conversations found</h3>
                        <p className="text-muted-foreground">
                          Try adjusting your filters to see more results.
                        </p>
                      </div>
                    </div>
                  ) : (
                    filteredLogs.map((entry) => (
                      <ConversationCard 
                        key={entry.id} 
                        entry={entry} 
                        onSelect={handleSelectEntry}
                        onTriage={handleTriage}
                        isSelected={selectedEntry?.id === entry.id}
                      />
                    ))
                  )}
                </div>
              </div>
            </ResizablePanel>
            
            <ResizableHandle withHandle />
            
            {/* Right Panel - Conversation Detail */}
            <ResizablePanel defaultSize={65} minSize={40}>
              <ConversationDetail 
                entry={selectedEntry}
                entries={filteredLogs}
                onSave={handleSaveEntry}
                onNext={handleNext}
                onPrevious={handlePrevious}
                onTriage={handleTriage}
              />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </div>
  );
};

export default Index;