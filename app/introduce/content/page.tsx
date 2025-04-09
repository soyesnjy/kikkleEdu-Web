'use client';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { useQuery } from 'react-query';

import { useRecoilState } from 'recoil';
import { mobile } from '@/store/state';
import { handleClassGet } from '@/fetchAPI/classAPI';

import IntroductionHeader from '@/component/Introduction_Component/IntroductionHeader';
import IntroductionMiddler from '@/component/Introduction_Component/IntroductionMiddler';

import TeacherSearchBar from '@/component/Home_Component/TeacherSearchBar';
import EndSection from '@/component/Home_Component/EndSection';
import LoadingModal from '@/component/Common_Component/LoadingModal';

const classDefaultArr = [
  {
    imgPath: '/src/Agency_IMG/Agency_kindergarden_Program_1_Background_IMG.png',
    title: '스토리발레(창의발레)',
    routePath: '/',
  },
  {
    imgPath: '/src/Agency_IMG/Agency_kindergarden_Program_2_Background_IMG.png',
    title: '체험형 원데이 프로그램',
    routePath: '/',
  },
  {
    imgPath: '/src/Agency_IMG/Agency_kindergarden_Program_3_Background_IMG.png',
    title: '발표회 프로그램',
    routePath: '/',
  },
  {
    imgPath: '/src/Agency_IMG/Agency_kindergarden_Program_4_Background_IMG.png',
    title: 'KPOP 방송댄스 프로그램',
    routePath: '/',
  },
  {
    imgPath: '/src/Agency_IMG/Agency_kindergarden_Program_5_Background_IMG.png',
    title: '세계의 춤 프로그램',
    routePath: '/',
  },
  {
    imgPath: '/src/Agency_IMG/Agency_kindergarden_Program_1_Background_IMG.png',
    title: '스토리발레(창의발레)',
    routePath: '/',
  },
  {
    imgPath: '/src/Agency_IMG/Agency_kindergarden_Program_1_Background_IMG.png',
    title: '스토리발레(창의발레)',
    routePath: '/',
  },
  {
    imgPath: '/src/Agency_IMG/Agency_kindergarden_Program_1_Background_IMG.png',
    title: '스토리발레(창의발레)',
    routePath: '/',
  },
];

// React Query - 서버에서 데이터를 가져오는 API 함수
const reactQueryFetchClass = async ({ queryKey }) => {
  const [, classTag] = queryKey;
  const response = await handleClassGet({
    classTag,
  });
  return response.data;
};

type ClassDataType = {
  title: string;
  imgPath: string;
  routePath: string;
};

const ContentPage = () => {
  const [classTag, setClassTag] = useState('ballet');
  const [classDataArr, setClassDataArr] = useState<ClassDataType[]>([]);
  const [mobileFlag] = useRecoilState(mobile);

  const router = useRouter();

  // React Query 데이터 가져오기
  const { data, isLoading, error } = useQuery(
    ['contentClass', classTag], // Query Key
    reactQueryFetchClass, // Query Function
    {
      cacheTime: 10000, // 10초 동안 캐시 유지
      keepPreviousData: true, // 데이터를 가져오는 동안 기존 데이터 유지
      onSuccess: (data) => {
        if (data && data.data.length) {
          setClassDataArr([
            ...data.data.map((el) => {
              return {
                title: el.kk_class_title,
                imgPath: el.kk_class_file_path,
                routePath: `/program${el.kk_class_tag === 'ballet' ? '' : `/${el.kk_class_tag}`}?cName=${el.kk_class_title}`,
              };
            }),
          ]);
        }
      },
      onError: (error) => {
        console.error(error);
        setClassDataArr(classDefaultArr);
      },
    }
  );

  return (
    <MainContainer>
      {/* 헤더 섹션 */}
      <IntroductionHeader
        title={`Kids Class edu`}
        subTitle={`콘텐츠 소개`}
        description={`소예키즈에서 연구개발한 다양한 예체능
교육프로그램을 연령대별로 제공하고 있으며 기관이 원하는
프로그램을 선택 & 제공하고 있습니다.`}
        bottomTitle={`소예키즈 소개`}
        bottomSubTitle={`콘텐츠 소개`}
        $imgPath={`/src/Introduce_IMG/Content/Introduce_Content_Header_Background_IMG.png`}
      />
      {/* 미들 섹션 */}
      <IntroductionMiddler
        title={`KK EDU - History`}
        subTitle={`콘텐츠 소개`}
      />
      {/* 수업 프로그램 섹션 */}
      <MiddleSectionThird>
        {/* 수업 카테고리 */}
        <TeacherSearchBar
          teacherClass={classTag}
          setTeacherClass={setClassTag}
        />
        <ProgramContainer>
          {isLoading ? (
            <LoadingModal isOpen={isLoading} />
          ) : error ? (
            `Network Error...`
          ) : (
            classDataArr.map((el, index) => {
              const { title, imgPath, routePath } = el;
              return (
                <ProgramContentContainer
                  key={index}
                  imgPath={imgPath}
                  onClick={() => router.push(routePath)}
                >
                  <ProgramTitle>{title}</ProgramTitle>
                </ProgramContentContainer>
              );
            })
          )}
        </ProgramContainer>
      </MiddleSectionThird>
      {/* 엔드 섹션 */}
      <EndSection
        Title={
          !mobileFlag
            ? `상상하고 즐기는 아동 창의력 발달! \n 정서 발달! 사회성 발달! \n ICT 융복합 교육 문화콘텐츠 SOYES KIDS!`
            : `상상하고 즐기는 아동 창의력 \n 발달! 정서 발달! 사회성 발달! \n ICT 융복합 교육 문화콘텐츠 \n SOYES KIDS!`
        }
      />
    </MainContainer>
  );
};

export default ContentPage;

const MainContainer = styled.div`
  width: 100%;
  background-color: white;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MiddleSectionThird = styled.section`
  width: 100vw;
  min-height: 262px;

  background-color: white;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 1rem;

  @media (max-width: 1080px) {
    width: 100%;
    flex-direction: column;
    padding: 1rem;
  }
`;

const ProgramContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 1fr;

  gap: 1rem;
  margin-top: 3rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
  }
`;

type ProgramContentType = {
  selected?: boolean;
  imgPath?: string;
};

const ProgramContentContainer = styled.div<ProgramContentType>`
  width: 280px;
  height: 280px;

  /* 배경 이미지와 그라데이션을 함께 설정 */
  background: linear-gradient(
      to top,
      rgba(0, 0, 0, 1) 10%,
      rgba(0, 0, 0, 0) 30%
    ),
    url(${(props) => props.imgPath || '/half-moon.png'});
  background-size: cover; /* 이미지 크기 조정 */
  background-position: center;
  background-repeat: no-repeat;

  /* 배경 이미지 위에 그라데이션 효과를 덧씌우기 */
  background-blend-mode: normal;

  padding: 1rem;

  border-radius: 15px;

  /* 선택 여부에 따른 테두리 */
  border: ${(props) => (props.selected ? '5px solid #45b26b' : 'none')};
  color: white;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;

  gap: 1rem;

  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  /* 반응형 크기 조정 */
  @media (max-width: 768px) {
    width: 155px;
    height: 202px;
  }
`;

const ProgramTitle = styled.div`
  font-family: Pretendard;
  font-weight: 700;
  font-size: 1.2rem;
  color: white;

  z-index: 1;
`;

// const EndSection = styled.section`
//   width: 100vw;
//   height: 100vh;
//   background-color: white;
//   position: relative;

//   background-image: url('/src/Home_IMG/Home_Last_Background_IMG.png');
//   background-size: contain;
//   background-position: center;
//   background-repeat: no-repeat;

//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;

//   @media (max-width: 728px) {
//     width: 100%;
//     background-size: cover;
//   }
// `;

// const EndTitle = styled.h1`
//   width: 70%;
//   text-align: center;
//   font-size: 3rem;
//   font-family: Nunito;
//   font-weight: 600;
//   color: #171717;

//   white-space: pre;

//   @media (max-width: 1080px) {
//     font-size: 24px;
//   }
// `;

// const Button = styled.button`
//   font-family: Pretendard;
//   font-weight: 600;
//   background-color: #ff8500;

//   border-radius: 10px;
//   border: none;

//   margin-top: 1rem;
//   padding: 1rem 2rem;

//   color: white;

//   cursor: pointer;
//   z-index: 1;
// `;
