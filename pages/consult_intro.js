/* eslint-disable react-hooks/exhaustive-deps */

import styled, { keyframes } from 'styled-components';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import AvartarListCard from '@/component/Intro_Consult_Component/AvartarListCard';

const avatarArr = [
  {
    name: '소예',
    codeName: 'soyes',
    role: '심리상담사',
    subMent: '친구의 정서 및 성격검사를 나와 같이 해보자!',
    cardImgUrl: '/src/AvatarList_IMG/Card/AvatarList_Soyes_Card_IMG.png',
    backColor: '#B88CD4',
    borderColor: '#A278BD',
  },
  {
    name: '엘라',
    codeName: 'lala',
    role: '정서 고민상담',
    subMent: '친구의 정서적 고민은 내가 상담해줄께~',
    cardImgUrl: '/src/AvatarList_IMG/Card/AvatarList_Ella_Card_IMG.png',
    backColor: '#E79999',
    borderColor: '#CD9898',
  },
  {
    name: '푸푸',
    codeName: 'pupu',
    role: '공부 고민상담',
    subMent: '공부를 잘하고 싶어? 나와 이야기 해볼래?!',
    cardImgUrl: '/src/AvatarList_IMG/Card/AvatarList_Pupu_Card_IMG.png',
    backColor: '#93BE84',
    borderColor: '#7AA46B',
  },
  {
    name: '우비',
    codeName: 'ubi',
    role: '스트레스 해결사',
    subMent: '오늘도 스트레스 받은 친구 나에게 풀어봐!!',
    cardImgUrl: '/src/AvatarList_IMG/Card/AvatarList_Ubi_Card_IMG.png',
    backColor: '#35A19B',
    borderColor: '#388581',
  },
  {
    name: '북극이',
    codeName: 'north',
    role: '이야기 친구',
    subMent: '심심해? 내가 이야기 친구가 되어줄게~',
    cardImgUrl: '/src/AvatarList_IMG/Card/AvatarList_North_Card_IMG.png',
    backColor: '#5289CD',
    borderColor: '#4170AA',
  },
  {
    name: '랜덤',
    codeName: 'random',
    role: '친구찿기',
    subMent: '랜덤으로 선택된 친구와 대화하기!',
    cardImgUrl: '/src/AvatarList_IMG/Card/AvatarList_Random_Card_IMG.png',
  },
];

export default function Consult_Intro() {
  return (
    <MainContainer>
      <AvartarListContainer>
        {avatarArr.map((el, index) => {
          return (
            <AvartarListCard
              key={index}
              backColor={el.backColor}
              borderColor={el.borderColor}
              cardImgUrl={el.cardImgUrl}
              name={el.name}
              codeName={el.codeName}
              role={el.role}
              subMent={el.subMent}
            />
          );
        })}
      </AvartarListContainer>
    </MainContainer>
  );
}

// Translation 파일 적용
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'nav'])), // 파일 다중 적용 가능
    },
  };
}

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const MainContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  height: 100%;
  padding: 1rem;
  background-color: white;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const AvartarListContainer = styled.div`
  margin-top: 4rem;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 1rem 2.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(6, 1fr);
    justify-content: center;
  }
`;
