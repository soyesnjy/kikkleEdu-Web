// hooks/useDisableScroll.ts
import { useEffect } from 'react';

const useDisableScroll = (modalFlag: boolean) => {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth; // 스크롤바 너비 계산

    if (modalFlag) {
      body.style.overflowY = 'hidden';
      html.style.overflowY = 'hidden';
      html.style.paddingRight = `${scrollBarWidth}px`; // 스크롤바 공간만큼 패딩 추가
    } else {
      body.style.overflowY = 'auto';
      html.style.overflowY = 'auto';
      html.style.paddingRight = ''; // 원래대로 복원
    }

    return () => {
      body.style.overflowY = 'auto';
      html.style.overflowY = 'auto';
      html.style.paddingRight = '';
    };
  }, [modalFlag]);
};

export default useDisableScroll;
