import styled from 'styled-components';
import Image from 'next/image';

export default function Footer() {
  return (
    <FooterContainer>
      <FooterInfo>
        <InfoText>Kids Class Edu</InfoText>
        <SocialMediaLinks>
          <SocialLink href="/">
            <Image
              src="/src/Footer_IMG/Footer_Icon_X_IMG.png"
              alt={'X'}
              width={24}
              height={24}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </SocialLink>
          <SocialLink href="/">
            <Image
              src="/src/Footer_IMG/Footer_Icon_IN_IMG.png"
              alt={'X'}
              width={24}
              height={24}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </SocialLink>
          <SocialLink href="/">
            <Image
              src="/src/Footer_IMG/Footer_Icon_FB_IMG.png"
              alt={'X'}
              width={24}
              height={24}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </SocialLink>
        </SocialMediaLinks>
      </FooterInfo>
      <CopyText>Copy Right 키클에듀 2024</CopyText>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  width: 100vw;
  background-color: #4cb0b2;
  color: #fff;

  padding: 1.5rem 4rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    padding: 1.5rem 2rem;
  }
`;

const FooterInfo = styled.div`
  width: 100%;
  padding: 2rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 1rem 0;

    gap: 1rem;
  }
`;

const InfoText = styled.p`
  font-size: 32px;
  line-height: 1.5;

  font-family: Nunito;

  @media (max-width: 768px) {
  }
`;

const CopyText = styled.p`
  font-size: 16px;
  line-height: 1.5;

  font-family: Pretendard, sans-serif;
  font-weight: 600;

  @media (max-width: 768px) {
    padding: 1rem;
    font-size: 16px;
    font-weight: 400;
  }
`;

const SocialMediaLinks = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  gap: 1rem;
`;

const SocialLink = styled.a`
  margin-left: 10px;
  color: #fff;
  text-decoration: none;
  font-size: 20px;

  &:hover {
    color: #999;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;
