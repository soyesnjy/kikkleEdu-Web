/* eslint-disable react-hooks/exhaustive-deps */
import styled, { keyframes } from 'styled-components';
import { FlexContainer } from '@/styled-component/common';
import { useEffect, useState, useRef } from 'react';

// API 호출 메서드
import {
  handleTrainingMoodElla,
  handleTrainingMoodEllaSave,
  handleTrainingMoodEllaLoad,
} from '@/fetchAPI/ellaTrainingAPI';

import FixBubble from '@/component/EllaTraning_Component/FixBubble';
import SelectBubble from '@/component/EllaTraning_Component/SelectBubble';

import Image from 'next/image';
import LoadingAnimation from '@/component/Chat_Component/LoadingAnimation';
import { useRouter } from 'next/router';

import { useRecoilState } from 'recoil';
import { log } from '../../store/state';

// import { motion } from 'framer-motion';
import { ellaMood_Round_Array } from '@/store/ellaGenerator';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// Renewel Test 페이지
export default function Test() {
  const [login, setLogin] = useRecoilState(log);
  const [isPending, setIsPending] = useState(false);
  const [next, setNext] = useState(false); // 유저 문항 선택 트리거
  const [bottom, setBottom] = useState(false); // scrollToBottom 메서드 발동 트리거
  const [messageArr, setMessageArr] = useState([]);

  // Input 채팅 관련 State
  const [chat, setChat] = useState('');
  const [flagEnter, setFlagEnter] = useState(false);
  // 제너레이터 반환값 트리거 관련 State
  const [generatorData, setGeneratorData] = useState({});
  const [fixTrigger, setFixTrigger] = useState(false); // 제너레이터 반환값이 fix인 경우 발동될 트리거
  const [inputTrigger, setInputTrigger] = useState(false); // 제너레이터 반환값이 input인 경우 발동될 트리거
  const [gptTrigger, setGptTrigger] = useState(false); // 제너레이터 반환값이 gpt인 경우 발동될 트리거
  const [selectTrigger, setSelectTrigger] = useState(false); // 제너레이터 반환값이 select인 경우 발동될 트리거

  const router = useRouter();
  // 제너레이터는 리렌더링 시점에 초기화 => useRef를 통해 인스턴스 고정
  const moodSessionRef = useRef(null);
  const chatBoxBody = useRef(null); // scrollToBottom 컴포넌트 고정

  // 시작 Method - 유저 회기별 기분관리 훈련 프로그램 제너레이터 초기화
  const initMoodTrainingRound = async () => {
    try {
      // Todo - 기분 프로그램 Data Get API 호출 - mood_name 및 mood_round_idx Load
      const data = await handleTrainingMoodEllaLoad({
        pUid: localStorage.getItem('id'),
      });
      const { mood_round_idx, mood_name } = data;
      // Mood Round 맵핑 + mood_name 삽입
      moodSessionRef.current = ellaMood_Round_Array[mood_round_idx](mood_name);
      setTimeout(() => {
        const { value, done } = moodSessionRef.current.next();
        // console.log(value);
        if (!done) {
          if (value.type === 'fix') {
            setGeneratorData({ ...value });
            setFixTrigger(true);
          }
        }
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };

  // gpt 호출 메서드
  const createGptText = async (gptData) => {
    const { code, gpt_input } = gptData;
    try {
      const tmp = messageArr.map((el) => {
        if (!el.fix_content) return;
        let role = el.role;
        let textArr = el.fix_content
          .filter((el) => el.key === 'text' && el.value)
          .map((el) => {
            return { role, content: el.value };
          });
        return textArr[0];
      });

      // 유저 선택지
      if (gpt_input.mood_talk) {
        tmp.push({ role: 'user', content: gpt_input.mood_talk });
      }

      // 엘라 API 호출 이후 state 갱신
      const data = await handleTrainingMoodElla({
        pUid: localStorage.getItem('id'),
        messageArr: [...tmp.filter((el) => el)],
        code,
        ...gpt_input,
      });

      setIsPending(false);
      setMessageArr([
        ...messageArr,
        {
          role: 'assistant',
          type: 'fix',
          fix_content: [
            {
              key: 'text',
              value: data.message,
            },
          ],
        },
      ]);
      setTimeout(() => {
        setNext(true);
      }, 1500);

      setBottom(true);
    } catch (error) {
      console.log(error);
    }
  };

  // gpt 호출 메서드
  const moodDataSave = async (sava_data) => {
    try {
      // 엘라 API 호출 이후 state 갱신
      const data = await handleTrainingMoodEllaSave({
        pUid: localStorage.getItem('id'),
        ...sava_data,
      });

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  // 페이지 초기설정 - 성격검사 첫 문항 제시
  useEffect(() => {
    initMoodTrainingRound();
  }, []);

  // 로그인 권한이 없는 상태에서의 접근 시 login 페이지로 redirect
  useEffect(() => {
    const loginSession = JSON.parse(localStorage.getItem('log'));
    if (!loginSession) {
      router.replace('/login');
    }
  }, [login]);

  // 심리 검사 다음 문항 진행
  useEffect(() => {
    if (next) {
      const { value, done } = moodSessionRef.current.next(chat);
      if (chat) setChat('');

      // console.log(value);
      // 검사 문항 진행
      if (!done) {
        setNext(false);
        setGeneratorData({ ...value });
        if (value.type === 'fix') setFixTrigger(true);
        if (value.type === 'input') setInputTrigger(true);
        if (value.type === 'gpt') setGptTrigger(true);
        if (value.type === 'select') setSelectTrigger(true);
        if (value.type === 'input&select') {
          setInputTrigger(true);
          setSelectTrigger(true);
        }
      }
      // 검사 문항 종료 - 결과 및 AI 분석 요청
      else if (value) {
        const { sava_data } = value;
        moodDataSave(sava_data); // Todo. 회기별 DB 저장 API 호출

        delete value.sava_data;
        setMessageArr([...messageArr, value]);
      } else return;

      setBottom(true);
    }
  }, [next]);

  // 고정 멘트
  useEffect(() => {
    if (fixTrigger) {
      setMessageArr([...messageArr, generatorData]);
      setFixTrigger(false);
      // Todo. fix_content의 요소에 button이 없는 경우만 Next 실행
      if (!generatorData.fix_content.some((el) => el.key === 'button'))
        setTimeout(() => {
          setNext(true);
        }, 1500);
    }
    setBottom(true);
  }, [fixTrigger]);

  // 유저 입력 완료 시점 Rerendering.
  useEffect(() => {
    if (flagEnter) {
      setMessageArr([
        ...messageArr,
        {
          role: 'user',
          type: 'fix',
          fix_content: [
            {
              key: 'text',
              value: chat,
            },
          ],
        },
      ]);
      setInputTrigger(false);
      setFlagEnter(false);
      setTimeout(() => {
        setIsPending(false);
        setNext(true);
      }, 1000);
    }
    setBottom(true);
  }, [flagEnter]);

  useEffect(() => {
    if (gptTrigger) {
      setGptTrigger(false);
      setIsPending(true);
      // 3회기 버튼 + 인풋 동시 트리거일 경우 InputTrigger 제외
      if (inputTrigger) setInputTrigger(false);
      createGptText(generatorData);
    }
  }, [gptTrigger]);

  useEffect(() => {
    if (selectTrigger) {
      setMessageArr([...messageArr, generatorData]);
      setSelectTrigger(false);
    }
    setBottom(true);
  }, [selectTrigger]);

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
        <EllaMoodBox ref={chatBoxBody}>
          {/* <PTBoxHeader>성격 검사</PTBoxHeader> */}
          <EllaMoodBoxBody>
            {messageArr.map((el, index) => {
              if (el.type === 'fix')
                return <FixBubble fix_data={el} setNext={setNext} />;
              else if (el.type === 'select' || el.type === 'input&select')
                return (
                  <SelectBubble
                    select_data={el}
                    setChat={index === messageArr.length - 1 && setChat}
                    setNext={index === messageArr.length - 1 && setNext}
                  />
                );
              else return;
            })}
            {/* 로딩바 */}
            {isPending ? <LoadingAnimation /> : null}
          </EllaMoodBoxBody>
          <ChatBoxFooter>
            <ChatBoxFooterInput
              value={chat}
              onChange={(e) => {
                setChat(e.target.value);
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && chat !== '' && !isPending) {
                  setIsPending(true);
                  setFlagEnter(true);
                }
              }}
              // placeholder={placehold}
              inputTrigger={inputTrigger}
            />
            <ChatBoxFooterButton
              onClick={() => {
                if (chat !== '' && !isPending) {
                  setIsPending(true);
                  setFlagEnter(true);
                }
              }}
              inputTrigger={inputTrigger}
            >
              <Image
                src="/src/Consult_IMG/Icon/Consult_Send_Icon_IMG.png"
                alt={'send_icon'}
                width={72}
                height={57}
              />
            </ChatBoxFooterButton>
          </ChatBoxFooter>
        </EllaMoodBox>
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

const EllaMoodBox = styled.div`
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

const EllaMoodBoxBody = styled.div`
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

const ChatBoxFooter = styled.div`
  margin-top: 1rem;
  bottom: 0;
  display: flex;
  align-items: center;
  padding: 8px 16px;
`;

const ChatBoxFooterInput = styled.input`
  display: ${(props) => (props.inputTrigger ? 'flex' : 'none')};
  width: 100%;
  padding: 2rem;
  border: 1px solid #e6e6e6;
  border-radius: 3.5rem;
  font-size: 1.2rem;
  outline: none;
  pointer-events: ${(props) => (props.inputTrigger ? 'auto' : 'none')};
  background-color: ${(props) => (props.inputTrigger ? '#ffffff' : '#f0f0f0')};
  transition: background-color 0.3s ease;

  &::placeholder {
    color: #a9a9a9;
  }

  ${(props) => props.inputTrigger && `animation: blink 2s;`}

  @keyframes blink {
    0%,
    100% {
      background-color: #ffffff;
    }
    50% {
      background-color: #0084ff;
    }
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
    padding: 0.5rem 1rem;
  }
`;

const ChatBoxFooterButton = styled.button`
  display: ${(props) => (props.inputTrigger ? 'flex' : 'none')};
  background: inherit;
  margin-left: 8px;
  padding: 5px 12px;
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: ${(props) => (props.inputTrigger ? 'pointer' : null)};

  &:hover {
    opacity: 0.7;
  }

  &:active {
    background-color: ${(props) => (props.inputTrigger ? '#B88CD5' : null)};
  }
  transition: 0.2s;
`;
