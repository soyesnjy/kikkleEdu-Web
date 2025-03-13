import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { isNavOpenState } from '@/store/state';

const NavMobileSideMenuTouchHandler = () => {
  const [isOpen, setIsOpen] = useRecoilState(isNavOpenState);
  const [startX, setStartX] = useState<number | null>(null);
  const [startY, setStartY] = useState<number | null>(null);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      setStartX(e.touches[0].clientX);
      setStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (startX === null || startY === null) return;
      const touchX = e.touches[0].clientX;
      const touchY = e.touches[0].clientY;

      const diffX = touchX - startX;
      const diffY = touchY - startY;

      if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 80 && isOpen) {
          // 좌 → 우 드래그 (Close)
          setIsOpen(false);
          setStartX(null);
          setStartY(null);
        } else if (diffX < -80 && !isOpen) {
          // 우 → 좌 드래그 (Open)
          setIsOpen(true);
          setStartX(null);
          setStartY(null);
        }
      }
    };

    const handleTouchEnd = () => {
      setStartX(null);
      setStartY(null);
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isOpen, startX]);

  return null; // UI 요소 없음 (렌더링 X)
};

export default NavMobileSideMenuTouchHandler;
