import { useLayoutEffect, useState } from 'react';

export default function useWindowSizeX() {
  const [sizeX, setSizeX] = useState(0);
  useLayoutEffect(() => {
    function updateSize() {
      setSizeX(window.innerWidth);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return sizeX;
}