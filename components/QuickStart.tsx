import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';
import { INSTALL_CMD, HELLO_WORLD_CODE } from '../constants';
import CodeWindow from './CodeWindow';

const QuickStart: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(INSTALL_CMD);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="quick-start" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Decor */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-7xl h-full opacity-10 pointer-events-none">
         <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500 rounded-full blur-[100px]"></div>
         <div className="absolute bottom-20 right-20 w-64 h-64 bg-nml-green rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight mb-6">
              数秒で始められます
            </h2>
            <p className="text-slate-400 text-lg mb-10">
              NMLのCLIツールは軽量で、設定不要です。npm経由でインストールし、すぐにコーディングを開始できます。
            </p>

            <div className="space-y-6">
              <div className="bg-black/40 rounded-lg p-1 border border-slate-700">
                <div className="flex items-center justify-between px-4 py-3">
                  <div className="flex items-center font-mono text-sm text-slate-300">
                    <Terminal className="w-4 h-4 mr-3 text-nml-green" />
                    <span className="mr-2 text-slate-500">$</span>
                    {INSTALL_CMD}
                  </div>
                  <button 
                    onClick={handleCopy}
                    className="p-2 rounded-md hover:bg-slate-700 text-slate-400 hover:text-white transition-colors focus:outline-none"
                    aria-label="Copy command"
                  >
                    {copied ? <Check className="w-4 h-4 text-nml-green" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-white text-lg">Next Steps:</h3>
                <ul className="space-y-3">
                  {[
                    'プロジェクトを作成: nml create my-app',
                    '開発サーバーを起動: cd my-app && nml dev',
                    'ビルド: nml build'
                  ].map((step, i) => (
                    <li key={i} className="flex items-center text-slate-300">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-mono mr-3 text-nml-green">
                        {i + 1}
                      </div>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-4 flex items-center justify-between">
               <span className="text-sm font-medium text-slate-400">Hello World Example</span>
               <span className="text-xs text-slate-600 bg-slate-800 px-2 py-1 rounded">App.nml</span>
            </div>
            <CodeWindow snippet={HELLO_WORLD_CODE} className="border-slate-600 shadow-2xl shadow-nml-green/10" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default QuickStart;