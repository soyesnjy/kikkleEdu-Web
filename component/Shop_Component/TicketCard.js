// components/TicketCard.js
import React from 'react';
import styled from 'styled-components';
import { payInfo } from '@/store/payInfo';
import { handleKakaoPayReady } from '@/fetchAPI/kakaoPayAPI';
import { useRecoilState } from 'recoil';
import { mobile } from '../../store/state';

const TicketCard = ({
  days,
  originalPrice,
  discountedPrice,
  value,
  backgroundUrl,
  color,
}) => {
  const [mobileFlag, setMobileFlag] = useRecoilState(mobile);

  const kakaoPayHandle = async (e) => {
    // 카카오페이 결제 준비 API 호출 후, 받은 URL로 모달 띄우기
    try {
      let payClass = e.target.value; // 선택한 상품 속성명
      // console.log(payClass);
      localStorage.setItem('payClass', payClass); // 상품 정보를 로컬 스토리지 저장
      let input = payInfo[payClass]; // handleKakaoPayReady Input 값 지정

      // KakaoPay Ready API 호출
      const data = await handleKakaoPayReady({
        ...input,
        cid: process.env.NEXT_PUBLIC_KAKAO_PAY_CID, // 가맹점 번호 (현재는 테스트용 번호)
        partner_user_id: localStorage.getItem('id'),
        approval_url: `${process.env.NEXT_PUBLIC_INNER_URL}/shop`, // approve(결제 승인 단계) 이동 페이지
        fail_url: `${process.env.NEXT_PUBLIC_INNER_URL}/shop`, // ready 실패 시 이동 페이지
        cancel_url: `${process.env.NEXT_PUBLIC_INNER_URL}/shop`, // ready 취소 시 이동 페이지
      });
      // 결제 페이지로 이동하기
      window.location.href = mobileFlag
        ? data.next_redirect_mobile_url
        : data.next_redirect_pc_url;
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <CardContainer
      onClick={kakaoPayHandle}
      value={value}
      backgroundUrl={backgroundUrl}
    >
      <Title color={color}>{days}</Title>
      <OriginalPrice>{originalPrice}원</OriginalPrice>
      <DiscountedPrice>{discountedPrice}원</DiscountedPrice>
    </CardContainer>
  );
};

const CardContainer = styled.button`
  background-image: ${(props) =>
    props.backgroundUrl
      ? `url(${props.backgroundUrl})`
      : `url('/src/Shop_IMG/Shop_Ticket_Bg1_IMG.png')`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 20px;

  padding: 20px;
  padding-top: 8rem;
  width: 347px;
  height: 589px;
  border: none;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  cursor: pointer;

  @media (max-width: 768px) {
    width: 130px;
    height: 250px;
    gap: 0rem;
    padding-top: 5rem;
  }
`;

const Title = styled.div`
  color: ${(props) => (props.color ? props.color : '#fff500')};
  margin-bottom: 10px;
  text-decoration-line: underline;
  font-family: AppleSDGothicNeoH00;
  font-size: 40px;
  font-weight: bold;
  text-align: center;

  letter-spacing: -0.25rem;

  @media (max-width: 768px) {
    font-size: 20px;
    letter-spacing: -0.2rem;
  }
`;

const OriginalPrice = styled.div`
  font-size: 30px;
  color: #ff5151;
  text-decoration: line-through;
  font-family: AppleSDGothicNeoH00;

  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 15px;
    margin-bottom: 0;
  }
`;

const DiscountedPrice = styled.div`
  color: #000;
  font-size: 60px;
  font-weight: bold;
  line-height: 40px;
  font-family: AppleSDGothicNeoH00;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export default TicketCard;
