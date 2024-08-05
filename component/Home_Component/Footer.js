import styled from 'styled-components';
import Link from 'next/link';

export default function Footer() {
  return (
    <FooterContainer>
      <FooterInfo>
        <FooterLogo
          src="https://cdn.imweb.me/upload/S20221226685f12060967b/1beda80e5281f.png"
          alt="SOYES KIDS"
        />
        <InfoText>
          (주)소예키즈 | 주소 서울 마포구 상암로 330 DMC첨단산업센터 404-4호 |
          전화번호 02-303-4420
        </InfoText>
        <InfoText>
          사업자등록번호 371-86-01244 | 통신판매업등록번호 2022-서울마포-3834 |
          개인정보관리책임자: (주)소예키즈
        </InfoText>
      </FooterInfo>
      <SocialMediaLinks>
        {/* 이 부분은 실제 소셜 미디어 링크로 대체해야 합니다 */}
        <SocialLink href="#">Instagram</SocialLink>
        <SocialLink href="#">Blog</SocialLink>
        <SocialLink href="#">Talk</SocialLink>
        {/* ... 추가 소셜 미디어 아이콘 및 링크 */}
      </SocialMediaLinks>
      {/* <FooterLinks>
        <Link href="/usage">
          <FooterLink>이용약관</FooterLink>
        </Link>
        <Link href="/privacy">
          <FooterLink>개인정보처리방침</FooterLink>
        </Link>
      </FooterLinks> */}
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  width: 100vw;
  background-color: #303030;
  color: #fff;
  padding: 1.5rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    display: none;
  }
`;

const FooterInfo = styled.div`
  padding: 0 2rem;
`;

const FooterLogo = styled.img`
  width: 150px; // 로고의 실제 크기에 맞게 조정하세요
  margin-bottom: 10px;
`;

const InfoText = styled.p`
  font-size: 14px;
  line-height: 1.5;
  margin: 5px 0;

  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`;

const SocialMediaLinks = styled.div`
  padding: 0 2rem;
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

const FooterLinks = styled.div`
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 20px;
  border-top: 1px solid #333;
`;

const FooterLink = styled.a`
  color: #fff;
  text-decoration: none;
  margin-right: 20px;

  &:hover {
    text-decoration: underline;
  }
`;
