import { useState } from 'react';
import { FilterOptions } from '@/types/chatbot';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Search, Filter, X } from 'lucide-react';

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

  const handleConfidenceChange = (value: number[]) => {
    onFiltersChange({ ...filters, confidence_range: [value[0] / 100, value[1] / 100] });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters = Object.keys(filters).some(key => {
    const value = filters[key as keyof FilterOptions];
    return value && (Array.isArray(value) ? value.length > 0 : true);
  });

  const confidenceRange = filters.confidence_range || [0, 1];

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
            {/* Confidence Range */}
            <div>
              <Label className="text-sm font-medium">
                Confidence Range: {Math.round(confidenceRange[0] * 100)}% - {Math.round(confidenceRange[1] * 100)}%
              </Label>
              <div className="mt-2 px-2">
                <Slider
                  value={[confidenceRange[0] * 100, confidenceRange[1] * 100]}
                  onValueChange={handleConfidenceChange}
                  max={100}
                  min={0}
                  step={5}
                  className="w-full"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <Label className="text-sm font-medium mb-2 block">Categories</Label>
              <div className="flex flex-wrap gap-2">
                {['account_support', 'billing', 'technical', 'general_info', 'security', 'data_management'].map((category) => (
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