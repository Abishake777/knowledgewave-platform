
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileVideo, Clock } from 'lucide-react';

// Mock video lecture type
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

interface CourseVideoPlayerProps {
  courseId: string;
}

const CourseVideoPlayer = ({ courseId }: CourseVideoPlayerProps) => {
  // In a real application, this data would come from an API
  const courseLectures: VideoLecture[] = [
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
    },
    {
      id: 'video-4',
      courseId: '3',
      title: 'Swift Programming Language',
      description: 'Introduction to the Swift programming language for iOS development.',
      url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1621839673705-6617adf9e890?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      uploadDate: '2023-09-15',
      duration: '18:20'
    }
  ];

  const courseLecturesFiltered = courseLectures.filter(lecture => lecture.courseId === courseId);
  const [selectedVideo, setSelectedVideo] = useState<VideoLecture | null>(
    courseLecturesFiltered.length > 0 ? courseLecturesFiltered[0] : null
  );

  if (courseLecturesFiltered.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Course Videos</CardTitle>
          <CardDescription>
            No videos available for this course yet.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Course Videos</CardTitle>
        <CardDescription>
          Watch video lectures for this course
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="video" className="w-full">
          <TabsList className="w-full justify-start px-6">
            <TabsTrigger value="video">Video Player</TabsTrigger>
            <TabsTrigger value="playlist">Video Playlist</TabsTrigger>
          </TabsList>
          <TabsContent value="video" className="p-6">
            {selectedVideo && (
              <div className="space-y-4">
                <div className="aspect-video w-full bg-black rounded-md overflow-hidden">
                  <video 
                    src={selectedVideo.url} 
                    controls 
                    poster={selectedVideo.thumbnailUrl}
                    className="w-full h-full"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{selectedVideo.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <Clock className="h-4 w-4" />
                    <span>{selectedVideo.duration}</span>
                    <span>•</span>
                    <span>Uploaded on {selectedVideo.uploadDate}</span>
                  </div>
                  <p className="mt-2 text-sm">{selectedVideo.description}</p>
                </div>
              </div>
            )}
          </TabsContent>
          <TabsContent value="playlist" className="p-0">
            <div className="rounded-md overflow-hidden">
              {courseLecturesFiltered.map((lecture) => (
                <div 
                  key={lecture.id}
                  className={`flex items-center gap-3 p-4 hover:bg-muted/40 cursor-pointer transition-colors ${selectedVideo?.id === lecture.id ? 'bg-muted/60' : ''}`}
                  onClick={() => setSelectedVideo(lecture)}
                >
                  <div className="h-14 w-24 rounded overflow-hidden relative">
                    <img 
                      src={lecture.thumbnailUrl} 
                      alt={lecture.title} 
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <FileVideo className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{lecture.title}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{lecture.duration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CourseVideoPlayer;
