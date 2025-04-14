
import { Link } from 'react-router-dom';
import { Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WishlistButton = () => {
  return (
    <Link to="/wishlist">
      <Button variant="ghost" size="icon" className="relative">
        <Bookmark className="h-5 w-5" />
      </Button>
    </Link>
  );
};

export default WishlistButton;
