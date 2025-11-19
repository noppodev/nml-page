import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { MessageCircle, X, Send, Bot, Sparkles, Loader2, ArrowRightCircle } from 'lucide-react';
import { AI_SYSTEM_PROMPT } from '../constants';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
}

interface ChatWidgetProps {
  onApplyCode?: (code: string) => void;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ onApplyCode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 'welcome', role: 'model', text: 'こんにちは！NMLについて何でも聞いてください。\n例：「コンポーネントの作り方は？」「stateの使い方は？」' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatSessionRef = useRef<Chat | null>(null);

  // Initialize Chat Session
  useEffect(() => {
    if (!chatSessionRef.current) {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      chatSessionRef.current = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: AI_SYSTEM_PROMPT,
          temperature: 0.7,
        },
      });
    }
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !chatSessionRef.current) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const modelMessageId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, { id: modelMessageId, role: 'model', text: '' }]);

      const result = await chatSessionRef.current.sendMessageStream({ message: userMessage.text });
      
      let fullText = "";
      for await (const chunk of result) {
        const c = chunk as GenerateContentResponse;
        if (c.text) {
            fullText += c.text;
            setMessages(prev => 
              prev.map(msg => 
                msg.id === modelMessageId ? { ...msg, text: fullText } : msg
              )
            );
        }
      }

    } catch (error) {
      console.error('Chat Error:', error);
      setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        role: 'model', 
        text: 'すみません、エラーが発生しました。もう一度お試しください。' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to render text with optional code actions
  const renderMessageText = (text: string, role: 'user' | 'model') => {
    // Check for code blocks ```nml ... ```
    const parts = text.split(/(```nml[\s\S]*?```)/g);
    
    return parts.map((part, i) => {
      if (part.startsWith('```nml')) {
        const code = part.replace(/```nml\n?/, '').replace(/```$/, '').trim();
        return (
          <div key={i} className="my-2 overflow-hidden rounded-lg border border-slate-200">
            <div className="bg-slate-800 text-xs text-slate-400 px-3 py-1 flex justify-between items-center">
              <span>NML</span>
              {role === 'model' && onApplyCode && (
                <button 
                  onClick={() => onApplyCode(code)}
                  className="flex items-center text-nml-green hover:text-white transition-colors font-bold"
                >
                  <ArrowRightCircle className="w-3 h-3 mr-1" />
                  Run in Editor
                </button>
              )}
            </div>
            <pre className="bg-[#1e1e1e] text-slate-200 p-3 text-xs overflow-x-auto font-mono">
              {code}
            </pre>
          </div>
        );
      }
      return <span key={i} className="whitespace-pre-wrap">{part}</span>;
    });
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nml-green ${
          isOpen ? 'bg-slate-800 rotate-90' : 'bg-gradient-to-r from-nml-green to-emerald-500'
        }`}
        aria-label="Open NML AI Assistant"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-[90vw] sm:w-[400px] h-[500px] bg-white rounded-2xl shadow-2xl border border-slate-100 flex flex-col transition-all duration-300 origin-bottom-right overflow-hidden ${
          isOpen 
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 scale-95 translate-y-10 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-4 flex items-center space-x-3">
          <div className="bg-white/10 p-2 rounded-lg">
            <Sparkles className="w-5 h-5 text-nml-green" />
          </div>
          <div>
            <h3 className="text-white font-bold text-sm">NML AI Assistant</h3>
            <p className="text-slate-400 text-xs flex items-center">
              <span className="w-2 h-2 bg-nml-green rounded-full mr-2 animate-pulse"></span>
              Online & Connected
            </p>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-nml-green text-white rounded-br-none'
                    : 'bg-white text-slate-800 border border-slate-100 rounded-bl-none'
                }`}
              >
                {msg.role === 'model' && (
                   <div className="flex items-center gap-2 mb-1 opacity-50 text-xs font-bold uppercase tracking-wider">
                      <Bot className="w-3 h-3" /> NML AI
                   </div>
                )}
                <div>{renderMessageText(msg.text, msg.role)}</div>
              </div>
            </div>
          ))}
          {isLoading && (
             <div className="flex justify-start">
                <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
                   <Loader2 className="w-5 h-5 text-nml-green animate-spin" />
                </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-slate-100">
          <form onSubmit={handleSubmit} className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="コードを書いて、と頼んでみてください..."
              className="w-full bg-slate-50 text-slate-800 placeholder-slate-400 rounded-full pl-5 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-nml-green/50 focus:bg-white transition-all border border-slate-200"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-nml-green text-white rounded-full hover:bg-emerald-600 disabled:opacity-50 disabled:hover:bg-nml-green transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChatWidget;