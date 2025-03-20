
import { useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import FeaturedCourses from '@/components/FeaturedCourses';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowRight, BookOpen, Globe, Users, Award, CheckCircle } from 'lucide-react';
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
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-sm font-medium text-primary">
                CATEGORIES
              </span>
              <h2 className="text-3xl font-bold mt-2">
                Browse our top categories
              </h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
              {[
                { icon: <BookOpen className="h-8 w-8" />, name: 'Web Development' },
                { icon: <Award className="h-8 w-8" />, name: 'Data Science' },
                { icon: <Globe className="h-8 w-8" />, name: 'Business' },
                { icon: <Users className="h-8 w-8" />, name: 'Design' },
                { icon: <CheckCircle className="h-8 w-8" />, name: 'Marketing' },
                { icon: <BookOpen className="h-8 w-8" />, name: 'Photography' },
              ].map((category, index) => (
                <div 
                  key={category.name}
                  className="glass-card rounded-lg p-6 text-center hover-card-scale"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex justify-center mb-4">
                    <div className="bg-primary/10 p-3 rounded-lg text-primary">
                      {category.icon}
                    </div>
                  </div>
                  <h3 className="font-medium">{category.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="text-sm font-medium text-primary">
                HOW IT WORKS
              </span>
              <h2 className="text-3xl font-bold mt-2">
                Learning made simple
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: '01',
                  title: 'Find the perfect course',
                  description: 'Browse through our catalog of expert-created courses to find the perfect match for your goals.',
                },
                {
                  step: '02',
                  title: 'Enroll in your course',
                  description: 'Register for your chosen course and get instant access to all learning materials and resources.',
                },
                {
                  step: '03',
                  title: 'Learn at your own pace',
                  description: 'Study whenever and wherever you want. Track your progress and earn a certificate upon completion.',
                },
              ].map((item, index) => (
                <div 
                  key={item.step}
                  className="relative animate-fade-in"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="bg-white p-8 rounded-lg shadow-sm relative z-10">
                    <div className="text-4xl font-bold text-primary/20 mb-4">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/3 -right-12 w-24 h-4 z-0">
                      <svg viewBox="0 0 100 20" className="w-full h-full fill-none stroke-current text-primary/20 stroke-2">
                        <path d="M0 10 H90 M90 10 L80 5 M90 10 L80 15" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="text-sm font-medium text-primary">
                TESTIMONIALS
              </span>
              <h2 className="text-3xl font-bold mt-2">
                What our students say
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Sarah Johnson',
                  role: 'UX Designer',
                  image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
                  quote: 'LearnWave helped me transition from a different career into UX design. The courses were comprehensive and the instructors were incredibly supportive.',
                },
                {
                  name: 'Michael Chen',
                  role: 'Full Stack Developer',
                  image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
                  quote: 'The web development bootcamp exceeded my expectations. I went from knowing basic HTML to building full-stack applications in just a few months.',
                },
                {
                  name: 'Emily Rodriguez',
                  role: 'Marketing Manager',
                  image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=988&q=80',
                  quote: 'The digital marketing course was exactly what I needed to take my career to the next level. Now I'm leading marketing campaigns with confidence.',
                },
              ].map((testimonial, index) => (
                <div 
                  key={testimonial.name}
                  className="bg-white p-8 rounded-lg shadow-sm hover-card-scale"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 mr-4 rounded-full overflow-hidden">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="italic text-muted-foreground">{testimonial.quote}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold max-w-2xl mx-auto animate-fade-in">
              Ready to start your learning journey?
            </h2>
            <p className="mt-4 text-white/80 max-w-xl mx-auto mb-8 animate-slide-up">
              Join thousands of students already learning on our platform. Find your course and start learning today.
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              className="group animate-scale-in"
            >
              Explore All Courses
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
