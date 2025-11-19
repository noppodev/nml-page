import React, { useState, useEffect } from 'react';
import { NAV_ITEMS } from '../constants';

interface HeaderProps {
  onNavigate: (view: 'landing' | 'docs' | 'playground', sectionId?: string) => void;
  currentView: 'landing' | 'docs' | 'playground';
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentView }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (item: typeof NAV_ITEMS[0]) => {
    if (item.id === 'docs') {
      onNavigate('docs');
    } else if (item.id === 'playground') {
      onNavigate('playground');
    } else {
      onNavigate('landing', item.id);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen || currentView === 'docs' || currentView === 'playground' ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <button onClick={() => onNavigate('landing', 'top')} className="flex items-center gap-2 group focus:outline-none">
              <div className="w-10 h-10 bg-nml-green rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-105 transition-transform">
                N
              </div>
              <span className="font-bold text-2xl tracking-tight text-slate-800 group-hover:text-nml-green transition-colors">
                NML
              </span>
            </button>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => (
              <button 
                key={item.label} 
                onClick={() => handleNavClick(item)}
                className={`text-sm font-medium transition-colors focus:outline-none ${
                  (currentView === 'docs' && item.id === 'docs') || (currentView === 'playground' && item.id === 'playground')
                    ? 'text-nml-green font-bold' 
                    : 'text-slate-600 hover:text-nml-green'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-600 hover:text-slate-900 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 absolute w-full shadow-lg">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {NAV_ITEMS.map((item) => (
              <button 
                key={item.label} 
                onClick={() => handleNavClick(item)}
                className="block w-full text-left px-3 py-2 text-base font-medium text-slate-600 hover:text-nml-green hover:bg-slate-50 rounded-md focus:outline-none"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;