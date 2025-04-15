
import { Button } from '@/components/ui/button';
import CourseCard, { CourseProps } from './CourseCard';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';

// Sample data for featured courses
const featuredCourses: CourseProps[] = [
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
    featured: true
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
    featured: true
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
    featured: true
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
    featured: true
  }
];

const FeaturedCourses = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-10">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold">{t('featured.title')}</h2>
          </div>
          <Link to="/catalog">
            <Button variant="outline">
              {t('featured.browseAll')}
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCourses.map((course) => (
            <CourseCard 
              key={course.id} 
              {...course}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
