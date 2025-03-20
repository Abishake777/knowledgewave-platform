
import { Check, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
  selectedLevels: string[];
  onLevelChange: (level: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  onClearFilters: () => void;
}

const CategoryFilter = ({
  selectedCategories,
  onCategoryChange,
  selectedLevels,
  onLevelChange,
  priceRange,
  onPriceRangeChange,
  searchQuery,
  onSearchQueryChange,
  onClearFilters,
}: CategoryFilterProps) => {
  const categories = [
    'Web Development',
    'Data Science',
    'Mobile Development',
    'Programming Languages',
    'Game Development',
    'Software Testing',
    'Software Engineering',
    'Development Tools',
    'Business',
    'Finance & Accounting',
    'Design',
    'Marketing',
    'Photography & Video',
    'Music',
    'Health & Fitness',
  ];

  const levels = ['Beginner', 'Intermediate', 'Advanced', 'All Levels'];

  return (
    <div className="w-full bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="p-4">
        <h3 className="font-medium mb-4">Filter Courses</h3>
        
        <div className="space-y-4">
          {/* Search */}
          <div>
            <label htmlFor="search" className="text-sm font-medium mb-1 block">
              Search
            </label>
            <Input
              id="search"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => onSearchQueryChange(e.target.value)}
              className="w-full"
            />
          </div>
          
          {/* Category Filter */}
          <div>
            <label className="text-sm font-medium mb-1 block">
              Category
            </label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-full justify-between"
                >
                  {selectedCategories.length > 0 
                    ? `${selectedCategories.length} selected` 
                    : 'Select categories'}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]">
                <DropdownMenuGroup className="max-h-[250px] overflow-y-auto">
                  {categories.map((category) => (
                    <DropdownMenuItem 
                      key={category}
                      onSelect={(e) => {
                        e.preventDefault();
                        onCategoryChange(category);
                      }}
                      className="flex items-center justify-between cursor-pointer"
                    >
                      {category}
                      {selectedCategories.includes(category) && (
                        <Check className="h-4 w-4 text-primary" />
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {selectedCategories.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedCategories.map((category) => (
                  <Badge 
                    key={category}
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => onCategoryChange(category)}
                  >
                    {category} &times;
                  </Badge>
                ))}
              </div>
            )}
          </div>
          
          {/* Level Filter */}
          <div>
            <label className="text-sm font-medium mb-1 block">
              Level
            </label>
            <div className="flex flex-wrap gap-2">
              {levels.map((level) => (
                <Badge 
                  key={level}
                  variant={selectedLevels.includes(level) ? "default" : "outline"}
                  className={cn(
                    "cursor-pointer",
                    selectedLevels.includes(level) 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-transparent hover:bg-primary/5"
                  )}
                  onClick={() => onLevelChange(level)}
                >
                  {level}
                </Badge>
              ))}
            </div>
          </div>
          
          {/* Price Range */}
          <div>
            <label className="text-sm font-medium mb-1 block">
              Price Range: ${priceRange[0]} - ${priceRange[1]}
            </label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                min="0"
                max="500"
                value={priceRange[0]}
                onChange={(e) => 
                  onPriceRangeChange([
                    Number(e.target.value), 
                    priceRange[1]
                  ])
                }
                className="w-20"
              />
              <span>to</span>
              <Input
                type="number"
                min="0"
                max="500"
                value={priceRange[1]}
                onChange={(e) => 
                  onPriceRangeChange([
                    priceRange[0], 
                    Number(e.target.value)
                  ])
                }
                className="w-20"
              />
            </div>
          </div>
          
          {/* Clear Filters */}
          <Button 
            variant="ghost" 
            className="w-full mt-4"
            onClick={onClearFilters}
          >
            Clear All Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
