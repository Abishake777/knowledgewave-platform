
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Clock, Globe, CheckCircle, Heart, Share2, Award, ShoppingCart, Play, AlertCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CourseContent from '@/components/CourseContent';
import CourseCard, { CourseProps } from '@/components/CourseCard';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Sample course data (expanded from catalog)
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
];

// Extended course details
interface ExtendedCourseDetails {
  id: string;
  description: string;
  whatYouWillLearn: string[];
  requirements: string[];
  sections: {
    id: string;
    title: string;
    lectures: {
      id: string;
      title: string;
      duration: string;
      type: 'video' | 'document' | 'quiz';
      isPreview?: boolean;
    }[];
  }[];
  totalLectures: number;
  totalDuration: string;
  lastUpdated: string;
  language: string;
  certificate: boolean;
  instructorDetails: {
    name: string;
    bio: string;
    image: string;
    rating: number;
    reviewCount: number;
    studentsCount: number;
    coursesCount: number;
  };
}

// Sample extended course data
const extendedCourseDetails: Record<string, ExtendedCourseDetails> = {
  '1': {
    id: '1',
    description: 'Become a full-stack web developer with just one course. HTML, CSS, Javascript, Node, React, MongoDB, and more! This course is constantly updated with new content, projects, and modules. Think of it as a subscription to a never-ending supply of developer training. This course gives you a competitive edge in the developer job market.',
    whatYouWillLearn: [
      'Build 16 web development projects for your portfolio',
      'Learn the latest technologies, including Javascript, React, Node and more',
      'Build fully-fledged websites and web apps for your startup or business',
      'Master frontend development with React',
      'Master backend development with Node',
      'Learn professional developer best practices'
    ],
    requirements: [
      "No programming experience needed - I'll teach you everything you need to know",
      'A computer with access to the internet',
      'No paid software required',
      "I'll walk you through, step-by-step how to get all the software installed"
    ],
    sections: [
      {
        id: 's1',
        title: 'Introduction to Web Development',
        lectures: [
          { id: 'l1', title: 'Course Introduction', duration: '8:12', type: 'video', isPreview: true },
          { id: 'l2', title: 'How the Internet Works', duration: '12:43', type: 'video', isPreview: true },
          { id: 'l3', title: 'Setting Up Your Development Environment', duration: '15:20', type: 'video' },
          { id: 'l4', title: 'Introduction Quiz', duration: '10:00', type: 'quiz' }
        ]
      },
      {
        id: 's2',
        title: 'HTML Foundations',
        lectures: [
          { id: 'l5', title: 'HTML Basics', duration: '18:30', type: 'video' },
          { id: 'l6', title: 'HTML Elements and Attributes', duration: '22:15', type: 'video' },
          { id: 'l7', title: 'Creating Your First HTML Page', duration: '25:10', type: 'video', isPreview: true },
          { id: 'l8', title: 'HTML Project Files', duration: '5:00', type: 'document' }
        ]
      },
      {
        id: 's3',
        title: 'CSS Fundamentals',
        lectures: [
          { id: 'l9', title: 'CSS Basics', duration: '20:45', type: 'video' },
          { id: 'l10', title: 'CSS Selectors', duration: '19:30', type: 'video' },
          { id: 'l11', title: 'CSS Box Model', duration: '24:00', type: 'video' },
          { id: 'l12', title: 'CSS Layouts', duration: '28:15', type: 'video' }
        ]
      }
    ],
    totalLectures: 328,
    totalDuration: '63 hours',
    lastUpdated: 'September 2023',
    language: 'English',
    certificate: true,
    instructorDetails: {
      name: 'Dr. Angela Yu',
      bio: 'Dr. Angela Yu is a developer and lead instructor at the London App Brewery. She teaches iOS, Flutter, and Web Development courses to students worldwide, having taught over 1 million students across her various courses. Her teaching style is focused on creating engaging and practical content that helps students build real-world projects.',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
      rating: 4.7,
      reviewCount: 98500,
      studentsCount: 1200000,
      coursesCount: 12
    }
  },
  '2': {
    id: '2',
    description: 'Learn to create Machine Learning Algorithms in Python and R from two Data Science experts. Code templates included. This course teaches you all the steps of creating a Machine Learning model, from data preparation to performance evaluation. You will learn how to create powerful Machine Learning models, how to choose the best model for each type of problem, and how to evaluate its performance.',
    whatYouWillLearn: [
      'Master Machine Learning on Python & R',
      'Have a great intuition of many Machine Learning models',
      'Make accurate predictions',
      'Make powerful analysis',
      'Make robust Machine Learning models',
      'Create strong added value to your business'
    ],
    requirements: [
      'Just some high school mathematics level.',
      'Basic Python or R programming knowledge is a plus but not required.',
      'A desire to learn and a passion for Data Science!'
    ],
    sections: [
      {
        id: 's1',
        title: 'Welcome to the Course',
        lectures: [
          { id: 'l1', title: 'Course Introduction', duration: '5:32', type: 'video', isPreview: true },
          { id: 'l2', title: 'What is Machine Learning?', duration: '10:23', type: 'video', isPreview: true },
          { id: 'l3', title: 'Python vs R for Machine Learning', duration: '8:45', type: 'video' }
        ]
      },
      {
        id: 's2',
        title: 'Data Preprocessing',
        lectures: [
          { id: 'l4', title: 'Importing Libraries', duration: '6:30', type: 'video' },
          { id: 'l5', title: 'Importing Datasets', duration: '12:15', type: 'video' },
          { id: 'l6', title: 'Handling Missing Data', duration: '15:10', type: 'video' },
          { id: 'l7', title: 'Preprocessing Quiz', duration: '10:00', type: 'quiz' }
        ]
      },
      {
        id: 's3',
        title: 'Regression',
        lectures: [
          { id: 'l8', title: 'Simple Linear Regression', duration: '28:45', type: 'video' },
          { id: 'l9', title: 'Multiple Linear Regression', duration: '32:30', type: 'video' },
          { id: 'l10', title: 'Polynomial Regression', duration: '25:00', type: 'video' },
          { id: 'l11', title: 'Regression Project Files', duration: '5:00', type: 'document' }
        ]
      }
    ],
    totalLectures: 294,
    totalDuration: '44 hours',
    lastUpdated: 'July 2023',
    language: 'English',
    certificate: true,
    instructorDetails: {
      name: 'Kirill Eremenko',
      bio: 'Kirill Eremenko is a Data Scientist and Forex Systems Expert who has been teaching Data Science and programming for several years. He focuses on making complex topics accessible through practical, hands-on learning and real-world examples.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
      rating: 4.5,
      reviewCount: 76300,
      studentsCount: 850000,
      coursesCount: 15
    }
  },
  '3': {
    id: '3',
    description: 'iOS 13 & Swift 5 - The Complete iOS App Development Bootcamp. From beginner to iOS App Developer with just one course. Fully updated for iOS 13 and Xcode 11. This course teaches you how to build beautiful, functional iOS apps and launch them on the App Store. You\'ll learn Storyboard, Auto Layout, Core Data, ARKit, and more.',
    whatYouWillLearn: [
      'Build over 20 iOS apps using Swift 5',
      'Learn to code using Swift 5 and Xcode 11',
      'Master creating Augmented Reality apps using Apple\'s ARKit',
      'Understand UI design and build beautiful user interfaces',
      'Learn to use Firebase to create fully functional online apps',
      'Master Object-Oriented Programming Concepts'
    ],
    requirements: [
      "No programming experience needed - I'll teach you everything you need to know",
      'A Mac laptop or iMac (macOS 10.14 or higher)',
      'No paid software required - all apps will be created in Xcode 11 (which is free)'
    ],
    sections: [
      {
        id: 's1',
        title: 'Getting Started with iOS Development',
        lectures: [
          { id: 'l1', title: 'Introduction to the Course', duration: '5:22', type: 'video', isPreview: true },
          { id: 'l2', title: 'The iOS App Development Ecosystem', duration: '10:15', type: 'video', isPreview: true },
          { id: 'l3', title: 'Setting Up Xcode', duration: '12:40', type: 'video' }
        ]
      },
      {
        id: 's2',
        title: 'Swift Programming Basics',
        lectures: [
          { id: 'l4', title: 'Variables and Constants', duration: '18:30', type: 'video' },
          { id: 'l5', title: 'Basic Data Types', duration: '16:15', type: 'video' },
          { id: 'l6', title: 'Control Flow', duration: '20:10', type: 'video' },
          { id: 'l7', title: 'Functions and Methods', duration: '22:45', type: 'video' }
        ]
      },
      {
        id: 's3',
        title: 'Building Your First iOS App',
        lectures: [
          { id: 'l8', title: 'Introduction to UIKit', duration: '15:30', type: 'video' },
          { id: 'l9', title: 'Creating a New Project', duration: '8:45', type: 'video', isPreview: true },
          { id: 'l10', title: 'Building a User Interface with Storyboard', duration: '28:20', type: 'video' },
          { id: 'l11', title: 'Connecting UI Elements to Code', duration: '24:50', type: 'video' }
        ]
      }
    ],
    totalLectures: 350,
    totalDuration: '55 hours',
    lastUpdated: 'October 2023',
    language: 'English',
    certificate: true,
    instructorDetails: {
      name: 'Dr. Angela Yu',
      bio: 'Dr. Angela Yu is a developer and lead instructor at the London App Brewery. She teaches iOS, Flutter, and Web Development courses to students worldwide, having taught over 1 million students across her various courses. Her teaching style is focused on creating engaging and practical content that helps students build real-world projects.',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
      rating: 4.8,
      reviewCount: 98500,
      studentsCount: 1200000,
      coursesCount: 12
    }
  },
  '4': {
    id: '4',
    description: 'The Complete Digital Marketing Course - 12 Courses in 1. Master Digital Marketing Strategy, Social Media Marketing, SEO, YouTube, Email, Facebook Marketing, Analytics & More! This comprehensive digital marketing course is designed to take you from beginner to advanced digital marketer within a short time frame. You\'ll be exposed to all the major digital marketing channels and learn how to optimize them for growth.',
    whatYouWillLearn: [
      'Grow a business online from scratch',
      'Master SEO, social media marketing, and content marketing',
      'Learn Facebook Ads, Google Ads, YouTube marketing, and more',
      'Understand market research, branding, and PR strategies',
      'Create a professional website that converts visitors into customers',
      'Analyze and optimize your digital marketing campaigns'
    ],
    requirements: [
      'No prior knowledge required - we teach you everything from scratch',
      'A computer with an internet connection',
      'A desire to learn and implement digital marketing strategies'
    ],
    sections: [
      {
        id: 's1',
        title: 'Introduction to Digital Marketing',
        lectures: [
          { id: 'l1', title: 'Course Overview', duration: '8:10', type: 'video', isPreview: true },
          { id: 'l2', title: 'The Digital Marketing Landscape', duration: '12:35', type: 'video', isPreview: true },
          { id: 'l3', title: 'Creating a Digital Marketing Strategy', duration: '18:20', type: 'video' }
        ]
      },
      {
        id: 's2',
        title: 'Search Engine Optimization (SEO)',
        lectures: [
          { id: 'l4', title: 'Introduction to SEO', duration: '10:30', type: 'video' },
          { id: 'l5', title: 'Keyword Research', duration: '25:15', type: 'video' },
          { id: 'l6', title: 'On-Page SEO Techniques', duration: '22:40', type: 'video' },
          { id: 'l7', title: 'Off-Page SEO Strategies', duration: '18:55', type: 'video' }
        ]
      },
      {
        id: 's3',
        title: 'Social Media Marketing',
        lectures: [
          { id: 'l8', title: 'Social Media Strategy Overview', duration: '15:20', type: 'video' },
          { id: 'l9', title: 'Facebook Marketing', duration: '28:45', type: 'video' },
          { id: 'l10', title: 'Instagram Marketing', duration: '24:30', type: 'video' },
          { id: 'l11', title: 'Twitter and LinkedIn Strategies', duration: '20:15', type: 'video' }
        ]
      }
    ],
    totalLectures: 245,
    totalDuration: '20 hours',
    lastUpdated: 'August 2023',
    language: 'English',
    certificate: true,
    instructorDetails: {
      name: 'Rob Percival',
      bio: 'Rob Percival is a web developer and teacher with a passion for coding and education. He has taught over 1.5 million students across his various programming and digital marketing courses. Rob\'s teaching style focuses on practical, project-based learning that helps students build real skills they can apply immediately.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
      rating: 4.4,
      reviewCount: 68400,
      studentsCount: 1500000,
      coursesCount: 25
    }
  }
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
            : i < rating 
              ? 'text-yellow-400 fill-yellow-400 opacity-50' 
              : 'text-gray-300'
        )}
      />
    ));
};

const CourseDetail = () => {
  const { id = '1' } = useParams();
  const [course, setCourse] = useState<CourseProps | null>(null);
  const [courseDetails, setCourseDetails] = useState<ExtendedCourseDetails | null>(null);
  const [relatedCourses, setRelatedCourses] = useState<CourseProps[]>([]);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Find the course by ID
    const foundCourse = allCourses.find(c => c.id === id);
    if (foundCourse) {
      setCourse(foundCourse);
      
      // Get additional course details
      const details = extendedCourseDetails[id];
      if (details) {
        setCourseDetails(details);
      }
      
      // Find related courses (same category but excluding current course)
      const related = allCourses
        .filter(c => c.category === foundCourse.category && c.id !== id)
        .slice(0, 3);
      setRelatedCourses(related);
    }
  }, [id]);

  const handlePlayVideo = () => {
    setIsVideoPlaying(true);
    // In a real application, this would launch a video player
    setTimeout(() => {
      setIsVideoPlaying(false);
    }, 1000);
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
        <section className="bg-secondary/50 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-sm text-primary font-medium">
                  {course.category}
                </span>
                <span className="text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">
                  {course.level}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">
                {course.title}
              </h1>
              
              <p className="text-lg text-muted-foreground mb-4 animate-slide-up">
                {courseDetails.description.split('.')[0] + '.'}
              </p>
              
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
                <div className="flex items-center">
                  {renderStars(course.rating)}
                  <span className="ml-2 text-sm font-medium">
                    {course.rating.toFixed(1)}
                  </span>
                  <span className="ml-1 text-sm text-muted-foreground">
                    ({course.reviewCount.toLocaleString()} reviews)
                  </span>
                </div>
                
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {course.duration} total length
                  </span>
                </div>
                
                <div className="flex items-center">
                  <Globe className="w-4 h-4 mr-1 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {courseDetails.language}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Last updated {courseDetails.lastUpdated}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center">
                <img 
                  src={courseDetails.instructorDetails.image} 
                  alt={courseDetails.instructorDetails.name}
                  className="w-10 h-10 rounded-full object-cover mr-3"
                />
                <span>Created by <span className="font-medium">{courseDetails.instructorDetails.name}</span></span>
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
                {/* Preview Image/Video */}
                <div className="mb-8 relative rounded-lg overflow-hidden bg-black aspect-video animate-fade-in">
                  {isVideoPlaying ? (
                    <div className="absolute inset-0 flex items-center justify-center text-white">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mx-auto"></div>
                        <p className="mt-2">Loading video...</p>
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
                          className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full w-16 h-16 flex items-center justify-center"
                          onClick={handlePlayVideo}
                        >
                          <Play className="h-8 w-8 fill-white" />
                        </Button>
                      </div>
                      <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                        Watch Preview
                      </div>
                    </>
                  )}
                </div>
                
                {/* Course Tabs */}
                <Tabs defaultValue="overview" className="mb-8">
                  <TabsList className="mb-6">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                    <TabsTrigger value="instructor">Instructor</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="animate-fade-in">
                    <div className="space-y-8">
                      {/* What You'll Learn */}
                      <div className="bg-white shadow-sm rounded-lg p-6">
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
                      
                      {/* Requirements */}
                      <div className="bg-white shadow-sm rounded-lg p-6">
                        <h3 className="text-xl font-semibold mb-4">Requirements</h3>
                        <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                          {courseDetails.requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Description */}
                      <div className="bg-white shadow-sm rounded-lg p-6">
                        <h3 className="text-xl font-semibold mb-4">Description</h3>
                        <div className="prose max-w-none text-muted-foreground">
                          <p>{courseDetails.description}</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="curriculum" className="animate-fade-in">
                    <CourseContent 
                      sections={courseDetails.sections}
                      totalLectures={courseDetails.totalLectures}
                      totalDuration={courseDetails.totalDuration}
                    />
                  </TabsContent>
                  
                  <TabsContent value="instructor" className="animate-fade-in">
                    <div className="bg-white shadow-sm rounded-lg p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/4">
                          <img 
                            src={courseDetails.instructorDetails.image} 
                            alt={courseDetails.instructorDetails.name}
                            className="w-32 h-32 object-cover rounded-full mx-auto"
                          />
                        </div>
                        <div className="md:w-3/4">
                          <h3 className="text-xl font-semibold mb-2">{courseDetails.instructorDetails.name}</h3>
                          
                          <div className="flex items-center text-sm text-muted-foreground mb-4">
                            {renderStars(courseDetails.instructorDetails.rating)}
                            <span className="ml-2">{courseDetails.instructorDetails.rating.toFixed(1)} Instructor Rating</span>
                            <span className="mx-2">•</span>
                            <span>{courseDetails.instructorDetails.reviewCount.toLocaleString()} Reviews</span>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                            <div className="bg-secondary p-3 rounded-lg text-center">
                              <div className="text-lg font-semibold">{courseDetails.instructorDetails.studentsCount.toLocaleString()}</div>
                              <div className="text-xs text-muted-foreground">Students</div>
                            </div>
                            <div className="bg-secondary p-3 rounded-lg text-center">
                              <div className="text-lg font-semibold">{courseDetails.instructorDetails.coursesCount}</div>
                              <div className="text-xs text-muted-foreground">Courses</div>
                            </div>
                          </div>
                          
                          <p className="text-muted-foreground">
                            {courseDetails.instructorDetails.bio}
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="reviews" className="animate-fade-in">
                    <div className="bg-white shadow-sm rounded-lg p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/3 text-center p-6 border-r">
                          <div className="text-5xl font-bold text-primary mb-2">{course.rating.toFixed(1)}</div>
                          <div className="flex justify-center mb-2">
                            {renderStars(course.rating)}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Course Rating ({course.reviewCount.toLocaleString()} ratings)
                          </div>
                        </div>
                        
                        <div className="md:w-2/3">
                          <h3 className="text-xl font-semibold mb-4">Student Feedback</h3>
                          
                          {/* Rating Bars - 5 to 1 stars */}
                          <div className="space-y-3">
                            {[5, 4, 3, 2, 1].map((stars) => {
                              // Calculate percentage based on a distribution
                              const percentage = stars === 5 ? 78 :
                                                stars === 4 ? 15 :
                                                stars === 3 ? 5 :
                                                stars === 2 ? 1 : 1;
                              
                              return (
                                <div key={stars} className="flex items-center">
                                  <div className="flex items-center mr-2">
                                    <span className="text-sm text-muted-foreground mr-1">{stars}</span>
                                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                  </div>
                                  <div className="flex-grow bg-gray-200 rounded-full h-2 mr-2">
                                    <div 
                                      className="bg-primary h-2 rounded-full"
                                      style={{ width: `${percentage}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-sm text-muted-foreground">{percentage}%</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
                
                {/* Related Courses */}
                {relatedCourses.length > 0 && (
                  <div className="mt-12">
                    <h3 className="text-xl font-semibold mb-6">Related Courses</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {relatedCourses.map((relatedCourse) => (
                        <CourseCard key={relatedCourse.id} {...relatedCourse} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Sidebar */}
              <div className="lg:w-4/12">
                <div className="sticky top-24">
                  <div className="bg-white shadow-lg rounded-lg overflow-hidden animate-scale-in">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <span className="text-3xl font-bold">${course.price.toFixed(2)}</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="icon" aria-label="Wishlist">
                            <Heart className="w-5 h-5" />
                          </Button>
                          <Button variant="outline" size="icon" aria-label="Share">
                            <Share2 className="w-5 h-5" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-3 mb-6">
                        <Button className="w-full flex items-center justify-center" size="lg">
                          <ShoppingCart className="w-5 h-5 mr-2" />
                          Add to Cart
                        </Button>
                        <Button variant="outline" className="w-full" size="lg">
                          Buy Now
                        </Button>
                      </div>
                      
                      <div className="text-sm text-center text-muted-foreground mb-6">
                        30-Day Money-Back Guarantee
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
                            <Clock className="w-5 h-5 text-muted-foreground mr-3 flex-shrink-0" />
                            <span>Full lifetime access</span>
                          </div>
                          <div className="flex items-start">
                            <Globe className="w-5 h-5 text-muted-foreground mr-3 flex-shrink-0" />
                            <span>Access on mobile and TV</span>
                          </div>
                          {courseDetails.certificate && (
                            <div className="flex items-start">
                              <Award className="w-5 h-5 text-muted-foreground mr-3 flex-shrink-0" />
                              <span>Certificate of completion</span>
                            </div>
                          )}
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
