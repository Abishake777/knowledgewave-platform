
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Star, Bookmark, Users, Clock, Calendar, GraduationCap } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CourseCard from '@/components/CourseCard';

// Mock teacher data - in a real app, this would come from an API
const teacher = {
  id: '1',
  name: 'Alex Johnson',
  title: 'Full Stack Developer',
  bio: 'Full Stack Developer with 10+ years of experience. Previously worked at Google and Microsoft, now teaching full-time.',
  avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80',
  students: 4500,
  courses: 12,
  reviews: 685,
  rating: 4.8,
  joinedDate: 'March 2020',
  socialLinks: {
    website: 'https://alexjohnson.dev',
    twitter: 'https://twitter.com/alexjohnson',
    linkedin: 'https://linkedin.com/in/alexjohnson',
    github: 'https://github.com/alexjohnson'
  }
};

// Mock courses data
const teacherCourses = [
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
    featured: true
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
    category: 'React'
  },
  {
    id: '4',
    title: 'Advanced JavaScript: Building Modern Web Applications',
    instructor: 'Alex Johnson',
    image: 'https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2343&q=80',
    price: 89.99,
    rating: 4.8,
    reviewCount: 325,
    duration: '32 hours',
    level: 'Advanced' as const,
    category: 'JavaScript'
  }
];

// Mock reviews data
const teacherReviews = [
  {
    id: '1',
    name: 'Sarah M.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
    course: 'Introduction to Web Development',
    rating: 5,
    date: 'October 15, 2023',
    comment: "This course exceeded my expectations. The instructor explains complex concepts in a way that's easy to understand, and the projects really helped cement my knowledge."
  },
  {
    id: '2',
    name: 'Michael T.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
    course: 'Mastering React Hooks',
    rating: 4,
    date: 'September 28, 2023',
    comment: "Great course for intermediate developers looking to level up their React skills. The section on custom hooks was particularly helpful for my work projects."
  },
  {
    id: '3',
    name: 'Jennifer L.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
    course: 'Advanced JavaScript',
    rating: 5,
    date: 'November 5, 2023',
    comment: "Alex is an amazing instructor! The way he explains JavaScript concepts made things click that I've been struggling with for months. Highly recommend!"
  }
];

const TeacherProfile = () => {
  const { id } = useParams();
  
  // In a real app, we would fetch teacher by ID
  const teacherData = teacher;
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <div className="bg-muted/30 pt-10 pb-10">
          <div className="container mx-auto px-4">
            {/* Breadcrumbs */}
            <div className="flex items-center text-sm mb-6">
              <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                Home
              </Link>
              <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
              <Link to="/catalog" className="text-muted-foreground hover:text-foreground transition-colors">
                Teachers
              </Link>
              <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
              <span className="text-foreground font-medium">
                {teacherData.name}
              </span>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-full md:w-1/4 flex flex-col items-center">
                  <Avatar className="h-32 w-32 mb-4">
                    <AvatarImage src={teacherData.avatar} alt={teacherData.name} />
                    <AvatarFallback>{teacherData.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">{teacherData.name}</h1>
                    <p className="text-muted-foreground">{teacherData.title}</p>
                    
                    <div className="flex items-center mt-2 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(teacherData.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                      <span className="ml-2 text-sm">{teacherData.rating} ({teacherData.reviews} reviews)</span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 w-full mt-4">
                      <div className="flex flex-col items-center">
                        <span className="font-bold text-lg">{teacherData.courses}</span>
                        <span className="text-xs text-muted-foreground">Courses</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="font-bold text-lg">{teacherData.students}</span>
                        <span className="text-xs text-muted-foreground">Students</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="font-bold text-lg">{teacherData.reviews}</span>
                        <span className="text-xs text-muted-foreground">Reviews</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="w-full md:w-3/4">
                  <h2 className="text-xl font-semibold mb-3">About Me</h2>
                  <p className="text-muted-foreground mb-4">{teacherData.bio}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">Joined {teacherData.joinedDate}</span>
                    </div>
                    <div className="flex items-center">
                      <GraduationCap className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">Full Stack Developer</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <Tabs defaultValue="courses" className="mb-8">
              <TabsList className="mb-6">
                <TabsTrigger value="courses">Courses ({teacherCourses.length})</TabsTrigger>
                <TabsTrigger value="reviews">Reviews ({teacherReviews.length})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="courses">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {teacherCourses.map(course => (
                    <CourseCard key={course.id} {...course} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="reviews">
                <div className="space-y-6">
                  {teacherReviews.map(review => (
                    <Card key={review.id} className="overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex items-start">
                          <Avatar className="h-10 w-10 mr-4">
                            <AvatarImage src={review.avatar} alt={review.name} />
                            <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                              <div>
                                <h4 className="text-sm font-semibold">{review.name}</h4>
                                <div className="flex items-center">
                                  <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                      <Star 
                                        key={i}
                                        className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                                      />
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <span className="text-xs text-muted-foreground mt-1 sm:mt-0">{review.date}</span>
                            </div>
                            <Badge className="mb-2">{review.course}</Badge>
                            <p className="text-sm">{review.comment}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TeacherProfile;
