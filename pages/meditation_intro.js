/* eslint-disable react-hooks/exhaustive-deps */

import styled, { keyframes } from 'styled-components';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import MeditationCard from '@/component/Intro_Meditation_Component/MeditationCard';

const meditationArr = [
  {
    content: 'yoga',
    path: '/meditation_music',
    cardImgUrl:
      '/src/Meditation_IMG/Yoga/Meditation_Intro_Yoga_Background_IMG.png',
    title: '요가 명상',
    subtitle: '요가 명상을 통해 편안한 몸과 마음을 만들어 보세요.',
  },
  {
    content: 'music',
    path: '/meditation_music',
    cardImgUrl:
      '/src/Meditation_IMG/Music/Meditation_Intro_Music_Background_IMG.png',
    title: '음악 명상',
    subtitle: '음악 명상을 통해 편안한 몸과 마음을 만들어 보세요.',
  },
  {
    content: 'painting',
    path: '/meditation_painting',
    cardImgUrl:
      '/src/Meditation_IMG/Painting/Meditation_Intro_Painting_Background_IMG.png',
    title: '그림 명상',
    subtitle: '별자리&만다라 그리기 활동으로 긍정적인 사고방식을 만들어요. ',
  },
];

export default function Meditation_Intro() {
  return (
    <MainContainer>
      <MeditationIntroContainer>
        {meditationArr.map((el, index) => {
          return (
            <MeditationCard
              key={index}
              content={el.content}
              path={el.path}
              cardImgUrl={el.cardImgUrl}
              title={el.title}
              subtitle={el.subtitle}
            />
          );
        })}
      </MeditationIntroContainer>
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

const MeditationIntroContainer = styled.div`
  margin-top: 4rem;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(1, 1fr);
  gap: 1rem 2.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(3, 1fr);
    justify-content: center;
  }
`;
