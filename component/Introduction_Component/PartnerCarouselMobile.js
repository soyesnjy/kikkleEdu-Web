import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import PartnerCarouselBannerMobile from './PartnerCarouselBannerMobile';
import { useState } from 'react';

const slideArr = [
  '/src/Introduce_IMG/Partner/Introduce_Partner_Banner1_IMG.png',
  '/src/Introduce_IMG/Partner/Introduce_Partner_Banner2_IMG.png',
  '/src/Introduce_IMG/Partner/Introduce_Partner_Banner3_IMG.png',
];

const PartnerCarouselMobile = () => {
  const [_, setIsDragging] = useState(false);

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
    // nextArrow: <CustomNextArrow />,
    // prevArrow: <CustomPrevArrow />,
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
            <PartnerCarouselBannerMobile bannerImgPath={slide} />
          </SliderItem>
        );
      })}
    </StyledSlider>
  );
};

export default PartnerCarouselMobile;

const StyledSlider = styled(Slider)`
  display: flex;
  justify-content: center;
  align-items: center;

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
    bottom: 0.5rem;

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
    width: 100%;
    margin-top: 3rem;
  }
`;

const SliderItem = styled.div`
  text-align: center;

  display: flex;
  justify-content: center;
  align-items: center;
`;
