
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CourseCard, { CourseProps } from '@/components/CourseCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Star, Award, TrendingUp } from 'lucide-react';

// Sample data for featured courses
const featuredCourses: CourseProps[] = [
  {
    id: '1',
    title: 'Complete Web Development Bootcamp',
    instructor: 'Dr. Angela Yu',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2344&q=80',
    price: 89.99,
    rating: 4.7,
    reviewCount: 43520,
    duration: '63 hours',
    level: 'All Levels',
    category: 'Web Development',
    featured: true
  },
  {
    id: '2',
    title: 'Machine Learning A-Z: Python & R In Data Science',
    instructor: 'Kirill Eremenko',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    price: 94.99,
    rating: 4.5,
    reviewCount: 15230,
    duration: '44 hours',
    level: 'Intermediate',
    category: 'Data Science',
    featured: true
  },
  {
    id: '3',
    title: 'iOS & Swift - Complete iOS App Development',
    instructor: 'Dr. Angela Yu',
    image: 'https://images.unsplash.com/photo-1621839673705-6617adf9e890?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2332&q=80',
    price: 99.99,
    rating: 4.8,
    reviewCount: 8932,
    duration: '55 hours',
    level: 'Beginner',
    category: 'Mobile Development',
    featured: true
  },
  {
    id: '4',
    title: 'The Complete Digital Marketing Course',
    instructor: 'Rob Percival',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2426&q=80',
    price: 84.99,
    rating: 4.4,
    reviewCount: 23156,
    duration: '20 hours',
    level: 'All Levels',
    category: 'Marketing',
    featured: true
  },
  {
    id: '5',
    title: 'Advanced UI/UX Design Masterclass',
    instructor: 'Sarah Johnson',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    price: 79.99,
    rating: 4.9,
    reviewCount: 5430,
    duration: '32 hours',
    level: 'Advanced',
    category: 'Design',
    featured: true
  },
  {
    id: '6',
    title: 'The Complete 2023 Python Bootcamp',
    instructor: 'Jose Portilla',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    price: 89.99,
    rating: 4.6,
    reviewCount: 32150,
    duration: '45 hours',
    level: 'All Levels',
    category: 'Programming',
    featured: true
  },
];

// Featured course categories
const featuredCategories = [
  { 
    name: 'Web Development', 
    description: 'Learn front-end and back-end technologies', 
    count: 320, 
    icon: <TrendingUp className="h-6 w-6" /> 
  },
  { 
    name: 'Data Science', 
    description: 'Master machine learning and analytics', 
    count: 220, 
    icon: <Award className="h-6 w-6" /> 
  },
  { 
    name: 'Mobile Development', 
    description: 'Create apps for iOS and Android', 
    count: 180, 
    icon: <Star className="h-6 w-6" /> 
  }
];

const FeaturedCourses = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="bg-primary/10 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Featured Courses</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Discover our handpicked selection of top-rated courses taught by industry experts
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/catalog">
                  <Button size="lg">
                    Browse All Courses
                  </Button>
                </Link>
                <Link to="/explored">
                  <Button variant="outline" size="lg">
                    Explore Categories
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Course Carousel */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">Top Rated Courses</h2>
            
            <Carousel className="w-full">
              <CarouselContent>
                {featuredCourses.slice(0, 4).map((course) => (
                  <CarouselItem key={course.id} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-2">
                      <CourseCard {...course} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center mt-6">
                <CarouselPrevious className="static transform-none mx-2" />
                <CarouselNext className="static transform-none mx-2" />
              </div>
            </Carousel>
          </div>
        </section>
        
        {/* Featured Categories */}
        <section className="py-16 bg-secondary/50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">Featured Categories</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredCategories.map((category) => (
                <Card key={category.name} className="bg-white">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>{category.name}</CardTitle>
                      <div className="bg-primary/10 p-2 rounded-full">
                        {category.icon}
                      </div>
                    </div>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{category.count} courses</span>
                      <Link to={`/explored`}>
                        <Button variant="outline" size="sm">
                          View Courses
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* New Additions */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">New Additions</h2>
              <Link to="/explored">
                <Button variant="outline">View All</Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCourses.slice(3, 6).map((course) => (
                <CourseCard key={course.id} {...course} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to advance your career?
              </h2>
              <p className="text-lg text-white/80 mb-8">
                Join thousands of students already learning with our featured courses
              </p>
              <Link to="/signin">
                <Button 
                  size="lg" 
                  variant="secondary"
                >
                  Get Started Today
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default FeaturedCourses;
