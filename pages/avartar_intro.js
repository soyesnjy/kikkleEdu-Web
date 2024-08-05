/* eslint-disable react-hooks/exhaustive-deps */

import styled, { keyframes } from 'styled-components';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import IntroBlock from '@/component/Intro_Avartar_Component/IntroBlock';
import { useRecoilState } from 'recoil';
import { avarta } from '../store/state';

const avatarMap = {
  soyes: {
    name: '소예',
    codeName: 'soyes',
    iconImgUrl: '/src/Intro_IMG/Intro_Logo/Intro_Soyes_Logo_Main_IMG.png',
    logoBackImgUrl: '/src/Intro_IMG/Intro_Logo/Intro_Soyes_Logo_Back_IMG.png',
    backgroundImgUrl: '/src/Background_IMG/Web/Intro_SoyesBackgroung_IMG.png',
  },
  lala: {
    name: '엘라',
    codeName: 'lala',
    iconImgUrl: '/src/Intro_IMG/Intro_Logo/Intro_Ella_Logo_Main_IMG.png',
    logoBackImgUrl: '/src/Intro_IMG/Intro_Logo/Intro_Ella_Logo_Back_IMG.png',
    backgroundImgUrl: '/src/Background_IMG/Web/Intro_EllaBackgroung_IMG.png',
  },
  pupu: {
    name: '푸푸',
    codeName: 'pupu',
    iconImgUrl: '/src/Intro_IMG/Intro_Logo/Intro_Pupu_Logo_Main_IMG.png',
    logoBackImgUrl: '/src/Intro_IMG/Intro_Logo/Intro_Pupu_Logo_Back_IMG.png',
    backgroundImgUrl: '/src/Background_IMG/Web/Intro_SoyesBackgroung_IMG.png',
  },
  ubi: {
    name: '우비',
    codeName: 'ubi',
    iconImgUrl: '/src/Intro_IMG/Intro_Logo/Intro_Ubi_Logo_Main_IMG.png',
    logoBackImgUrl: '/src/Intro_IMG/Intro_Logo/Intro_Ubi_Logo_Back_IMG.png',
    backgroundImgUrl: '/src/Background_IMG/Web/Intro_SoyesBackgroung_IMG.png',
  },
  north: {
    name: '북극이',
    codeName: 'north',
    iconImgUrl: '/src/Intro_IMG/Intro_Logo/Intro_North_Logo_Main_IMG.png',
    logoBackImgUrl: '/src/Intro_IMG/Intro_Logo/Intro_North_Logo_Back_IMG.png',
    backgroundImgUrl: '/src/Background_IMG/Web/Intro_SoyesBackgroung_IMG.png',
  },
  default: {
    name: '소예',
    codeName: 'soyes',
    iconImgUrl: '/src/Intro_IMG/Intro_Logo/Intro_Soyes_Logo_Main_IMG.png',
    logoBackImgUrl: '/src/Intro_IMG/Intro_Logo/Intro_Soyes_Logo_Back_IMG.png',
    backgroundImgUrl: '/src/Background_IMG/Web/Intro_SoyesBackgroung_IMG.png',
  },
};

export default function Avartar_Intro() {
  const [avartaAI, setAvartaAI] = useRecoilState(avarta);

  return (
    <IntroContainer backgroundImgUrl={avatarMap[avartaAI].backgroundImgUrl}>
      <IntroBlock avartar={avatarMap[avartaAI]} />
    </IntroContainer>
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

const IntroContainer = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 0 2rem;

  background-image: ${(props) =>
    `url(${props.backgroundImgUrl})` ||
    `url('/src/Background_IMG/Web/Intro_Backgroung_IMG.png')`};

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

// const Title = styled.h1`
//   font-size: 4rem;
//   color: black;
//   animation: ${fadeIn} 1.5s ease;
//   margin-bottom: 0.5rem;

//   @media (max-width: 768px) {
//     font-size: 2rem;
//   }
// `;
// const AvatarContainer = styled.div`
//   width: 100vw;
//   min-height: 100vh;
//   background-color: gray;
//   padding: 2rem;

//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;

//   @media (max-width: 768px) {
//     justify-content: center;
//   }
// `;

// const TopButtonWrap = styled.div`
//   position: sticky;
//   bottom: 70px;
//   float: right;
// `;

// // 스타일링된 버튼 컴포넌트
// const TopButton = styled.button`
//   font-size: 3.8rem;
//   color: #ffc949 !important;
//   border: none;
//   background-color: #007bff;
//   color: white;
//   border-radius: 50%;
//   display: ${({ show }) => (show ? 'block' : 'none')};
//   cursor: pointer;
//   z-index: 2;
//   transition: opacity 0.3s;

//   &:hover {
//     background-color: #0056b3;
//   }
// `;

// const PageContainer = styled.div`
//   scroll-snap-type: y mandatory;
//   overflow-y: scroll;
//   height: 100vh;
//   scroll-behavior: smooth;
// `;

// const Section = styled.div`
//   scroll-snap-align: start;
//   height: 100vh;
//   width: 100%;
// `;

// const FooterSection = styled(Section)`
//   height: max-content;
// `;

// const SubContainer = styled.div`
//   background-size: cover;
//   background-position: center;
//   background-repeat: no-repeat;

//   width: 100%;
//   height: 100vh;

//   display: flex;
//   align-items: center;
//   justify-content: center;
//   flex-direction: column;
//   gap: 2rem;

//   scroll-snap-align: start;
//   height: 100vh;

//   @media (max-width: 768px) {
//     gap: 0;
//   }
// `;

// const ContentWrapper = styled.div`
//   text-align: center;
//   animation: ${fadeIn} 1s ease;
// `;
