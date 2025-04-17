
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/10 px-4 py-8 mt-auto">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <span className="text-xl font-bold bg-gradient-to-r from-dark-accent to-dark-accent/80 bg-clip-text text-transparent">
                BibleNOW
              </span>
            </Link>
            <p className="text-white/70 text-sm mt-2">
              Connecting spiritual communities through live streaming.
            </p>
          </div>
          
          <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <h3 className="text-white font-medium mb-3">Platform</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-white/70 hover:text-dark-accent text-sm">Home</Link></li>
                <li><Link to="/browse" className="text-white/70 hover:text-dark-accent text-sm">Browse</Link></li>
                <li><Link to="/following" className="text-white/70 hover:text-dark-accent text-sm">Following</Link></li>
                <li><Link to="/go-live" className="text-white/70 hover:text-dark-accent text-sm">Start Streaming</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-medium mb-3">Support</h3>
              <ul className="space-y-2">
                <li><Link to="/help" className="text-white/70 hover:text-dark-accent text-sm">Help Center</Link></li>
                <li><Link to="/guidelines" className="text-white/70 hover:text-dark-accent text-sm">Community Guidelines</Link></li>
                <li><Link to="/contact" className="text-white/70 hover:text-dark-accent text-sm">Contact Us</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-medium mb-3">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="/terms" className="text-white/70 hover:text-dark-accent text-sm">Terms of Service</Link></li>
                <li><Link to="/privacy" className="text-white/70 hover:text-dark-accent text-sm">Privacy Policy</Link></li>
                <li><Link to="/copyright" className="text-white/70 hover:text-dark-accent text-sm">Copyright Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/50 text-sm">
            © {currentYear} BibleNOW Livestream Hub. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex items-center">
            <span className="text-white/50 text-sm flex items-center">
              Made with <Heart size={14} className="mx-1 text-red-500" /> for the faith community
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
