
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

type NavItem = {
  name: string;
  path: string;
};

interface NavbarLinksProps {
  items: NavItem[];
  isMobile?: boolean;
}

const NavbarLinks = ({ items, isMobile = false }: NavbarLinksProps) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  if (isMobile) {
    return (
      <div className="flex flex-col space-y-4 mt-8">
        {items.map((item) => (
          <Link key={item.path} to={item.path}>
            <Button 
              variant="ghost" 
              className={`w-full justify-start ${
                isActive(item.path) 
                  ? 'bg-muted font-medium' 
                  : ''
              }`}
            >
              {item.name}
            </Button>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <nav className="hidden md:flex items-center space-x-1">
      {items.map((item) => (
        <Link key={item.path} to={item.path}>
          <Button 
            variant="ghost" 
            className={`text-sm ${
              isActive(item.path) 
                ? 'bg-muted font-medium' 
                : 'hover:bg-muted/50'
            }`}
          >
            {item.name}
          </Button>
        </Link>
      ))}
    </nav>
  );
};

export default NavbarLinks;
