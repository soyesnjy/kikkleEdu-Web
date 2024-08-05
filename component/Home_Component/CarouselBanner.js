import React from 'react';
import styled from 'styled-components';

const CarouselBanner = ({ ment, backgroundUrl }) => {
  return (
    <BannerContainer backgroundUrl={backgroundUrl}>
      <RecommendationBadge>오늘의 추천 콘텐츠</RecommendationBadge>
      <Title>{ment?.title}</Title>
      <Subtitle>{ment?.subTitle}</Subtitle>
    </BannerContainer>
  );
};

const BannerContainer = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  min-height: 527px;

  background-image: ${(props) =>
    props.backgroundUrl
      ? `url(${props.backgroundUrl})`
      : 'url(/src/Carousel_IMG/Banner_Background_IMG_요가명상.png)'};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  overflow: hidden;

  @media (max-width: 768px) {
    width: 26rem;
    min-height: 12rem;
  }
`;

const RecommendationBadge = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #9051ff;
  width: 246px;
  height: 46px;
  gap: 0px;
  border-radius: 25px;

  color: white;
  font-family: 'AppleSDGothicNeoM00';
  font-size: 25px;
  font-weight: 400;
  text-align: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Title = styled.h1`
  color: #4e4e4e;
  font-size: 60px;
  margin: 0;
  margin-top: 2rem;
  font-family: 'Cafe24Ssurround';
  /* text-shadow: 5px 4px 3px #00000099; */

  @media (max-width: 768px) {
    font-size: 25px;
  }
`;

const Subtitle = styled.p`
  color: #4e4e4e;
  font-size: 18px;
  margin: 10px 0 0 0;
  font-family: 'AppleSDGothicNeoM00';
  font-size: 30px;
  font-weight: 400;
  line-height: 45px;
  text-align: left;
  /* text-shadow: 2px 2px 3px #000000b2; */

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const ImageContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  border-radius: 0 0 20px 20px;
`;

export default CarouselBanner;
