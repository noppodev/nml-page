import React from 'react';
import { CodeSnippet } from '../types';

interface CodeWindowProps {
  snippet: CodeSnippet;
  className?: string;
}

const CodeWindow: React.FC<CodeWindowProps> = ({ snippet, className = '' }) => {
  // Simple manual syntax highlighting simulation for "NML"
  const highlightCode = (code: string) => {
    return code.split('\n').map((line, i) => {
      // Very basic heuristics for coloring
      let content = line;
      
      // Keywords
      content = content.replace(/(component|state|style|render|end|div|h1|button)/g, '<span class="text-pink-400 font-semibold">$1</span>');
      
      // Attributes/Props
      content = content.replace(/(@click|class)/g, '<span class="text-yellow-300">$1</span>');
      
      // Strings
      content = content.replace(/(".*?")/g, '<span class="text-green-300">$1</span>');
      
      // Variables/Interpolation
      content = content.replace(/({.*?})/g, '<span class="text-blue-300">$1</span>');
      
      // CSS Properties (simplified)
      content = content.replace(/([a-z-]+):/g, '<span class="text-sky-300">$1:</span>');

      return (
        <div key={i} className="table-row">
          <span className="table-cell text-slate-500 text-right pr-4 select-none w-8 text-xs">{i + 1}</span>
          <span className="table-cell whitespace-pre" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      );
    });
  };

  return (
    <div className={`rounded-xl overflow-hidden shadow-2xl bg-[#1e1e1e] border border-slate-700 ${className}`}>
      <div className="flex items-center justify-between px-4 py-3 bg-[#252526] border-b border-slate-700">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        {snippet.fileName && (
          <div className="text-xs text-slate-400 font-mono">{snippet.fileName}</div>
        )}
        <div className="w-8" /> {/* Spacer for centering */}
      </div>
      <div className="p-4 overflow-x-auto code-font text-sm text-slate-200">
        <div className="table w-full">
            {highlightCode(snippet.code)}
        </div>
      </div>
    </div>
  );
};

export default CodeWindow;