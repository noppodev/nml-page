import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import QuickStart from './components/QuickStart';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import Documentation from './components/Documentation';
import Playground from './components/Playground';
import { PLAYGROUND_DEFAULT_CODE } from './constants';

function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'docs' | 'playground'>('landing');
  const [playgroundCode, setPlaygroundCode] = useState(PLAYGROUND_DEFAULT_CODE);

  const handleNavigate = (view: 'landing' | 'docs' | 'playground', sectionId?: string) => {
    setCurrentView(view);
    
    if (view === 'landing' && sectionId) {
      if (sectionId === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 50);
      }
    } else {
       window.scrollTo(0, 0);
    }
  };

  const handleApplyCode = (code: string) => {
    setPlaygroundCode(code);
    handleNavigate('playground');
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
      ) : currentView === 'docs' ? (
        <Documentation />
      ) : (
        <Playground code={playgroundCode} onCodeChange={setPlaygroundCode} />
      )}
      
      <Footer />
      <ChatWidget onApplyCode={handleApplyCode} />
    </div>
  );
}

export default App;