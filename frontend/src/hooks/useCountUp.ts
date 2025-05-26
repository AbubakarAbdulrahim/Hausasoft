import { useEffect, useState } from 'react';

export function useCountUp(to: number, duration = 1200) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = to / (duration / 16);
    let frame: number;
    function animate() {
      start += increment;
      if (start < to) {
        setCount(Math.floor(start));
        frame = requestAnimationFrame(animate);
      } else {
        setCount(to);
      }
    }
    animate();
    return () => cancelAnimationFrame(frame);
  }, [to, duration]);
  return count;
} 