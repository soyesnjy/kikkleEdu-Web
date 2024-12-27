import React from 'react';
import styled from 'styled-components';

import ShopHeaderSection from '@/component/Shop_Component/ShopHeaderSection';
import ShopMiddleSection from '@/component/Shop_Component/ShopMiddleSection';
import EndSection from '@/component/Home_Component/EndSection';

type shopDefaultArrType = {
  imgPath: string;
  title: string;
  price: number;
  routePath: string;
  tagColor: string;
};

const shopDefaultArr: shopDefaultArrType[] = [
  {
    imgPath: '/src/Shop_IMG/Shop_Goods_WorkBookAR_IMG_.png',
    title: '스토리발레 AR워크북 (1종)',
    price: 20000,
    routePath: '/',
    tagColor: '#9757D7',
  },
  {
    imgPath: '/src/Shop_IMG/Shop_Goods_Card_IMG_.png',
    title: '마음챙김 카드',
    price: 10000,
    routePath: '/',
    tagColor: '#D97904',
  },
  {
    imgPath: '/src/Shop_IMG/Shop_Goods_Board_IMG_.png',
    title: '마음챙김 보드게임판',
    price: 10000,
    routePath: '/',
    tagColor: '#45B26B',
  },
  {
    imgPath: '/src/Shop_IMG/Shop_Goods_WorkBook_IMG_.png',
    title: `세계문화발레 워크북\n유럽(1종)`,
    price: 20000,
    routePath: '/',
    tagColor: '#7067AA',
  },
  {
    imgPath: '/src/Shop_IMG/Shop_Goods_BoardPackage_IMG_.png',
    title: '보드게임 패키지',
    price: 20000,
    routePath: '/',
    tagColor: '#9757D7',
  },
  {
    imgPath: '/src/Shop_IMG/Shop_Goods_WorkBook_Asia_IMG_.png',
    title: `세계문화발레 워크북\n아시아 (1종)`,
    price: 20000,
    routePath: '/',
    tagColor: '#D97904',
  },
  {
    imgPath: '/src/Shop_IMG/Shop_Goods_WorkBook_America_IMG_.png',
    title: `세계문화발레 워크북\n아메리카 (1종)`,
    price: 20000,
    routePath: '/',
    tagColor: '#45B26B',
  },
  {
    imgPath: '/src/Shop_IMG/Shop_Goods_WorkBook_Animal_IMG_.png',
    title: `세계문화발레 워크북\n동물대 탐험(1종)`,
    price: 20000,
    routePath: '/',
    tagColor: '#7067AA',
  },
  {
    imgPath: '/src/Shop_IMG/Shop_Goods_GripTok_IMG_.png',
    title: `그립톡`,
    price: 5000,
    routePath: '/',
    tagColor: '#9757D7',
  },
];

const Shop = () => {
  return (
    <MainContainer>
      {/* Header Section */}
      <ShopHeaderSection
        description={`소예키즈에서 제작해 제공되는 다양한 상품들을 확인하고 구매하는 시스템`}
        backImgUrl={'/src/Shop_IMG/Shop_Header_Background_IMG_.png'}
      />
      {/* Middle Section */}
      <ShopMiddleSection />
      {/* Shop List Section */}
      <ShopListSection>
        <ShopContainer>
          {shopDefaultArr.map((el) => {
            const { title, imgPath, price, tagColor } = el;
            return (
              <ShopGoodsContainer
                key={`${title}_${imgPath}`}
                onClick={() => {
                  alert('상품 준비중입니다');
                  return;
                }}
              >
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
          })}
        </ShopContainer>
      </ShopListSection>
      {/* End Section */}
      <EndSection
        Title={`For our child's healthy body \n and heart happiness`}
        btnTitle={`문의하기`}
        routePath={`/`}
      />
    </MainContainer>
  );
};

export default Shop;

type ImgPathType = {
  imgpath?: string;
};

type TagColorType = {
  tagcolor?: string;
};

const MainContainer = styled.main`
  width: 100%;
  background-color: white;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ShopListSection = styled.section`
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

const ShopContainer = styled.div`
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
