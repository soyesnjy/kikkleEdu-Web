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

const ConsultButton = ({ avartar }) => {
  return (
    <StyledLink href={avartar.name === '엘라' ? '/ella/mood' : '/test_all'}>
      <YellowButton>{avartar.name}와 상담하러 가기</YellowButton>
    </StyledLink>
  );
};

export default ConsultButton;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const YellowButton = styled.div`
  font-family: 'AppleSDGothicNeoM00';

  display: flex;
  align-items: center;
  justify-content: center;
  width: 610px;
  height: 130px;

  background-color: #ffd700;
  border-radius: 25px;
  color: black;
  font-size: 35px;
  font-weight: bold;
  cursor: pointer;
  text-align: center;

  border: 10px solid white;

  @media (max-width: 768px) {
    width: 305px;
    height: 65px;
    font-size: 20px;
    border: 5px solid white;
  }
`;
