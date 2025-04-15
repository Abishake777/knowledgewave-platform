
import { Link } from 'react-router-dom';
import { Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

const WishlistButton = () => {
  const { t } = useLanguage();
  
  return (
    <Link to="/wishlist">
      <Button variant="ghost" size="icon" className="relative" aria-label={t('nav.wishlist')}>
        <Bookmark className="h-5 w-5" />
      </Button>
    </Link>
  );
};

export default WishlistButton;
