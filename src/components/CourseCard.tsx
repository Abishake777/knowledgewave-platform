
import { Link } from 'react-router-dom';
import { Star, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';

export interface CourseProps {
  id: string;
  title: string;
  instructor: string;
  image: string;
  price: number;
  rating: number;
  reviewCount: number;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  category: string;
  featured?: boolean;
}

const CourseCard = ({
  id,
  title,
  instructor,
  image,
  price,
  rating,
  reviewCount,
  duration,
  level,
  category,
  featured = false,
}: CourseProps) => {
  const { t } = useLanguage();
  
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

  return (
    <Link
      to={`/course/${id}`}
      className="flex flex-col overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="relative overflow-hidden aspect-video">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        {featured && (
          <div className="absolute top-3 left-3">
            <span className="bg-primary text-white text-xs font-semibold px-2 py-1 rounded-full">
              {t('course.featured')}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-grow p-4">
        <span className="text-xs text-primary font-medium mb-1">{category}</span>
        <h3 className="font-semibold text-lg mb-1 line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mb-2">{t('course.by')} {instructor}</p>
        
        <div className="flex items-center mt-auto space-x-1 mb-2">
          {renderStars(rating)}
          <span className="text-sm ml-1 text-muted-foreground">
            ({reviewCount})
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="w-3 h-3 mr-1" />
            <span>{duration}</span>
          </div>
          <div className="font-bold text-primary">
            ${price.toFixed(2)}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
