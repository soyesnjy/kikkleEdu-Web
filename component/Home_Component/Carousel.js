import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import CarouselBanner from './CarouselBanner';
import { useRouter } from 'next/router';
import { useState } from 'react';
// const SampleNextArrow = (props) => {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{ ...style, display: 'block', background: 'red' }}
//       onClick={onClick}
//     />
//   );
// };

// const SamplePrevArrow = (props) => {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{ ...style, display: 'block', background: 'green' }}
//       onClick={onClick}
//     />
//   );
// };

const slideArr = [
  {
    name: '요가명상',
    backgroundUrl: '/src/Carousel_IMG/Banner_Background_IMG_요가명상.png',
    pathUrl: '/meditation_painting',
    ment: {
      title: '요가 명상',
      subTitle: '요가 명상을 통해 편안한 몸과 마음을 만들어보세요.',
    },
  },
  {
    name: '그림명상',
    backgroundUrl: '/src/Carousel_IMG/Banner_Background_IMG_그림명상.png',
    pathUrl: '/meditation_painting',
    ment: {
      title: '그림 명상',
      subTitle: '그림 명상을 통해 편안한 몸과 마음을 만들어보세요.',
    },
  },
  {
    name: '음악명상',
    backgroundUrl: '/src/Carousel_IMG/Banner_Background_IMG_음악명상.png',
    pathUrl: '/meditation_music',
    ment: {
      title: '음악 명상',
      subTitle: '음악 명상을 통해 편안한 몸과 마음을 만들어보세요.',
    },
  },
];

const Carousel = () => {
  const router = useRouter();
  const [isDragging, setIsDragging] = useState(false);

  // 캐러셀 넘기기 관련 이벤트 처리
  const handleMouseDown = () => {
    setIsDragging(false);
  };
  const handleMouseMove = () => {
    setIsDragging(true);
  };
  const handleMouseUp = (pathUrl) => {
    if (!isDragging) {
      router.push(pathUrl);
    }
    setIsDragging(false);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    // nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />,
  };

  return (
    <StyledSlider {...settings}>
      {slideArr.map((slide, index) => {
        return (
          <SliderItem
            key={index}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={() => handleMouseUp(slide.pathUrl)}
          >
            <CarouselBanner
              ment={slide.ment}
              backgroundUrl={slide.backgroundUrl}
              pathUrl={slide.pathUrl}
            />
          </SliderItem>
        );
      })}
    </StyledSlider>
  );
};

export default Carousel;

const StyledSlider = styled(Slider)`
  width: 1920px;
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
    cursor: pointer;
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

        color: #9051ff; // 활성화된 dot 색상

        @media (max-width: 768px) {
          font-size: 20px;
        }
      }
    }

    button:before {
      color: #ffffff; // 미선택된 dot 기본 색상
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
