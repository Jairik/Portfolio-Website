import React, { useRef, useEffect } from 'react';

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

const GlowCard: React.FC<GlowCardProps> = ({ children, className = '', glowColor = '51, 178, 51' }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty('--glow-x', `${x}px`);
      el.style.setProperty('--glow-y', `${y}px`);
      el.style.setProperty('--glow-intensity', '1');
    };

    const handleMouseLeave = () => {
      el.style.setProperty('--glow-intensity', '0');
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        '--glow-x': '50%',
        '--glow-y': '50%',
        '--glow-intensity': '0',
        '--glow-radius': '200px',
        '--glow-color': glowColor,
      } as React.CSSProperties}
    >
      <div className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
           style={{
             background: `radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y), 
               rgba(var(--glow-color), calc(var(--glow-intensity) * 0.3)) 0%, 
               transparent 60%)`
           }}
      />
      <div className="absolute inset-0 pointer-events-none z-50"
           style={{
             padding: '2px',
             background: `radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y), 
               rgba(var(--glow-color), calc(var(--glow-intensity) * 0.8)) 0%, 
               transparent 60%)`,
             mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
             maskComposite: 'exclude',
             WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
             WebkitMaskComposite: 'xor',
           }}
      />
      {children}
    </div>
  );
};

export default GlowCard;
