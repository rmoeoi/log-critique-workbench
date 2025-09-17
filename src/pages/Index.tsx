import { useState, useMemo } from 'react';
import { ChatbotLogEntry, FilterOptions } from '@/types/chatbot';
import { mockChatbotLogs } from '@/data/mockData';
import { LogEntryCard } from '@/components/LogEntryCard';
import { LogDetailModal } from '@/components/LogDetailModal';
import { LogFilters } from '@/components/LogFilters';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, MessageSquare, AlertTriangle, CheckCircle, Clock, RefreshCw } from 'lucide-react';

const Index = () => {
  const [logs, setLogs] = useState<ChatbotLogEntry[]>(mockChatbotLogs);
  const [selectedEntry, setSelectedEntry] = useState<ChatbotLogEntry | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({});

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
          !log.bot_response.toLowerCase().includes(searchTerm) &&
          !log.commentary?.toLowerCase().includes(searchTerm)
        ) {
          return false;
        }
      }

      // Confidence range filter
      if (filters.confidence_range) {
        const [min, max] = filters.confidence_range;
        if (log.confidence_score < min || log.confidence_score > max) return false;
      }

      // Category filter
      if (filters.category && filters.category.length > 0) {
        if (!log.category || !filters.category.includes(log.category)) return false;
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
    const avgConfidence = logs.reduce((sum, l) => sum + l.confidence_score, 0) / total;

    return { total, unreviewed, flagged, needsReview, approved, avgConfidence };
  }, [logs]);

  const handleViewDetails = (entry: ChatbotLogEntry) => {
    setSelectedEntry(entry);
    setIsModalOpen(true);
  };

  const handleSaveEntry = (updatedEntry: ChatbotLogEntry) => {
    setLogs(prev => prev.map(log => 
      log.id === updatedEntry.id ? updatedEntry : log
    ));
  };

  const handleRefresh = () => {
    // In a real app, this would fetch new data from the API
    console.log('Refreshing data...');
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
                <h1 className="text-2xl font-bold">Chatbot Log Dashboard</h1>
                <p className="text-muted-foreground">Review and analyze chatbot conversations</p>
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
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
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
              <div>
                <p className="text-sm text-muted-foreground">Avg Confidence</p>
                <p className="text-lg font-semibold">{Math.round(stats.avgConfidence * 100)}%</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <LogFilters 
              filters={filters}
              onFiltersChange={setFilters}
              totalCount={logs.length}
              filteredCount={filteredLogs.length}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="space-y-4">
              {filteredLogs.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No logs found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your filters to see more results.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                filteredLogs.map((entry) => (
                  <LogEntryCard 
                    key={entry.id} 
                    entry={entry} 
                    onViewDetails={handleViewDetails}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <LogDetailModal
        entry={selectedEntry}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEntry}
      />
    </div>
  );
};

export default Index;
