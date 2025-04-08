import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface UseLoginSessionCheckOptions {
  requireLogin?: boolean; // 로그인 필수 여부
  redirectIfLoggedIn?: boolean; // 로그인 시 다른 페이지로 리디렉션
  requireAdmin?: boolean; // 관리자만 접근 가능한 경우
}

const useLoginSessionCheck = ({
  requireLogin = false,
  redirectIfLoggedIn = false,
  requireAdmin = false,
}: UseLoginSessionCheckOptions) => {
  const router = useRouter();

  useEffect(() => {
    const logItem = localStorage.getItem('log');
    const loginSession = logItem ? JSON.parse(logItem) : null;

    const agencyType = localStorage.getItem('agencyType');
    const isAdmin = agencyType === 'admin';

    // 관리자 권한이 필요한데 관리자 아님
    if (requireAdmin && !isAdmin) {
      alert('관리자 전용 페이지입니다.');
      router.replace('/');
      return;
    }

    // 로그인 필수인데 로그인 안 되어 있음
    if (requireLogin && !loginSession) {
      alert('로그인이 필요한 서비스입니다!');
      router.replace('/login');
      return;
    }

    // 로그인 상태에서 접근 불가한 페이지
    if (redirectIfLoggedIn && loginSession) {
      router.replace('/');
      return;
    }
  }, [requireLogin, redirectIfLoggedIn, requireAdmin, router]);
};

export default useLoginSessionCheck;
