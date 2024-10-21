import styled from 'styled-components';
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import { mobile } from '@/store/state';

export default function Footer() {
  const [mobileFlag, setMobileFlag] = useRecoilState(mobile);

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
      <CopyText>
        {!mobileFlag
          ? `(주) 소예키즈 | 주소 서울시 마포구 성암로 330 DMC첨단산업센터 404-4호 | 전화번호 02-303-4420
사업자등록번호 371-86-01244 | 통신판매업등록번호 2022-서울마포-3834 | 개인정보관리책임자 : 소예키즈
이메일무단수집거부 | 영상,이미지 무단사용금지
ⓒ소예키즈 주식회사 | Soyes Kids All rights reserved`
          : `(주) 소예키즈｜주소 서울시 마포구 성암로 330 DMC첨
단산업센터 404-4호 | 전화번호 02-303-4420
사업자등록번호 371-86-01244 | 통신판매업등록번호
2022-서울마포-3834 | 개인정보관리책임자 : 소예키즈
이메일무단수집거부 | 영상,이미지 무단사용금지
ⓒ소예키즈 주식회사 | Soyes Kids All rights
Reserved.`}
      </CopyText>
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
  align-items: flex-start;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
  }
`;

const FooterInfo = styled.div`
  width: 100%;
  padding: 1rem 0;

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
  font-size: 1rem;
  line-height: 1.5;

  font-family: Pretendard;
  font-weight: 400;

  white-space: pre;

  @media (max-width: 768px) {
    padding: 1rem;
    font-size: 14px;
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
