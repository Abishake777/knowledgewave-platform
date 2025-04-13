import { useParams, Link } from 'react-router-dom';
import { ChevronRight, CheckCircle, ShoppingCart, Heart, BookOpen, Clock, Calendar, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CourseContent from '@/components/CourseContent';
import CourseVideoPlayer from '@/components/CourseVideoPlayer';
import { useToast } from '@/components/ui/use-toast';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';

// Mock data for the course details page - in a real app, this would come from an API
const courseDetails = {
  id: '4',
  title: 'Advanced JavaScript: Building Modern Web Applications',
  description: 'Dive deep into JavaScript and learn to build modern, responsive web applications with the latest techniques and frameworks.',
  longDescription: 'This comprehensive course takes you through the entire JavaScript ecosystem, from core concepts to advanced topics. You\'ll master modern ES6+ syntax, asynchronous programming, and state management. By the end of this course, you\'ll be able to build sophisticated web applications using the latest frameworks and tools.\n\nWe\'ll explore real-world scenarios and build projects that you can include in your portfolio, making you job-ready for the competitive web development market.',
  instructor: {
    name: 'Alex Johnson',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80',
    bio: 'Full Stack Developer with 10+ years of experience. Previously worked at Google and Microsoft, now teaching full-time.'
  },
  image: 'https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2343&q=80',
  enrolledStudents: 1240,
  level: 'Intermediate',
  duration: '32 hours',
  lastUpdated: 'December 2023',
  price: 89.99,
  discountPrice: 49.99,
  rating: 4.8,
  reviewsCount: 325,
  tags: ['JavaScript', 'Web Development', 'React', 'Node.js'],
  hasVideos: true
};

// Mock course chapters and lessons
const chapters = [
  {
    id: 'chapter-1',
    title: 'JavaScript Fundamentals Refresher',
    lessons: [
      { id: 'lesson-1-1', title: 'Variables, Data Types, and Operators', duration: '12:30', isLocked: false },
      { id: 'lesson-1-2', title: 'Control Flow: Conditionals and Loops', duration: '15:45', isLocked: false },
      { id: 'lesson-1-3', title: 'Functions and Scope', duration: '18:20', isLocked: true },
      { id: 'lesson-1-4', title: 'Objects and Arrays', duration: '22:15', isLocked: true },
    ],
  },
  {
    id: 'chapter-2',
    title: 'Modern JavaScript (ES6+)',
    lessons: [
      { id: 'lesson-2-1', title: 'Arrow Functions', duration: '10:15', isLocked: true },
      { id: 'lesson-2-2', title: 'Destructuring and Spread Operators', duration: '14:30', isLocked: true },
      { id: 'lesson-2-3', title: 'Template Literals and String Methods', duration: '11:45', isLocked: true },
      { id: 'lesson-2-4', title: 'Modules and Import/Export', duration: '16:20', isLocked: true },
    ],
  },
  {
    id: 'chapter-3',
    title: 'Asynchronous JavaScript',
    lessons: [
      { id: 'lesson-3-1', title: 'Callbacks and the Event Loop', duration: '17:30', isLocked: true },
      { id: 'lesson-3-2', title: 'Promises', duration: '20:15', isLocked: true },
      { id: 'lesson-3-3', title: 'Async/Await', duration: '18:45', isLocked: true },
      { id: 'lesson-3-4', title: 'Fetch API and Axios', duration: '22:00', isLocked: true },
    ],
  },
];

// Mock course reviews
const reviews = [
  {
    id: 'review-1',
    user: {
      name: 'Sarah M.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
    },
    rating: 5,
    date: 'October 15, 2023',
    comment: "This course exceeded my expectations. The instructor explains complex concepts in a way that's easy to understand, and the projects really helped cement my knowledge.",
  },
  {
    id: 'review-2',
    user: {
      name: 'Michael T.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
    },
    rating: 4,
    date: 'September 28, 2023',
    comment: "Great course for intermediate developers looking to level up their JavaScript skills. The section on asynchronous programming was particularly helpful for my work projects.",
  },
  {
    id: 'review-3',
    user: {
      name: 'Jennifer L.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
    },
    rating: 5,
    date: 'November 5, 2023',
    comment: "Alex is an amazing instructor! The way he explains JavaScript concepts made things click that I've been struggling with for months. Highly recommend!",
  },
];

export default function CourseDetail() {
  const { id } = useParams();
  const { toast } = useToast();
  const { addToCart, isInCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();
  
  // In a real app, you would fetch the course by ID from an API
  const course = courseDetails;
  
  const handleAddToCart = () => {
    if (isInCart(course.id)) {
      toast({
        title: "Already in cart",
        description: "This course is already in your cart."
      });
      return;
    }
    
    addToCart({
      id: course.id,
      title: course.title,
      price: course.discountPrice || course.price,
      instructor: course.instructor.name,
      image: course.image
    });
    
    toast({
      title: "Added to cart",
      description: `${course.title} has been added to your cart.`
    });
  };
  
  const toggleWishlist = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to add courses to your wishlist.",
        variant: "destructive"
      });
      return;
    }
    
    const isWishlisted = isInWishlist(course.id);
    
    if (isWishlisted) {
      removeFromWishlist(course.id);
      toast({
        title: "Removed from wishlist",
        description: `${course.title} has been removed from your wishlist.`
      });
    } else {
      addToWishlist({
        id: course.id,
        title: course.title,
        price: course.discountPrice || course.price,
        instructor: course.instructor.name,
        image: course.image
      });
      toast({
        title: "Added to wishlist",
        description: `${course.title} has been added to your wishlist.`
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Course Header */}
        <div className="bg-muted/30 pt-10 pb-10">
          <div className="container mx-auto px-4">
            {/* Breadcrumbs */}
            <div className="flex items-center text-sm mb-6">
              <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                Home
              </Link>
              <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
              <Link to="/catalog" className="text-muted-foreground hover:text-foreground transition-colors">
                Courses
              </Link>
              <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
              <span className="text-foreground font-medium">
                {course.title}
              </span>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-4">
                  {course.title}
                </h1>
                <p className="text-muted-foreground mb-4">
                  {course.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {course.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="bg-primary/10">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center mb-6">
                  <div className="flex mr-4">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(course.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm font-medium">{course.rating}</span>
                  <span className="text-sm text-muted-foreground ml-1">({course.reviewsCount} reviews)</span>
                </div>
                
                <div className="flex items-center mb-4">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={course.instructor.avatar} alt={course.instructor.name} />
                    <AvatarFallback>{course.instructor.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Instructor</p>
                    <p className="text-muted-foreground text-sm">{course.instructor.name}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="flex flex-col">
                    <div className="flex items-center text-sm text-muted-foreground mb-1">
                      <BookOpen className="h-4 w-4 mr-1" />
                      <span>Level</span>
                    </div>
                    <span className="text-sm font-medium">{course.level}</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center text-sm text-muted-foreground mb-1">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Duration</span>
                    </div>
                    <span className="text-sm font-medium">{course.duration}</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center text-sm text-muted-foreground mb-1">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Updated</span>
                    </div>
                    <span className="text-sm font-medium">{course.lastUpdated}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="aspect-video w-full rounded-lg overflow-hidden mb-6">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="mb-4">
                      {course.discountPrice ? (
                        <div className="flex items-baseline">
                          <span className="text-3xl font-bold">${course.discountPrice}</span>
                          <span className="text-lg text-muted-foreground line-through ml-2">${course.price}</span>
                          <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-100">
                            {Math.round((1 - course.discountPrice / course.price) * 100)}% OFF
                          </Badge>
                        </div>
                      ) : (
                        <span className="text-3xl font-bold">${course.price}</span>
                      )}
                    </div>
                    
                    <div className="space-y-3">
                      <Button 
                        className="w-full" 
                        size="lg"
                        onClick={handleAddToCart}
                        disabled={isInCart(course.id)}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        {isInCart(course.id) ? 'Added to Cart' : 'Add to Cart'}
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        className="w-full" 
                        size="lg"
                        onClick={toggleWishlist}
                      >
                        <Heart 
                          className={`h-4 w-4 mr-2 ${isInWishlist(course.id) ? 'fill-current text-red-500' : ''}`} 
                        />
                        {isInWishlist(course.id) ? 'Wishlisted' : 'Add to Wishlist'}
                      </Button>
                    </div>
                    
                    <div className="mt-6 space-y-3">
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-primary mr-3" />
                        <span className="text-sm">Full lifetime access</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-primary mr-3" />
                        <span className="text-sm">Access on mobile and TV</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-primary mr-3" />
                        <span className="text-sm">Certificate of completion</span>
                      </div>
                      {course.hasVideos && (
                        <div className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-primary mr-3" />
                          <span className="text-sm">Video lectures</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
        
        {/* Course Content */}
        <div className="py-10">
          <div className="container mx-auto px-4">
            {/* Video Player (if course has videos) */}
            {course.hasVideos && (
              <CourseVideoPlayer courseId={course.id} />
            )}
            
            <Tabs defaultValue="content" className="mb-8">
              <TabsList className="mb-6">
                <TabsTrigger value="content">Course Content</TabsTrigger>
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="content">
                <CourseContent chapters={chapters} />
              </TabsContent>
              
              <TabsContent value="description">
                <Card>
                  <CardContent className="p-6">
                    <div className="prose max-w-none">
                      <h3 className="text-xl font-semibold mb-4">About this course</h3>
                      <p className="mb-4 whitespace-pre-line">{course.longDescription}</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="instructor">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/4">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src={course.instructor.avatar} alt={course.instructor.name} />
                          <AvatarFallback>{course.instructor.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="md:w-3/4">
                        <h3 className="text-xl font-semibold mb-2">{course.instructor.name}</h3>
                        <p className="text-muted-foreground mb-4">
                          {course.instructor.bio}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviews">
                <Card>
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center mb-2">
                          <span className="text-4xl font-bold mr-3">{course.rating}</span>
                          <div>
                            <div className="flex mb-1">
                              {[...Array(5)].map((_, i) => (
                                <svg 
                                  key={i}
                                  className={`w-5 h-5 ${i < Math.floor(course.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                                  fill="currentColor" 
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">{course.reviewsCount} reviews</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="w-full md:w-2/5">
                        <div className="space-y-2">
                          {[5, 4, 3, 2, 1].map((rating) => {
                            const percentage = rating === 5 ? 65 : rating === 4 ? 25 : rating === 3 ? 7 : rating === 2 ? 2 : 1;
                            return (
                              <div key={rating} className="flex items-center">
                                <div className="flex items-center w-12">
                                  <span className="text-sm mr-1">{rating}</span>
                                  <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                </div>
                                <div className="w-full ml-3">
                                  <Progress value={percentage} className="h-2" />
                                </div>
                                <span className="text-sm text-muted-foreground ml-3 w-10">{percentage}%</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <Separator />
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <div key={review.id} className="pb-6 border-b last:border-0 last:pb-0">
                          <div className="flex items-start">
                            <Avatar className="h-10 w-10 mr-4">
                              <AvatarImage src={review.user.avatar} alt={review.user.name} />
                              <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                                <div>
                                  <h4 className="text-sm font-semibold">{review.user.name}</h4>
                                  <div className="flex items-center">
                                    <div className="flex">
                                      {[...Array(5)].map((_, i) => (
                                        <svg 
                                          key={i}
                                          className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                                          fill="currentColor" 
                                          viewBox="0 0 20 20"
                                        >
                                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                <span className="text-xs text-muted-foreground mt-1 sm:mt-0">{review.date}</span>
                              </div>
                              <p className="text-sm">{review.comment}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-center p-6 pt-0">
                    <Button variant="outline">See All Reviews</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
