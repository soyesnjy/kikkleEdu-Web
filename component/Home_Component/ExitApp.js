import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

const ExitApp = () => {
  const router = useRouter();
  const [backPressedOnce, setBackPressedOnce] = useState(false); // 뒤로가기 여부 추적

  useEffect(() => {
    const handlePopState = (event) => {
      event.preventDefault();

      // 히스토리 스택 길이가 1일 경우 (이전 페이지가 없는 경우)
      if (window.history.length <= 1) {
        if (backPressedOnce) {
          Swal.fire({
            title: '앱을 종료하시겠습니까?',
            showCancelButton: true,
            confirmButtonText: '예',
            cancelButtonText: '아니요',
          }).then((result) => {
            if (result.isConfirmed) {
              window.close(); // 앱 종료 (탭 닫기 시도)
            }
          });
        } else {
          setBackPressedOnce(true);
          Swal.fire({
            title: '뒤로가기를 다시 누르시면 앱이 종료됩니다.',
            timer: 2000,
            showConfirmButton: false,
          });

          // 2초 내에 다시 뒤로가기를 누르지 않으면 상태 초기화
          setTimeout(() => {
            setBackPressedOnce(false);
          }, 2000);
        }
      } else {
        // 히스토리 스택에 값이 있을 경우 일반적인 뒤로가기 수행
        router.back();
      }
    };

    // popstate 이벤트 리스너 등록
    window.addEventListener('popstate', handlePopState);

    // 컴포넌트 언마운트 시 이벤트 리스너 해제
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [backPressedOnce, router]);

  return null; // UI가 필요 없는 컴포넌트
};

export default ExitApp;
