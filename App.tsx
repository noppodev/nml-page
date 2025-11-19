import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import QuickStart from './components/QuickStart';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import Documentation from './components/Documentation';

function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'docs'>('landing');

  const handleNavigate = (view: 'landing' | 'docs', sectionId?: string) => {
    setCurrentView(view);
    
    // If navigating to a section on the landing page
    if (view === 'landing' && sectionId) {
      if (sectionId === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // Use setTimeout to allow the render to switch view first if needed
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 50);
      }
    } else if (view === 'docs') {
       // Scroll to top when switching to docs
       window.scrollTo(0, 0);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header onNavigate={handleNavigate} currentView={currentView} />
      
      {currentView === 'landing' ? (
        <main className="flex-grow">
          <Hero onNavigate={handleNavigate} />
          <Features />
          <QuickStart />
        </main>
      ) : (
        <Documentation />
      )}
      
      <Footer />
      <ChatWidget />
    </div>
  );
}

export default App;