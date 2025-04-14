
import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

// Import the smaller components
import NavbarLogo from './navbar/NavbarLogo';
import NavbarLinks from './navbar/NavbarLinks';
import CartButton from './navbar/CartButton';
import WishlistButton from './navbar/WishlistButton';
import UserMenu from './navbar/UserMenu';
import MobileMenu from './navbar/MobileMenu';
import AuthButtons from './navbar/AuthButtons';

const Navbar = () => {
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isAuthenticated, logout, isTutor } = useAuth();
  const { cartItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/catalog' },
    { name: 'About', path: '/about' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 ${
        isScrolled ? 'bg-background/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      } transition-all duration-200`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavbarLogo />
          </div>

          {/* Desktop Navigation */}
          <NavbarLinks items={navItems} />

          <div className="flex items-center space-x-2">
            {isAuthenticated ? (
              <>
                <WishlistButton />
                <CartButton itemCount={cartItems.length} />
                <UserMenu 
                  user={user} 
                  isTutor={isTutor} 
                  onLogout={logout} 
                />
              </>
            ) : (
              <>
                <CartButton itemCount={cartItems.length} />
                {!isMobile && <AuthButtons />}
              </>
            )}

            {isMobile && (
              <MobileMenu 
                navItems={navItems} 
                isAuthenticated={isAuthenticated} 
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
