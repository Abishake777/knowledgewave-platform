
import { useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import FeaturedCourses from '@/components/FeaturedCourses';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BookOpen, Award, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection />
        
        <FeaturedCourses />
        
        {/* Categories Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">
              Explore Top Categories
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: <BookOpen className="h-6 w-6" />, name: 'Development', description: 'Web, mobile, and software development courses' },
                { icon: <Award className="h-6 w-6" />, name: 'Business', description: 'Finance, entrepreneurship, and marketing' },
                { icon: <Users className="h-6 w-6" />, name: 'Design', description: 'UI/UX, graphic design, and creative skills' },
              ].map((category) => (
                <div 
                  key={category.name}
                  className="bg-white p-6 rounded-lg shadow-sm text-center"
                >
                  <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <div className="text-primary">
                      {category.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
                  <p className="text-muted-foreground text-sm">{category.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold max-w-2xl mx-auto">
              Start learning today
            </h2>
            <p className="mt-4 text-white/80 max-w-xl mx-auto mb-6">
              Join our community of learners and enhance your skills with our expert-led courses.
            </p>
            <Button 
              size="lg" 
              variant="secondary"
            >
              Get Started
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
