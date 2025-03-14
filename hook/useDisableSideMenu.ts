import { useSetRecoilState } from 'recoil';
import { isSideMenuDisabled } from '@/store/state';
import { useEffect } from 'react';

const useDisableSideMenu = (ref: React.RefObject<HTMLElement>) => {
  const setIsSideMenuDisabled = useSetRecoilState(isSideMenuDisabled);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (ref.current && ref.current.contains(e.target as Node)) {
        setIsSideMenuDisabled(true);
      }
    };

    const handleTouchEnd = () => {
      setIsSideMenuDisabled(false);
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [ref, setIsSideMenuDisabled]);
};

export default useDisableSideMenu;
