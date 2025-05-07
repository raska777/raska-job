import { useEffect } from 'react';

function createConnections() {
  const container = document.querySelector('.raskajob-connections');
  if (!container) return;
  
  container.innerHTML = '';
  
  // Create dots
  const dotCount = 15;
  const dots = [];
  
  for (let i = 0; i < dotCount; i++) {
    const dot = document.createElement('div');
    dot.className = 'raskajob-dot';
    
    // Random position
    const left = Math.random() * 100;
    const top = Math.random() * 80 + 10; // 10-90% of height
    
    dot.style.left = `${left}%`;
    dot.style.top = `${top}%`;
    dot.style.animationDelay = `${Math.random() * 2}s`;
    
    container.appendChild(dot);
    dots.push({ element: dot, left, top });
  }
  
  // Create lines between some dots
  for (let i = 0; i < dotCount * 1.5; i++) {
    const line = document.createElement('div');
    line.className = 'raskajob-line';
    
    const startIdx = Math.floor(Math.random() * dotCount);
    const endIdx = Math.floor(Math.random() * dotCount);
    
    if (startIdx === endIdx) continue;
    
    const start = dots[startIdx];
    const end = dots[endIdx];
    
    const length = Math.sqrt(
      Math.pow(end.left - start.left, 2) + 
      Math.pow(end.top - start.top, 2)
    );
    
    const angle = Math.atan2(
      end.top - start.top, 
      end.left - start.left
    ) * 180 / Math.PI;
    
    line.style.width = `${length}%`;
    line.style.left = `${start.left}%`;
    line.style.top = `${start.top}%`;
    line.style.transform = `rotate(${angle}deg)`;
    line.style.animationDelay = `${Math.random() * 2}s`;
    
    container.appendChild(line);
  }
}

export function HeaderAnimations() {
  useEffect(() => {
    createConnections();
    window.addEventListener('resize', createConnections);
    
    return () => {
      window.removeEventListener('resize', createConnections);
    };
  }, []);
  
  return (
    <>
      <div className="raskajob-network"></div>
      <div className="raskajob-connections"></div>
      <div className="raskajob-tech-pulse"></div>
    </>
  );
}