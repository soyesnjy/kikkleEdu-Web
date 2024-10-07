/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';

import EducationCard from '@/component/Home_Component/EducationCard';
import EduArtComponent from '@/component/Home_Component/EduArtComponent';
import InfoSection from '@/component/Home_Component/InfoSection';
import TeacherCarousel from '@/component/Home_Component/TeacherCarousel';
import LessonSection from '@/component/Home_Component/LessonSection';

import { useRecoilState } from 'recoil';
import { mobile } from '@/store/state';
// import { useTranslation } from 'next-i18next';
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const section_1_Arr = [
  {
    imgPath: '/src/Home_IMG/Icon_IMG/Home_Icon_1_IMG.png',
    title: 'Kids education',
    content: 'Lorem ipsum dolor sit amet velit, elitni legro int dolor.',
  },
  {
    imgPath: '/src/Home_IMG/Icon_IMG/Home_Icon_2_IMG.png',
    title: 'Culture Class',
    content: 'Lorem ipsum dolor sit amet velit, elitni legro int dolor.',
  },
  {
    imgPath: '/src/Home_IMG/Icon_IMG/Home_Icon_3_IMG.png',
    title: 'Full-Time',
    content: 'Lorem ipsum dolor sit amet velit, elitni legro int dolor.',
  },
];

const section_2_Data = {
  title: 'EDU ART',
  content:
    'Lorem ipsum dolor sit amet velitLorem ipsum dolor sit amet velit, elitni legro int dolor. elitni legro int dolor.',
  features: ['FEATURES', 'FEATURES', 'FEATURES', 'self-confidence'],
  imgPath: '/src/Home_IMG/Home_Section_2_IMG.png',
};

const section_5to9_Arr = [
  {
    title: '유치원 수업',
    subtitle:
      '유치원 기관에 맞는 다양한 프로그램과 연령대에 맞춘 소예키즈 프로그램을 제공합니다.',
    imgUrl: '/src/Home_IMG/Home_Section_5_Background_IMG.png',
  },
  {
    title: '초등학교 수업',
    subtitle:
      '초등학교 기관에 맞는 맞춤형 프로그램과 연령에 맞춘 다양한 프로그램을 제공합니다.',
    imgUrl: '/src/Home_IMG/Home_Section_6_Background_IMG.png',
  },
  {
    title: '문화센터 수업',
    subtitle:
      '유아, 초등, 성인들을 대상으로 하는 다양한 연령대의 프로그램을 제공합니다.',
    imgUrl: '/src/Home_IMG/Home_Section_7_Background_IMG.png',
  },
  {
    title: '아파트 커뮤니티 센터 수업',
    subtitle: '아파트 커뮤니티센터에 적절한 프로그램을 제공합니다.',
    imgUrl: '/src/Home_IMG/Home_Section_8_Background_IMG.png',
  },
];

// Home 페이지
export default function Home() {
  const [mobileFlag, setMobileFlag] = useRecoilState(mobile);

  return (
    <MasterContainer>
      {/* 인트로 섹션 */}
      <IntroSection>
        <ReadContainer>
          <H1>Kids Class Edu</H1>
          {!mobileFlag && (
            <>
              <H4>우리아이의 건강한 몸과 마음의 행복을 위해</H4>
              <Button>Read More</Button>
            </>
          )}
        </ReadContainer>
      </IntroSection>
      {/* 섹션1 */}
      <SectionFirst>
        {mobileFlag && (
          <div>
            <H4>우리아이의 건강한 몸과 마음의 행복을 위해</H4>
            <Button>Read More</Button>
          </div>
        )}
        {section_1_Arr.map((el, index) => {
          const { imgPath, title, content } = el;
          return (
            <EducationCard
              key={index}
              imgPath={imgPath}
              title={title}
              content={content}
            />
          );
        })}
      </SectionFirst>
      {/* 섹션2 */}
      <SectionSecond>
        <EduArtComponent sectionData={section_2_Data} />
      </SectionSecond>
      {/* 섹션4 */}
      <SectionFourth>
        <InfoSection />
      </SectionFourth>
      {/* 섹션5~8 */}
      {section_5to9_Arr.map((el, index) => {
        return (
          <SectionFifthtoNineth key={index}>
            <LessonSection
              title={el.title}
              subtitle={el.subtitle}
              imgUrl={el.imgUrl}
              type={mobileFlag ? 'mobile' : index % 2 ? 'right' : 'left'}
            />
          </SectionFifthtoNineth>
        );
      })}
      {/* 섹션10 */}
      <SectionTenth>
        <TeacherCarousel />
      </SectionTenth>
      {/* 엔드 섹션 */}
      <EndSection>
        <EndTitle>For our child's healthy body and heart happiness</EndTitle>
        <Button>콘텐츠 소개</Button>
      </EndSection>
      {/* 섹션3 */}
      {/* <SectionThird>
        <EduArtClassSection />
      </SectionThird> */}
      {/* 섹션9 */}
      {/* <SectionNineth>
        <PartnerCarousel />
      </SectionNineth> */}
    </MasterContainer>
  );
}

// // Translation 파일 적용
// export async function getStaticProps({ locale }) {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ['common', 'nav'])), // 파일 다중 적용 가능
//     },
//   };
// }

const MasterContainer = styled.div`
  background-color: white;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MainContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: white;
  padding-bottom: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  gap: 1rem;

  @media (max-width: 768px) {
    background-image: url('/src/Background_IMG/Mobile/mobile_background_2.png');
    justify-content: center;
  }
`;

const IntroSection = styled.section`
  width: 100vw;
  height: 67vw; /* 16:9 비율 유지 (100 / 16 * 9) */
  position: relative;

  background-color: white;
  background-image: url('/src/Home_IMG/Home_Intro_Background_IMG.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  padding: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  gap: 1rem;

  /* &::before {
    content: '';
    display: block;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    background-image: url('/src/Home_IMG/Home_Intro_Background_IMG.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: absolute;
  } */

  @media (max-width: 1080px) {
    flex-direction: column;
    justify-content: center;
    padding: 1rem;
  }
`;

const ReadContainer = styled.div`
  width: 40vw;

  padding: 5rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  gap: 1rem;

  color: white;
  z-index: 1;

  @media (max-width: 1080px) {
    width: 100%;
    padding: 0 1rem;
  }
`;

const H1 = styled.h1`
  font-size: 80px;
  font-weight: bold;
  font-family: Nunito;

  color: #2e6c6d;
  z-index: 1;

  @media (max-width: 1080px) {
    font-size: 55px;
    width: 80%;
  }
`;

const H4 = styled.h4`
  font-size: 20px;
  font-weight: 300;
  font-family: Pretendard;

  color: #2e6c6d;
  z-index: 1;

  @media (max-width: 1080px) {
  }
`;

const Button = styled.button`
  font-family: Nunito;
  background-color: #ffca1b;

  border-radius: 10px;
  border: none;

  margin-top: 1rem;
  padding: 1rem 3rem;

  color: white;

  cursor: pointer;
  z-index: 1;
`;

const ImageContainer = styled.div`
  width: 40vw;

  padding: 5rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  gap: 1rem;

  color: white;
  z-index: 1;

  @media (max-width: 1080px) {
    margin-top: 5rem;
    width: 100%;
    padding: 0.5rem;
  }
`;

const SectionFirst = styled.section`
  width: 100vw;
  min-height: 262px;

  background-color: white;
  padding: 3rem;

  display: flex;
  justify-content: space-around;
  align-items: center;

  @media (max-width: 1080px) {
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    padding: 2rem;

    gap: 4rem;
  }
`;

const SectionSecond = styled.section`
  width: 100vw;
  min-height: 100vh;

  background-color: white;

  display: flex;
  justify-content: space-around;
  align-items: center;

  @media (max-width: 1080px) {
    height: 100%;
    flex-direction: column;
    padding: 2rem;
  }
`;

const SectionThird = styled.section`
  width: 100vw;
  min-height: 50vh;

  background-color: white;

  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 1080px) {
    height: 100%;
    flex-direction: column;
    padding: 2rem;
  }
`;

const SectionFourth = styled.section`
  width: 100vw;
  min-height: 50vh;

  background-color: white;

  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 1080px) {
    height: 100%;
    flex-direction: column;
    padding: 2rem;
  }
`;

const SectionFifthtoNineth = styled.section`
  width: 100vw;
  min-height: 50vh;

  background-color: white;

  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 1080px) {
    height: 100%;
    flex-direction: column;
    padding: 2rem;
  }
`;

const SectionTenth = styled.section`
  width: 100vw;
  height: 67vw;
  background-color: white;

  background-image: url('/src/Home_IMG/Home_Section_10_Background_IMG.png');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;

  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 728px) {
    height: 100%;
    flex-direction: column;
    padding: 2rem;
    background-size: cover;
  }
`;

const EndSection = styled.section`
  width: 100vw;
  height: 100vh;
  background-color: white;
  position: relative;

  background-image: url('/src/Home_IMG/Home_Last_Background_IMG.png');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 728px) {
    width: 100%;
    background-size: cover;
  }
`;

const EndTitle = styled.h1`
  width: 70%;
  text-align: center;
  font-size: 3rem;
  font-family: Nunito;
  font-weight: 600;
  color: #171717;

  @media (max-width: 1080px) {
    font-size: 24px;
  }
`;
