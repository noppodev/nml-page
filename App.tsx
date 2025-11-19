import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import QuickStart from './components/QuickStart';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
        <QuickStart />
      </main>
      <Footer />
    </div>
  );
}

export default App;