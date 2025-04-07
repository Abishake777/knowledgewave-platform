import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Clock, Calendar, Globe, Award, ChevronDown, ChevronUp, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CourseProps } from '@/components/CourseCard';

// Sample course data (expanded from catalog)
const allCourses: CourseProps[] = [
  {
    id: '1',
    title: 'The Complete Web Development Bootcamp',
    instructor: 'Dr. Angela Yu',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80',
    price: 94.99,
    rating: 4.7,
    reviewCount: 154000,
    duration: '63 hours',
    level: 'All Levels',
    category: 'Development',
    featured: true,
  },
  {
    id: '2',
    title: 'Machine Learning A-Z: Hands-On Python & R',
    instructor: 'Kirill Eremenko',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    price: 89.99,
    rating: 4.5,
    reviewCount: 125000,
    duration: '44 hours',
    level: 'Intermediate',
    category: 'Data Science',
  },
  {
    id: '3',
    title: 'iOS App Development Bootcamp',
    instructor: 'Dr. Angela Yu',
    image: 'https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    price: 94.99,
    rating: 4.8,
    reviewCount: 49500,
    duration: '55 hours',
    level: 'All Levels',
    category: 'Development',
    featured: true,
  },
  {
    id: '4',
    title: 'The Complete Digital Marketing Course',
    instructor: 'Rob Percival',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80',
    price: 84.99,
    rating: 4.4,
    reviewCount: 23400,
    duration: '20 hours',
    level: 'Beginner',
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
    title: string;
    lectures: number;
    duration: string;
    content?: string[];
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
        title: 'Introduction to Web Development',
        lectures: 12,
        duration: '1.5 hours',
        content: [
          'How the Internet Works',
          'HTML Basics',
          'CSS Fundamentals',
          'Your First Web Page'
        ]
      },
      {
        title: 'JavaScript Basics',
        lectures: 24,
        duration: '4 hours',
        content: [
          'JavaScript Variables',
          'Control Flow',
          'JavaScript Functions',
          'DOM Manipulation'
        ]
      },
      {
        title: 'React Development',
        lectures: 36,
        duration: '8 hours',
        content: [
          'React Components',
          'State Management',
          'React Hooks',
          'Building a React App'
        ]
      },
      {
        title: 'Node.js Backend Development',
        lectures: 28,
        duration: '6 hours'
      },
      {
        title: 'Database Integration with MongoDB',
        lectures: 18,
        duration: '4 hours'
      },
      {
        title: 'Authentication and Security',
        lectures: 14,
        duration: '3 hours'
      },
      {
        title: 'Deployment and DevOps',
        lectures: 10,
        duration: '2 hours'
      }
    ],
    totalLectures: 328,
    totalDuration: '63 hours',
    lastUpdated: 'September 2023',
    language: 'English',
    certificate: true,
    instructorDetails: {
      name: 'Dr. Angela Yu',
      bio: 'Dr. Angela Yu is a developer and lead instructor at the London App Brewery. She has taught over 1 million students how to code through her online courses. With a background in both medicine and programming, she brings a unique perspective to teaching technical skills in an accessible way.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1061&q=80',
      rating: 4.7,
      reviewCount: 154000,
      studentsCount: 1000000,
      coursesCount: 8
    }
  },
  '2': {
    id: '2',
    description: 'Learn to create Machine Learning Algorithms in Python and R from two Data Science experts. Code templates included. This course has been designed by two professional Data Scientists so that we can share our knowledge and help you learn complex theory, algorithms, and coding libraries in a simple way. We will walk you step-by-step into the World of Machine Learning.',
    whatYouWillLearn: [
      'Master Machine Learning on Python & R',
      'Have a great intuition of many Machine Learning models',
      'Make accurate predictions with regression analysis',
      'Make robust Machine Learning models',
      'Use Machine Learning for personal purpose',
      'Handle specific topics like Reinforcement Learning, NLP and Deep Learning'
    ],
    requirements: [
      'Just some high school mathematics level',
      'Basic Python or R knowledge is a plus but not a must',
      'Willing to learn and practice'
    ],
    sections: [
      {
        title: 'Data Preprocessing',
        lectures: 10,
        duration: '2 hours',
        content: [
          'Importing Libraries',
          'Importing Datasets',
          'Handling Missing Data',
          'Feature Scaling'
        ]
      },
      {
        title: 'Regression',
        lectures: 30,
        duration: '8 hours',
        content: [
          'Simple Linear Regression',
          'Multiple Linear Regression',
          'Polynomial Regression',
          'Support Vector Regression'
        ]
      },
      {
        title: 'Classification',
        lectures: 28,
        duration: '7 hours',
        content: [
          'Logistic Regression',
          'K-Nearest Neighbors',
          'Support Vector Machine',
          'Decision Trees'
        ]
      },
      {
        title: 'Clustering',
        lectures: 12,
        duration: '3 hours'
      },
      {
        title: 'Association Rule Learning',
        lectures: 8,
        duration: '2 hours'
      },
      {
        title: 'Reinforcement Learning',
        lectures: 10,
        duration: '3 hours'
      },
      {
        title: 'Natural Language Processing',
        lectures: 12,
        duration: '4 hours'
      },
      {
        title: 'Deep Learning',
        lectures: 20,
        duration: '6 hours'
      }
    ],
    totalLectures: 280,
    totalDuration: '44 hours',
    lastUpdated: 'August 2023',
    language: 'English',
    certificate: true,
    instructorDetails: {
      name: 'Kirill Eremenko',
      bio: 'Kirill Eremenko is a Data Scientist and Forex Systems Expert. He has worked in the financial industry for several years and has a passion for teaching complex technical concepts in an easy-to-understand manner. His courses have helped hundreds of thousands of students master data science and machine learning.',
      image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      rating: 4.5,
      reviewCount: 125000,
      studentsCount: 800000,
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
        title: 'Getting Started with iOS Development',
        lectures: 15,
        duration: '3 hours',
        content: [
          'Introduction to Xcode',
          'Swift Basics',
          'Building Your First App',
          'App Design Principles'
        ]
      },
      {
        title: 'Swift Programming',
        lectures: 40,
        duration: '10 hours',
        content: [
          'Swift Variables and Constants',
          'Control Flow',
          'Swift Functions',
          'Object-Oriented Programming'
        ]
      },
      {
        title: 'iOS App Design',
        lectures: 30,
        duration: '8 hours',
        content: [
          'Auto Layout',
          'Responsive UIs',
          'Animation',
          'Custom Components'
        ]
      },
      {
        title: 'Networking and APIs',
        lectures: 25,
        duration: '6 hours'
      },
      {
        title: 'Data Persistence',
        lectures: 20,
        duration: '5 hours'
      },
      {
        title: 'Firebase Integration',
        lectures: 15,
        duration: '4 hours'
      },
      {
        title: 'Augmented Reality with ARKit',
        lectures: 20,
        duration: '6 hours'
      },
      {
        title: 'Publishing to the App Store',
        lectures: 10,
        duration: '2 hours'
      }
    ],
    totalLectures: 350,
    totalDuration: '55 hours',
    lastUpdated: 'October 2023',
    language: 'English',
    certificate: true,
    instructorDetails: {
      name: 'Dr. Angela Yu',
      bio: 'Dr. Angela Yu is a developer and lead instructor at the London App Brewery. She has taught over 1 million students how to code through her online courses. With a background in both medicine and programming, she brings a unique perspective to teaching technical skills in an accessible way.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1061&q=80',
      rating: 4.8,
      reviewCount: 49500,
      studentsCount: 1000000,
      coursesCount: 8
    }
  },
  '4': {
    id: '4',
    description: 'The Complete Digital Marketing Course - 12 Courses in 1. Master Digital Marketing Strategy, Social Media Marketing, SEO, YouTube, Email, Facebook Marketing, Analytics & More! This comprehensive digital marketing course is designed to take you from beginner to advanced digital marketer within a short time frame. You\'ll be exposed to all the major digital marketing channels and learn how to optimize them for growth.',
    whatYouWillLearn: [
      'Grow a business online from scratch',
      'Master SEO, social media marketing, and content marketing',
      'Create effective Facebook, YouTube and Google Ads campaigns',
      'Learn email marketing techniques that convert',
      'Understand web analytics and conversion optimization',
      'Build a professional marketing strategy'
    ],
    requirements: [
      'No prior knowledge required - enthusiasm and determination to make your business succeed online',
      'A computer with Internet connection',
      'No paid software or tools required'
    ],
    sections: [
      {
        title: 'Introduction to Digital Marketing',
        lectures: 10,
        duration: '1 hour',
        content: [
          'Digital Marketing Overview',
          'Building a Marketing Strategy',
          'Understanding Your Target Audience',
          'Digital Marketing Channels'
        ]
      },
      {
        title: 'Content Marketing',
        lectures: 20,
        duration: '3 hours',
        content: [
          'Content Strategy',
          'Blogging for Business',
          'Video Content Creation',
          'Content Distribution'
        ]
      },
      {
        title: 'Search Engine Optimization (SEO)',
        lectures: 30,
        duration: '4 hours',
        content: [
          'On-Page SEO',
          'Off-Page SEO',
          'Technical SEO',
          'Local SEO'
        ]
      },
      {
        title: 'Social Media Marketing',
        lectures: 35,
        duration: '5 hours'
      },
      {
        title: 'Email Marketing',
        lectures: 20,
        duration: '2 hours'
      },
      {
        title: 'Google Ads',
        lectures: 25,
        duration: '3 hours'
      },
      {
        title: 'Facebook & Instagram Ads',
        lectures: 25,
        duration: '3 hours'
      },
      {
        title: 'Analytics and Optimization',
        lectures: 15,
        duration: '2 hours'
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
            : 'text-gray-300'
        )}
      />
    ));
};

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<CourseProps | null>(null);
  const [courseDetails, setCourseDetails] = useState<ExtendedCourseDetails | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<number, boolean>>({});
  
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Find the course by id
    if (id) {
      const foundCourse = allCourses.find(c => c.id === id);
      const foundDetails = extendedCourseDetails[id];
      
      if (foundCourse) setCourse(foundCourse);
      if (foundDetails) setCourseDetails(foundDetails);
    }
  }, [id]);
  
  const toggleSection = (index: number) => {
    setExpandedSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };
  
  if (!course || !courseDetails) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-24">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Course not found</h1>
            <p className="mt-4 text-muted-foreground">
              The course you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild className="mt-6">
              <Link to="/catalog">Browse Courses</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Course Header */}
        <section className="pt-24 pb-8 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-4">
                  {course.title}
                </h1>
                <p className="text-lg mb-4">
                  {courseDetails.description}
                </p>
                
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {renderStars(course.rating)}
                  </div>
                  <span className="ml-2 text-sm">
                    ({course.reviewCount.toLocaleString()} reviews)
                  </span>
                </div>
                
                <p className="mb-4">
                  Created by <span className="text-primary">{course.instructor}</span>
                </p>
                
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    Last updated {courseDetails.lastUpdated}
                  </div>
                  <div className="flex items-center text-sm">
                    <Globe className="w-4 h-4 mr-2" />
                    {courseDetails.language}
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="w-4 h-4 mr-2" />
                    {courseDetails.totalDuration}
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative aspect-video">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="bg-white/90 rounded-full p-4 cursor-pointer hover:bg-white transition-colors">
                      <Play className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-3xl font-bold">${course.price.toFixed(2)}</div>
                  </div>
                  
                  <Button className="w-full mb-4" size="lg">
                    Enroll Now
                  </Button>
                  
                  <Button variant="outline" className="w-full" size="lg">
                    Add to Wishlist
                  </Button>
                  
                  <div className="mt-6 text-sm">
                    <p className="mb-2">This course includes:</p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Clock className="w-4 h-4 mr-2 mt-0.5" />
                        <span>{courseDetails.totalDuration} on-demand video</span>
                      </li>
                      <li className="flex items-start">
                        <Award className="w-4 h-4 mr-2 mt-0.5" />
                        <span>Certificate of completion</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Course Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                {/* What You'll Learn */}
                <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                  <h2 className="text-xl font-bold mb-4">What You'll Learn</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {courseDetails.whatYouWillLearn.map((item, index) => (
                      <div key={index} className="flex items-start">
                        <Check className="w-5 h-5 mr-2 text-primary flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Course Content */}
                <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                  <h2 className="text-xl font-bold mb-4">Course Content</h2>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm text-muted-foreground">
                      {courseDetails.sections.length} sections • {courseDetails.totalLectures} lectures • {courseDetails.totalDuration} total length
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {courseDetails.sections.map((section, index) => (
                      <div key={index} className="border rounded-md overflow-hidden">
                        <div 
                          className="flex items-center justify-between p-4 cursor-pointer bg-secondary/50 hover:bg-secondary/70"
                          onClick={() => toggleSection(index)}
                        >
                          <div className="font-medium flex items-center">
                            {expandedSections[index] ? (
                              <ChevronUp className="w-5 h-5 mr-2" />
                            ) : (
                              <ChevronDown className="w-5 h-5 mr-2" />
                            )}
                            {section.title}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {section.lectures} lectures • {section.duration}
                          </div>
                        </div>
                        
                        {expandedSections[index] && section.content && (
                          <div className="p-4 bg-white border-t">
                            <ul className="space-y-3">
                              {section.content.map((lecture, lectureIndex) => (
                                <li key={lectureIndex} className="flex items-center">
                                  <Play className="w-4 h-4 mr-3 text-muted-foreground" />
                                  <span>{lecture}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Requirements */}
                <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                  <h2 className="text-xl font-bold mb-4">Requirements</h2>
                  <ul className="space-y-2">
                    {courseDetails.requirements.map((req, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 mr-3" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Instructor */}
              <div>
                <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
                  <h2 className="text-xl font-bold mb-4">Instructor</h2>
                  <div className="flex items-center mb-4">
                    <img 
                      src={courseDetails.instructorDetails.image} 
                      alt={courseDetails.instructorDetails.name}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="font-semibold text-lg">
                        {courseDetails.instructorDetails.name}
                      </h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                        {courseDetails.instructorDetails.rating} Instructor Rating
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <div className="font-medium">{courseDetails.instructorDetails.reviewCount.toLocaleString()}</div>
                      <div className="text-muted-foreground">Reviews</div>
                    </div>
                    <div>
                      <div className="font-medium">{courseDetails.instructorDetails.studentsCount.toLocaleString()}</div>
                      <div className="text-muted-foreground">Students</div>
                    </div>
                    <div>
                      <div className="font-medium">{courseDetails.instructorDetails.coursesCount}</div>
                      <div className="text-muted-foreground">Courses</div>
                    </div>
                  </div>
                  
                  <p className="text-sm mb-4">
                    {courseDetails.instructorDetails.bio}
                  </p>
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
