
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CourseCard from '@/components/CourseCard';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';

// Mock enrolled courses data - in a real app, this would come from an API
const enrolledCourses = [
  {
    id: '1',
    title: 'Introduction to Web Development',
    instructor: 'Alex Johnson',
    image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
    price: 59.99,
    rating: 4.7,
    reviewCount: 212,
    duration: '24 hours',
    level: 'Beginner' as const,
    category: 'Web Development',
    progress: 45
  },
  {
    id: '2',
    title: 'Mastering React Hooks',
    instructor: 'Alex Johnson',
    image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
    price: 69.99,
    rating: 4.9,
    reviewCount: 187,
    duration: '18 hours',
    level: 'Intermediate' as const,
    category: 'React',
    progress: 72
  }
];

const EnrolledCourses = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Redirect if not logged in
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">My Enrolled Courses</h1>
              <p className="text-muted-foreground">
                Continue learning from your {enrolledCourses.length} enrolled courses
              </p>
            </div>
          </div>

          {enrolledCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map(course => (
                <div key={course.id} className="flex flex-col">
                  <CourseCard {...course} />
                  <div className="mt-2 mb-6">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div 
                        className="bg-primary h-2.5 rounded-full" 
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <Button className="w-full">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Continue Learning
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">You haven't enrolled in any courses yet</h3>
              <p className="text-muted-foreground mb-6">Browse our catalog to find courses that interest you</p>
              <Button onClick={() => navigate('/catalog')}>Explore Courses</Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EnrolledCourses;
