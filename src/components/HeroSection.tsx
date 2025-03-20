
import { useState } from 'react';
import { ArrowRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Elements - Subtle Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-10 w-64 h-64 rounded-full bg-primary/5 animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute bottom-1/4 right-20 w-40 h-40 rounded-full bg-primary/5 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-primary/5 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 space-y-6 animate-slide-up">
            <div className="inline-block">
              <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                Transform your future with online learning
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
              Learn without limits, <span className="text-primary">anytime, anywhere</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-lg">
              Discover thousands of high-quality courses taught by industry experts and advance your career with in-demand skills.
            </p>

            <div className="relative max-w-md">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <Input
                type="text"
                placeholder="What do you want to learn today?"
                className="pl-10 py-6 text-base shadow-sm bg-background"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                className="absolute right-1 top-1 bottom-1"
                size="sm"
              >
                Search
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <span className="text-sm font-medium text-muted-foreground">
                Popular:
              </span>
              {['Web Development', 'AI & Machine Learning', 'UX Design', 'Data Science'].map((topic) => (
                <Button 
                  key={topic} 
                  variant="ghost" 
                  className="text-sm hover:text-primary hover:bg-primary/5"
                >
                  {topic}
                </Button>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 relative animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="glass-card rounded-2xl p-6 md:p-8 shadow-xl relative z-10 max-w-md mx-auto">
              <div className="overflow-hidden rounded-lg">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                  alt="Student learning online"
                  className="w-full h-auto object-cover aspect-video rounded-lg"
                />
              </div>
              <div className="mt-6 space-y-4">
                <h3 className="text-xl font-semibold">Start your learning journey today</h3>
                <p className="text-muted-foreground">Join thousands of learners already on the platform</p>
                <Button className="w-full group">
                  Explore Courses <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
            <div className="absolute inset-0 -z-10 bg-primary/5 rounded-3xl transform rotate-3 translate-x-4 translate-y-6"></div>
          </div>
        </div>

        <div className="mt-20 text-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <p className="text-sm font-medium text-muted-foreground mb-6">
            TRUSTED BY OVER 500+ COMPANIES WORLDWIDE
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {['Google', 'Microsoft', 'Adobe', 'Shopify', 'Spotify'].map((company) => (
              <div key={company} className="text-muted-foreground/70 font-bold text-xl tracking-tighter">
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
