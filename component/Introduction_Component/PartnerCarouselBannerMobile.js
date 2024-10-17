import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

const PartnerCarouselBannerMobile = ({ bannerImgPath }) => {
  return (
    <BannerContainer>
      <Image
        src={bannerImgPath}
        alt="bannerImgPath"
        width={308}
        height={182}
        // style={{ maxWidth: '100%', height: 'auto' }}
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
    width: 100%;
    flex-direction: column;
    min-height: 12rem;
  }
`;

export default PartnerCarouselBannerMobile;
