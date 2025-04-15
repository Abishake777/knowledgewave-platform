
import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';

// Import the smaller components
import NavbarLogo from './navbar/NavbarLogo';
import NavbarLinks from './navbar/NavbarLinks';
import CartButton from './navbar/CartButton';
import WishlistButton from './navbar/WishlistButton';
import UserMenu from './navbar/UserMenu';
import MobileMenu from './navbar/MobileMenu';
import AuthButtons from './navbar/AuthButtons';
import LanguageSelector from './navbar/LanguageSelector';

const Navbar = () => {
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isAuthenticated, logout, isTutor } = useAuth();
  const { cartItems } = useCart();
  const { t } = useLanguage();

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
    { name: t('nav.home'), path: '/' },
    { name: t('nav.courses'), path: '/catalog' },
    { name: t('nav.about'), path: '/about' },
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
                <LanguageSelector />
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
                <LanguageSelector />
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
