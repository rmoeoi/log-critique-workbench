import { useState } from 'react';
import { FilterOptions } from '@/types/chatbot';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Search, Filter, X, MapPin } from 'lucide-react';

interface LogFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  totalCount: number;
  filteredCount: number;
}

export function LogFilters({ filters, onFiltersChange, totalCount, filteredCount }: LogFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleStatusFilter = (status: string) => {
    const currentStatuses = filters.status || [];
    const newStatuses = currentStatuses.includes(status)
      ? currentStatuses.filter(s => s !== status)
      : [...currentStatuses, status];
    
    onFiltersChange({ ...filters, status: newStatuses });
  };

  const handleCategoryFilter = (category: string) => {
    const currentCategories = filters.category || [];
    const newCategories = currentCategories.includes(category)
      ? currentCategories.filter(c => c !== category)
      : [...currentCategories, category];
    
    onFiltersChange({ ...filters, category: newCategories });
  };

  const handleChatbotSourceFilter = (source: string) => {
    const currentSources = filters.chatbot_source || [];
    const newSources = currentSources.includes(source)
      ? currentSources.filter(s => s !== source)
      : [...currentSources, source];
    
    onFiltersChange({ ...filters, chatbot_source: newSources });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters = Object.keys(filters).some(key => {
    const value = filters[key as keyof FilterOptions];
    return value && (Array.isArray(value) ? value.length > 0 : true);
  });

  

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Filter className="h-4 w-4" />
            Filters
          </CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {filteredCount} of {totalCount} entries
            </span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Collapse' : 'Expand'}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 text-muted-foreground transform -translate-y-1/2" />
          <Input
            placeholder="Search queries and responses..."
            value={filters.search || ''}
            onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
            className="pl-9"
          />
        </div>

        {/* Quick Status Filters */}
        <div className="flex flex-wrap gap-2">
          {['unreviewed', 'flagged', 'needs_review', 'approved'].map((status) => (
            <Badge
              key={status}
              variant={filters.status?.includes(status) ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => handleStatusFilter(status)}
            >
              {status.replace('_', ' ')}
            </Badge>
          ))}
        </div>

        {isExpanded && (
          <div className="space-y-4 pt-2 border-t">
            {/* Chatbot Source Filter */}
            <div>
              <Label className="text-sm font-medium mb-2 flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                Chatbot Source
              </Label>
              <div className="flex flex-wrap gap-2">
                {['Kenya', 'Uganda', 'Malawi'].map((source) => (
                  <Badge
                    key={source}
                    variant={filters.chatbot_source?.includes(source) ? 'default' : 'outline'}
                    className="cursor-pointer text-xs"
                    onClick={() => handleChatbotSourceFilter(source)}
                  >
                    {source}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <Label className="text-sm font-medium mb-2 block">Categories</Label>
              <div className="flex flex-wrap gap-2">
                {['crop_management', 'pest_disease', 'fertilizer_advice', 'market_access', 'market_prices', 'government_support'].map((category) => (
                  <Badge
                    key={category}
                    variant={filters.category?.includes(category) ? 'default' : 'outline'}
                    className="cursor-pointer text-xs"
                    onClick={() => handleCategoryFilter(category)}
                  >
                    {category.replace('_', ' ')}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={clearFilters}
            className="w-full"
          >
            <X className="h-3 w-3 mr-1" />
            Clear All Filters
          </Button>
        )}
      </CardContent>
    </Card>
  );
}