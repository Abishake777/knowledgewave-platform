
import { useEffect } from 'react';
import { Award, BookOpen, Users, Check, Globe, Laptop } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-20 pb-16 md:pt-24 md:pb-20 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-6">About EduLearn</h1>
              <p className="text-lg text-muted-foreground">
                Empowering learners worldwide with quality education that's accessible, affordable, and designed for real-world success.
              </p>
            </div>
          </div>
        </section>
        
        {/* Our Mission */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                <p className="text-muted-foreground mb-6">
                  At EduLearn, we believe that quality education should be accessible to everyone. 
                  Our mission is to provide affordable, high-quality learning experiences that help 
                  people acquire the skills they need to succeed in today's fast-changing world.
                </p>
                <p className="text-muted-foreground">
                  We partner with leading experts and organizations to create courses that are 
                  comprehensive, up-to-date, and focused on practical, real-world applications. 
                  Our platform is designed to make learning engaging, interactive, and effective, 
                  whether you're looking to advance your career, explore new interests, or develop 
                  personal skills.
                </p>
              </div>
              <div className="order-first md:order-last">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Learning environment" 
                  className="rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Stats */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { label: 'Active Learners', value: '2M+', icon: Users },
                { label: 'Courses', value: '1,500+', icon: BookOpen },
                { label: 'Certified Instructors', value: '250+', icon: Award },
                { label: 'Countries Reached', value: '180+', icon: Globe },
              ].map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="text-primary w-6 h-6" />
                  </div>
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Our Values */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-2xl font-bold mb-4">Our Core Values</h2>
              <p className="text-muted-foreground">
                These principles guide everything we do at EduLearn, from course development 
                to platform design and student support.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Accessibility',
                  description: 'Education should be available to everyone, regardless of background or circumstances.',
                  icon: Globe,
                },
                {
                  title: 'Quality',
                  description: 'We maintain high standards in all our courses, ensuring content that is accurate, current, and valuable.',
                  icon: Award,
                },
                {
                  title: 'Practicality',
                  description: 'Our courses focus on real-world applications and skills that directly translate to personal and professional growth.',
                  icon: Laptop,
                },
              ].map((value, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <value.icon className="text-primary w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Team */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-2xl font-bold mb-4">Our Leadership Team</h2>
              <p className="text-muted-foreground">
                Meet the passionate educators and technology experts behind EduLearn.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Dr. Sarah Johnson',
                  role: 'CEO & Founder',
                  bio: 'Former professor with a passion for democratizing education globally.',
                  image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                },
                {
                  name: 'Michael Chen',
                  role: 'CTO',
                  bio: 'Tech innovator focused on creating intuitive learning experiences.',
                  image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                },
                {
                  name: 'Amara Okafor',
                  role: 'Chief Learning Officer',
                  bio: 'Curriculum expert with 15+ years experience in educational design.',
                  image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                },
              ].map((member, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                    <p className="text-primary text-sm mb-3">{member.role}</p>
                    <p className="text-muted-foreground text-sm">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
