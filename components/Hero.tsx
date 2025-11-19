import React from 'react';
import Button from './Button';
import CodeWindow from './CodeWindow';
import { HERO_CODE } from '../constants';
import { ArrowRight, ChevronRight } from 'lucide-react';

interface HeroProps {
  onNavigate: (view: 'landing' | 'docs', sectionId?: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-to-b from-white to-slate-50">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-nml-green/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-nml-blue/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-medium text-slate-600 shadow-sm hover:bg-slate-50 transition-colors cursor-pointer">
              <span className="flex h-2 w-2 rounded-full bg-nml-green mr-2"></span>
              v1.0.0 is now available
              <ChevronRight className="ml-1 h-4 w-4 text-slate-400" />
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              Noppo Markup Language:<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-nml-green to-emerald-500">
                書いて、楽しい。
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              3つの言語を1つに。究極のWeb記述言語 NML。<br/>
              シンプルで、エレガントで、圧倒的にモダン。
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button onClick={() => onNavigate('landing', 'quick-start')}>
                始める
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" onClick={() => onNavigate('docs')}>
                ドキュメントを読む
              </Button>
            </div>

            <div className="pt-4 text-sm text-slate-500 flex items-center justify-center lg:justify-start gap-6">
               <div className="flex items-center">
                  <span className="font-bold text-slate-800 mr-1">MIT</span> License
               </div>
               <div className="flex items-center">
                  <span className="font-bold text-slate-800 mr-1">0</span> Dependency
               </div>
            </div>
          </div>

          {/* Right Content (Code) */}
          <div className="relative perspective-1000">
             <div className="relative transform transition-transform duration-500 hover:rotate-y-2 hover:scale-[1.01]">
                <div className="absolute -inset-1 bg-gradient-to-r from-nml-green to-nml-blue rounded-2xl blur opacity-30 animate-pulse"></div>
                <CodeWindow snippet={HERO_CODE} className="relative z-10" />
             </div>
             {/* Floating element decoration */}
             <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-xl border border-slate-100 hidden sm:block animate-bounce-slow">
                <div className="flex items-center space-x-3">
                    <div className="bg-green-100 p-2 rounded-lg">
                        <span className="text-2xl">🚀</span>
                    </div>
                    <div>
                        <p className="text-xs text-slate-500 uppercase font-bold">Performance</p>
                        <p className="text-sm font-bold text-slate-800">Lightning Fast</p>
                    </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;