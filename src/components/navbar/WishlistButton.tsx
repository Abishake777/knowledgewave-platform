
import { Link } from 'react-router-dom';
import { Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { Badge } from '@/components/ui/badge';
import { useWishlist } from '@/context/WishlistContext';

const WishlistButton = () => {
  const { t } = useLanguage();
  const { wishlist } = useWishlist();
  const wishlistCount = wishlist.length;
  
  return (
    <Link to="/wishlist">
      <Button variant="ghost" size="icon" className="relative" aria-label={t('nav.wishlist')}>
        <Bookmark className="h-5 w-5" />
        {wishlistCount > 0 && (
          <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
            {wishlistCount}
          </Badge>
        )}
      </Button>
    </Link>
  );
};

export default WishlistButton;
