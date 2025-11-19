import React from 'react';
import { NAV_ITEMS } from '../constants';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
          <div className="max-w-sm">
             <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-slate-900 rounded-md flex items-center justify-center text-white font-bold text-lg">
                  N
                </div>
                <span className="font-bold text-xl tracking-tight text-slate-900">
                  NML
                </span>
             </div>
             <p className="text-slate-500 text-sm">
               NML (Noppo Markup Language) is a modern, concise web description language designed for developer happiness.
             </p>
          </div>
          
          <div className="flex gap-12">
            <div>
              <h3 className="font-semibold text-slate-900 mb-4">Product</h3>
              <ul className="space-y-2">
                {NAV_ITEMS.map(item => (
                  <li key={item.label}>
                    <button 
                      // Simple footer links that don't effectively navigate in this static view 
                      // but serve as a site map representation.
                      className="text-sm text-slate-500 hover:text-nml-green transition-colors text-left"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">
            &copy; {currentYear} Noppo Markup Language. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
             <a href="#" className="text-slate-400 hover:text-slate-600 text-sm">Privacy</a>
             <a href="#" className="text-slate-400 hover:text-slate-600 text-sm">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;