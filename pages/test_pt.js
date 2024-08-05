/* eslint-disable react-hooks/exhaustive-deps */
import styled, { keyframes } from 'styled-components';
import { FlexContainer } from '../styled-component/common';
import { useEffect, useState, useRef } from 'react';

import { handlePtAnalsys } from '@/fetchAPI/testAPI';

import PTestBubble from '@/component/Test_Component/PTestBubble';
import Image from 'next/image';
import LoadingAnimation from '@/component/Chat_Component/LoadingAnimation';
import { useRouter } from 'next/router';

import { motion } from 'framer-motion';
import { psychologicalAsesssment } from '@/store/testGenerator';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// Renewel Test 페이지
export default function Test() {
  const [isPending, setIsPending] = useState(false);
  const [next, setNext] = useState(false); // 유저 문항 선택 트리거
  const [select, setSelect] = useState('2'); // 유저 문항 선택지 1 || 2
  const [bottom, setBottom] = useState(false); // scrollToBottom 메서드 발동 트리거
  const [resultType, setResultType] = useState('');
  const [resultTrigger, setResultTrigger] = useState(false); // 결과 분석 요청 선택 트리거
  const [messageArr, setMessageArr] = useState([]);

  const router = useRouter();
  // 제너레이터는 리렌더링 시점에 초기화 => useRef를 통해 인스턴스 고정
  const ptSessionRef = useRef(null);
  const chatBoxBody = useRef(null); // scrollToBottom 컴포넌트 고정

  if (!ptSessionRef.current) ptSessionRef.current = psychologicalAsesssment();

  const scrollToBottom_useRef = () => {
    const ptBoxBody = chatBoxBody.current;
    if (ptBoxBody.scrollHeight > 800)
      window.scrollTo({
        top: ptBoxBody.scrollHeight, // 세로 스크롤 위치
        left: 0, // 가로 스크롤 위치
        behavior: 'smooth', // 스크롤 애니메이션 (옵션: 'auto' 또는 'smooth')
      });
    // if (chatBoxBody.current) {
    //   chatBoxBody.current.scrollTop = chatBoxBody.current.scrollHeight;
    // }
  };

  // 성격 검사 분석 요청 API 호출 메서드
  const requetAnalysis = async () => {
    try {
      // 감정 분석 API 호출 이후 state 갱신
      const data = await handlePtAnalsys({
        resultText: resultType,
        pUid: localStorage.getItem('id'),
      });

      setIsPending(false);
      setMessageArr([
        ...messageArr,
        { role: 'assistant', content: data.message },
      ]);
      setBottom(true);
    } catch (error) {
      console.log(error);
    }
  };
  // 페이지 초기설정 - 성격검사 첫 문항 제시
  useEffect(() => {
    setTimeout(() => {
      const { value, done } = ptSessionRef.current.next(select);
      if (!done) {
        const question_message = {
          role: 'assistant',
          content: value.question,
          imgURL: value.question_imgURL,
        };
        const selection_message = {
          role: 'user',
          content: value.selection,
          imgURL: value.selection_imgURL,
        };
        setMessageArr([...messageArr, question_message, selection_message]);
      }
    }, 1000);
  }, []);

  // 심리 검사 다음 문항 진행
  useEffect(() => {
    if (next) {
      const { value, done } = ptSessionRef.current.next(select);
      // console.log(done);
      // 검사 문항 진행
      if (!done) {
        const question_message = {
          role: 'assistant',
          content: value.question,
          imgURL: value.question_imgURL,
        };
        const selection_message = {
          role: 'user',
          content: value.selection,
          imgURL: value.selection_imgURL,
        };
        setMessageArr([...messageArr, question_message, selection_message]);
        setNext(false);
      }
      // 검사 문항 종료 - 결과 및 AI 분석 요청
      else if (value) {
        const { result, type } = value;
        setIsPending(true);
        setTimeout(() => {
          setMessageArr([
            ...messageArr,
            {
              role: 'assistant',
              content: result,
            },
          ]);
          setResultType(type);
          setNext(false);
          setResultTrigger(true);
          setBottom(true);
        }, 1500);
      } else return;

      setBottom(true);
    }
  }, [next]);

  // 성격검사 AI 분석 트리거
  useEffect(() => {
    if (resultTrigger) {
      console.log('AI PT 분석 API 호출');
      requetAnalysis();
    }
  }, [resultTrigger]);

  // 스크롤 바텀
  useEffect(() => {
    if (bottom) {
      scrollToBottom_useRef();
      setBottom(false);
    }
  }, [bottom]);

  return (
    <MainContainer>
      <FlexContainer
        justify="center"
        align="center"
        dir="col"
        width="100%"
        height="100%"
        padding="0 1rem"
      >
        {/* <Image
          src="/src/soyesKids_Logo.png"
          alt={"soyes_logo"}
          width={529}
          height={93}
        /> */}
        <PTBox ref={chatBoxBody}>
          {/* <PTBoxHeader>성격 검사</PTBoxHeader> */}
          <PTBoxBody>
            <PTestBubble message={'성격검사 시작합니다!'} role="assistant" />
            {messageArr.map((el, index) => (
              <div key={index}>
                {el.imgURL ? (
                  <PTestBubble
                    message={el.content}
                    role={el.role}
                    imgURL={el.imgURL}
                    setSelect={index === messageArr.length - 1 && setSelect}
                    setNext={index === messageArr.length - 1 && setNext}
                  />
                ) : (
                  <PTestBubble
                    message={el.content}
                    role={el.role}
                    setSelect={index === messageArr.length - 1 && setSelect}
                    setNext={index === messageArr.length - 1 && setNext}
                  />
                )}
              </div>
            ))}
            {/* 로딩바 */}
            {isPending ? <LoadingAnimation /> : null}
          </PTBoxBody>
        </PTBox>
        <div class="codingnexus">
          <a>Created by SoyesKids</a>
        </div>
      </FlexContainer>
    </MainContainer>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['pt', 'nav'])),
    },
  };
}

// styled-component의 animation 설정 방법 (keyframes 메서드 사용)

const MainContainer = styled.div`
  /* background-image: url('/src/soyesKids_Background_image.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; */
  background-color: #fdf6ff;
  width: 100%;
  min-height: 100vh;
  height: 100%;

  @media (max-width: 768px) {
    overflow: hidden;
  }
`;

// const MainContainer = styled.div`
//   /* background-image: url('/src/soyesKids_Background_image.png');
//   background-size: cover;
//   background-position: center;
//   background-repeat: no-repeat; */

//   background-color: #fdf6ff;

//   width: 100vw;
//   height: 100vh;

//   @media (max-width: 768px) {
//     overflow: hidden;
//   }

//   position: relative;
// `;

const PTBox = styled.div`
  /* background-image: ${(props) =>
    props.backgroundImgUrl ? `url(${props.backgroundImgUrl})` : 'none'};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; */

  /* 화면 좁히기 가능 */
  width: 100vw;
  background: inherit;
  /* position: relative; */
  /* margin: 0 auto; */
  margin-top: 6rem;
  padding: 0 5rem;
  border-radius: 8px;
  /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); */

  height: 100%;

  /* 채팅 중앙정렬 가능 */
  /* display: flex;
  justify-content: center;
  align-items: center; */

  @media (max-width: 768px) {
    width: 100vw;
    height: 100%;
    max-width: 37rem;
    padding: 0;
  }
`;

// const PTBox = styled.div`
//   position: relative;
//   margin: 0 auto;
//   margin-top: 6rem;

//   width: 100%;
//   max-width: 37rem;

//   height: 100%;
//   /* height: calc(100vh - 150px); */
//   /* max-height: calc(100vh - 150px); */

//   background-color: #ffffff;
//   border-radius: 8px;

//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   overflow: hidden;
// `;

const PTBoxHeader = styled.div`
  background-color: #0084ff;
  color: #ffffff;
  padding: 16px;
  font-size: 20px;
  font-weight: bold;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  height: 9%;
`;

const PTBoxBody = styled.div`
  /* background-image: ${(props) =>
    props.backgroundImgUrl ? `url(${props.backgroundImgUrl})` : 'none'};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; */
  width: 100vw;
  background: inherit;
  padding: 1rem;
  overflow-y: auto;
  min-height: 75vh;
  height: 100%;

  display: flex;
  flex-direction: column;
  width: auto;

  gap: 0.4rem;

  @media (max-width: 768px) {
    height: 86%;
    min-height: 70vh;
  }
`;

// const PTBoxBody = styled.div`
//   padding: 6px;
//   height: 91%;
//   overflow-y: auto;
//   /* height: calc(100% - 360px); */

//   display: flex;
//   flex-direction: column;
//   width: auto;
// `;

// const PTBoxFooter = styled.div`
//   bottom: 0;
//   display: flex;
//   align-items: center;
//   background-color: #ffffff;
//   border-top: 1px solid #e6e6e6;
//   padding: 8px 16px;
// `;

// const PTBoxFooterInput = styled.input`
//   flex: 1;
//   padding: 8px;
//   border: 1px solid #e6e6e6;
//   border-radius: 8px;
//   font-size: 16px;
//   outline: none;
// `;

// const PTBoxFooterButton = styled.button`
//   margin-left: 8px;
//   padding: 5px 12px;
//   background-color: ${(props) => (props.isPending ? "#e5e5ea" : "#0084ff")};
//   color: #ffffff;
//   font-size: 16px;
//   font-weight: bold;
//   border: none;
//   border-radius: 8px;
//   cursor: ${(props) => (props.isPending ? "" : "pointer")};

//   &:hover {
//     background-color: ${(props) => (props.isPending ? "#e5e5ea" : "#0073e6")};
//   }

//   &:active {
//     background-color: ${(props) => (props.isPending ? "#e5e5ea" : "#0073e6")};
//   }
//   display: flex;
//   transition: 0.2s;
// `;
