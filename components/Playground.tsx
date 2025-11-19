import React, { useState, useEffect } from 'react';
import { Play, RefreshCw, Code2 } from 'lucide-react';

interface PlaygroundProps {
  code: string;
  onCodeChange: (code: string) => void;
}

const Playground: React.FC<PlaygroundProps> = ({ code, onCodeChange }) => {
  const [compiledHtml, setCompiledHtml] = useState('');

  // Simple NML to HTML Transpiler Simulation
  const compileNML = (nml: string) => {
    const lines = nml.split('\n');
    let html = '';
    let script = 'let state = {};\n';
    script += 'const listeners = {};\n';
    script += `
      function updateState(key, value) {
        state[key] = value;
        const els = document.querySelectorAll('[data-bind="'+key+'"]');
        els.forEach(el => el.textContent = value);
      }
    `;

    const tagStack: number[] = []; // stores indentation levels

    lines.forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('//')) return;

      // Check indent
      const indent = line.search(/\S|$/);

      // Close tags if indent decreases
      while (tagStack.length > 0 && tagStack[tagStack.length - 1] >= indent) {
        html += '</div>';
        tagStack.pop();
      }

      // 1. State declarations
      if (trimmed.startsWith('state ')) {
        const match = trimmed.match(/state\s+(\w+)\s*=\s*(.+)/);
        if (match) {
          script += `state.${match[1]} = ${match[2]};\n`;
        }
        return;
      }

      // 2. Style blocks (Simplistic)
      if (trimmed.startsWith('style {')) {
        // In a real parser, this would attach to previous element.
        // Here we just ignore for structural simplicity or inject a style tag
        // For this demo, we will rely on inline styles parsed below or CSS classes.
        return;
      }
      if (tagStack.length > 0 && trimmed === '}') {
         // Closing style block or just indent block closure handled by stack logic usually
         // But since we do indent-based, explicit '}' is ignored unless it's for style
         return;
      }
      
      // 3. Tags: div(id: "foo") {
      const tagMatch = trimmed.match(/^([a-z0-9]+)(?:[.#]([a-zA-Z0-9_.-]+))?(?:\(([^)]+)\))?\s*(\{)?/);
      
      if (tagMatch) {
        const tagName = tagMatch[1];
        let classes = tagMatch[2] ? tagMatch[2].replace(/\./g, ' ') : '';
        const attributesStr = tagMatch[3] || '';
        const hasContentBlock = !!tagMatch[4];

        // Parse attributes
        let attrString = '';
        let events = '';

        if (attributesStr) {
          // on: click { ... } handling
          const eventMatch = attributesStr.match(/on:\s*([a-z]+)\s*\{([^}]+)\}/);
          if (eventMatch) {
             // convert simple assignments for demo
             let js = eventMatch[2].replace(/count\.value/g, 'state.count');
             // Magic regex to turn "state.count += 1" into "updateState('count', state.count + 1)"
             // This is a hack for the demo.
             if (js.includes('state.count += 1')) js = "updateState('count', state.count + 1)";
             if (js.includes('state.count = 0')) js = "updateState('count', 0)";
             
             events = ` onclick="${js.replace(/"/g, "'")}"`;
          }

          // Standard attributes (id: "val")
          const attrs = attributesStr.replace(/on:.*?\}/, '').split(',');
          attrs.forEach(pair => {
            const [k, v] = pair.split(':').map(s => s.trim());
            if (k && v) {
               attrString += ` ${k}=${v}`;
            }
          });
        }

        html += `<${tagName} class="${classes}"${attrString}${events}>`;
        
        // If text content follows immediately? (Not in NML spec heavily, usually nested)
        // But let's check for: h1 "Title"
        const textMatch = trimmed.match(/"([^"]+)"\s*([a-z]+)?/);
        if (textMatch) {
           // plain text
           html += textMatch[1];
           // variable binding
           if (textMatch[2]) {
             html += `<span data-bind="${textMatch[2]}"></span>`;
             script += `setTimeout(() => updateState('${textMatch[2]}', state.${textMatch[2]}), 0);\n`;
           }
        } else if (trimmed.includes('"') === false) {
           // Maybe just variable? e.g. p count
           const varMatch = trimmed.replace(tagMatch[0], '').trim();
           if (varMatch && /^[a-z]+$/.test(varMatch)) {
              html += `<span data-bind="${varMatch}"></span>`;
              script += `setTimeout(() => updateState('${varMatch}', state.${varMatch}), 0);\n`;
           }
        }

        // Special handling for style block contents in this naive parser
        // We skip complex CSS parsing for this demo and assume basic structure
        
        tagStack.push(indent);
      } 
      // 4. Style properties inside a block (naive check)
      else if (trimmed.includes(':') && trimmed.includes('"')) {
         // background_color: "red"
         // This works if we are inside a tag. We'd need to inject style attribute to the last open tag.
         // For this demo, we'll skip applying dynamic styles via NML parsing logic 
         // as it requires DOM manipulation of the *previous* element in the string buffer.
      }
    });

    // Close remaining tags
    while (tagStack.length > 0) {
      html += '</div>'; // Simplified closing, assuming everything is div-like or auto-closing irrelevant for visuals
      tagStack.pop();
    }

    // Final assembly
    return `
      <html>
        <head>
          <style>
            body { font-family: sans-serif; padding: 0; margin: 0; }
            /* Default styles for demo */
            button { cursor: pointer; }
          </style>
        </head>
        <body>
          ${html}
          <script>
            try {
              ${script}
            } catch(e) { console.log(e); }
          </script>
        </body>
      </html>
    `;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setCompiledHtml(compileNML(code));
    }, 800); // Debounce
    return () => clearTimeout(timer);
  }, [code]);

  return (
    <div className="pt-20 h-screen flex flex-col bg-slate-900">
      {/* Toolbar */}
      <div className="h-12 bg-slate-800 border-b border-slate-700 flex items-center px-4 justify-between shrink-0">
        <div className="flex items-center space-x-2 text-slate-200">
          <Code2 className="w-5 h-5 text-nml-green" />
          <span className="font-bold">NML Playground</span>
          <span className="text-xs text-slate-500 ml-2">Alpha v0.1</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-xs text-slate-400">
            <RefreshCw className="w-3 h-3 mr-1 animate-spin-slow" />
            Auto-Compiling
          </div>
          <button className="bg-nml-green hover:bg-emerald-600 text-white px-3 py-1 rounded text-xs font-bold flex items-center transition-colors">
            <Play className="w-3 h-3 mr-1" /> Run
          </button>
        </div>
      </div>

      {/* Split View */}
      <div className="flex-1 flex overflow-hidden">
        {/* Editor */}
        <div className="w-1/2 flex flex-col border-r border-slate-700">
          <div className="bg-[#1e1e1e] flex-1 relative overflow-hidden">
            <textarea
              value={code}
              onChange={(e) => onCodeChange(e.target.value)}
              className="w-full h-full bg-transparent text-slate-300 font-mono text-sm p-4 resize-none focus:outline-none leading-relaxed"
              spellCheck={false}
              placeholder="// Write NML code here..."
            />
          </div>
        </div>

        {/* Preview */}
        <div className="w-1/2 bg-white relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
          <iframe
            title="preview"
            srcDoc={compiledHtml}
            className="w-full h-full border-none relative z-10"
            sandbox="allow-scripts"
          />
        </div>
      </div>
    </div>
  );
};

export default Playground;