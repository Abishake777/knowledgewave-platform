import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, Clock, Globe, CheckCircle, Award, Heart, Share2, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import CourseCard, { CourseProps } from '@/components/CourseCard';

interface CourseDetailProps extends CourseProps {
  description: string;
  whatYouWillLearn: string[];
  requirements: string[];
  curriculum: {
    section: string;
    lectures: {
      title: string;
      duration: string;
      preview?: boolean;
    }[];
  }[];
  totalLectures: number;
  totalDuration: string;
  lastUpdated: string;
  language: string;
  certificate: boolean;
  fullLifetimeAccess: boolean;
}

// Sample data for all courses
const allCourses: CourseProps[] = [
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
  },
];

// Extended course details
const extendedCourseDetails: Record<string, CourseDetailProps> = {
  '1': {
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
    description: 'Become a full-stack web developer with just one course. HTML, CSS, Javascript, Node, React, MongoDB, Web3 and DApps. This comprehensive course covers everything from the basics of HTML to advanced topics like blockchain development and Web3 integration.',
    whatYouWillLearn: [
      'Build 16 web development projects for your portfolio, ready to apply for junior developer jobs',
      'Learn the latest technologies, including Javascript, React, Node and even Web3 development',
      'Build fully-fledged websites and web apps for your startup or business',
      'Master frontend development with React',
      'Master backend development with Node',
      'Learn professional developer best practices',
    ],
    requirements: [
      'No programming experience needed - I'll teach you everything you need to know',
      'A computer with access to the internet',
      'No paid software required',
      'I'll walk you through, step-by-step how to get all the software installed and set up',
    ],
    curriculum: [
      {
        section: 'Introduction to HTML',
        lectures: [
          { title: 'Introduction to Web Development', duration: '15:32' },
          { title: 'HTML Basics', duration: '22:10', preview: true },
          { title: 'HTML Forms and Inputs', duration: '18:45' },
        ],
      },
      {
        section: 'CSS Fundamentals',
        lectures: [
          { title: 'Introduction to CSS', duration: '20:15', preview: true },
          { title: 'CSS Selectors', duration: '16:40' },
          { title: 'CSS Box Model', duration: '19:22' },
          { title: 'CSS Flexbox', duration: '25:18' },
        ],
      },
      {
        section: 'JavaScript Essentials',
        lectures: [
          { title: 'JavaScript Basics', duration: '28:10', preview: true },
          { title: 'DOM Manipulation', duration: '24:45' },
          { title: 'Event Handling', duration: '22:33' },
          { title: 'Asynchronous JavaScript', duration: '35:20' },
        ],
      },
    ],
    totalLectures: 425,
    totalDuration: '63 hours',
    lastUpdated: 'November 2023',
    language: 'English',
    certificate: true,
    fullLifetimeAccess: true,
  },
  '2': {
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
    description: 'Learn to create Machine Learning Algorithms in Python and R from two Data Science experts. Code templates included. This course has been designed by two professional Data Scientists so that we can share our knowledge and help you learn complex theory, algorithms, and coding libraries in a simple way.',
    whatYouWillLearn: [
      'Master Machine Learning on Python & R',
      'Have a great intuition of many Machine Learning models',
      'Make accurate predictions',
      'Make powerful analysis',
      'Make robust Machine Learning models',
      'Create strong added value to your business',
    ],
    requirements: [
      'Just some high school mathematics level.',
      'Basic Python or R knowledge',
    ],
    curriculum: [
      {
        section: 'Data Preprocessing',
        lectures: [
          { title: 'Importing Libraries', duration: '12:30', preview: true },
          { title: 'Importing Dataset', duration: '15:20' },
          { title: 'Handling Missing Data', duration: '18:45' },
        ],
      },
      {
        section: 'Regression',
        lectures: [
          { title: 'Simple Linear Regression', duration: '25:15', preview: true },
          { title: 'Multiple Linear Regression', duration: '28:40' },
          { title: 'Polynomial Regression', duration: '22:22' },
        ],
      },
      {
        section: 'Classification',
        lectures: [
          { title: 'Logistic Regression', duration: '24:10', preview: true },
          { title: 'K-Nearest Neighbors', duration: '22:45' },
          { title: 'Support Vector Machine', duration: '26:33' },
          { title: 'Kernel SVM', duration: '20:20' },
        ],
      },
    ],
    totalLectures: 320,
    totalDuration: '44 hours',
    lastUpdated: 'October 2023',
    language: 'English',
    certificate: true,
    fullLifetimeAccess: true,
  },
};

const renderStars = (rating: number) => {
  return Array(5)
    .fill(0)
    .map((_, i) => (
      <Star
        key={i}
        className={cn(
          'w-4 h-4',
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-yellow-400' 
            : 'text-gray-300'
        )}
      />
    ));
};

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<CourseProps | null>(null);
  const [courseDetails, setCourseDetails] = useState<CourseDetailProps | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Find the course by ID
    const foundCourse = allCourses.find(c => c.id === id);
    if (foundCourse) {
      setCourse(foundCourse);
      
      // Get extended details
      const details = extendedCourseDetails[id || ''];
      if (details) {
        setCourseDetails(details);
      }
    }
  }, [id]);

  const handlePlayVideo = () => {
    setIsVideoPlaying(true);
    // In a real app, you would play the video here
  };

  if (!course || !courseDetails) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <p>Loading course details...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Course Header */}
        <section className="bg-secondary py-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-7/12">
                <div className="mb-4">
                  <span className="text-sm text-primary font-medium">{course.category}</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold mb-3">{course.title}</h1>
                <p className="text-lg mb-4">{courseDetails.description}</p>
                
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <div className="flex items-center">
                    <div className="flex mr-1">
                      {renderStars(course.rating)}
                    </div>
                    <span className="text-sm font-medium">{course.rating}</span>
                    <span className="text-sm text-muted-foreground ml-1">({course.reviewCount} reviews)</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1 text-muted-foreground" />
                    <span className="text-sm">{course.duration}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Award className="w-4 h-4 mr-1 text-muted-foreground" />
                    <span className="text-sm">{course.level}</span>
                  </div>
                </div>
                
                <p className="text-sm mb-4">
                  Created by <span className="font-medium">{course.instructor}</span>
                </p>
                
                <div className="flex flex-wrap gap-3">
                  <Button>Enroll Now</Button>
                  <Button variant="outline" className="flex items-center">
                    <Heart className="w-4 h-4 mr-2" />
                    Wishlist
                  </Button>
                  <Button variant="outline" className="flex items-center">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
              
              <div className="lg:w-5/12">
                <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                  {isVideoPlaying ? (
                    <div className="w-full h-full">
                      {/* Video player would go here in a real app */}
                      <div className="flex items-center justify-center h-full text-white">
                        Video is playing...
                      </div>
                    </div>
                  ) : (
                    <>
                      <img 
                        src={course.image} 
                        alt={course.title} 
                        className="w-full h-full object-cover opacity-80"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30"
                          onClick={handlePlayVideo}
                        >
                          <Play className="w-8 h-8 text-white" fill="white" />
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Course Content */}
        <section className="py-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main Course Content */}
              <div className="lg:w-8/12">
                <Tabs defaultValue="overview" className="mb-8">
                  <TabsList className="mb-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                    <TabsTrigger value="instructor">Instructor</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-4">What you'll learn</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {courseDetails.whatYouWillLearn.map((item, index) => (
                            <div key={index} className="flex">
                              <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-4">Requirements</h3>
                        <ul className="list-disc pl-5 space-y-2">
                          {courseDetails.requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-4">Related Courses</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {allCourses
                            .filter(c => c.id !== id && c.category === course.category)
                            .slice(0, 2)
                            .map(relatedCourse => (
                              <CourseCard 
                                key={relatedCourse.id} 
                                {...relatedCourse} 
                              />
                            ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="curriculum">
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold">Course Content</h3>
                        <div className="text-sm text-muted-foreground">
                          {courseDetails.totalLectures} lectures • {courseDetails.totalDuration}
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        {courseDetails.curriculum.map((section, index) => (
                          <div key={index} className="border rounded-lg overflow-hidden">
                            <div className="bg-secondary/50 p-4 font-medium">
                              {section.section}
                            </div>
                            <div className="divide-y">
                              {section.lectures.map((lecture, lectureIndex) => (
                                <div key={lectureIndex} className="p-4 flex justify-between items-center">
                                  <div className="flex items-center">
                                    <Play className="w-4 h-4 mr-3 text-muted-foreground" />
                                    <span>{lecture.title}</span>
                                    {lecture.preview && (
                                      <span className="ml-3 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                                        Preview
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-sm text-muted-foreground">{lecture.duration}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="instructor">
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
                          {/* Placeholder for instructor image */}
                          <span className="text-2xl font-bold">{course.instructor.charAt(0)}</span>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-1">{course.instructor}</h3>
                          <p className="text-muted-foreground mb-3">Professional Web Developer & Instructor</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center">
                              <Star className="w-4 h-4 mr-1 text-yellow-400 fill-yellow-400" />
                              <span>4.7 Instructor Rating</span>
                            </div>
                            <div>
                              <span>120,000+ Students</span>
                            </div>
                            <div>
                              <span>15 Courses</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">About the instructor</h4>
                        <p className="text-muted-foreground">
                          I'm Angela, I'm a developer with a passion for teaching. I'm the lead instructor at the London App Brewery, London's leading Programming Bootcamp. I've helped hundreds of thousands of students learn to code and change their lives by becoming a developer. I've been invited by companies such as Twitter, Facebook and Google to teach their employees.
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="reviews">
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="text-5xl font-bold">{course.rating}</div>
                          <div className="flex justify-center my-1">
                            {renderStars(course.rating)}
                          </div>
                          <div className="text-sm text-muted-foreground">Course Rating</div>
                        </div>
                        
                        <div className="flex-1">
                          {/* Rating bars would go here */}
                          <div className="space-y-2">
                            {[5, 4, 3, 2, 1].map(num => (
                              <div key={num} className="flex items-center gap-2">
                                <div className="w-12 text-sm text-right">{num} stars</div>
                                <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-primary rounded-full" 
                                    style={{ 
                                      width: `${num === 5 ? 70 : num === 4 ? 20 : num === 3 ? 7 : num === 2 ? 2 : 1}%` 
                                    }} 
                                  />
                                </div>
                                <div className="w-12 text-sm">
                                  {num === 5 ? '70%' : num === 4 ? '20%' : num === 3 ? '7%' : num === 2 ? '2%' : '1%'}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-4">Student Reviews</h3>
                        {/* Sample reviews would go here */}
                        <div className="space-y-6">
                          {[1, 2, 3].map(i => (
                            <div key={i} className="border-b pb-6">
                              <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                                  <span className="font-medium">S</span>
                                </div>
                                <div className="flex-1">
                                  <div className="flex justify-between">
                                    <h4 className="font-medium">Student {i}</h4>
                                    <span className="text-sm text-muted-foreground">2 weeks ago</span>
                                  </div>
                                  <div className="flex my-1">
                                    {renderStars(5)}
                                  </div>
                                  <p className="text-muted-foreground">
                                    This course was exactly what I needed to jumpstart my career in web development. The instructor explains complex concepts in an easy-to-understand way, and the projects are both challenging and rewarding.
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
              {/* Sidebar */}
              <div className="lg:w-4/12">
                <div className="sticky top-24">
                  <div className="bg-white shadow-lg rounded-lg overflow-hidden animate-scale-in">
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-6">
                        <div className="text-3xl font-bold">${course.price.toFixed(2)}</div>
                        <div className="text-sm text-muted-foreground line-through">
                          ${(course.price * 1.7).toFixed(2)}
                        </div>
                      </div>
                      
                      <div className="space-y-4 mb-6">
                        <Button className="w-full">Enroll Now</Button>
                        <Button variant="outline" className="w-full">Add to Wishlist</Button>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="font-medium">This course includes:</h4>
                        
                        <div className="space-y-2">
                          <div className="flex items-start">
                            <Globe className="w-5 h-5 text-muted-foreground mr-3 flex-shrink-0" />
                            <span>{courseDetails.totalDuration} on-demand video</span>
                          </div>
                          <div className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-muted-foreground mr-3 flex-shrink-0" />
                            <span>{courseDetails.totalLectures} lectures</span>
                          </div>
                          <div className="flex items-start">
                            <Globe className="w-5 h-5 text-muted-foreground mr-3 flex-shrink-0" />
                            <span>Access on mobile and TV</span>
                          </div>
                          <div className="flex items-start">
                            <Award className="w-5 h-5 text-muted-foreground mr-3 flex-shrink-0" />
                            <span>Certificate of completion</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 pt-6 border-t">
                        <div className="text-center">
                          <p className="text-sm mb-2">Not sure? All courses have a 30-day money-back guarantee</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CourseDetail;
