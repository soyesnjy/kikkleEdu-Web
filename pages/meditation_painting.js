/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';
import { FlexContainer } from '../styled-component/common';
import { useEffect, useState } from 'react';

import VideoModal from '@/component/Chat_Component/VideoModal';
import Image from 'next/image';

// 아바타 관련 전역 변수
import { useRecoilState } from 'recoil';
import { log } from '../store/state';
import { useRouter } from 'next/router';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import CarouselBanner from '@/component/Home_Component/CarouselBanner';

const meditationVideoContentList = [
  {
    type: 'candle',
    videoId: 'nKCY3qz30N8',
    imageUrl: '/src/Background_IMG/Mobile/soyes_mobile.jpg',
    title: '촛불 명상',
  },
  {
    type: 'breath',
    videoId: 'tNao3xp5yjM',
    imageUrl: '/src/image.png',
    title: '호흡 명상',
  },
  {
    type: 'breath',
    videoId: 'nKCY3qz30N8',
    imageUrl: '',
    title: 'A 명상',
  },
  {
    type: 'breath',
    videoId: 'nKCY3qz30N8',
    imageUrl: '',
    title: 'B 명상',
  },
  {
    type: 'breath',
    videoId: 'nKCY3qz30N8',
    imageUrl: '',
    title: 'C 명상',
  },
  {
    type: 'breath',
    videoId: 'nKCY3qz30N8',
    imageUrl: 'src/.png',
    title: 'D 명상',
  },
  {
    type: 'breath',
    videoId: 'nKCY3qz30N8',
    imageUrl: 'src/.png',
    title: 'E 명상',
  },
  {
    type: 'breath',
    videoId: 'nKCY3qz30N8',
    imageUrl: 'src/.png',
    title: 'F 명상',
  },
];

// Renewel Test 페이지
export default function Meditation() {
  const [login, setLogin] = useRecoilState(log);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [videoId, setVideoId] = useState('');

  const { t } = useTranslation('meditation_painting');
  const router = useRouter();

  const openModalHandler = (youtubeUrl) => {
    // Closure 사용
    return () => {
      setVideoId(youtubeUrl);
      setModalIsOpen(true);
    };
  };

  const closeModalHandler = () => {
    setVideoId('');
    setModalIsOpen(false);
  };

  // Page Unmount
  useEffect(() => {
    return () => {};
  }, []);
  // 로그인 권한이 없는 상태에서의 접근 시 login 페이지로 redirect
  // useEffect(() => {
  //   const loginSession = JSON.parse(localStorage.getItem('log'));
  //   if (!loginSession) {
  //     router.replace('/login');
  //   }
  // }, [login]);

  return (
    <MainContainer>
      <CarouselBanner
        ment={{
          title: '그림 명상',
          subTitle: '그림 명상을 통해 편안한 몸과 마음을 만들어보세요.',
        }}
        backgroundUrl="/src/Carousel_IMG/Banner_Background_IMG_그림명상.png"
      />
      <FlexContainer
        justify="center"
        align="center"
        dir="col"
        height="100%"
        padding="1rem"
      >
        <StyledLabel>
          <Icon />
          <LabelText>{t('LabelText')}</LabelText>
          <Icon />
        </StyledLabel>
        <ContentContainer>
          {meditationVideoContentList.map((el, index) => {
            return (
              <ImageButton
                key={index}
                imageUrl={el.imageUrl}
                onClick={openModalHandler(el.videoId)}
                value={el.type}
              >
                <ButtonText>{el.title}</ButtonText>
              </ImageButton>
            );
          })}
        </ContentContainer>
        <VideoModal
          isOpen={modalIsOpen}
          onRequestClose={closeModalHandler}
          videoId={videoId}
        />
      </FlexContainer>
    </MainContainer>
  );
}

// 다국어 지원 관련 getStaticProps 처리
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['meditation_painting', 'nav'])),
    },
  };
}

const MainContainer = styled.div`
  /* background-image: url('/src/img.jpg'); // 배경 이미지
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; */
  background-color: white;
  width: 100vw;
  height: auto;
  min-height: 100vh;

  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    background-image: url('/src/Background_IMG/Mobile/mobile_background_1.png'); // 배경 이미지
  }
`;
const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);

  gap: 0.5rem;

  @media (max-width: 768px) {
    overflow: hidden;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
  }
`;
// 버튼 컴포넌트 정의
const ImageButton = styled.button`
  width: 23vw; /* 버튼 너비 */
  min-height: 320px;
  height: auto; /* 버튼 높이 */

  background-image: url(${(props) => props.imageUrl}); /* 이미지 경로 설정 */
  background-size: cover; /* 이미지 크기 조정 */
  background-position: center; /* 이미지 위치 조정 */

  border: none;
  border-radius: 15px; /* 라운드 처리 */

  position: relative; /* 텍스트와 아이콘 오버레이를 위한 상대 위치 설정 */
  cursor: pointer;
  overflow: hidden;

  display: flex;
  align-items: flex-end; /* 텍스트를 버튼 하단에 정렬 */
  justify-content: center;

  color: white;
  font-size: 16px;
  padding: 10px;
  text-align: center;

  &:hover {
    opacity: 0.9;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  @media (max-width: 768px) {
    width: 7rem;
    height: 8rem;
    min-height: 5rem;
  }
`;
// 텍스트 오버레이
const ButtonText = styled.span`
  font-size: 1.1rem;
  font-family: AppleSDGothicNeoB00;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

// 아이콘 오버레이
const Icon = styled.div`
  background-color: #ffd978;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
`;

// 라벨 컴포넌트 정의
const StyledLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  min-height: 2.5rem; /* 라벨 높이 */
  background-color: #b0c4de; /* 배경 색상 */
  border: none;
  border-radius: 25px; /* 라운드 처리 */
  position: relative; /* 아이콘 위치를 위한 상대 위치 설정 */
  overflow: hidden;
  color: black;
  font-size: 16px;

  padding: 10px; /* 텍스트 좌우 패딩 */
  text-align: center;
  font-weight: bold;

  margin-bottom: 1rem;

  gap: 2rem;
`;
// 텍스트 컴포넌트
const LabelText = styled.span`
  flex: 1;
  text-align: center;
  font-size: 1.3rem;
  font-weight: 600;
  font-family: AppleSDGothicNeoB00;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

// // 통짜 이미지 잘라쓰기
// const Button = styled.button`
//   width: 200px; /* 버튼 너비 설정 */
//   height: 100px; /* 버튼 높이 설정 */
//   background-image: url('/buttonImages.jpg'); /* 이미지 경로 설정 */
//   background-size: 3000px 2000px; /* 원본 이미지의 전체 크기 설정 */
//   border: none;
//   color: white;
//   font-size: 16px;
//   cursor: pointer;
//   text-align: center;
//   line-height: 60px; /* 버튼 높이와 같은 값으로 설정하여 텍스트 중앙 정렬 */
//   margin: 10px;

//   /* 호버 효과 */
//   &:hover {
//     opacity: 0.8;
//   }
// `;

// // 각 버튼에 대해 다른 배경 위치 설정
// const WatchNowButton = styled(Button)`
//   background-position: -200px 0;
// `;
