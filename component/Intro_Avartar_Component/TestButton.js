import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';

const testMap = {
  ebt: {
    testClass: '정서행동 검사',
    imgUrl: '/src/Intro_IMG/Intro_EBT_Icon1_IMG.png',
    width: 233,
    height: 180,
    path: '/test_ebt',
  },
  pt: {
    testClass: '성격 검사',
    imgUrl: '/src/Intro_IMG/Intro_PT_Icon2_IMG.png',
    width: 250,
    height: 193,
    path: '/test_pt',
  },
  default: {
    testClass: '성격 검사',
    imgUrl: '/src/Intro_IMG/Intro_PT_Icon2_IMG.png',
    width: 250,
    height: 193,
    path: '/test_pt',
  },
};

const TestButton = ({ testClass }) => {
  return (
    <StyledLink href={testMap[testClass].path}>
      <Button>
        <Image
          src={testMap[testClass].imgUrl}
          alt={testMap[testClass].testClass}
          width={testMap[testClass].width}
          height={testMap[testClass].height}
          style={{ maxWidth: '70%', height: 'auto' }}
        />
        <ButtonText>{testMap[testClass].testClass} 하기</ButtonText>
      </Button>
    </StyledLink>
  );
};

export default TestButton;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Button = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 300px;
  height: 235px;

  background-color: #7e39b6;
  border-radius: 25px;
  color: white;
  text-align: center;
  cursor: pointer;
  border: 10px solid white;

  @media (max-width: 768px) {
    width: 150px;
    height: 120px;
    border: 5px solid white;
  }
`;

const ButtonText = styled.span`
  font-family: 'AppleSDGothicNeoM00';
  margin-top: -1rem;
  font-size: 28px;
  font-weight: 400;
  letter-spacing: -0.1rem;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;
