import styled from 'styled-components';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const TeacherCard = ({ id, active, profileImg, name, introduce }) => {
  return (
    <ProfileCard active={active}>
      <Image
        src={profileImg}
        alt="profile_IMG"
        width={103}
        height={103}
        style={{
          borderRadius: '50%',
        }}
        priority={true}
      />
      <ProfileName>{name}</ProfileName>
      <ProfileDescription>
        {introduce || `강사 ${name}입니다!`}
      </ProfileDescription>
      <Link href={`/teacher/${id}`}>
        <ReadMoreButton>{`Read More`}</ReadMoreButton>
      </Link>
    </ProfileCard>
  );
};

type ActivePropertyCommonType = {
  active: string;
};

const ProfileCard = styled.div<ActivePropertyCommonType>`
  width: 379px;
  min-height: 487px;
  padding: 2rem;
  margin: 0 1rem;

  background-color: ${(props) => (props.active ? 'white' : 'transparent')};
  border: ${(props) => (props.active ? 'none' : '3px solid white')};
  border-radius: 50px;

  flex-shrink: 0;
  text-align: left;
  box-shadow: ${(props) =>
    props.active ? '0px 4px 6px rgba(0, 0, 0, 0.1)' : 'none'};

  transition:
    background-color 0.3s ease-in-out,
    box-shadow 0.3s ease-in-out;

  user-select: none;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 1rem;

  h3,
  p {
    color: ${(props) => (props.active ? 'black' : 'white')};
  }

  @media (max-width: 728px) {
    width: 320px;
    min-height: 457px;

    padding: 2.5rem;
  }
`;

const ProfileName = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  font-family: Nunito;
  margin-bottom: 0.5rem;
`;

const ProfileDescription = styled.p`
  min-height: 6rem;
  font-size: 1rem;
  font-family: Pretendard;
  color: #555;
  margin-bottom: 1.5rem;
`;

const ReadMoreButton = styled.button`
  background-color: #ff8500;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 10px;
  font-size: 14px;
  font-family: Pretendard;

  cursor: pointer;

  &:hover {
    background-color: darkorange;
  }
`;

export default TeacherCard;
