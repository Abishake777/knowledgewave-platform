
import { Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

const NavbarLogo = () => {
  return (
    <Link to="/" className="flex items-center">
      <GraduationCap className="h-8 w-8 text-primary mr-2" />
      <span className="text-xl font-bold">EduLearn</span>
    </Link>
  );
};

export default NavbarLogo;
