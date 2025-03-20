
import { useState } from 'react';
import { CheckCircle, Clock, Globe, ChevronDown, ChevronUp, Play, File, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface Lecture {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'document' | 'quiz';
  isPreview?: boolean;
}

interface Section {
  id: string;
  title: string;
  lectures: Lecture[];
}

interface CourseContentProps {
  sections: Section[];
  totalLectures: number;
  totalDuration: string;
}

const CourseContent = ({
  sections,
  totalLectures,
  totalDuration,
}: CourseContentProps) => {
  const [expandedSections, setExpandedSections] = useState<string[]>([sections[0]?.id]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const getLectureIcon = (type: string) => {
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

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="p-6 border-b">
        <h3 className="text-xl font-semibold mb-2">Course Content</h3>
        <div className="flex items-center text-sm text-muted-foreground gap-4">
          <span>{sections.length} sections</span>
          <span>•</span>
          <span>{totalLectures} lectures</span>
          <span>•</span>
          <span className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {totalDuration} total length
          </span>
        </div>
      </div>

      <div className="divide-y">
        {sections.map((section) => (
          <div key={section.id} className="bg-white">
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full p-4 flex items-center justify-between hover:bg-secondary/30 transition-colors duration-200"
            >
              <div className="flex items-center">
                {expandedSections.includes(section.id) ? (
                  <ChevronUp className="w-5 h-5 mr-2 text-primary" />
                ) : (
                  <ChevronDown className="w-5 h-5 mr-2" />
                )}
                <span className="font-medium">{section.title}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                {section.lectures.length} lectures • {section.lectures.reduce((acc, lecture) => acc + parseInt(lecture.duration.split(':')[0]), 0)} min
              </div>
            </button>

            {expandedSections.includes(section.id) && (
              <div className="bg-secondary/30 px-4 py-2 divide-y divide-border/40">
                {section.lectures.map((lecture) => (
                  <div
                    key={lecture.id}
                    className={cn(
                      "py-3 px-2 flex items-center justify-between text-sm",
                      lecture.isPreview && "hover:bg-secondary/50 cursor-pointer rounded transition-colors"
                    )}
                  >
                    <div className="flex items-center">
                      <span className="w-6 h-6 flex items-center justify-center mr-2 text-muted-foreground">
                        {getLectureIcon(lecture.type)}
                      </span>
                      <span>{lecture.title}</span>
                      {lecture.isPreview && (
                        <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                          Preview
                        </span>
                      )}
                    </div>
                    <div className="flex items-center">
                      <span className="text-muted-foreground mr-2">{lecture.duration}</span>
                      {lecture.isPreview && (
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
