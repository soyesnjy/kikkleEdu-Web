// hooks/useDisableScroll.ts
import { useEffect } from 'react';
import { useRouter } from 'next/router';

// 로그인 여부를 체크하는 커스텀훅. 미로그인 시 로그인 페이지로 강제이동
const useLoginSessionCheck = () => {
  const router = useRouter();

  // 강사 List 조회
  useEffect(() => {
    // 미로그인 시 메인 페이지로 이동
    const loginSession = JSON.parse(localStorage.getItem('log'));
    if (!loginSession) {
      alert('로그인이 필요한 서비스입니다!');
      router.replace('/login');
      return;
    }
  }, []);
};
export default useLoginSessionCheck;
