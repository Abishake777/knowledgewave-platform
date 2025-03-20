
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Company',
      links: [
        { text: 'About Us', href: '/about' },
        { text: 'Careers', href: '/careers' },
        { text: 'Press', href: '/press' },
        { text: 'Blog', href: '/blog' },
        { text: 'Contact Us', href: '/contact' },
      ],
    },
    {
      title: 'Learning',
      links: [
        { text: 'All Courses', href: '/catalog' },
        { text: 'Free Courses', href: '/free-courses' },
        { text: 'Certificates', href: '/certificates' },
        { text: 'Become an Instructor', href: '/teach' },
      ],
    },
    {
      title: 'Support',
      links: [
        { text: 'Help Center', href: '/help' },
        { text: 'FAQs', href: '/faqs' },
        { text: 'Accessibility', href: '/accessibility' },
        { text: 'Privacy Policy', href: '/privacy' },
        { text: 'Terms of Service', href: '/terms' },
      ],
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="bg-white pt-16 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <Link to="/" className="text-2xl font-bold text-primary">
              LearnWave
            </Link>
            <p className="mt-4 text-muted-foreground max-w-md">
              The world's largest selection of courses to help you achieve your goals. Learn from industry experts and advance your career.
            </p>
            
            <div className="mt-6">
              <h4 className="font-medium mb-3">Join our newsletter</h4>
              <div className="flex max-w-md">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="rounded-r-none"
                />
                <Button className="rounded-l-none">
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                By subscribing, you agree to our Privacy Policy and consent to receive updates.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 md:grid-cols-3 gap-8">
            {footerLinks.map((section) => (
              <div key={section.title}>
                <h4 className="font-medium mb-4">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.text}>
                      <Link 
                        to={link.href}
                        className="text-muted-foreground hover:text-primary text-sm inline-flex items-center"
                      >
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-medium mb-4">Mobile App</h4>
            <div className="flex flex-col space-y-3">
              <Button variant="outline" className="justify-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 18a10 10 0 110-20 10 10 0 010 20z" />
                  <path fillRule="evenodd" d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a8 8 0 01-4.757 7.329 1 1 0 01-1.087-1.678A6 6 0 0014.243 5.757z" clipRule="evenodd" />
                </svg>
                App Store
              </Button>
              <Button variant="outline" className="justify-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Google Play
              </Button>
            </div>

            <div className="mt-6">
              <h4 className="font-medium mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-12 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {currentYear} LearnWave. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-sm text-muted-foreground hover:text-primary">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
