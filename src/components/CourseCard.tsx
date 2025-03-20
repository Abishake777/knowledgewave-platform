
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

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

  const levelColors = {
    Beginner: 'bg-green-100 text-green-700',
    Intermediate: 'bg-blue-100 text-blue-700',
    Advanced: 'bg-purple-100 text-purple-700',
    'All Levels': 'bg-gray-100 text-gray-700',
  };

  return (
    <Link
      to={`/course/${id}`}
      className={cn(
        'flex flex-col overflow-hidden rounded-lg transition-all duration-300',
        'hover-card-scale bg-white',
        featured ? 'shadow-md' : 'shadow-sm',
        'animate-scale-in'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden aspect-video">
        <div 
          className={cn(
            "absolute inset-0 bg-gray-200",
            imageLoaded ? "opacity-0" : "opacity-100"
          )}
        />
        <img
          src={image}
          alt={title}
          className={cn(
            'w-full h-full object-cover transition-transform duration-700',
            isHovered ? 'scale-105' : 'scale-100',
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setImageLoaded(true)}
        />
        {featured && (
          <div className="absolute top-3 left-3">
            <span className="bg-primary text-white text-xs font-semibold px-2 py-1 rounded-full">
              Featured
            </span>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span className={cn(
            'text-xs font-semibold px-2 py-1 rounded-full',
            levelColors[level]
          )}>
            {level}
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-grow p-4">
        <span className="text-xs text-primary font-medium mb-2">{category}</span>
        <h3 className="font-semibold text-lg mb-1 line-clamp-2 text-pretty">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mb-2">by {instructor}</p>
        
        <div className="flex items-center mt-auto space-x-1 mb-2">
          {renderStars(rating)}
          <span className="text-sm ml-1 text-muted-foreground">
            ({reviewCount})
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <div className="flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              <span>{duration}</span>
            </div>
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
