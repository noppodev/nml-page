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
      
      // Tags (div, h1, etc) - simplistic approach looking for words at start or after braces/spaces
      content = content.replace(/\b(div|h1|p|button|ul|li|a|span)\b(?![-(])/g, '<span class="text-pink-400 font-semibold">$1</span>');

      // Keywords
      content = content.replace(/\b(state|style)\b/g, '<span class="text-purple-400 font-bold">$1</span>');
      
      // Attributes keys (e.g. id:, href:)
      content = content.replace(/\b([a-z]+):(?=\s)/g, '<span class="text-sky-300">$1:</span>');

      // Event handlers (on: click)
      content = content.replace(/(on:)\s*([a-z]+)/g, '<span class="text-yellow-300">$1 $2</span>');
      
      // Strings
      content = content.replace(/(".*?")/g, '<span class="text-green-300">$1</span>');
      
      // Variables / Numbers
      content = content.replace(/\b(\d+)\b/g, '<span class="text-orange-300">$1</span>');
      
      // CSS Properties (snake_case) inside style blocks - simplified heuristic
      content = content.replace(/([a-z_]+):/g, (match) => {
         // try to distinguish between css prop and attribute key by context if possible, 
         // but for simple heuristic, same color is often fine. Let's make props slightly different.
         return `<span class="text-cyan-200">${match}</span>`;
      });

      // Comments
      if (line.trim().startsWith('//')) {
        content = `<span class="text-slate-500 italic">${line}</span>`;
      } else if (content.includes('//')) {
         // Handle inline comments somewhat gracefully (fragile)
         const parts = content.split('//');
         content = `${parts[0]}<span class="text-slate-500 italic">//${parts.slice(1).join('//')}</span>`;
      }

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