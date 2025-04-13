
import { useState } from 'react';
import { CheckCircle, Clock, Globe, ChevronDown, ChevronUp, Play, File, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface Lecture {
  id: string;
  title: string;
  duration: string;
  isLocked?: boolean;
  type?: 'video' | 'document' | 'quiz';
  isPreview?: boolean;
}

interface Chapter {
  id: string;
  title: string;
  lessons: Lecture[];
}

interface CourseContentProps {
  chapters: Chapter[];
  totalLectures?: number;
  totalDuration?: string;
}

const CourseContent = ({
  chapters,
  totalLectures,
  totalDuration,
}: CourseContentProps) => {
  const [expandedSections, setExpandedSections] = useState<string[]>([chapters[0]?.id]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const getLectureIcon = (type?: string, isLocked?: boolean) => {
    if (isLocked) {
      return <File className="w-4 h-4" />;
    }
    
    switch (type) {
      case 'video':
        return <Play className="w-4 h-4" />;
      case 'document':
        return <File className="w-4 h-4" />;
      case 'quiz':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Play className="w-4 h-4" />;
    }
  };

  // Calculate total lectures and duration if not provided
  const calculatedTotalLectures = totalLectures || 
    chapters.reduce((total, chapter) => total + chapter.lessons.length, 0);
  
  const calculatedTotalDuration = totalDuration || 
    chapters.reduce((total, chapter) => {
      return chapter.lessons.reduce((chapterTotal, lesson) => {
        const minutes = parseInt(lesson.duration.split(':')[0] || '0', 10);
        return chapterTotal + minutes;
      }, total);
    }, 0) + ' min';

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="p-6 border-b">
        <h3 className="text-xl font-semibold mb-2">Course Content</h3>
        <div className="flex items-center text-sm text-muted-foreground gap-4">
          <span>{chapters.length} sections</span>
          <span>•</span>
          <span>{calculatedTotalLectures} lectures</span>
          <span>•</span>
          <span className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {calculatedTotalDuration} total length
          </span>
        </div>
      </div>

      <div className="divide-y">
        {chapters.map((chapter) => (
          <div key={chapter.id} className="bg-white">
            <button
              onClick={() => toggleSection(chapter.id)}
              className="w-full p-4 flex items-center justify-between hover:bg-secondary/30 transition-colors duration-200"
            >
              <div className="flex items-center">
                {expandedSections.includes(chapter.id) ? (
                  <ChevronUp className="w-5 h-5 mr-2 text-primary" />
                ) : (
                  <ChevronDown className="w-5 h-5 mr-2" />
                )}
                <span className="font-medium">{chapter.title}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                {chapter.lessons.length} lectures
              </div>
            </button>

            {expandedSections.includes(chapter.id) && (
              <div className="bg-secondary/30 px-4 py-2 divide-y divide-border/40">
                {chapter.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className={cn(
                      "py-3 px-2 flex items-center justify-between text-sm",
                      !lesson.isLocked && "hover:bg-secondary/50 cursor-pointer rounded transition-colors"
                    )}
                  >
                    <div className="flex items-center">
                      <span className="w-6 h-6 flex items-center justify-center mr-2 text-muted-foreground">
                        {getLectureIcon(lesson.type, lesson.isLocked)}
                      </span>
                      <span>{lesson.title}</span>
                      {!lesson.isLocked && (
                        <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                          Preview
                        </span>
                      )}
                    </div>
                    <div className="flex items-center">
                      <span className="text-muted-foreground mr-2">{lesson.duration}</span>
                      {!lesson.isLocked && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          asChild
                        >
                          <div>
                            <Play className="h-3 w-3" />
                          </div>
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseContent;
