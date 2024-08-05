/* eslint-disable react-hooks/exhaustive-deps */
import styled, { keyframes } from 'styled-components';
import { FlexContainer } from '../styled-component/common';
import Live2DViewerTest from '@/component/Live2D_Component/Live2DViewerTest';
import { useEffect, useState } from 'react';
import { Howl } from 'howler';
import axios from 'axios';

const messageArr = [];

// 감정 분석 API 호출 함수
async function emotionAPI(messageArr) {
  // 로딩 중 애니메이션
  window.dotsGoingUp = true;
  var dots = window.setInterval(() => {
    var wait = document.getElementById('loading');
    if (wait === null) return;
    else if (window.dotsGoingUp) wait.innerHTML += '.';
    else {
      wait.innerHTML = wait.innerHTML?.substring(1, wait.innerHTML.length);
      if (wait.innerHTML.length < 2) window.dotsGoingUp = true;
    }
    if (wait.innerHTML.length > 3) window.dotsGoingUp = false;
  }, 250);

  // 감정 분석 API 호출
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/openAI/emotion`,
      {
        method: 'POST',
        headers: {
          accept: 'application.json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messageArr }),
      }
    )
      .then((res) => res.json())
      .then((data) => data);
    return result.message + parseInt(Math.random() * 10);
  } catch (err) {
    console.error(err);
    return '부정' + parseInt(Math.random() * 10);
  }
}
// Clova Voice API 호출 함수
const handleClovaVoice = async (text) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/openAI/tts`,
    {
      speaker: 'nyejin',
      volume: '0',
      speed: '0',
      pitch: '0',
      text,
      format: 'mp3',
    },
    { responseType: 'arraybuffer' }
  );

  // console.log(response.data);
  const audioBlob = new Blob([response.data], { type: 'audio/mp3' });
  const audioUrl = URL.createObjectURL(audioBlob);
  // const audio = new Audio(audioUrl);
  // console.log(audioUrl);
  return audioUrl;
};
// 아바타 API 호출 함수
const handleGptCompletion = async (input, path) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}${path}`,
      { EBTData: input },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    // console.log(response);
    return response.data;
  } catch (err) {
    console.log('소예 API 호출 실패');
    console.error(err);
    return {
      message: 'Serverless Error',
      emotion: 0,
    };
  }
};

// Test 페이지
export default function Test() {
  const [chat, setChat] = useState('');
  const [flagEnter, setFlagEnter] = useState(false);
  const [emotion, setEmotion] = useState('중립');
  const [noReqCnt, setNoReqCnt] = useState(0);

  let currentSound = null; // Sound 제어 변수
  const avartaPath = '/openAI/consulting_emotion_soyes'; // 소예 API Path

  const sendMessage = async (chatBoxBody) => {
    const message = chat;
    messageArr.push({ role: 'user', content: message }); // 내가 쓴 메세지 전역 배열에 저장

    // 채팅 내역 추가
    chatBoxBody.innerHTML += `<div class="message">${message}</div>`; // 내가 쓴 채팅 내역 추가
    chatBoxBody.innerHTML += `<div id="loading" class="response loading">.</div>`; // 로딩창 추가 (추후 삭제)
    scrollToBottom(chatBoxBody);

    // 감정 분석 API 호출 이후 state 갱신
    const res = await emotionAPI([{ role: 'user', content: message }]);
    setEmotion(res);

    // 로딩 중 애니메이션
    window.dotsGoingUp = true;
    var dots = window.setInterval(() => {
      var wait = document.getElementById('loading');
      if (wait === null) return;
      else if (window.dotsGoingUp) wait.innerHTML += '.';
      else {
        wait.innerHTML = wait.innerHTML?.substring(1, wait.innerHTML.length);

        if (wait.innerHTML.length < 2) window.dotsGoingUp = true;
      }
      if (wait.innerHTML.length > 3) window.dotsGoingUp = false;
    }, 250);

    // Chat Compleation Request
    try {
      const data = await handleGptCompletion(
        { messageArr, pUid: 'njy96' },
        avartaPath
      );

      // Audio URL 생성
      const audioURL = await handleClovaVoice(data.message);

      // handleSpeak(data.message); // TTS 음성
      messageArr.push({ role: 'assistant', content: data.message }); // 상담사 응답 메세지 저장
      document.getElementById('loading').remove(); // 로딩창 제거

      // 응답 채팅 생성
      const response = document.createElement('div');
      response.className = 'response';
      response.textContent = data.message;

      // 사운드 버튼 생성
      const sound_button = document.createElement('button');
      sound_button.className = 'sound';
      sound_button.textContent = 'Play';
      sound_button.setAttribute('data-audio-url', audioURL); // 상위 이벤트 식별 속성

      // 응답 채팅에 사운드 버튼 할당
      response.appendChild(sound_button);

      chatBoxBody.appendChild(response); // AI 답변 채팅 추가
      //chatBoxBody.innerHTML += `<div class="response">${data.message}</div>`; // AI 답변 채팅 추가
      scrollToBottom(chatBoxBody);
    } catch (error) {
      console.log(error);
      document.getElementById('loading').remove();
      chatBoxBody.innerHTML += `<div class="response">미안해 지금은 대화가 힘들어...조금 뒤에 다시 말해줄래?</div>`;
    }
  };

  // NO REQUEST 메서드
  const sendMessage_noRequest = async (chatBoxBody) => {
    messageArr.push({ role: 'user', content: 'NO REQUEST' }); // NO REQUEST 질문 임시 삽입
    chatBoxBody.innerHTML += `<div id="loading" class="response loading">.</div>`; // 로딩창 추가
    scrollToBottom(chatBoxBody);

    // 로딩 중 애니메이션
    window.dotsGoingUp = true;
    var dots = window.setInterval(() => {
      var wait = document.getElementById('loading');
      if (wait === null) return;
      else if (window.dotsGoingUp) wait.innerHTML += '.';
      else {
        wait.innerHTML = wait.innerHTML?.substring(1, wait.innerHTML.length);

        if (wait.innerHTML.length < 2) window.dotsGoingUp = true;
      }
      if (wait.innerHTML.length > 3) window.dotsGoingUp = false;
    }, 250);

    try {
      const data = await handleGptCompletion(
        { messageArr, pUid: 'njy96' },
        avartaPath
      );

      // Audio URL 생성
      const audioURL = await handleClovaVoice(data.message);

      messageArr.pop(); // NO REQUEST 질문 삭제
      messageArr.push({ role: 'assistant', content: data.message }); // 상담사 응답 메세지 저장
      document.getElementById('loading').remove(); // 로딩창 제거

      // 응답 채팅 생성
      const response = document.createElement('div');
      response.className = 'response';
      response.textContent = data.message;

      // 사운드 버튼 생성
      const sound_button = document.createElement('button');
      sound_button.className = 'sound';
      sound_button.textContent = 'Play';
      sound_button.setAttribute('data-audio-url', audioURL); // 상위 이벤트 식별 속성

      // 응답 채팅에 사운드 버튼 할당
      response.appendChild(sound_button);

      chatBoxBody.appendChild(response); // AI 답변 채팅 추가
      //chatBoxBody.innerHTML += `<div class="response">${data.message}</div>`; // AI 답변 채팅 추가
      scrollToBottom(chatBoxBody);
    } catch (error) {
      console.log(error);
      document.getElementById('loading').remove();
      chatBoxBody.innerHTML += `<div class="response">미안해 지금은 대화가 힘들어...조금 뒤에 다시 말해줄래?</div>`;
    }
  };

  const scrollToBottom = (chatBoxBody) => {
    chatBoxBody.scrollTop = chatBoxBody.scrollHeight;
  };

  // Sound 재생 이벤트 등록
  useEffect(() => {
    const chatBox = document.querySelector('.chat-box');
    const chatBoxBody = chatBox.querySelector('.chat-box-body');

    // 사운드 재생 이벤트 추가
    chatBoxBody.addEventListener('click', function (e) {
      // 클릭된 요소가 'Play' 버튼인지 확인
      if (e.target && e.target.classList.contains('sound')) {
        // 'Play' 버튼에 저장된 오디오 URL을 가져옵니다.

        const audioURL = e.target.getAttribute('data-audio-url');
        // 이전 오디오가 재생 중이라면 중지합니다.
        if (currentSound) {
          currentSound.stop();
        }

        // 새로운 오디오를 생성하고 재생합니다.
        currentSound = new Howl({
          src: [audioURL],
          html5: true,
        });
        currentSound.play();
      }
    });
    return () => {
      messageArr.length = 0;
      currentSound = null;
    };
  }, []);

  // NoReq 관련 처리
  // useEffect(() => {
  //   if (noReqCnt < 5) {
  //     const timer = setTimeout(() => {
  //       const chatBox = document.querySelector(".chat-box");
  //       const chatBoxBody = chatBox.querySelector(".chat-box-body");
  //       sendMessage_noRequest(chatBoxBody);
  //       setNoReqCnt(noReqCnt + 1);
  //     }, 15000);

  //     return () => {
  //       clearTimeout(timer);
  //     };
  //   }
  // }, [chat, noReqCnt]);

  // Chat 관련 처리
  useEffect(() => {
    if (!flagEnter) return; // 공백 Enter 체크

    const chatBox = document.querySelector('.chat-box');
    const chatBoxBody = chatBox.querySelector('.chat-box-body');

    sendMessage(chatBoxBody);
    setFlagEnter(false);
    setChat('');
  }, [flagEnter]);

  const start_ment = `Persona: 소예 (아동 전문 심리 상담사)`;
  const start_ment2 = `정서행동검사 - 11분야 모두 진행`;
  const start_ment3 = `삽입 프롬프트: 소예 페르소나 + 아동 정보 + 정서행동 결과 11종`;
  const start_ment4 = `감지 텍스트(분석): "학교생활",
  "친구관계",
  "가족관계",
  "전반적기분",
  "불안",
  "우울",
  "신체증상",
  "주의집중",
  "과잉행동",
  "분노",
  "자기인식"`;
  const start_ment5 = `분석 세션: 정서검사 11가지 분야 중 키워드에 감지된 검사 결과를 분석합니다 (세션당 1회만 진행)`;

  return (
    <MainContainer>
      <FlexContainer
        justify="center"
        align="center"
        dir="col"
        width="100vw"
        height="100%"
      >
        <div class="logo-container">
          <img src="src/soyesKids_Logo.png" alt="soyes_logo" />
        </div>
        <div class="chat-box">
          <div class="chat-box-header">SOYES KIDS</div>
          <div class="chat-box-body">
            <div class="ment">{start_ment}</div>
            <div class="ment">{start_ment2}</div>
            <div class="ment">{start_ment3}</div>
            <div class="ment">{start_ment4}</div>
            <div class="ment">{start_ment5}</div>
          </div>

          <Live2DViewerTest emotion={emotion} avarta="soyes" />

          <div class="chat-box-footer">
            <input
              value={chat}
              onChange={(e) => {
                setChat(e.target.value);
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && chat !== '') setFlagEnter(true);
              }}
              type="text"
              placeholder="Ask a question..."
            />
            <button
              onClick={() => {
                if (chat !== '') setFlagEnter(true);
              }}
            >
              Send
            </button>
          </div>
        </div>
        <div class="codingnexus">
          <a>Created by SoyesKids</a>
        </div>
      </FlexContainer>
    </MainContainer>
  );
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
  background-image: url('/src/soyesKids_Background_image.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  width: 100vw;
  height: 100vh;

  @media (max-width: 768px) {
    overflow: hidden;
  }
`;

const MyPageSpan = styled.span`
  font-size: 3rem;
  font-weight: bold;
  color: white;
  // 애니메이션 인스턴스는 문자열 리터럴과 동일하게 $ + {} 사용
  animation: ${FadeInSpan} 0.6s linear alternate;

  transition: 0.5s;
`;

const Live2DContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 36%;
`;
