/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

type PropsType = {
  name: string;
  introduce: string;
  imgUrl: string;
  onClick: () => void;
};

const TeacherProfileCard = ({
  name,
  introduce,
  imgUrl,
  onClick,
}: PropsType) => {
  return (
    <Wrapper onClick={onClick}>
      {imgUrl && (
        <img
          src={imgUrl}
          alt="TeacherProfileCard Image"
          width={300}
          height={300}
          style={{ maxWidth: '100%', height: '100%' }}
        />
      )}
      <Content>
        <Name>{name}</Name>
        <TeacherProfileIntroduce>
          {introduce || `강사 ${name}입니다.`}
        </TeacherProfileIntroduce>
      </Content>
    </Wrapper>
  );
};

export default TeacherProfileCard;

const Wrapper = styled.div`
  position: relative;
  width: 300px;
  height: 350px;

  border-radius: 15px;

  overflow: hidden;

  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 그림자 */
  background-color: #cacaca;

  cursor: pointer;

  @media (max-width: 768px) {
    width: 160px;
    height: 200px;
  }
`;

const StyledImage = styled(Image)`
  opacity: 0.7;
  z-index: 0; /* 이미지가 가장 아래에 위치하도록 */
`;

const Content = styled.div`
  position: absolute;
  bottom: 0%;
  padding: 1.5rem;
  z-index: 1; /* 내용물이 이미지 위에 렌더링되도록 */

  color: black;
  font-weight: bold;
  text-align: center;
  width: 100%;
  min-height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 1); /* 반투명 배경 */

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  gap: 1rem;

  @media (max-width: 768px) {
    min-height: 30px;
    gap: 0.3rem;
    padding: 0.7rem;
  }
`;

const Name = styled.h2`
  font-family: Pretendard;
  font-weight: 600;
  font-size: 16px;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const TeacherProfileIntroduce = styled.p`
  height: 1.8rem;
  overflow: hidden;

  font-family: Pretendard;
  font-weight: 400;
  font-size: 12px;
  text-align: left;

  @media (max-width: 768px) {
    width: 100%;
    height: 1.5rem;
    font-size: 10px;
  }
`;
