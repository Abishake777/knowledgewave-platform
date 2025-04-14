
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '@/components/HeroSection';
import FeaturedCourses from '@/components/FeaturedCourses';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BookOpen, Award, Users, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

const Index = () => {
  const { isAuthenticated } = useAuth();

  // Mock data for teacher spotlight
  const featuredTeachers = [
    {
      id: '1',
      name: 'Alex Johnson',
      title: 'Full Stack Developer',
      avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80',
      courseCount: 12,
      rating: 4.8
    },
    {
      id: '2',
      name: 'Jessica Williams',
      title: 'UX/UI Designer',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80',
      courseCount: 8,
      rating: 4.9
    },
    {
      id: '3',
      name: 'David Chen',
      title: 'Data Scientist',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80',
      courseCount: 6,
      rating: 4.7
    }
  ];

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection />
        
        <FeaturedCourses />
        
        {/* My Learning Section (if logged in) */}
        {isAuthenticated && (
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  Continue Learning
                </h2>
                <Link to="/enrolled-courses">
                  <Button variant="ghost" className="gap-1">
                    View all my courses
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Mock enrolled course with progress */}
                <Card>
                  <div className="relative">
                    <img 
                      src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                      alt="Course thumbnail" 
                      className="w-full h-48 object-cover" 
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <div className="flex justify-between items-center text-white">
                        <span className="text-sm font-medium">45% complete</span>
                        <span className="text-sm">10/22 lessons</span>
                      </div>
                      <div className="w-full bg-white/30 rounded-full h-1.5 mt-2">
                        <div className="bg-primary h-1.5 rounded-full" style={{ width: '45%' }}></div>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-1">Introduction to Web Development</h3>
                    <p className="text-sm text-muted-foreground">By Alex Johnson</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button className="w-full">Continue Learning</Button>
                  </CardFooter>
                </Card>
                
                <Card className="border-dashed border-2 flex flex-col justify-center items-center p-6 h-full">
                  <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="font-semibold mb-2 text-center">Discover More Courses</h3>
                  <p className="text-sm text-muted-foreground text-center mb-4">
                    Expand your skills with our wide range of courses
                  </p>
                  <Link to="/catalog">
                    <Button>Browse Catalog</Button>
                  </Link>
                </Card>
              </div>
            </div>
          </section>
        )}
        
        {/* Categories Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">
              Explore Top Categories
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: <BookOpen className="h-6 w-6" />, name: 'Development', description: 'Web, mobile, and software development courses' },
                { icon: <Award className="h-6 w-6" />, name: 'Business', description: 'Finance, entrepreneurship, and marketing' },
                { icon: <Users className="h-6 w-6" />, name: 'Design', description: 'UI/UX, graphic design, and creative skills' },
              ].map((category) => (
                <div 
                  key={category.name}
                  className="bg-white p-6 rounded-lg shadow-sm text-center"
                >
                  <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <div className="text-primary">
                      {category.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
                  <p className="text-muted-foreground text-sm">{category.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Top Teachers Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-bold">
                Learn from Top Teachers
              </h2>
              <Link to="/catalog">
                <Button variant="outline">View All Teachers</Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredTeachers.map(teacher => (
                <Link to={`/teacher/${teacher.id}`} key={teacher.id}>
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <img 
                        src={teacher.avatar} 
                        alt={teacher.name}
                        className="w-24 h-24 rounded-full object-cover mb-4"
                      />
                      <h3 className="font-semibold text-lg">{teacher.name}</h3>
                      <p className="text-muted-foreground text-sm mb-2">{teacher.title}</p>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="flex items-center">
                          <BookOpen className="h-4 w-4 mr-1" />
                          {teacher.courseCount} courses
                        </span>
                        <span className="flex items-center">
                          <svg 
                            className="w-4 h-4 text-yellow-400 mr-1" 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          {teacher.rating}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold max-w-2xl mx-auto">
              Start learning today
            </h2>
            <p className="mt-4 text-white/80 max-w-xl mx-auto mb-6">
              Join our community of learners and enhance your skills with our expert-led courses.
            </p>
            <Button 
              size="lg" 
              variant="secondary"
            >
              Get Started
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
