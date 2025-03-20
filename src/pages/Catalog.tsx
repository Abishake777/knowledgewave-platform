
import { useState, useEffect } from 'react';
import { Filter, SlidersHorizontal, Search, ArrowUpDown } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CourseCard, { CourseProps } from '@/components/CourseCard';
import CategoryFilter from '@/components/CategoryFilter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

// Sample course data
const allCourses: CourseProps[] = [
  {
    id: '1',
    title: 'Complete Web Development Bootcamp 2023',
    instructor: 'Dr. Angela Yu',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2344&q=80',
    price: 89.99,
    rating: 4.7,
    reviewCount: 43520,
    duration: '63 hours',
    level: 'All Levels',
    category: 'Web Development',
  },
  {
    id: '2',
    title: 'Machine Learning A-Z: Hands-On Python & R In Data Science',
    instructor: 'Kirill Eremenko, Hadelin de Ponteves',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    price: 94.99,
    rating: 4.5,
    reviewCount: 15230,
    duration: '44 hours',
    level: 'Intermediate',
    category: 'Data Science',
  },
  {
    id: '3',
    title: 'iOS & Swift - The Complete iOS App Development Bootcamp',
    instructor: 'Dr. Angela Yu',
    image: 'https://images.unsplash.com/photo-1621839673705-6617adf9e890?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2332&q=80',
    price: 99.99,
    rating: 4.8,
    reviewCount: 8932,
    duration: '55 hours',
    level: 'Beginner',
    category: 'Mobile Development',
  },
  {
    id: '4',
    title: 'The Complete Digital Marketing Course - 12 Courses in 1',
    instructor: 'Rob Percival, Daragh Walsh',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2426&q=80',
    price: 84.99,
    rating: 4.4,
    reviewCount: 23156,
    duration: '20 hours',
    level: 'All Levels',
    category: 'Marketing',
  },
  {
    id: '5',
    title: 'Ultimate AWS Certified Solutions Architect Associate',
    instructor: 'Stephane Maarek',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2344&q=80',
    price: 109.99,
    rating: 4.7,
    reviewCount: 18320,
    duration: '27 hours',
    level: 'Intermediate',
    category: 'IT & Software',
  },
  {
    id: '6',
    title: 'The Complete JavaScript Course 2023: From Zero to Expert!',
    instructor: 'Jonas Schmedtmann',
    image: 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2366&q=80',
    price: 94.99,
    rating: 4.8,
    reviewCount: 30250,
    duration: '69 hours',
    level: 'All Levels',
    category: 'Web Development',
  },
  {
    id: '7',
    title: 'Complete C# Unity Game Developer 2D',
    instructor: 'Ben Tristem, Rick Davidson',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2371&q=80',
    price: 89.99,
    rating: 4.7,
    reviewCount: 12450,
    duration: '42 hours',
    level: 'Beginner',
    category: 'Game Development',
  },
  {
    id: '8',
    title: 'UI/UX Design Bootcamp with Figma 2023',
    instructor: 'Daniel Walter Scott',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2264&q=80',
    price: 79.99,
    rating: 4.6,
    reviewCount: 8630,
    duration: '30 hours',
    level: 'All Levels',
    category: 'Design',
  },
  {
    id: '9',
    title: 'React - The Complete Guide (incl Hooks, React Router, Redux)',
    instructor: 'Maximilian Schwarzmüller',
    image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80',
    price: 94.99,
    rating: 4.8,
    reviewCount: 25630,
    duration: '48 hours',
    level: 'All Levels',
    category: 'Web Development',
  },
  {
    id: '10',
    title: 'Modern Python for Data Science & Machine Learning',
    instructor: 'Jose Portilla',
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2338&q=80',
    price: 129.99,
    rating: 4.5,
    reviewCount: 10230,
    duration: '65 hours',
    level: 'Intermediate',
    category: 'Data Science',
  },
  {
    id: '11',
    title: 'Graphic Design Masterclass: Learn Design Principles',
    instructor: 'Lindsay Marsh',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2342&q=80',
    price: 89.99,
    rating: 4.7,
    reviewCount: 14630,
    duration: '36 hours',
    level: 'All Levels',
    category: 'Design',
  },
  {
    id: '12',
    title: 'SQL for Data Analysis: Complete SQL Bootcamp',
    instructor: 'Jose Portilla',
    image: 'https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2274&q=80',
    price: 69.99,
    rating: 4.6,
    reviewCount: 7850,
    duration: '25 hours',
    level: 'Beginner',
    category: 'Data Science',
  },
];

type SortOption = 'popular' | 'newest' | 'price-low' | 'price-high' | 'rating';

const Catalog = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('popular');
  const [filteredCourses, setFilteredCourses] = useState<CourseProps[]>(allCourses);

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let result = [...allCourses];
    
    // Apply category filter
    if (selectedCategories.length > 0) {
      result = result.filter(course => selectedCategories.includes(course.category));
    }
    
    // Apply level filter
    if (selectedLevels.length > 0) {
      result = result.filter(course => selectedLevels.includes(course.level));
    }
    
    // Apply price range filter
    result = result.filter(
      course => course.price >= priceRange[0] && course.price <= priceRange[1]
    );
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        course => 
          course.title.toLowerCase().includes(query) || 
          course.instructor.toLowerCase().includes(query) || 
          course.category.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    switch (sortOption) {
      case 'popular':
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'newest':
        result.sort((a, b) => a.id.localeCompare(b.id));
        break;
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
    }
    
    setFilteredCourses(result);
  }, [selectedCategories, selectedLevels, priceRange, searchQuery, sortOption]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleLevelChange = (level: string) => {
    setSelectedLevels(prev => 
      prev.includes(level)
        ? prev.filter(l => l !== level)
        : [...prev, level]
    );
  };

  const handlePriceRangeChange = (range: [number, number]) => {
    setPriceRange(range);
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSelectedLevels([]);
    setPriceRange([0, 200]);
    setSearchQuery('');
  };

  const getSortLabel = (option: SortOption): string => {
    switch (option) {
      case 'popular': return 'Most Popular';
      case 'newest': return 'Newest';
      case 'price-low': return 'Price: Low to High';
      case 'price-high': return 'Price: High to Low';
      case 'rating': return 'Highest Rated';
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Header */}
        <section className="bg-secondary/50 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-4xl font-bold">
                Explore Our Courses
              </h1>
              <p className="mt-2 text-muted-foreground">
                Discover thousands of courses to help you grow professionally and personally
              </p>
            </div>
          </div>
        </section>
        
        {/* Main Content */}
        <section className="py-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filters - Desktop */}
              <div className="hidden lg:block w-72 flex-shrink-0">
                <div className="sticky top-24">
                  <CategoryFilter
                    selectedCategories={selectedCategories}
                    onCategoryChange={handleCategoryChange}
                    selectedLevels={selectedLevels}
                    onLevelChange={handleLevelChange}
                    priceRange={priceRange}
                    onPriceRangeChange={handlePriceRangeChange}
                    searchQuery={searchQuery}
                    onSearchQueryChange={setSearchQuery}
                    onClearFilters={handleClearFilters}
                  />
                </div>
              </div>
              
              {/* Course Listing */}
              <div className="flex-grow">
                {/* Mobile Search and Filters */}
                <div className="lg:hidden mb-6 space-y-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Search className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Input
                      type="text"
                      placeholder="Search courses..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex space-x-2">
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="outline" className="flex-1">
                          <Filter className="h-4 w-4 mr-2" />
                          Filters {(selectedCategories.length > 0 || selectedLevels.length > 0) && 
                            `(${selectedCategories.length + selectedLevels.length})`}
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                        <div className="py-6">
                          <CategoryFilter
                            selectedCategories={selectedCategories}
                            onCategoryChange={handleCategoryChange}
                            selectedLevels={selectedLevels}
                            onLevelChange={handleLevelChange}
                            priceRange={priceRange}
                            onPriceRangeChange={handlePriceRangeChange}
                            searchQuery={searchQuery}
                            onSearchQueryChange={setSearchQuery}
                            onClearFilters={handleClearFilters}
                          />
                        </div>
                      </SheetContent>
                    </Sheet>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="flex-1">
                          <ArrowUpDown className="h-4 w-4 mr-2" />
                          {getSortLabel(sortOption)}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => setSortOption('popular')}>
                          Most Popular
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSortOption('newest')}>
                          Newest
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSortOption('price-low')}>
                          Price: Low to High
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSortOption('price-high')}>
                          Price: High to Low
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSortOption('rating')}>
                          Highest Rated
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                
                {/* Desktop Sorting and Results Count */}
                <div className="hidden lg:flex justify-between items-center mb-6">
                  <p className="text-muted-foreground">
                    {filteredCourses.length} results
                  </p>
                  
                  <div className="flex items-center">
                    <span className="mr-2 text-sm">Sort by:</span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          {getSortLabel(sortOption)}
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setSortOption('popular')}>
                          Most Popular
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSortOption('newest')}>
                          Newest
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSortOption('price-low')}>
                          Price: Low to High
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSortOption('price-high')}>
                          Price: High to Low
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSortOption('rating')}>
                          Highest Rated
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                
                {/* Course Grid */}
                {filteredCourses.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses.map((course) => (
                      <CourseCard key={course.id} {...course} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <p className="text-lg text-muted-foreground">No courses found matching your criteria.</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={handleClearFilters}
                    >
                      Clear all filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Catalog;
