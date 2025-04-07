
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CourseCard, { CourseProps } from '@/components/CourseCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

// Sample courses data for exploration
const exploreCourses: CourseProps[] = [
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
    title: 'Python for Data Science and Machine Learning Bootcamp',
    instructor: 'Jose Portilla',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    price: 89.99,
    rating: 4.6,
    reviewCount: 18750,
    duration: '25 hours',
    level: 'Intermediate',
    category: 'Data Science',
  },
  {
    id: '6',
    title: 'React - The Complete Guide 2023 (incl. React Router & Redux)',
    instructor: 'Maximilian Schwarzmüller',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    price: 94.99,
    rating: 4.7,
    reviewCount: 27350,
    duration: '48 hours',
    level: 'All Levels',
    category: 'Web Development',
  },
  {
    id: '7',
    title: 'The Complete Financial Analyst Course 2023',
    instructor: 'Andrei Neagoie',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    price: 79.99,
    rating: 4.5,
    reviewCount: 12570,
    duration: '22 hours',
    level: 'Beginner',
    category: 'Finance',
  },
  {
    id: '8',
    title: 'User Experience (UX) Design Essentials',
    instructor: 'Daniel Walter Scott',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    price: 69.99,
    rating: 4.6,
    reviewCount: 9820,
    duration: '15 hours',
    level: 'All Levels',
    category: 'Design',
  },
];

const categories = [
  'All Categories',
  'Web Development',
  'Data Science',
  'Mobile Development',
  'Marketing',
  'Finance',
  'Design'
];

const ExploredCourses = () => {
  const [activeCategory, setActiveCategory] = useState('All Categories');
  const [filteredCourses, setFilteredCourses] = useState<CourseProps[]>(exploreCourses);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Filter courses based on active category
    if (activeCategory === 'All Categories') {
      setFilteredCourses(exploreCourses);
    } else {
      const filtered = exploreCourses.filter(course => course.category === activeCategory);
      setFilteredCourses(filtered);
    }
    
    // Reset to first page when category changes
    setCurrentPage(1);
  }, [activeCategory]);

  // Calculate pagination
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <h1 className="text-3xl font-bold mb-2">Explore Courses</h1>
            <p className="text-muted-foreground">
              Discover a wide range of courses to enhance your skills and knowledge
            </p>
          </div>
          
          {/* Category Filter */}
          <Tabs 
            value={activeCategory} 
            onValueChange={setActiveCategory}
            className="mb-8"
          >
            <TabsList className="flex flex-wrap gap-2 justify-start mb-2">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  className="px-4 py-2 rounded-full"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          
          {/* Course Grid */}
          {currentCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {currentCourses.map((course) => (
                <CourseCard key={course.id} {...course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground mb-4">
                No courses found in this category.
              </p>
              <Button onClick={() => setActiveCategory('All Categories')}>
                View All Courses
              </Button>
            </div>
          )}
          
          {/* Pagination */}
          {filteredCourses.length > coursesPerPage && (
            <Pagination className="mb-10">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      isActive={currentPage === page}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ExploredCourses;
