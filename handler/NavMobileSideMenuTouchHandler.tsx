import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { isNavOpenState } from '@/store/state';

const NavMobileSideMenuTouchHandler = () => {
  const [isOpen, setIsOpen] = useRecoilState(isNavOpenState);
  const [startX, setStartX] = useState<number | null>(null);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      setStartX(e.touches[0].clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (startX === null) return;
      const touchX = e.touches[0].clientX;
      const diffX = touchX - startX;

      if (diffX > 50 && isOpen) {
        // ⬅ 좌 → 우 드래그 시 메뉴 닫기
        setIsOpen(false);
        setStartX(null);
      } else if (diffX < -50 && !isOpen) {
        // ➡ 우 → 좌 드래그 시 메뉴 열기
        setIsOpen(true);
        setStartX(null);
      }
    };

    const handleTouchEnd = () => {
      setStartX(null);
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
