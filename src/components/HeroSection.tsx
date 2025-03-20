
import { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <section className="relative pt-28 pb-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Learn new skills online with <span className="text-primary">EduLearn</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-lg">
              Access quality courses taught by expert instructors to expand your knowledge and advance your career.
            </p>

            <div className="relative max-w-md">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <Input
                type="text"
                placeholder="What do you want to learn today?"
                className="pl-10 py-6 text-base"
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
              {['Web Development', 'Data Science', 'Design', 'Business'].map((topic) => (
                <Button 
                  key={topic} 
                  variant="ghost" 
                  className="text-sm hover:text-primary"
                >
                  {topic}
                </Button>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="bg-white rounded-lg shadow-lg p-6 border border-border">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                alt="Student learning online"
                className="w-full h-auto object-cover aspect-video rounded-lg mb-6"
              />
              <h3 className="text-xl font-semibold mb-2">Start your learning journey today</h3>
              <p className="text-muted-foreground mb-4">Join thousands of students already learning on our platform</p>
              <Button className="w-full">Explore Courses</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
