
import React, { createContext, useContext, useState, useEffect } from 'react';

// Available languages
export type Language = 'english' | 'tamil' | 'malayalam';

// Context type
type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

// Create context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'english',
  setLanguage: () => {},
  t: (key: string) => key,
});

// Translation data for all languages
const translations: Record<Language, Record<string, string>> = {
  english: {
    // Navbar
    'nav.home': 'Home',
    'nav.courses': 'Courses',
    'nav.about': 'About',
    'nav.signin': 'Sign In',
    'nav.signup': 'Sign Up',
    'nav.profile': 'Profile',
    'nav.dashboard': 'Dashboard',
    'nav.wishlist': 'Wishlist',
    'nav.enrolledCourses': 'Enrolled Courses',
    'nav.logout': 'Logout',
    
    // Hero Section
    'hero.title': 'Learn new skills online with',
    'hero.subtitle': 'Access quality courses taught by expert instructors to expand your knowledge and advance your career.',
    'hero.search.placeholder': 'What do you want to learn today?',
    'hero.search.button': 'Search',
    'hero.popular': 'Popular:',
    'hero.cta': 'Start your learning journey today',
    'hero.ctaSubtitle': 'Join thousands of students already learning on our platform',
    'hero.exploreCourses': 'Explore Courses',
    
    // Featured Courses Section
    'featured.title': 'Featured Courses',
    'featured.browseAll': 'Browse all courses',
    
    // Course Card
    'course.by': 'by',
    'course.featured': 'Featured',
    
    // Footer
    'footer.rights': 'All rights reserved',
    
    // Auth
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.rememberMe': 'Remember me',
    'auth.forgotPassword': 'Forgot password?',
    'auth.noAccount': 'Don\'t have an account?',
    'auth.hasAccount': 'Already have an account?',
    'auth.createAccount': 'Create account',
  },
  
  tamil: {
    // Navbar
    'nav.home': 'முகப்பு',
    'nav.courses': 'பாடநெறிகள்',
    'nav.about': 'எங்களை பற்றி',
    'nav.signin': 'உள்நுழைக',
    'nav.signup': 'பதிவு செய்க',
    'nav.profile': 'சுயவிவரம்',
    'nav.dashboard': 'டாஷ்போர்டு',
    'nav.wishlist': 'விருப்பப்பட்டியல்',
    'nav.enrolledCourses': 'சேர்ந்த பாடநெறிகள்',
    'nav.logout': 'வெளியேறு',
    
    // Hero Section
    'hero.title': 'புதிய திறன்களை ஆன்லைனில் கற்றுக்கொள்ளுங்கள்',
    'hero.subtitle': 'உங்கள் அறிவை விரிவுபடுத்தவும், உங்கள் தொழில் முன்னேற்றத்திற்கும் நிபுணர் ஆசிரியர்களால் கற்பிக்கப்படும் தரமான பாடநெறிகளை அணுகவும்.',
    'hero.search.placeholder': 'இன்று நீங்கள் என்ன கற்க விரும்புகிறீர்கள்?',
    'hero.search.button': 'தேடு',
    'hero.popular': 'பிரபலமானவை:',
    'hero.cta': 'இன்றே உங்கள் கற்றல் பயணத்தைத் தொடங்குங்கள்',
    'hero.ctaSubtitle': 'ஏற்கனவே எங்கள் தளத்தில் கற்றுக்கொண்டிருக்கும் ஆயிரக்கணக்கான மாணவர்களுடன் இணையுங்கள்',
    'hero.exploreCourses': 'பாடநெறிகளை ஆராயுங்கள்',
    
    // Featured Courses Section
    'featured.title': 'சிறப்பு பாடநெறிகள்',
    'featured.browseAll': 'அனைத்து பாடநெறிகளையும் பார்க்க',
    
    // Course Card
    'course.by': 'ஆசிரியர்',
    'course.featured': 'சிறப்பு',
    
    // Footer
    'footer.rights': 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை',
    
    // Auth
    'auth.email': 'மின்னஞ்சல்',
    'auth.password': 'கடவுச்சொல்',
    'auth.rememberMe': 'என்னை நினைவில் கொள்ளவும்',
    'auth.forgotPassword': 'கடவுச்சொல் மறந்துவிட்டதா?',
    'auth.noAccount': 'கணக்கு இல்லையா?',
    'auth.hasAccount': 'ஏற்கனவே கணக்கு உள்ளதா?',
    'auth.createAccount': 'கணக்கை உருவாக்கு',
  },
  
  malayalam: {
    // Navbar
    'nav.home': 'ഹോം',
    'nav.courses': 'കോഴ്സുകൾ',
    'nav.about': 'ഞങ്ങളേക്കുറിച്ച്',
    'nav.signin': 'സൈൻ ഇൻ',
    'nav.signup': 'സൈൻ അപ്പ്',
    'nav.profile': 'പ്രൊഫൈൽ',
    'nav.dashboard': 'ഡാഷ്ബോർഡ്',
    'nav.wishlist': 'വിഷ്‌ലിസ്റ്റ്',
    'nav.enrolledCourses': 'ചേർന്ന കോഴ്സുകൾ',
    'nav.logout': 'ലോഗ്ഔട്ട്',
    
    // Hero Section
    'hero.title': 'പുതിയ കഴിവുകൾ ഓൺലൈനിൽ പഠിക്കുക',
    'hero.subtitle': 'നിങ്ങളുടെ അറിവ് വിപുലീകരിക്കാനും കരിയർ മുന്നോട്ട് നയിക്കുന്നതിനും വിദഗ്ധ അധ്യാപകർ പഠിപ്പിക്കുന്ന ഗുണനിലവാരമുള്ള കോഴ്സുകൾ ആക്സസ് ചെയ്യുക.',
    'hero.search.placeholder': 'ഇന്ന് എന്താണ് പഠിക്കാൻ ആഗ്രഹിക്കുന്നത്?',
    'hero.search.button': 'തിരയുക',
    'hero.popular': 'ജനപ്രിയം:',
    'hero.cta': 'ഇന്ന് തന്നെ നിങ്ങളുടെ പഠന യാത്ര ആരംഭിക്കുക',
    'hero.ctaSubtitle': 'ഞങ്ങളുടെ പ്ലാറ്റ്‌ഫോമിൽ ഇതിനകം പഠിക്കുന്ന ആയിരക്കണക്കിന് വിദ്യാർത്ഥികളോടൊപ്പം ചേരുക',
    'hero.exploreCourses': 'കോഴ്സുകൾ പരിശോധിക്കുക',
    
    // Featured Courses Section
    'featured.title': 'ഫീച്ചേർഡ് കോഴ്സുകൾ',
    'featured.browseAll': 'എല്ലാ കോഴ്സുകളും ബ്രൗസ് ചെയ്യുക',
    
    // Course Card
    'course.by': 'അധ്യാപകൻ',
    'course.featured': 'ഫീച്ചേർഡ്',
    
    // Footer
    'footer.rights': 'എല്ലാ അവകാശങ്ങളും നിക്ഷിപ്തമാണ്',
    
    // Auth
    'auth.email': 'ഇമെയിൽ',
    'auth.password': 'പാസ്‌വേഡ്',
    'auth.rememberMe': 'എന്നെ ഓർക്കുക',
    'auth.forgotPassword': 'പാസ്‌വേഡ് മറന്നുപോയോ?',
    'auth.noAccount': 'അക്കൗണ്ട് ഇല്ലേ?',
    'auth.hasAccount': 'നിലവിൽ അക്കൗണ്ട് ഉണ്ടോ?',
    'auth.createAccount': 'അക്കൗണ്ട് സൃഷ്ടിക്കുക',
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Get saved language from localStorage or use default
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage || 'english';
  });

  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);
