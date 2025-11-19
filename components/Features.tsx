import React from 'react';
import { FEATURES } from '../constants';

const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-base text-nml-green font-semibold tracking-wide uppercase">Philosophy</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            開発者が「書く」ことに<br/>集中できる言語
          </p>
          <p className="mt-4 max-w-2xl text-xl text-slate-500 lg:mx-auto">
            NMLは、Web開発の複雑さを取り除き、純粋な創造性を取り戻すために設計されました。
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => (
            <div 
              key={index} 
              className="relative group bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-nml-green to-nml-blue transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-t-2xl origin-left"></div>
              
              <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-nml-green shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-nml-green transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;