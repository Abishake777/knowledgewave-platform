
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, ShoppingCart, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/catalog' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/80 backdrop-blur-md shadow-sm py-3'
          : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link 
          to="/" 
          className="text-2xl font-bold text-primary animate-fade-in"
        >
          LearnWave
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, index) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                'relative text-base font-medium transition-colors hover:text-primary',
                location.pathname === link.path ? 'text-primary' : 'text-foreground',
                'animate-slide-down',
                { 'animation-delay-100': index === 1 },
                { 'animation-delay-200': index === 2 },
                { 'animation-delay-300': index === 3 }
              )}
              style={{ animationDelay: `${index * 75}ms` }}
            >
              {link.name}
              {location.pathname === link.path && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full animate-fade-in" />
              )}
            </Link>
          ))}
        </nav>

        {/* Right Side - Search, Cart, Profile */}
        <div className="hidden md:flex items-center space-x-4 animate-fade-in">
          <Button variant="ghost" size="icon" aria-label="Search">
            <Search className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Cart">
            <ShoppingCart className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Profile">
            <User className="w-5 h-5" />
          </Button>
          <Button>Sign In</Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[60px] bg-white z-40 animate-slide-down md:hidden">
          <nav className="container mx-auto px-4 py-8 flex flex-col space-y-6">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  'text-lg font-medium py-2 transition-colors',
                  location.pathname === link.path ? 'text-primary' : 'text-foreground'
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col space-y-4 pt-4 border-t">
              <Button size="lg" className="w-full justify-start">
                <User className="w-5 h-5 mr-2" />
                Sign In
              </Button>
              <Button size="lg" className="w-full justify-start" variant="outline">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Cart
              </Button>
              <Button size="lg" className="w-full justify-start" variant="outline">
                <Search className="w-5 h-5 mr-2" />
                Search
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
