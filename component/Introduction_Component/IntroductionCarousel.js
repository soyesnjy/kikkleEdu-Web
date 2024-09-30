import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import IntroductionCarouselBanner from './IntroductionCarouselBanner';
import { useState } from 'react';

const slideArr = [
  [
    {
      year: '2024',
      ment: [
        '서울신용보증재단 퍼스트팽귄 기업선정',
        `과학기술정보통신부 ETRI (정보통신연구원)
실감콘텐츠핵심기술개발 과제 공동연구기관 선정`,
        '예술경영지원센터 창업도약과제 선정',
        `한국엔젤투자협회 민관공동창업자발굴 육성
해외마케팅 과제 선정`,
        '한중일 국제 학술대회(ICoME) 쇼케이스 참여',
        '전국도서관대회·전시회 전시참가',
        '소예아이 APP출시',
        '키클애듀 APP출시',
      ],
    },
    {
      year: '2023',
      ment: [
        '창업성장기술 개발사업 팁스 과제선정',
        `MIPCOM 해외전시 박람회 기업선정`,
        `콘탠츠진흥원 콘텐츠 스타트업
창업도약 프로그램 선정`,
        `서울산업진흥원 XR 제품
서비스 제작 개선 지원사업 선정`,
      ],
    },
    {
      year: '2022',
      ment: [
        '소예키즈 법인명 변경',
        `소예키즈 APP출시 후 누적 다운로드수 1만 기록`,
        '키클 APP출시',
        `서울산업진흥원 XR코워킹 입주기업선정`,
        '창업진흥원 비대면 스타트업 육성사업 창업기업 선정',
        'MIPCOM 해외 전시 박람회 주니어 기업 선정',
        '창업성장기술 개발사업 디딤돌 과제 선정',
      ],
    },
  ],
  [
    {
      year: '2021',
      ment: [],
    },
    {
      year: '2020',
      ment: [],
    },
    {
      year: '2019',
      ment: [],
    },
  ],
];

// 사용자 정의 화살표 컴포넌트
const CustomNextArrow = ({ onClick }) => {
  return (
    <ArrowButton onClick={onClick} style={{ right: '10px' }}>
      <span className="material-symbols-outlined">arrow_forward</span>
    </ArrowButton>
  );
};

const CustomPrevArrow = ({ onClick }) => {
  return (
    <ArrowButton onClick={onClick} style={{ left: '10px' }}>
      <span className="material-symbols-outlined">arrow_back</span>
    </ArrowButton>
  );
};

const IntroductionCarousel = () => {
  const [isDragging, setIsDragging] = useState(false);

  // 캐러셀 넘기기 관련 이벤트 처리
  const handleMouseDown = () => {
    setIsDragging(false);
  };
  const handleMouseMove = () => {
    setIsDragging(true);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    arrows: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  return (
    <StyledSlider {...settings}>
      {slideArr.map((slide, index) => {
        return (
          <SliderItem
            key={index}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
          >
            <IntroductionCarouselBanner bannerDataArr={slide} />
          </SliderItem>
        );
      })}
    </StyledSlider>
  );
};

export default IntroductionCarousel;

const StyledSlider = styled(Slider)`
  width: 1620px;
  height: auto;
  display: flex;
  justify-content: center;

  .slick-list {
    //슬라이드 스크린
    margin: 0 auto;
    overflow-x: hidden;
    background: none;
  }

  .slick-slide div {
    //슬라이더  컨텐츠
  }

  .slick-dots {
    //슬라이드 Dot
    bottom: 1rem;
    margin-top: 200px;
    display: flex !important;
    justify-content: center;
    align-items: center;

    li {
      margin: 0 10px;

      @media (max-width: 768px) {
        margin: 0 5px;
      }

      &.slick-active button:before {
        display: flex !important;
        justify-content: center;
        align-items: center;
        font-size: 30px;
        opacity: 1;

        color: #4cb0b2; // 활성화된 dot 색상

        @media (max-width: 768px) {
          font-size: 20px;
        }
      }
    }

    button:before {
      color: #d2d2d2; // 미선택된 dot 기본 색상
      font-size: 20px;
      opacity: 1;

      &:hover,
      &:focus {
        color: #5c4db1; // dot의 호버/포커스 색상
      }

      @media (max-width: 768px) {
        font-size: 10px;
      }
    }
  }

  .slick-track {
    //이건 잘 모르겠음
    width: 100%;
    height: 100%;
  }

  /* .slick-prev {
    background-color: none;
    left: 2%;
    z-index: 1;
  }

  .slick-next {
    background-color: none;
    right: 2%;
    z-index: 1;
  } */

  @media (max-width: 768px) {
    width: 26rem;
    margin-top: 3rem;
  }
`;

const SliderItem = styled.div`
  text-align: center;
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 20%;

  transform: translateY(-50%);

  background-color: #fafafa;
  border: none;
  border-radius: 50%;

  width: 56px;
  height: 56px;

  display: flex;
  justify-content: center;
  align-items: center;

  color: #a3a3a3;
  cursor: pointer;
  z-index: 2;

  &:hover {
    background-color: #4cb0b2;
    color: white;
  }
`;
