/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import styled, { keyframes } from 'styled-components';
import { FlexContainer } from '../styled-component/common';
import { useEffect, useState, useRef } from 'react';

import { handleEbtAnalsys } from '@/fetchAPI/testAPI';
import EBTestBubble from '@/component/Test_Component/EBTestBubble';
import EBTClassSelector from '@/component/Test_Component/EBTClassSelector';
import LoadingAnimation from '@/component/Chat_Component/LoadingAnimation';
import EBTClassNextBtn from '@/component/Test_Component/EBTClassNextBtn';

// import { useRouter } from "next/router";
import { ebtClassMap } from '@/store/testGenerator';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// Renewel Test 페이지
export default function Test() {
  const [isPending, setIsPending] = useState(false);
  const [next, setNext] = useState(false); // 유저 문항 선택 트리거
  const [select, setSelect] = useState(-1); // 유저 문항 선택지 1 || 2
  const [bottom, setBottom] = useState(false); // scrollToBottom 메서드 발동 트리거
  const [isProceeding, setIsProceeding] = useState(false);
  const [scoreArr, setScoreArr] = useState([]);
  const [resultTrigger, setResultTrigger] = useState(false); // 결과 분석 요청 선택 트리거
  const [messageArr, setMessageArr] = useState([]);
  const [ebtType, setEbtType] = useState('');
  const [endTrigger, setEndTrigger] = useState(false); // 검사 종료 트리거 (변경 시 다음 검사 버튼 뿌리기)

  // const router = useRouter();
  // 제너레이터는 리렌더링 시점에 초기화 => useRef를 통해 인스턴스 고정
  const ebtSessionRef = useRef(null);
  const chatBoxBody = useRef(null); // scrollToBottom 컴포넌트 고정

  const scrollToBottom_useRef = () => {
    const ebtBoxBody = chatBoxBody.current;
    if (ebtBoxBody.scrollHeight > 800)
      window.scrollTo({
        top: ebtBoxBody.scrollHeight, // 세로 스크롤 위치
        left: 0, // 가로 스크롤 위치
        behavior: 'smooth', // 스크롤 애니메이션 (옵션: 'auto' 또는 'smooth')
      });

    // if (chatBoxBody.current) {
    //   chatBoxBody.current.scrollTop = chatBoxBody.current.scrollHeight;
    // }
  };

  // EBT 분석 요청 API 호출 메서드
  const requetAnalysis = async () => {
    try {
      // messageArr 파싱
      let parseMessageArr = messageArr
        .filter((el, index) => index !== 0)
        .map((el, index) => {
          // user인 경우
          if (el.role === 'user') {
            return {
              role: el.role,
              content:
                el.content[el.score.indexOf(scoreArr[Math.floor(index / 2)])], // 선택한 점수의 index와 일치하는 답변 선택
            };
          }
          // assistant인 경우
          else return { role: el.role, content: el.content };
        });
      // 감정 분석 API 호출 이후 state 갱신
      const data = await handleEbtAnalsys({
        messageArr: parseMessageArr,
        type: ebtClassMap[localStorage.getItem('EBTClass') || 'School'].type,
        score: scoreArr,
        pUid: localStorage.getItem('id'),
      });

      setIsPending(false);
      setMessageArr([
        ...messageArr,
        { role: 'assistant', content: data.message },
        // { role: "end", content: "다음 검사 진행하기" },
      ]);
      setIsProceeding(false);
      setBottom(true);

      setTimeout(() => {
        setEndTrigger(true);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };
  // 페이지 초기설정 - EBT 첫 문항 제시
  useEffect(() => {
    // 정서행동 검사 제너레이터 생성
    ebtSessionRef.current =
      ebtClassMap[localStorage.getItem('EBTClass') || 'School'].generator();
    setEbtType(localStorage.getItem('EBTClass') || 'School');
    setTimeout(() => {
      const { value, done } = ebtSessionRef.current.next(select);
      if (!done) {
        const start_message = {
          role: 'assistant',
          content: `정서행동 검사 - ${
            ebtClassMap[localStorage.getItem('EBTClass') || 'School'].name
          } 시작합니다!`,
        };
        const question_message = {
          role: 'assistant',
          content: value.question.content,
          imgURL: value.question.imgURL,
        };
        const selection_message = {
          role: 'user',
          content: value.selection.content,
          score: value.selection.score,
          imgURL: value.selection.imgURL,
        };
        setMessageArr([start_message, question_message, selection_message]);
      }
    }, 1000);
    return () => {
      // 페이지 언마운트 시 로컬 스토리지의 EBTClass 값 삭제
      localStorage.removeItem('EBTClass');
    };
  }, []);

  // 심리 검사 다음 문항 진행
  useEffect(() => {
    if (next) {
      const { value, done } = ebtSessionRef.current.next(select);
      // 검사 진행 중
      if (!done) {
        const question_message = {
          role: 'assistant',
          content: value.question.content,
          imgURL: value.question.imgURL,
        };
        const selection_message = {
          role: 'user',
          content: value.selection.content,
          score: value.selection.score,
          imgURL: value.selection.imgURL,
        };

        // 선택 문항 갱신
        // let updateMsgArr = [...messageArr];
        // updateMsgArr[updateMsgArr.length - 1] = {
        //   ...updateMsgArr[updateMsgArr.length - 1],
        //   selected: select,
        // };

        setMessageArr([...messageArr, question_message, selection_message]);
        setNext(false);
      }
      // 검사 종료 - 결과 및 AI 분석 요청
      else if (value) {
        const { result, ebtScore } = value;
        setIsPending(true);
        // 선택 문항 갱신
        // let updateMsgArr = [...messageArr];
        // updateMsgArr[updateMsgArr.length - 1] = {
        //   ...updateMsgArr[updateMsgArr.length - 1],
        //   selected: select,
        // };

        setMessageArr([
          ...messageArr,
          {
            role: 'assistant',
            content: result,
          },
        ]);

        setTimeout(() => {
          setScoreArr([...ebtScore]);
          setNext(false);
          setResultTrigger(true); // 결과 분석 요청 트리거
          setBottom(true);
        }, 1500);
      } else return;

      setBottom(true); // 스크롤 바텀 트리거
    }
  }, [next]);

  // 성격검사 AI 분석 트리거
  useEffect(() => {
    if (resultTrigger) {
      console.log('AI EBT 분석 API 호출');
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
        width="100vw"
        height="100%"
        padding="0 1rem"
      >
        <EBTBox>
          <EBTBoxBody ref={chatBoxBody}>
            {messageArr.map((el, index) => (
              <div key={index}>
                <EBTestBubble
                  message={el.content}
                  score={el.score}
                  role={el.role}
                  imgURL={el.imgURL}
                  setSelect={index === messageArr.length - 1 && setSelect}
                  setNext={index === messageArr.length - 1 && setNext}
                />
              </div>
            ))}
            {/* 로딩바 */}
            {isPending ? <LoadingAnimation /> : null}
            {/* 다음 검사 OR 총평 */}
            {endTrigger ? (
              <EBTClassNextBtn ebtType={ebtClassMap[ebtType].next} />
            ) : null}
          </EBTBoxBody>
        </EBTBox>
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
      ...(await serverSideTranslations(locale, ['ebt', 'nav'])),
    },
  };
}

// styled-component의 animation 설정 방법 (keyframes 메서드 사용)
const FadeInSpan = keyframes`
  0% {
    opacity: 0;
    font-size: 1rem;
  }
  100% {
    opacity: 1;
    font-size: 3rem;
  }
`;

const MainContainer = styled.div`
  /* background-image: url('/src/soyesKids_Background_image.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; */
  background-color: #fdf6ff;
  width: 100vw;
  min-height: 100vh;
  height: 100%;

  position: relative;

  @media (max-width: 768px) {
    overflow: hidden;
  }
`;

// const MainContainer = styled.div`
//   background-image: url('/src/soyesKids_Background_image.png');
//   background-size: cover;
//   background-position: center;
//   background-repeat: no-repeat;

//   width: 100vw;
//   height: 100vh;

//   @media (max-width: 768px) {
//     overflow: hidden;
//   }

//   position: relative;
// `;

const EBTBox = styled.div`
  /* background-image: ${(props) =>
    props.backgroundImgUrl ? `url(${props.backgroundImgUrl})` : 'none'};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; */

  width: 100vw;
  background: inherit;
  /* position: relative; */
  /* margin: 0 auto; */
  margin-top: 6rem;
  padding: 0 5rem;
  border-radius: 8px;
  /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); */

  height: 100%;

  @media (max-width: 768px) {
    height: 100%;
    max-width: 37rem;
    padding: 0;
  }
`;

// const EBTBox = styled.div`
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

const EBTBoxHeader = styled.div`
  background-color: #0084ff;
  color: #ffffff;
  padding: 16px;
  font-size: 20px;
  font-weight: bold;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  height: 9%;
`;

const EBTBoxBody = styled.div`
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

  position: relative;

  @media (max-width: 768px) {
    height: 86%;
    min-height: 70vh;
  }
`;

// const EBTBoxBody = styled.div`
//   padding: 6px;
//   height: 91%;
//   overflow-y: auto;
//   /* height: calc(100% - 360px); */

//   display: flex;
//   flex-direction: column;
//   width: auto;
// `;
