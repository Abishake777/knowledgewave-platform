
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AuthButtons = () => {
  return (
    <>
      <Link to="/signin">
        <Button variant="ghost" size="sm">
          Sign In
        </Button>
      </Link>
      <Link to="/signup">
        <Button size="sm">Sign Up</Button>
      </Link>
    </>
  );
};

export default AuthButtons;
