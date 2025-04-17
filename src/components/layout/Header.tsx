
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Video, Bell, User, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-6', 
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4'
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-biblenow-gold-500 to-biblenow-brown-700 bg-clip-text text-transparent">
              BibleNOW
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Home
          </NavLink>
          <NavLink to="/browse" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Browse
          </NavLink>
          <NavLink to="/following" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Following
          </NavLink>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-2">
          <button className="p-2 rounded-full text-biblenow-neutral-600 hover:text-biblenow-brown-700 hover:bg-biblenow-neutral-100 transition-colors">
            <Search size={20} />
          </button>
          <button className="p-2 rounded-full text-biblenow-neutral-600 hover:text-biblenow-brown-700 hover:bg-biblenow-neutral-100 transition-colors">
            <Bell size={20} />
          </button>
          <Link to="/profile">
            <button className="p-2 rounded-full text-biblenow-neutral-600 hover:text-biblenow-brown-700 hover:bg-biblenow-neutral-100 transition-colors">
              <User size={20} />
            </button>
          </Link>
          <Link to="/go-live">
            <Button className="btn-gold flex items-center gap-1 ml-2">
              <Video size={18} />
              <span>Go Live</span>
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 rounded-full text-biblenow-neutral-600 hover:text-biblenow-brown-700 hover:bg-biblenow-neutral-100 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute left-0 right-0 top-full ${isMenuOpen ? 'block' : 'hidden'} bg-white shadow-md animate-slide-in`}>
        <nav className="container mx-auto py-4 flex flex-col">
          <NavLink to="/" className="py-3 px-4 text-biblenow-neutral-600 hover:bg-biblenow-neutral-50 hover:text-biblenow-brown-700">
            Home
          </NavLink>
          <NavLink to="/browse" className="py-3 px-4 text-biblenow-neutral-600 hover:bg-biblenow-neutral-50 hover:text-biblenow-brown-700">
            Browse
          </NavLink>
          <NavLink to="/following" className="py-3 px-4 text-biblenow-neutral-600 hover:bg-biblenow-neutral-50 hover:text-biblenow-brown-700">
            Following
          </NavLink>
          <hr className="my-2 border-biblenow-neutral-200" />
          <div className="flex justify-between px-4 py-3">
            <div className="flex space-x-4">
              <button className="p-2 rounded-full text-biblenow-neutral-600 hover:text-biblenow-brown-700 hover:bg-biblenow-neutral-100 transition-colors">
                <Search size={20} />
              </button>
              <button className="p-2 rounded-full text-biblenow-neutral-600 hover:text-biblenow-brown-700 hover:bg-biblenow-neutral-100 transition-colors">
                <Bell size={20} />
              </button>
              <Link to="/profile">
                <button className="p-2 rounded-full text-biblenow-neutral-600 hover:text-biblenow-brown-700 hover:bg-biblenow-neutral-100 transition-colors">
                  <User size={20} />
                </button>
              </Link>
            </div>
            <Link to="/go-live">
              <Button className="btn-gold flex items-center gap-1">
                <Video size={18} />
                <span>Go Live</span>
              </Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
