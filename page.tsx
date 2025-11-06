"use client";
import React, { useState, useEffect } from 'react';

type Particle = {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
};

type HackerLine = {
  id: number;
  text: string;
  x: number;
  y: number;
  opacity: number;
  size: string;
  color: string;
};

export default function NotFound() {
  const [glitchText, setGlitchText] = useState('404');
  const [particles, setParticles] = useState<Particle[]>([]);
  const [hackerText, setHackerText] = useState<HackerLine[]>([]);
  const [isFullGlitch, setIsFullGlitch] = useState(false);
  const [glitchOffset, setGlitchOffset] = useState({ x: 0, y: 0 });
  const [textGlitch, setTextGlitch] = useState({ offset1: { x: 0, y: 0 }, offset2: { x: 0, y: 0 } });
  useEffect(() => {
    const glitchChars = ['4', '0', '4', '@', '#', '$', '%', '&', '*', '!', '?'];
    const interval = setInterval(() => {
      const random = Math.random();
      if (random > 0.8) {
        setIsFullGlitch(true);
        setGlitchText(
          glitchChars[Math.floor(Math.random() * glitchChars.length)] +
          glitchChars[Math.floor(Math.random() * glitchChars.length)] +
          glitchChars[Math.floor(Math.random() * glitchChars.length)]
        );
        setGlitchOffset({
          x: (Math.random() - 0.5) * 25,
          y: (Math.random() - 0.5) * 15
        });
        setTextGlitch({
          offset1: { x: (Math.random() - 0.5) * 8, y: (Math.random() - 0.5) * 4 },
          offset2: { x: (Math.random() - 0.5) * 8, y: (Math.random() - 0.5) * 4 }
        });
        setTimeout(() => {
          setGlitchText('404');
          setIsFullGlitch(false);
          setGlitchOffset({ x: 0, y: 0 });
          setTextGlitch({ offset1: { x: 0, y: 0 }, offset2: { x: 0, y: 0 } });
        }, 150);
      }
    }, 200);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5
    }));
    setParticles(newParticles);
  }, []);
  useEffect(() => {
    const hackerPhrases = [
      'CONNECTING TO DATABASE...',
      'LOADING TRANSACTIONS...',
      'CHECKING SECURITIES...',
      'SYNCING ACCOUNTS...',
      'ERROR: PAGE NOT FOUND',
      'VERIFYING CREDENTIALS...',
      '<ENCRYPTED_DATA>',
      'SESSION_TIMEOUT: 404',
      'BLOCKCHAIN VERIFIED',
      'NASDAQ://CONNECT',
      '>>AUTHENTICATION OK',
      'FIREWALL: ACTIVE'
    ];
    const generateHackerText = () => {
      return Array.from({ length: 25 }, (_, i) => ({
        id: i,
        text: hackerPhrases[Math.floor(Math.random() * hackerPhrases.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.3 + 0.1,
        size: Math.random() > 0.5 ? 'text-xs' : 'text-[10px]',
        color: ['text-green-500', 'text-blue-500', 'text-cyan-500', 'text-emerald-500'][Math.floor(Math.random() * 4)]
      }));
    };
    setHackerText(generateHackerText());
    const interval = setInterval(() => setHackerText(generateHackerText()), 2000);
    return () => clearInterval(interval);
  }, []);
  const [matrixCode, setMatrixCode] = useState('');
  useEffect(() => {
    const chars = '01アイウエオカキクケコサシスセソ$€¥£';
    const generateMatrix = () => {
      let code = '';
      for (let i = 0; i < 80; i++) code += chars[Math.floor(Math.random() * chars.length)] + ' ';
      return code;
    };
    const interval = setInterval(() => setMatrixCode(generateMatrix()), 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float { 0%,100%{transform:translateY(0)}50%{transform:translateY(-30px)} }
        @keyframes glitch-flicker { 0%,100%{opacity:1}50%{opacity:0.5} }
        @keyframes glitch-shake { 0%,100%{transform:translate(0)}50%{transform:translate(5px,-5px)} }
        @keyframes grid-move { 0%{transform:translate(0)}100%{transform:translate(50px,50px)} }
        @keyframes scan { 0%{top:0}100%{top:100%} }
        @keyframes rain { 0%{transform:translateY(-100%)}100%{transform:translateY(100vh)} }
        @keyframes shine { 0%{transform:translateX(-100%) rotate(45deg)}100%{transform:translateX(200%) rotate(45deg)} }
      `}} />

      <div className={`min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 relative overflow-hidden flex items-center justify-center select-none ${isFullGlitch ? 'glitch-shake' : ''}`}
           style={{
             transform: `translate(${glitchOffset.x}px, ${glitchOffset.y}px)`,
             filter: isFullGlitch ? 'contrast(140%) saturate(160%)' : 'none'
           }}>
        
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(59,130,246,0.3)1px,transparent 1px),
                               linear-gradient(90deg,rgba(59,130,246,0.3)1px,transparent 1px)`,
            backgroundSize: '50px 50px',
            animation: 'grid-move 20s linear infinite'
          }}></div>
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {hackerText.map(item => (
            <div key={item.id}
                 className={`absolute font-mono font-bold ${item.size} ${item.color}`}
                 style={{
                   left: `${item.x}%`,
                   top: `${item.y}%`,
                   opacity: item.opacity,
                   textShadow: '0 0 10px currentColor',
                   transform: `rotate(${Math.random()*10-5}deg)`
                 }}>
              {item.text}
            </div>
          ))}
        </div>

        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent absolute animate-scan"></div>
        </div>

        {particles.map(p => (
          <div key={p.id}
               className="absolute rounded-full bg-blue-400 opacity-30"
               style={{
                 left: `${p.x}%`,
                 top: `${p.y}%`,
                 width: `${p.size}px`,
                 height: `${p.size}px`,
                 animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite`
               }}></div>
        ))}

        <div className="absolute top-0 left-0 w-full h-20 overflow-hidden opacity-10 text-green-400 text-xs font-mono whitespace-nowrap">{matrixCode}</div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-9xl md:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 tracking-wider relative"
              style={{
                textShadow: '0 0 30px rgba(59,130,246,0.5)',
                fontFamily: 'monospace'
              }}>
            {glitchText}
          </h1>
          {isFullGlitch && (
            <>
              <div className="absolute inset-0 text-9xl md:text-[12rem] font-bold text-pink-500 opacity-70"
                   style={{ transform: `translate(${textGlitch.offset1.x}px,${textGlitch.offset1.y}px)` }}>{glitchText}</div>
              <div className="absolute inset-0 text-9xl md:text-[12rem] font-bold text-cyan-500 opacity-70"
                   style={{ transform: `translate(${textGlitch.offset2.x}px,${textGlitch.offset2.y}px)` }}>{glitchText}</div>
            </>
          )}

          <h2 className="text-3xl md:text-4xl font-bold text-white mt-8">PAGE NOT FOUND</h2>
          <p className="text-blue-200 text-lg mt-2 max-w-2xl mx-auto">Rất tiếc! Không thể tìm thấy trang bạn muốn hiển thị.<br />Quay về trang chủ đi, trước khi hệ thống gửi bạn vào isekai khác!</p>
          
          <a href="/" className="mt-6 inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:scale-105 transition-transform">
            ← Về Trang Chủ
          </a>

          <div className="mt-12 text-blue-400/50 font-mono text-sm">
            ERROR_CODE: <span className="text-red-400">PAGE_NOT_FOUND</span> | 
            SESSION: <span className="text-green-400">{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
          </div>
        </div>
      </div>
    </>
  );
}
