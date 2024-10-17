import React from 'react';
import styled from 'styled-components';

const IntroductionCarouselBanner = ({ bannerDataArr }) => {
  return (
    <BannerContainer>
      {bannerDataArr.map((el, index) => {
        const { year, ment } = el;
        return (
          <BannerTextContainer key={index}>
            <Title>{year}</Title>
            {ment.map((el, index) => {
              return <Subtitle key={index}>{el}</Subtitle>;
            })}
          </BannerTextContainer>
        );
      })}
    </BannerContainer>
  );
};

const BannerContainer = styled.div`
  width: 100%;
  height: auto;
  min-height: 527px;
  border-top: 10px solid #4cb0b2;

  background-color: white;

  display: flex;
  justify-content: center;
  align-items: flex-start;

  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;

    width: 90%;
    min-height: 12rem;

    padding: 0 2rem;
  }
`;

const BannerTextContainer = styled.ul`
  margin-top: 3rem;
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  @media (max-width: 768px) {
    width: 26rem;
    min-height: 12rem;
  }
`;

const Title = styled.h1`
  margin-bottom: 1.5rem;
  color: #378e56;

  font-size: 64px;
  font-family: Pretendard;
  font-weight: 700;
  @media (max-width: 768px) {
    font-size: 25px;
  }
`;

const Subtitle = styled.li`
  white-space: pre;
  color: #4e4e4e;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 400;
  line-height: 45px;

  text-align: left;
  /* text-shadow: 2px 2px 3px #000000b2; */

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

export default IntroductionCarouselBanner;
