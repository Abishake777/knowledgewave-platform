import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/context/AuthContext';
import { Users, BookOpen, BarChart3, Clock, Calendar, FileVideo, Upload } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const enrolledStudents = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
    enrolledDate: '2023-12-15',
    progress: 65,
    courseId: '1'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
    enrolledDate: '2023-12-10',
    progress: 42,
    courseId: '1'
  },
  {
    id: '3',
    name: 'Robert Johnson',
    email: 'robert.johnson@example.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
    enrolledDate: '2023-12-20',
    progress: 28,
    courseId: '2'
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
    enrolledDate: '2023-12-05',
    progress: 90,
    courseId: '2'
  },
  {
    id: '5',
    name: 'Michael Wilson',
    email: 'michael.wilson@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
    enrolledDate: '2023-12-18',
    progress: 53,
    courseId: '3'
  }
];

const tutorCourses = [
  {
    id: '1',
    title: 'Complete Web Development Bootcamp',
    students: 2,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2344&q=80',
    rating: 4.7,
    revenue: 179.98,
    lastUpdated: '2023-11-15'
  },
  {
    id: '2',
    title: 'Machine Learning A-Z: Python & R In Data Science',
    students: 2,
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    rating: 4.5,
    revenue: 189.98,
    lastUpdated: '2023-10-20'
  },
  {
    id: '3',
    title: 'iOS & Swift - Complete iOS App Development',
    students: 1,
    image: 'https://images.unsplash.com/photo-1621839673705-6617adf9e890?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2332&q=80',
    rating: 4.8,
    revenue: 99.99,
    lastUpdated: '2023-09-25'
  }
];

const courseLectures = [
  {
    id: 'video-1',
    courseId: '1',
    title: 'Introduction to Web Development',
    description: 'Overview of the web development landscape and tools we will use.',
    url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    uploadDate: '2023-12-01',
    duration: '10:15'
  },
  {
    id: 'video-2',
    courseId: '1',
    title: 'HTML Basics',
    description: 'Learn the fundamentals of HTML markup and document structure.',
    url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    uploadDate: '2023-12-05',
    duration: '15:30'
  },
  {
    id: 'video-3',
    courseId: '2',
    title: 'Machine Learning Fundamentals',
    description: 'Introduction to key machine learning concepts and algorithms.',
    url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    uploadDate: '2023-11-20',
    duration: '20:45'
  }
];

type VideoLecture = {
  id: string;
  courseId: string;
  title: string;
  description: string;
  url: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration: string;
};

const TutorDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [lectures, setLectures] = useState<VideoLecture[]>(courseLectures);
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newVideo, setNewVideo] = useState({
    title: '',
    description: '',
    file: null as File | null,
    thumbnail: null as File | null,
    duration: ''
  });

  useEffect(() => {
    if (!isAuthenticated || !user?.role || user.role !== 'tutor') {
      navigate('/tutor/signin');
    }
  }, [isAuthenticated, user, navigate]);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const handleVideoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCourseId || !newVideo.title || !newVideo.file) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    const newLecture: VideoLecture = {
      id: `video-${Date.now()}`,
      courseId: selectedCourseId,
      title: newVideo.title,
      description: newVideo.description,
      url: newVideo.file ? URL.createObjectURL(newVideo.file) : '',
      thumbnailUrl: newVideo.thumbnail ? URL.createObjectURL(newVideo.thumbnail) : 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      uploadDate: new Date().toISOString().split('T')[0],
      duration: newVideo.duration || '00:00'
    };
    
    setLectures([...lectures, newLecture]);
    
    toast({
      title: "Video uploaded",
      description: "Your lecture has been successfully uploaded."
    });
    
    setNewVideo({
      title: '',
      description: '',
      file: null,
      thumbnail: null,
      duration: ''
    });
    
    setIsDialogOpen(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'video' | 'thumbnail') => {
    if (e.target.files && e.target.files[0]) {
      if (type === 'video') {
        setNewVideo({ ...newVideo, file: e.target.files[0] });
        
        const video = document.createElement('video');
        video.preload = 'metadata';
        video.onloadedmetadata = function() {
          window.URL.revokeObjectURL(video.src);
          const duration = Math.floor(video.duration);
          const minutes = Math.floor(duration / 60);
          const seconds = duration % 60;
          setNewVideo(prev => ({ 
            ...prev, 
            duration: `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}` 
          }));
        };
        video.src = URL.createObjectURL(e.target.files[0]);
      } else {
        setNewVideo({ ...newVideo, thumbnail: e.target.files[0] });
      }
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20 pb-10">
        <div className="container mx-auto px-4">
          <div className="py-8">
            <h1 className="text-2xl font-bold mb-2">Tutor Dashboard</h1>
            <p className="text-muted-foreground">Manage your courses and students</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">+2 this month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">+1 this month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$469.95</div>
                <p className="text-xs text-muted-foreground">+$189.98 this month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Completion</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">55.6%</div>
                <p className="text-xs text-muted-foreground">+7.4% this month</p>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="students" className="space-y-6">
            <TabsList>
              <TabsTrigger value="students">Enrolled Students</TabsTrigger>
              <TabsTrigger value="courses">Your Courses</TabsTrigger>
              <TabsTrigger value="videos">Course Videos</TabsTrigger>
            </TabsList>
            
            <TabsContent value="students">
              <Card>
                <CardHeader>
                  <CardTitle>Students</CardTitle>
                  <CardDescription>
                    Manage students enrolled in your courses.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-[1fr_1fr_1fr_100px] md:grid-cols-[1fr_1fr_1fr_1fr_100px] p-4 font-medium">
                      <div>Student</div>
                      <div className="hidden md:block">Email</div>
                      <div>Course</div>
                      <div>Progress</div>
                      <div></div>
                    </div>
                    <Separator />
                    {enrolledStudents.map((student) => {
                      const course = tutorCourses.find(c => c.id === student.courseId);
                      return (
                        <div key={student.id}>
                          <div className="grid grid-cols-[1fr_1fr_1fr_100px] md:grid-cols-[1fr_1fr_1fr_1fr_100px] p-4 items-center">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={student.avatar} alt={student.name} />
                                <AvatarFallback>{getInitials(student.name)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{student.name}</div>
                                <div className="text-sm text-muted-foreground md:hidden">{student.email}</div>
                              </div>
                            </div>
                            <div className="hidden md:block text-sm text-muted-foreground">{student.email}</div>
                            <div className="text-sm">{course?.title.substring(0, 30)}{course?.title.length > 30 ? '...' : ''}</div>
                            <div>
                              <div className="flex items-center gap-2">
                                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-primary rounded-full" 
                                    style={{ width: `${student.progress}%` }} 
                                  />
                                </div>
                                <span className="text-sm">{student.progress}%</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <Button variant="ghost" size="sm">View</Button>
                            </div>
                          </div>
                          <Separator />
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="courses">
              <Card>
                <CardHeader>
                  <CardTitle>Your Courses</CardTitle>
                  <CardDescription>
                    Manage your courses and content.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tutorCourses.map((course) => (
                      <Card key={course.id} className="overflow-hidden">
                        <div className="aspect-video w-full">
                          <img 
                            src={course.image} 
                            alt={course.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardHeader className="p-4">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-lg">{course.title}</CardTitle>
                            <Badge variant="outline">{course.students} students</Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-0 space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Rating:</span>
                            <span className="font-medium">{course.rating}/5.0</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Revenue:</span>
                            <span className="font-medium">${course.revenue.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Last updated:</span>
                            <span className="font-medium">{course.lastUpdated}</span>
                          </div>
                          <div className="pt-2">
                            <Button variant="outline" size="sm" className="w-full">
                              Manage Course
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="videos">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Course Videos</CardTitle>
                    <CardDescription>
                      Manage video lectures for your courses
                    </CardDescription>
                  </div>
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Video
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <form onSubmit={handleVideoSubmit}>
                        <DialogHeader>
                          <DialogTitle>Upload New Video Lecture</DialogTitle>
                          <DialogDescription>
                            Add a new video lecture to one of your courses
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="course">Course</Label>
                            <select 
                              id="course"
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                              value={selectedCourseId}
                              onChange={(e) => setSelectedCourseId(e.target.value)}
                              required
                            >
                              <option value="">Select a course</option>
                              {tutorCourses.map((course) => (
                                <option key={course.id} value={course.id}>{course.title}</option>
                              ))}
                            </select>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="title">Video Title</Label>
                            <Input 
                              id="title" 
                              value={newVideo.title}
                              onChange={(e) => setNewVideo({...newVideo, title: e.target.value})}
                              required
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea 
                              id="description" 
                              value={newVideo.description}
                              onChange={(e) => setNewVideo({...newVideo, description: e.target.value})}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="video">Video File</Label>
                            <Input 
                              id="video" 
                              type="file" 
                              accept="video/*"
                              onChange={(e) => handleFileChange(e, 'video')}
                              required
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="thumbnail">Thumbnail (Optional)</Label>
                            <Input 
                              id="thumbnail" 
                              type="file" 
                              accept="image/*"
                              onChange={(e) => handleFileChange(e, 'thumbnail')}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" type="button" onClick={() => setIsDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button type="submit">Upload</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-[1fr_1fr_100px] p-4 font-medium">
                      <div>Video</div>
                      <div>Course</div>
                      <div className="text-right">Actions</div>
                    </div>
                    <Separator />
                    {lectures.map((lecture) => {
                      const course = tutorCourses.find(c => c.id === lecture.courseId);
                      return (
                        <div key={lecture.id}>
                          <div className="grid grid-cols-[1fr_1fr_100px] p-4 items-center">
                            <div className="flex items-center gap-3">
                              <div className="h-12 w-20 rounded overflow-hidden">
                                <img 
                                  src={lecture.thumbnailUrl} 
                                  alt={lecture.title} 
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div>
                                <div className="font-medium">{lecture.title}</div>
                                <div className="text-xs text-muted-foreground">
                                  {lecture.uploadDate} • {lecture.duration}
                                </div>
                              </div>
                            </div>
                            <div className="text-sm">{course?.title.substring(0, 30)}{course?.title.length > 30 ? '...' : ''}</div>
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="sm">
                                <FileVideo className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <Separator />
                        </div>
                      );
                    })}
                    {lectures.length === 0 && (
                      <div className="p-4 text-center text-muted-foreground">
                        No videos uploaded yet
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TutorDashboard;
