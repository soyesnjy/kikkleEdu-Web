import styled from 'styled-components';
import PortOne from '@portone/browser-sdk/v2'; // 포트원 브라우저 sdk
import Swal from 'sweetalert2';
import { handlePortOnePayCompleate } from '@/fetchAPI/shopAPI';

import { useRecoilState } from 'recoil';
import { modal } from '@/store/state';

type ShopGoodsType = {
  imgPath: string;
  title: string;
  price: number;
  tagColor: string;
};

const ShopGoods = ({ title, imgPath, tagColor, price }: ShopGoodsType) => {
  const [_, setModalFlag] = useRecoilState(modal);

  // 랜덤 ID 생성 함수
  function randomId() {
    return [...crypto.getRandomValues(new Uint32Array(2))]
      .map((word) => word.toString(16).padStart(8, '0'))
      .join('');
  }

  // 포트원 실행 함수
  const handleSubmit = async (e) => {
    e.preventDefault();
    // 모달 상태 ON
    setModalFlag(true);
    let payment;
    const paymentId = randomId();
    try {
      //
      payment = await PortOne.requestPayment({
        storeId: 'store-841fac61-b3e4-4270-9377-1339ccbc63d0', // 포트원 관리자 콘솔 -> 결제연동 -> 연동정보 (우상단)
        channelKey: 'channel-key-bb8ee80f-17e7-466d-a8b9-aa4063a4f177', // 포트원 관리자 콘솔 -> 결제연동 -> 연동정보 -> 채널관리 -> 테스트 -> 채널키
        paymentId, // 결제 ID. 서버측 결제 인증 시 사용됨
        orderName: title, // 상품명
        totalAmount: price, // 상품 가격
        currency: 'CURRENCY_KRW', // 화폐 종류
        payMethod: 'CARD', // 결제 수단
        // customData: {
        //   item: item.id,
        // },
        redirectUrl: `${process.env.NEXT_PUBLIC_REDIRECT_URI}/shop`,
      });
    } catch (e) {
      console.error(e);
      alert('PortOne Browser Fail');
      setModalFlag(false);
      return;
    }

    // 결제 취소
    if (payment.code !== undefined) {
      Swal.fire({
        icon: 'error',
        title: '결제 취소',
        showConfirmButton: true,
        scrollbarPadding: false, // 자동 padding-right 방지
        // timer: 1000,
      }).then(() => {
        setModalFlag(false);
      });
      return;
    }

    // 결제 시도
    const completeResponse = await handlePortOnePayCompleate({
      data: {
        paymentId: payment.paymentId,
      },
    });
    // console.log(completeResponse);
    // 결제 성공
    if (completeResponse.data.status === 'PAID') {
      // const paymentComplete = completeResponse;
      Swal.fire({
        icon: 'success',
        title: '결제 성공!',
        text: 'Test Payment Success!',
        showConfirmButton: false,
        timer: 1500,
        scrollbarPadding: false, // 자동 padding-right 방지
      }).then(() => {
        setModalFlag(false);
      });
    }
    // 결제 실패
    else {
      Swal.fire({
        icon: 'error',
        title: '결제 실패',
        showConfirmButton: false,
        timer: 1000,
        scrollbarPadding: false, // 자동 padding-right 방지
      }).then(() => {
        setModalFlag(false);
      });
    }
  };
  return (
    <ShopGoodsContainer onClick={handleSubmit}>
      <ShopGoodsTag tagcolor={tagColor}>{`태그`}</ShopGoodsTag>
      <ShopGoodsImageContainer imgpath={imgPath || ''} />
      <ShopGoodsTextContainer>
        <ShopGoodsTitle>{title}</ShopGoodsTitle>
        <ShopGoodsSubTitle>
          {`${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원`}
        </ShopGoodsSubTitle>
      </ShopGoodsTextContainer>
    </ShopGoodsContainer>
  );
};

type ImgPathType = {
  imgpath?: string;
};

type TagColorType = {
  tagcolor?: string;
};

const ShopGoodsContainer = styled.div`
  width: 275px;
  height: 334px;

  position: relative;

  border-radius: 12px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  /* 반응형 크기 조정 */
  @media (max-width: 768px) {
  }
`;

const ShopGoodsImageContainer = styled.div<ImgPathType>`
  width: 100%;
  height: 50%;

  background: url(${(props) => props.imgpath || '/half-moon.png'});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  border-radius: 12px 12px 0 0;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  cursor: pointer;

  /* 반응형 크기 조정 */
  @media (max-width: 768px) {
  }
`;

const ShopGoodsTextContainer = styled.div`
  width: 100%;
  height: 50%;
  padding: 1.3rem;

  border-radius: 0 0 12px 12px;
  border: 2px solid #f4f5f6;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  gap: 2rem;
  cursor: pointer;

  /* 반응형 크기 조정 */
  @media (max-width: 768px) {
  }
`;

const ShopGoodsTitle = styled.div`
  font-family: Pretendard;
  font-weight: 600;
  font-size: 1rem;
  color: black;

  white-space: pre;

  flex: 1;
`;

const ShopGoodsSubTitle = styled.div`
  font-family: Pretendard;
  font-weight: 700;
  font-size: 1.5rem;
  color: black;

  flex: 1;
`;

const ShopGoodsTag = styled.button<TagColorType>`
  position: absolute;
  top: 5%;
  left: 5%;

  background-color: ${(props) => props.tagcolor};

  padding: 6px 12px;
  border-radius: 16px;
  border: none;

  font-family: Pretendard;
  font-weight: 400;
  font-size: 1rem;
  color: white;
`;

export default ShopGoods;
