import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Menu, X, Settings, LogOut, LogIn, User, Globe } from 'lucide-react';
import { useCart } from './CartContext';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { useAuth } from '@/hooks/useAuth';
import CartPanel from './CartPanel';
import { Link } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, setIsOpen } = useCart();
  const { t, language, setLanguage } = useLanguage();
  const { user, signOut, isAdmin } = useAuth();
  
  const languages = [
    { code: 'no', name: 'Norsk', flag: '🇳🇴' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' }
  ];
  
  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link 
              to="/"
              onClick={() => {
                setIsMobileMenuOpen(false); // Close mobile menu if open
                window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top
              }}
              className="z-50 relative" // Ensure logo stays clickable
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative w-40 h-12 flex items-center"
              >
                <img
                  src="/images/balkan-logo.png"
                  alt="Balkan Porsgrunn - Hjem"
                  className="w-full h-full object-contain"
                  draggable="false" // Prevent image dragging
                />
                <span className="ml-2 font-bold text-lg text-balkan-red"></span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection('hero')}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors relative group px-4 py-2"
              >
                {t('nav.home')}
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-balkan-yellow transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
              </button>
              <button
                onClick={() => scrollToSection('menu')}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors relative group px-4 py-2"
              >
                {t('nav.menu')}
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-balkan-yellow transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
              </button>
              <button
                onClick={() => scrollToSection('info')}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors relative group px-4 py-2"
              >
                {t('nav.about')}
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-balkan-yellow transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
              </button>
              <button
                onClick={() => scrollToSection('gallery')}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors relative group px-4 py-2"
              >
                {t('nav.gallery')}
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-balkan-yellow transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors relative group px-4 py-2"
              >
                {t('nav.contact')}
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-balkan-yellow transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
              </button>
              {user && isAdmin && (
                <Link 
                  to="/dashboard"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors"
                >
                  {t('nav.dashboard')}
                </Link>
              )}
            </nav>

            {/* Settings, Auth and Cart Buttons */}
            <div className="flex items-center gap-2">
              {/* Language Selector Dropdown */}
              <div className="hidden md:block mr-2">
                <Select value={language} onValueChange={(value) => handleLanguageChange(value as Language)}>
                  <SelectTrigger className="w-[130px] bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-800 border-green-200 dark:border-green-800">
                    <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-green-600 dark:text-green-400" />
                        <SelectValue>
                          {languages.find(lang => lang.code === language)?.flag} {languages.find(lang => lang.code === language)?.name}
                        </SelectValue>
                    </div>
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800 border-green-200 dark:border-green-800">
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code} className="cursor-pointer hover:bg-green-50 dark:hover:bg-green-900/30 text-gray-800 dark:text-gray-200">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{lang.flag}</span>
                          <span>{lang.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {user ? (
                <>
                  <Link 
                    to="/dashboard"
                    className="hidden md:flex items-center gap-1 px-3 py-1.5 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800 rounded-md transition-colors"
                  >
                    <Settings className="h-4 w-4" />
                    <span>{t('nav.dashboard')}</span>
                  </Link>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      signOut();
                    }}
                    className="hidden md:flex items-center gap-1 px-3 py-1.5 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800 rounded-md transition-colors ml-2"
                    title={t('auth.signOut')}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>{t('auth.signOut')}</span>
                  </motion.button>
                </>
              ) : (
                <Link 
                  to="/auth"
                  className="hidden md:flex items-center gap-1 px-3 py-1.5 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-800 rounded-md transition-colors"
                  title={t('auth.signIn')}
                >
                  <LogIn className="h-4 w-4" />
                  <span>{t('auth.signIn')}</span>
                </Link>
              )}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(true)}
                className="relative bg-balkan-red text-white p-3 rounded-full hover:bg-balkan-red/90 transition-colors"
              >
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-balkan-yellow text-balkan-dark text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-balkan-dark dark:text-white p-2"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-700"
            >
              <nav className="container mx-auto px-4 py-4 space-y-4">
                <button
                  onClick={() => scrollToSection('hero')}
                  className="block text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors relative group px-4 py-2 w-full text-left"
                >
                  {t('nav.home')}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-balkan-yellow transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
                </button>
                <button
                  onClick={() => scrollToSection('menu')}
                  className="block text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors relative group px-4 py-2 w-full text-left"
                >
                  {t('nav.menu')}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-balkan-yellow transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
                </button>
                <button
                  onClick={() => scrollToSection('info')}
                  className="block text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors relative group px-4 py-2 w-full text-left"
                >
                  {t('nav.about')}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-balkan-yellow transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
                </button>
                <button
                  onClick={() => scrollToSection('gallery')}
                  className="block text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors relative group px-4 py-2 w-full text-left"
                >
                  {t('nav.gallery')}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-balkan-yellow transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="block text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors relative group px-4 py-2 w-full text-left"
                >
                  {t('nav.contact')}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-balkan-yellow transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
                </button>
                {/* Mobile Language Selector */}
                <div className="mx-4 my-4">
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2 flex items-center gap-2">
                    <Globe className="h-4 w-4 text-green-600 dark:text-green-400" />
                    {t('nav.language')}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          handleLanguageChange(lang.code as Language);
                        }}
                        className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${language === lang.code ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'}`}
                      >
                        <span className="text-lg">{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                {user ? (
                  <>
                    {isAdmin && (
                      <Link 
                        to="/dashboard"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-2 mx-4 my-2 px-3 py-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800 rounded-md transition-colors"
                      >
                        <Settings className="h-4 w-4" />
                        {t('nav.dashboard')}
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        signOut();
                      }}
                      className="flex items-center gap-2 mx-4 my-2 px-3 py-2 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800 rounded-md transition-colors w-auto text-left"
                    >
                      <LogOut className="h-4 w-4" />
                      {t('auth.signOut')}
                    </button>
                  </>
                ) : (
                  <Link 
                    to="/auth"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 mx-4 my-2 px-3 py-2 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-800 rounded-md transition-colors"
                  >
                    <LogIn className="h-4 w-4" />
                    {t('auth.signIn')}
                  </Link>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <CartPanel />
    </>
  );
};

export default Header;