import React from 'react';
import axios from 'axios';

import IntroSection from '@/component/Home_Component/IntroSection';
import Background from '@/component/Common_Component/Background';
import EducationCard from '@/component/Home_Component/EducationCard';
import EduArtComponent from '@/component/Home_Component/EduArtComponent';
import InfoSection from '@/component/Home_Component/InfoSection';
import TeacherCarousel from '@/component/Home_Component/TeacherCarousel';
import LessonSection from '@/component/Home_Component/LessonSection';
import EndSection from '@/component/Home_Component/EndSection';

import {
  MasterContainer,
  SectionFirst,
  SectionSecond,
  SectionFourth,
  SectionFifthtoNineth,
  SectionTenth,
} from '@/component/Home_Component/HomeSections.styled';

import { ScrollAnimation } from '@/component/Home_Component/Scroll_Animation/ScrollAnimation';

// Client Teacher Data Type 지정
type SectionFirstType = {
  imgPath: string;
  title: string;
  content: string;
};
type SectionSecondType = {
  title: string;
  content: string;
  features: string[];
  imgPath: string;
};
type SectionFifthToNinethType = {
  title: string;
  subtitle: string;
  imgUrl: string;
  routePath: string;
  backgroundColor?: string;
};

const section_1_Arr: SectionFirstType[] = [
  {
    imgPath: '/src/Home_IMG/Icon_IMG/Home_Icon_1_IMG.png',
    title: 'Kids Education',
    content:
      '아동에게 맞는 다양한 움직임 프로그램 기술과 예술이 결합된 프로그램',
  },
  {
    imgPath: '/src/Home_IMG/Icon_IMG/Home_Icon_2_IMG.png',
    title: 'Culture Class',
    content: '각 기관에 맞는 교육프로그램',
  },
  {
    imgPath: '/src/Home_IMG/Icon_IMG/Home_Icon_3_IMG.png',
    title: 'Full-Time',
    content: '교육하고 체험하고 스스로 만드는 움직임',
  },
];
const section_2_Data: SectionSecondType = {
  title: 'EDU ART',
  content: '우리아이의 건강한 몸과 마음의 행복을 위해',
  features: ['social', 'physical', 'creativity', 'self-confidence'],
  imgPath: '/src/Home_IMG/Home_Section_2_IMG.png',
};
const section_5to9_Arr: SectionFifthToNinethType[] = [
  {
    title: '유치원 수업',
    subtitle:
      '유치원 기관에 맞는 다양한 프로그램과 연령대에 맞춘 소예키즈 프로그램을 제공합니다.',
    imgUrl: '/src/Home_IMG/Home_Section_5_Background_IMG.png',
    routePath: '/agency',
    backgroundColor: '#F4EEE5',
  },
  {
    title: '초등학교 수업',
    subtitle:
      '초등학교 기관에 맞는 맞춤형 프로그램과 연령에 맞춘 다양한 프로그램을 제공합니다.',
    imgUrl: '/src/Home_IMG/Home_Section_6_Background_IMG.png',
    routePath: '/agency/element',
  },
  {
    title: '문화센터 수업',
    subtitle:
      '유아, 초등, 성인들을 대상으로 하는 다양한 연령대의 프로그램을 제공합니다.',
    imgUrl: '/src/Home_IMG/Home_Section_7_Background_IMG.png',
    routePath: '/agency/cultural',
    backgroundColor: '#F4EEE5',
  },
  {
    title: '아파트 커뮤니티 센터 수업',
    subtitle: '아파트 커뮤니티센터에 적절한 프로그램을 제공합니다.',
    imgUrl: '/src/Home_IMG/Home_Section_8_Background_IMG.png',
    routePath: '/agency/comunity',
  },
  {
    title: '아동 복지 센터 수업',
    subtitle:
      '유아, 초등, 성인들을 대상으로 하는 다양한 연령대의 프로그램을 제공합니다.',
    imgUrl: '/src/Home_IMG/Home_Section_9_Background_IMG.png',
    routePath: '/agency/welfare',
    backgroundColor: '#F4EEE5',
  },
];

// Client Teacher Data Type 지정
type ClientTeacherDataType = {
  id: number;
  name: string;
  introduce: string;
  profileImg: string;
};
// Server Teacher Data Type 지정
type ServerTeacherDataType = {
  kk_teacher_idx: number;
  kk_teacher_name: string;
  kk_teacher_introduction: string;
  kk_teacher_profileImg_path: string;
};

// ISR을 위해 revalidate 설정
export const revalidate = 10;
async function getTeacherData() {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/teacher/read?main=true`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );

    const result: ServerTeacherDataType[] = res.data.data;

    if (result?.length) {
      return result.map((el) => ({
        id: el.kk_teacher_idx,
        name: el.kk_teacher_name,
        introduce: el.kk_teacher_introduction,
        profileImg: el.kk_teacher_profileImg_path,
      }));
    }

    return [];
  } catch (err: any) {
    console.error(err.response);
    return [];
  }
}

// Test
// Home 페이지
export default async function Home() {
  const teacherDataArr: ClientTeacherDataType[] = await getTeacherData();

  return (
    <MasterContainer>
      {/* 인트로 섹션 */}
      <IntroSection />
      {/* 섹션1 */}
      <SectionFirst>
        {section_1_Arr.map((el: SectionFirstType, index: number) => {
          const { imgPath, title, content } = el;
          return (
            <EducationCard
              key={`${title}_${content}`} // 고유 Key값 지정
              delay={0.1 * (index + 1)}
              imgPath={imgPath}
              title={title}
              content={content}
            />
          );
        })}
      </SectionFirst>

      {/* 섹션2 */}
      <ScrollAnimation
        startingPoint="bottom"
        delay={0.2}
        duration={1}
        repeat={true}
      >
        <SectionSecond>
          <EduArtComponent sectionData={section_2_Data} />
        </SectionSecond>
      </ScrollAnimation>
      {/* 섹션4 */}
      <ScrollAnimation startingPoint="bottom" duration={1} repeat={true}>
        <SectionFourth>
          <InfoSection />
        </SectionFourth>
      </ScrollAnimation>
      {/* 섹션5~8 */}
      {section_5to9_Arr.map((el: SectionFifthToNinethType, index: number) => {
        const { title, subtitle, imgUrl, routePath } = el;
        return (
          <ScrollAnimation
            key={`${routePath}_${index}`}
            startingPoint={index % 2 ? 'right' : 'left'}
            delay={0.1}
          >
            <SectionFifthtoNineth backgroundColor={el.backgroundColor}>
              <LessonSection
                title={title}
                subtitle={subtitle}
                imgUrl={imgUrl}
                type={index % 2 ? 'right' : 'left'}
                routePath={routePath}
                info={undefined}
              />
            </SectionFifthtoNineth>
          </ScrollAnimation>
        );
      })}
      {/* 섹션10 */}
      <ScrollAnimation startingPoint="bottom" delay={0.2}>
        <SectionTenth>
          <Background
            imgPath={`/src/Home_IMG/Home_Section_10_Background_IMG.png`}
            imgAlt={'Section10 Background IMG'}
          />
          <TeacherCarousel teacherDataArr={teacherDataArr} />
        </SectionTenth>
      </ScrollAnimation>
      {/* 엔드 섹션 */}
      <EndSection
        Title={`For our child's healthy body \n and heart happiness`}
        btnTitle={`콘텐츠 소개`}
        routePath={`/introduce/content`}
      />
    </MasterContainer>
  );
}
