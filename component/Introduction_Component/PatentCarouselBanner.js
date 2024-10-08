import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

const PatentCarouselBanner = ({ bannerImgPath }) => {
  return (
    <BannerContainer>
      <Image
        src={bannerImgPath}
        alt="bannerImgPath"
        width={1204}
        height={886}
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </BannerContainer>
  );
};

const BannerContainer = styled.div`
  width: 100%;
  height: auto;
  min-height: 527px;
  /* border-top: 10px solid #4cb0b2; */

  background-color: white;

  display: flex;
  justify-content: center;
  align-items: center;

  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;

    width: 90%;
    min-height: 12rem;
  }
`;

export default PatentCarouselBanner;
