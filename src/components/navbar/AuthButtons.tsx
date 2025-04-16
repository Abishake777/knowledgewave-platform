
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

const AuthButtons = () => {
  const { t } = useLanguage();
  
  return (
    <div className="flex gap-2">
      <Link to="/signin">
        <Button variant="ghost" size="sm">
          {t('nav.signin')}
        </Button>
      </Link>
      <Link to="/signup">
        <Button size="sm" className="bg-primary hover:bg-primary/90">
          {t('nav.signup')}
        </Button>
      </Link>
    </div>
  );
};

export default AuthButtons;
