
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

const AuthButtons = () => {
  const { t } = useLanguage();
  
  return (
    <>
      <Link to="/signin">
        <Button variant="ghost" size="sm">
          {t('nav.signin')}
        </Button>
      </Link>
      <Link to="/signup">
        <Button size="sm">{t('nav.signup')}</Button>
      </Link>
    </>
  );
};

export default AuthButtons;
