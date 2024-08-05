// components/ResultCard.js
import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import { uid } from '../../store/state';
import Link from 'next/link';

const contentPath = {
  정서행동검사: '/test_ebt',
  성격검사: '/test_pt',
};

const ResultCard = ({ content, description }) => {
  const [userId, setUserId] = useRecoilState(uid);
  return (
    <CardContainer>
      <Header>{content} 결과</Header>
      <Content>
        <Image
          src="/src/MyPage_IMG/Icon/MyPage_Good_Icon_IMG.png"
          alt="Icon"
          width={170}
          height={170}
        />
        <TextContainer>
          <Title>
            {userId}님의 {content} 결과는 양호입니다.
          </Title>
          <Subtitle>소예키즈 AI상담사입니다.</Subtitle>
          <Subtitle>
            {userId}님의 상담내용에 대한 AI분석결과를 안내드립니다.
          </Subtitle>
          <Description>{description}</Description>
        </TextContainer>
      </Content>
      <StyledLink href={contentPath[content]}>
        <Button>다시 검사 하기</Button>
      </StyledLink>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  border-radius: 15px;
  width: 100%;
  max-width: 90%;
  background-color: #ededed;

  text-align: center;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 2rem;
  gap: 1rem;
`;

const Header = styled.div`
  width: 100%;
  background-color: #4a4a4a;
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  padding: 20px;
  border-radius: 15px 15px 0 0;
`;

const Content = styled.div`
  display: flex;
  gap: 2rem;
  padding: 4rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    padding: 1rem;
  }
`;

const IconContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border-radius: 10px;
  margin-right: 20px;
  padding: 20px;
`;

const TextContainer = styled.div`
  width: 100%;
  text-align: center;
`;

const Title = styled.div`
  font-size: 1.5rem;

  color: #4a4a4a;

  font-family: AppleSDGothicNeoM00;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const Subtitle = styled.div`
  font-size: 1.3rem;
  color: #4a4a4a;
  font-family: AppleSDGothicNeoM00;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const Description = styled.div`
  margin-top: 1rem;

  font-size: 1.3rem;
  color: #4a4a4a;
  font-family: AppleSDGothicNeoM00;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Button = styled.button`
  width: 80%;

  background-color: #a35eff;
  color: #fff;
  font-size: 16px;
  font-weight: bold;

  border: none;
  border-radius: 10px;
  padding: 1rem;
  cursor: pointer;
`;

const StyledLink = styled(Link)`
  width: 100%;
  text-decoration: none;
`;

export default ResultCard;
