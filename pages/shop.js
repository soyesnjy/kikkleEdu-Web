/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';
import { useEffect, useState } from 'react';

import UserGreeting from '@/component/MyPage_Component/UserGreeting';
import SubscriptionStatus from '@/component/Shop_Component/SubscriptionStatus';
import TicketCard from '@/component/Shop_Component/TicketCard';

// Router
import { useRouter } from 'next/router';
// Params
import { useSearchParams } from 'next/navigation';

// SweetAlert2
import Swal from 'sweetalert2';

import { handleKakaoPayApprove } from '@/fetchAPI/kakaoPayAPI';

import { payInfo } from '@/store/payInfo';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const ticketArr = [
  {
    days: 'pay_day',
    originalPrice: '5,400',
    discountedPrice: '2,000',
    value: '1daypass',
    backgroundUrl: '/src/Shop_IMG/Shop_Ticket_Bg1_IMG.png',
    color: '#FFF500',
  },
  {
    days: 'pay_month',
    originalPrice: '9,900',
    discountedPrice: '6,000',
    value: '1monthpass',
    backgroundUrl: '/src/Shop_IMG/Shop_Ticket_Bg30_IMG.png',
    color: '#6EA4FF',
  },
  {
    days: 'pay_year',
    originalPrice: '99,000',
    discountedPrice: '60,000',
    value: '1yearpass',
    backgroundUrl: '/src/Shop_IMG/Shop_Ticket_Bg365_IMG.png',
    color: '#A62AA9',
  },
];

export default function Shop() {
  // NextJs는 useNavigate 대신 useRouter를 사용한다
  const router = useRouter();
  // 권한 code Params 찾기
  const searchParams = useSearchParams();
  const pg_token = searchParams.get('pg_token'); // 결제 성공 시 반환되는 Parameter 값
  const { t } = useTranslation('shop');

  useEffect(() => {
    // 페이지 언마운트 - 결제관련 정보 localStorage에서 제거
    return () => {
      localStorage.removeItem('tid');
      localStorage.removeItem('payClass');
    };
  }, []);

  // pg_token 반환 시 발동 - KakaoPay 승인
  useEffect(() => {
    if (pg_token) {
      // KakaoPay 승인 API 호출
      handleKakaoPayApprove({
        cid: process.env.NEXT_PUBLIC_KAKAO_PAY_CID,
        tid: '', // 서버 세션 데이터에 저장
        partner_order_id:
          payInfo[localStorage.getItem('payClass')].partner_order_id,
        partner_user_id: localStorage.getItem('id'),
        pg_token,
      }).then((res) => {
        // 승인 성공
        if (res.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Pay Success!',
            text: 'Main Page로 이동합니다',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            localStorage.removeItem('tid');
            localStorage.removeItem('payClass');
            router.push('/'); // 메인 화면으로 라우팅
          });
        }
        // 승인 실패
        else {
          Swal.fire({
            icon: 'error',
            title: 'Pay Fail!',
            showConfirmButton: false,
            timer: 1000,
          }).then(() => {
            localStorage.removeItem('tid');
            localStorage.removeItem('payClass');
            router.push('/shop'); // pg_token 삭제를 위한 라우팅
          });
        }
      });
    }
  }, [pg_token]);

  // // KakaoPay 결제준비 이벤트 핸들러
  // const kakaoPayHandle = async (e) => {
  //   // 카카오페이 결제 준비 API 호출 후, 받은 URL로 모달 띄우기
  //   try {
  //     let payClass = e.target.value;
  //     console.log(payClass);
  //     localStorage.setItem('payClass', payClass);
  //     let input = payInfo[payClass];

  //     // KakaoPay Ready API 호출
  //     const data = await handleKakaoPayReady({
  //       ...input,
  //       cid: process.env.NEXT_PUBLIC_KAKAO_PAY_CID, // 사업자 번호
  //       partner_user_id: localStorage.getItem('id'),
  //       approval_url: `${process.env.NEXT_PUBLIC_INNER_URL}/shop`,
  //       fail_url: `${process.env.NEXT_PUBLIC_INNER_URL}/shop`,
  //       cancel_url: `${process.env.NEXT_PUBLIC_INNER_URL}/shop`,
  //     });
  //     // redirect 되기 때문에 로컬 스토리지에 저장
  //     localStorage.setItem('tid', data.tid);
  //     // 결제 페이지로 이동하기
  //     window.location.href = data.next_redirect_pc_url;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <ShopPageContainer>
      <UserGreeting />
      <PlanContainer>
        <SubscriptionStatus />
        <TicketContainer>
          {ticketArr.map((el, index) => {
            return (
              <TicketCard
                key={index}
                days={t(`${el.days}`)}
                originalPrice={el.originalPrice}
                discountedPrice={el.discountedPrice}
                value={el.value}
                backgroundUrl={el.backgroundUrl}
                color={el.color}
              />
            );
          })}
        </TicketContainer>
      </PlanContainer>
    </ShopPageContainer>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['shop', 'nav'])),
    },
  };
}

const ShopPageContainer = styled.main`
  /* background-image: url('/src/soyesKids_Background_image.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; */

  background-color: white;

  padding: 5.3rem 3rem;

  width: 100vw;
  min-height: 100vh;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: flex-start;

  gap: 4rem;

  @media (max-width: 768px) {
    padding: 5rem 1rem;
    gap: 1rem;
  }
`;

const PlanContainer = styled.div`
  width: 100%;
  height: auto;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  border-radius: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const TicketContainer = styled.div`
  width: 100%;
  height: auto;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    justify-content: center;
    gap: 0.5rem;
  }
`;

// const InputContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: baseline;
// `;

// const CheckboxContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   gap: 0.5rem;
// `;

// const BtnContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   gap: 0.5rem;
// `;
