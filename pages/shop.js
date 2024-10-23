/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';
import { useEffect, useState } from 'react';
// Router
import { useRouter } from 'next/router';
// Params
import { useSearchParams } from 'next/navigation';
// SweetAlert2
import Swal from 'sweetalert2';
import { handleKakaoPayApprove } from '@/fetchAPI/kakaoPayAPI';
import { payInfo } from '@/store/payInfo';
import EndSection from '@/component/Home_Component/EndSection';

const classDefaultArr = [
  {
    imgPath: '/src/Shop_IMG/Shop_Goods_WorkBookAR_IMG_.png',
    title: '스토리발레 AR워크북 (1종)',
    price: 20000,
    routePath: '/',
  },
  {
    imgPath: '/src/Shop_IMG/Shop_Goods_Card_IMG_.png',
    title: '마음챙김 카드',
    price: 10000,
    routePath: '/',
  },
  {
    imgPath: '/src/Shop_IMG/Shop_Goods_Board_IMG_.png',
    title: '마음챙김 보드게임판',
    price: 10000,
    routePath: '/',
  },
  {
    imgPath: '/src/Shop_IMG/Shop_Goods_WorkBook_IMG_.png',
    title: '세계문화발레 워크북(1종)',
    price: 20000,
    routePath: '/',
  },
  {
    imgPath: '/src/Shop_IMG/Shop_Goods_BoardPackage_IMG_.png',
    title: '보드게임 패키지',
    price: 20000,
    routePath: '/',
  },
];

const Shop = () => {
  const [classDataArr, setClassDataArr] = useState(classDefaultArr);
  const router = useRouter();

  // 권한 code Params 찾기
  const searchParams = useSearchParams();
  const pg_token = searchParams.get('pg_token'); // 결제 성공 시 반환되는 Parameter 값

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

  return (
    <MainContainer>
      {/* 헤더 섹션 */}
      <HeaderSection>
        <HeaderContent>
          <Title>Kids Class edu</Title>
          <Subtitle>상점</Subtitle>
          <HeaderIntroDiv>
            소예키즈 소개 - <GreenColorSpan>상점</GreenColorSpan>
          </HeaderIntroDiv>
        </HeaderContent>
      </HeaderSection>
      {/* 미들 섹션 */}
      <MiddleSection>
        <MiddleContainer>
          <MiddleTitle>KK EDU - Contents</MiddleTitle>
          <MiddleSubtitle>상점</MiddleSubtitle>
        </MiddleContainer>
      </MiddleSection>
      {/* 수업 프로그램 섹션 */}
      <MiddleSectionThird>
        <ProgramContainer>
          {classDataArr.map((el, index) => {
            const { title, imgPath, routePath, price } = el;
            return (
              <ShopGoodsContainer
                key={index}
                onClick={() => {
                  alert('상품 준비중입니다');
                  // router.push(routePath);
                }}
              >
                <ShopGoodsTag>태그</ShopGoodsTag>
                <ShopGoodsImageContainer imgPath={imgPath} />
                <ShopGoodsTextContainer>
                  <ShopGoodsTitle>{title}</ShopGoodsTitle>
                  <ShopGoodsSubTitle>
                    {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
                  </ShopGoodsSubTitle>
                </ShopGoodsTextContainer>
              </ShopGoodsContainer>
            );
          })}
        </ProgramContainer>
      </MiddleSectionThird>
      {/* 엔드 섹션 */}
      <EndSection
        Title={`For our child's healthy body \n and heart happiness`}
        btnTitle={`문의하기`}
        routePath={`/`}
      />
    </MainContainer>
  );
};

export default Shop;

const MainContainer = styled.div`
  width: 100%;
  background-color: white;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const HeaderSection = styled.section`
  width: 80vw;
  min-height: 21vw;
  position: relative;

  background: linear-gradient(90deg, #378e56 0%, rgba(55, 142, 86, 0) 60.5%),
    url('/src/Shop_IMG/Shop_Header_Background_IMG_.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  padding: 0 4rem;
  border-radius: 24px;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  gap: 1rem;

  @media (max-width: 768px) {
    width: 90vw;
    min-height: 300px;
    padding: 0 2rem;
  }
`;

const HeaderContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
`;

const Title = styled.h1`
  color: white;

  font-size: 1rem;
  font-family: Nunito;
  font-weight: 600;
`;

const Subtitle = styled.h2`
  color: white;

  font-size: 2.2rem;
  font-family: Pretendard;
  font-weight: 700;
`;

const HeaderIntroDiv = styled.div`
  width: fit-content;
  padding: 1rem 1.5rem;

  position: absolute;
  bottom: 0;
  right: 10%;

  background-color: white;
  border-radius: 25px 25px 0 0;

  font-size: 1.1rem;
  font-family: Pretendard;
  font-weight: 600;
`;

const GreenColorSpan = styled.span`
  color: #45b26b;
  font-size: 1.1rem;
  font-family: Pretendard;
  font-weight: 600;
`;

const MiddleSection = styled.section`
  width: 80vw;
  min-height: 327px;
  position: relative;

  padding: 0 2rem 0 2rem;
  border-radius: 24px;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  gap: 4rem;
`;

const MiddleContainer = styled.section`
  border-radius: 24px;
  height: 100%;
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;

  gap: 1rem;
`;

const MiddleTitle = styled.h1`
  font-size: 1rem;
  font-family: Nunito;
  font-weight: 600;
  color: #d97904;
`;

const MiddleSubtitle = styled.h2`
  font-size: 3rem;
  font-family: Pretendard;
  font-weight: 700;
`;

const MiddleSectionThird = styled.section`
  width: 100vw;
  min-height: 262px;

  background-color: white;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 1rem;

  @media (max-width: 1080px) {
    width: 100%;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
  }
`;

const ProgramContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 1fr;

  gap: 1rem;
  margin-top: 3rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: 1fr;
  }
`;

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

const ShopGoodsImageContainer = styled.div`
  width: 100%;
  height: 50%;

  background: url(${(props) => props.imgPath || '/half-moon.png'});
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
`;

const ShopGoodsSubTitle = styled.div`
  font-family: Pretendard;
  font-weight: 700;
  font-size: 1.5rem;
  color: black;
`;

const ShopGoodsTag = styled.button`
  position: absolute;
  top: 5%;
  left: 5%;

  background-color: #45b26b;

  padding: 6px 12px;
  border-radius: 16px;
  border: none;

  font-family: Pretendard;
  font-weight: 400;
  font-size: 1rem;
  color: white;
`;
