/* eslint-disable react-hooks/exhaustive-deps */
import styled, { keyframes } from 'styled-components';
import { FlexContainer } from '../styled-component/common';
import Live2DViewerTest from '@/component/Live2D_Component/Live2DViewerTest';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import {
  emotionAPI,
  handleClovaVoice,
  handleGptCompletion,
  handleClearCookies,
  handleConsultLogSave,
  handleEbtResult,
} from '@/fetchAPI';
import ChatBubble from '@/component/Chat_Component/ChatBubble';
import InitChatBubble from '@/component/Chat_Component/InitChatBubble';
import LoadingAnimation from '@/component/Chat_Component/LoadingAnimation';
// 아바타 관련 전역 변수
import { useRecoilState } from 'recoil';
import { log, avarta, mobile } from '../store/state';
// import CharacterSelector from '@/component/Chat_Component/CharacterSelector';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// import VideoModal from "@/component/Chat_Component/VideoModal";

const avartaAI_info = {
  pupu: {
    name: 'pupu',
    path: '/openAI/consulting_emotion_pupu',
    headerTitle: '공감친구 푸푸',
    placehold: '나는 공감친구 푸푸야. 같이 놀자!',
    iconUrl: '/src/Consult_IMG/Icon/Consult_Pupu_Icon_IMG.png',
    backgroundImgUrl:
      '/src/Consult_IMG/Background/Consult_Pupu_Background_IMG.png',
    backColor: '#FEFFF6',
  },
  ubi: {
    name: 'ubi',
    path: '/openAI/consulting_emotion_ubi',
    headerTitle: '게임친구 우비',
    placehold: '나는 게임친구 우비야. 같이 놀자!',
    iconUrl: '/src/Consult_IMG/Icon/Consult_Ubi_Icon_IMG.png',
    backgroundImgUrl:
      '/src/Consult_IMG/Background/Consult_Ubi_Background_IMG.png',
    backColor: '#F6FFF9',
  },
  lala: {
    name: 'lala',
    path: '/openAI/consulting_emotion_lala',
    headerTitle: '정서멘토 엘라',
    placehold: '나는 정서멘토 엘라야. 우리 얘기하자!',
    iconUrl: '/src/Consult_IMG/Icon/Consult_Ella_Icon_IMG.png',
    backgroundImgUrl:
      '/src/Consult_IMG/Background/Consult_Ella_Background_IMG.png',
    backColor: '#FFF6F9',
  },
  soyes: {
    name: 'soyes',
    path: '/openAI/consulting_emotion_soyes',
    headerTitle: '심리상담 소예',
    placehold: '나는 소예라고해!. 네 고민을 말해줘!',
    iconUrl: '/src/Consult_IMG/Icon/Consult_Soyes_Icon_IMG.png',
    backgroundImgUrl:
      '/src/Consult_IMG/Background/Consult_Soyes_Background_IMG.png',
    backColor: '#FDF6FF',
  },
  // 북극이는 임시로 소예로 보내기
  north: {
    name: 'soyes',
    path: '/openAI/consulting_emotion_soyes',
    headerTitle: '심리상담 소예',
    placehold: '나는 소예라고해!. 네 고민을 말해줘!',
    iconUrl: '/src/Consult_IMG/Icon/Consult_Soyes_Icon_IMG.png',
    backgroundImgUrl:
      '/src/Consult_IMG/Background/Consult_Soyes_Background_IMG.png',
    backColor: '#FDF6FF',
  },
  default: {
    name: 'lala',
    path: '/openAI/consulting_emotion_lala',
    headerTitle: '정서멘토 엘라',
    placehold: '나는 정서멘토 엘라야. 우리 얘기하자!',
    iconUrl: '/src/Consult_IMG/Icon/Consult_Ella_Icon_IMG.png',
    backgroundImgUrl:
      '/src/Consult_IMG/Background/Consult_Ella_Background_IMG.png',
    backColor: '#FFF6F9',
  },
};
const unMount_api_info = {
  consultLog: {
    path: '/openAI/consulting_emotion_log',
  },
  clearCookie: {
    path: '/openAI/clear_cookies',
  },
};
const mediVideo = {
  candle: { type: 'candle', url: 'nKCY3qz30N8' },
  breath: { type: 'breath', url: 'tNao3xp5yjM' },
};
const ebtClassMap = {
  School: 'School',
  Friend: 'Friend',
  Family: 'Family',
  Mood: 'Mood',
  Unrest: 'Mood',
  Sad: 'Mood',
  Health: 'Health',
  Attention: 'School',
  Movement: 'Friend',
  Angry: 'Mood',
  Self: 'Self',
};
const ebtClassMapKorean = {
  School: '학업/성적',
  Friend: '대인관계',
  Family: '가족관계',
  Mood: '기분',
  Health: '신체증상',
  Self: '자기이해',
};
const gameMapKorean = {
  remarks: '끝말잇기',
  game2: '게임2',
  game3: '게임3',
};

// Renewel Test 페이지
export default function Test() {
  const [chat, setChat] = useState('');
  const [flagEnter, setFlagEnter] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isInitPending, setIsInitPending] = useState(true);
  const [emotion, setEmotion] = useState('중립');
  const [messageArr, setMessageArr] = useState([]);
  const [initArr, setInitArr] = useState([]); //
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [testType, setTestType] = useState(''); // 상담 주제 6종
  const [gameType, setGameType] = useState(''); // 게임 3종

  // 전역 변수
  const [login, setLogin] = useRecoilState(log);
  const [avartaAI, setAvartaAI] = useRecoilState(avarta);
  const [mobileFlag, setMobileFlag] = useRecoilState(mobile);
  // chatBoxRef
  const chatBoxRef = useRef(null); // Reference for the chat container

  const { name, path, headerTitle, placehold } = avartaAI_info[avartaAI];

  const router = useRouter();

  // 언마운트 시점에 사용할 messageArr 변수값 유지
  const latestMessageArr = useRef(messageArr);
  latestMessageArr.current = messageArr;

  const sendMessage = async () => {
    const message = chat;
    try {
      messageArr.push({ role: 'user', content: message }); // 내 채팅 추가.
      setIsPending(true); // 로딩 on
      // 감정 분석 API 호출 이후 state 갱신 (임시로 막아둠)
      const res = '긍정';
      // const res = await emotionAPI([{ role: 'user', content: message }]);
      setEmotion(res);

      // Chat Compleation Request

      // messageArr 깊은 복사 후 audioURL, media 속성 삭제
      const tmpMsgArr = [
        ...JSON.parse(JSON.stringify(initArr)),
        ...JSON.parse(JSON.stringify(messageArr)),
      ];
      tmpMsgArr.forEach((el) => {
        delete el.audioURL;
        delete el.media;
        delete el.btn;
      });

      const data = await handleGptCompletion(
        {
          messageArr: tmpMsgArr,
          pUid: localStorage.getItem('id'),
          type: testType,
          game: gameType,
        },
        path
      );

      // 로그인 권한 만료
      if (data.status === 401) {
        Swal.fire({
          icon: 'warning',
          title: 'Login Session Expired!',
          text: 'Login Page로 이동합니다',
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          setLogin(false);
          localStorage.removeItem('log');
          localStorage.removeItem('id');
          localStorage.removeItem('avarta');
          router.push('/login');
        });
        return;
      }
      // Audio URL 생성 (임시로 막아둠)
      const audioURL = '';
      // const audioURL = await handleClovaVoice(data.message);
      const media = data.message.match(/추천/) !== null; // main
      // const media = messageArr.length; // test
      const candle = data.message.match(/촛불/) !== null;
      const breath = data.message.match(/호흡/) !== null;

      setIsPending(false); // 로딩 off
      setMessageArr([
        ...messageArr,
        {
          role: 'assistant',
          content: data.message,
          audioURL,
          media: media
            ? candle
              ? mediVideo['candle']
              : mediVideo['breath']
            : null,
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  const scrollToBottom = () => {
    const chatBoxBody = chatBoxRef.current;
    if (chatBoxBody.scrollHeight > 900)
      window.scrollTo({
        top: chatBoxBody.scrollHeight, // 세로 스크롤 위치
        left: 0, // 가로 스크롤 위치
        behavior: 'smooth', // 스크롤 애니메이션 (옵션: 'auto' 또는 'smooth')
      });
  };
  // 엘라 시작 멘트 관련 메서드
  const initElla = async () => {
    // 유저 EBT 결과 조회 (11종)
    const data = await handleEbtResult(
      {
        pUid: `${localStorage.getItem('id')}`,
      },
      '/openAI/ebtresult'
    );

    const { message } = data;

    // 정서행동 검사를 1개라도 실시하지 않은 경우
    if (!message[0].testStatus) {
      setInitArr([
        {
          role: 'assistant',
          content:
            '안녕? 아직 정서행동검사를 모두 실시하지 않았구나? 상담 전에 검사하고 와줄래?',
        },
      ]);
    }
    // 정서행동 검사를 모두 실시한 경우
    else {
      const ment = {
        role: 'assistant',
        content: '안녕? 너의 심리검사 결과를 봤어. 아래의 상담 주제를 추천해',
      };

      const selectBtnArr = message
        .map((el) => {
          return {
            role: 'assistant',
            content: `${ebtClassMap[el.ebt_class]}`,
            btn: true,
          };
        })
        .filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.content === item.content)
        )
        .filter((item, index) => index <= 2);

      setInitArr([ment, ...selectBtnArr]);
    }
  };

  // 우비 시작 멘트 관련 메서드
  const initUbi = async () => {
    const ment = {
      role: 'assistant',
      content: '안녕? 같이 게임하자! 어떤 게임을 하고싶어?',
    };

    const selectBtnArr = ['remarks'].map((el) => {
      return {
        role: 'assistant',
        content: `${el}`,
        btn: true,
      };
    });

    setInitArr([ment, ...selectBtnArr]);
  };

  // 상담 페이지 초기 설정
  useEffect(() => {
    // 상담 화면에 처음 진입한 경우: 엘라 상담 화면으로 재설정
    if (!localStorage.getItem('avarta') && avartaAI === 'default') {
      localStorage.setItem('avarta', 'lala');
      setAvartaAI('lala');
    }
    return () => {
      // 로그인 세션이 존재할 경우 - 상담 내역 저장
      const loginSession = JSON.parse(localStorage.getItem('log'));
      if (loginSession) {
        // audioURL 제거
        const tmpMsgArr = [
          ...JSON.parse(JSON.stringify(latestMessageArr.current)),
        ];
        tmpMsgArr.forEach((el) => delete el.audioURL);
        // 상담 내역 저장 API 호출
        handleConsultLogSave(
          {
            messageArr: tmpMsgArr,
            avarta: name,
            pUid: localStorage.getItem('id'),
          },
          unMount_api_info.consultLog.path
        );
      }

      // setAvartaAI('default');
      // localStorage.removeItem('avarta');

      // Cookies Clear (session ID 초기화)
      // handleClearCookies(unMount_api_info.clearCookie.path);

      // 상담 내역 초기화 => 언마운트 시점에 자동으로 진행되기에 주석처리
      // setMessageArr([]);
      // messageArr.length = 0;
    };
  }, []);

  // 로그인 권한이 없는 상태에서의 접근 시 login 페이지로 redirect
  useEffect(() => {
    const loginSession = JSON.parse(localStorage.getItem('log'));
    if (!loginSession) {
      router.replace('/login');
    }
  }, [login]);

  // avartaAI 관련 처리
  useEffect(() => {
    if (avartaAI === 'default') return;
    // 엘라일 경우
    else if (avartaAI === 'lala') {
      setIsInitPending(true); // 채팅창 비활성화
      setTestType(''); // 상담 주제 초기화
      // 1초 뒤 init 메서드 호출
      setTimeout(() => {
        initUbi();
      }, 1000);
    }
    // 우비일 경우
    else if (avartaAI === 'ubi') {
      setIsInitPending(true); // 채팅창 비활성화
      setGameType(''); // 게임 주제 초기화
      // 1초 뒤 init 메서드 호출
      setTimeout(() => {
        initUbi();
      }, 1000);
    }
    // 그 외
    else {
      const initment = {
        role: 'assistant',
        content: avartaAI_info[avartaAI].placehold,
      };
      setTimeout(() => {
        setInitArr([initment]);
      }, 500);
      setIsInitPending(false);
    }

    setMessageArr([]);
    setInitArr([]);
  }, [avartaAI]);

  useEffect(() => {
    // 엘라 상담 중, 주제가 선정되었을 경우
    if (testType && avartaAI === 'pupu') {
      const init_ending_ment = {
        role: 'assistant',
        content: `${ebtClassMapKorean[testType]} 관련 상담을 진행할게! 반가워 나는 푸푸야!`,
      };

      setInitArr([...initArr, init_ending_ment]);
      setIsInitPending(false);
    }
  }, [testType]);

  useEffect(() => {
    // 우비 상담 중, 게임이 선택됐을 경우
    if (gameType && avartaAI === 'ubi') {
      const init_ending_ment = {
        role: 'assistant',
        content: `${gameMapKorean[gameType]}! 재밌겠다!! 너부터 시작해!`,
      };

      setInitArr([...initArr, init_ending_ment]);
      setIsInitPending(false);
    }
  }, [gameType]);

  // Chat 관련 처리
  useEffect(() => {
    if (!flagEnter) return; // 공백 Enter 체크

    sendMessage();
    setFlagEnter(false);
    setChat('');
  }, [flagEnter]);

  // 스크롤 바텀 효과. 채팅 시 발동
  // useEffect(() => {
  //   const chatBoxBody = document.querySelector('.chat-box-body');
  //   chatBoxBody.scrollTop = chatBoxBody.scrollHeight;
  // }, [isPending, isInitPending]);

  useEffect(() => {
    scrollToBottom();
  }, [isPending]);

  return (
    <MainContainer
      className="main-container"
      backColor={avartaAI_info[avartaAI].backColor}
    >
      <FlexContainer
        className="flex-container"
        justify="center"
        align="center"
        dir="col"
        width="100vw"
        height="100%"
        padding={mobileFlag ? '0' : '0 1rem'}
      >
        {/* <Image
          src="/src/soyesKids_Logo.png"
          alt={'soyes_logo'}
          width={529}
          height={93}
          style={{ maxWidth: '100%', height: 'auto' }}
        /> */}

        <ChatBox
          className="chat-box"
          ref={chatBoxRef}
          backgroundImgUrl={avartaAI_info[avartaAI].backgroundImgUrl}
        >
          {/* <CharacterSelector isPending={isPending} /> */}
          {/* <ChatBoxHeader>{headerTitle}</ChatBoxHeader> */}
          <ChatBoxBody className="chat-box-body">
            {/* <ChatBubble message={headerTitle} role="assistant" /> */}
            {initArr.map((el, index) => (
              <InitChatBubble
                key={index}
                message={el.content}
                role={el.role}
                iconUrl={avartaAI_info[avartaAI].iconUrl}
                headerTitle={avartaAI_info[avartaAI].headerTitle}
                btn={el.btn}
                testType={testType}
                setTestType={setTestType}
                gameType={gameType}
                setGameType={setGameType}
                avarta={avartaAI}
              />
            ))}
            {messageArr.map((el, index) => (
              <ChatBubble
                key={index}
                message={el.content}
                role={el.role}
                iconUrl={avartaAI_info[avartaAI].iconUrl}
                headerTitle={avartaAI_info[avartaAI].headerTitle}
                audioURL={el.audioURL}
                media={
                  el.media
                    ? {
                        videoInfo: el.media,
                        modalIsOpen,
                        closeModal: () => {
                          setModalIsOpen(false);
                        },
                        openModal: () => {
                          setModalIsOpen(true);
                        },
                      }
                    : null
                }
              />
            ))}
            {/* 로딩바 */}
            {isPending ? <LoadingAnimation /> : null}
          </ChatBoxBody>
          <ChatBoxFooter>
            <ChatBoxFooterInput
              value={chat}
              onChange={(e) => {
                setChat(e.target.value);
              }}
              onKeyPress={(e) => {
                if (
                  e.key === 'Enter' &&
                  chat !== '' &&
                  !isPending &&
                  !isInitPending
                )
                  setFlagEnter(true);
              }}
              // placeholder={placehold}
              isPending={isPending}
              isInitPending={isInitPending}
            />
            <ChatBoxFooterButton
              onClick={() => {
                if (chat !== '' && !isPending && !isInitPending)
                  setFlagEnter(true);
              }}
              isPending={isPending || isInitPending}
            >
              <Image
                src="/src/Consult_IMG/Icon/Consult_Send_Icon_IMG.png"
                alt={'send_icon'}
                width={72}
                height={57}
              />
              {/* {isPending || isInitPending ? (
                <span class="material-symbols-outlined">block</span>
              ) : (
                <Image
                  src="/src/Consult_IMG/Icon/Consult_Send_Icon_IMG.png"
                  alt={'send_icon'}
                  width={72}
                  height={57}
                />
              )} */}
            </ChatBoxFooterButton>
          </ChatBoxFooter>
        </ChatBox>

        <div class="codingnexus">
          <a>Created by SoyesKids</a>
        </div>

        {/* <div>
          <button onClick={openModal}>동영상 재생</button>
          <VideoModal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            videoId={videoId}
          />
        </div> */}
      </FlexContainer>
      <Live2DViewerContainer>
        <Live2DViewerTest emotion={emotion} avarta={name} />
      </Live2DViewerContainer>
    </MainContainer>
  );
}

// 다국어 지원 관련 getStaticProps 처리
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['consult', 'nav'])),
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

  background-color: ${(props) => props.backColor || '#fdf6ff'};
  width: 100vw;
  min-height: 100vh;
  height: 100%;

  position: relative;

  @media (max-width: 768px) {
    overflow: hidden;
  }
`;

const Live2DViewerContainer = styled.div`
  display: none; // 임시로 막아두기
  position: fixed;
  top: 25%;
  right: 15%;

  @media (max-width: 768px) {
    display: none;
  }
`;

const ChatBox = styled.div`
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

// const ChatBoxHeader = styled.div`
//   background-color: #0084ff;
//   color: #ffffff;
//   padding: 16px;
//   font-size: 20px;
//   font-weight: bold;
//   border-top-left-radius: 8px;
//   border-top-right-radius: 8px;
// `;

const ChatBoxBody = styled.div`
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
  width: 100%;
  padding: 2rem;
  border: 1px solid #e6e6e6;
  border-radius: 3.5rem;
  font-size: 1.2rem;
  outline: none;
  pointer-events: ${(props) =>
    props.isPending || props.isInitPending ? 'none' : 'auto'};
  background-color: ${(props) =>
    props.isPending || props.isInitPending ? '#f0f0f0' : '#ffffff'};
  transition: background-color 0.3s ease;

  &::placeholder {
    color: #a9a9a9;
  }

  ${(props) => props.isInitPending === false && `animation: blink 2s;`}

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
  background: inherit;
  margin-left: 8px;
  padding: 5px 12px;
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: ${(props) => (props.isPending ? '' : 'pointer')};

  &:hover {
    opacity: 0.7;
  }

  &:active {
    background-color: ${(props) => (props.isPending ? '#e5e5ea' : '#B88CD5')};
  }
  display: flex;
  transition: 0.2s;
`;
