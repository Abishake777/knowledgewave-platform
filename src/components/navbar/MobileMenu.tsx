
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import NavbarLinks from './NavbarLinks';

interface MobileMenuProps {
  navItems: Array<{ name: string; path: string }>;
  isAuthenticated: boolean;
}

const MobileMenu = ({ navItems, isAuthenticated }: MobileMenuProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <NavbarLinks items={navItems} isMobile={true} />
        
        {!isAuthenticated && (
          <>
            <Link to="/signin">
              <Button variant="outline" className="w-full mt-4">
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="w-full mt-2">Sign Up</Button>
            </Link>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
