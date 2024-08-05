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

// TTS 함수. 브라우저 내장 객체라 따로 import 필요 없음
const handleSpeak = (text) => {
  const speech = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(speech);
};

// Test 페이지
export default function Test() {
  const [chat, setChat] = useState('안녕');
  const [flagEnter, setFlagEnter] = useState(true);
  const [emotion, setEmotion] = useState('중립');

  let currentSound = null;

  // const handleClovaVoice = async (text) => {
  //   const response = await axios.post(
  //     `/api/speech`,
  //     { text },
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );

  //   if (response.ok) {
  //     // console.log(response);
  //   }
  // };

  const handleClovaVoice = async (text) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/openAI/tts`,
      {
        speaker: 'nara',
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
  // 푸푸 API 호출
  const handleGptCompletion = async (input) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/openAI/consulting_emotion_pupu`,
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
      console.log('푸푸 API 호출 실패');
      console.error(err);
      return {
        message: 'Serverless Error',
        emotion: 0,
      };
    }
  };

  const sendMessage = async (chatBoxBody) => {
    const message = chat;
    messageArr.push({ role: 'user', content: message }); // 내가 쓴 메세지 저장

    // 채팅 내역 추가
    chatBoxBody.innerHTML += `<div class="message">${message}</div>`; // 내 채팅 내역 추가
    chatBoxBody.innerHTML += `<div id="loading" class="response loading">.</div>`; // 로딩창 추가
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
      const data = await handleGptCompletion({ messageArr, pUid: 'njy95' });

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

  const scrollToBottom = (chatBoxBody) => {
    chatBoxBody.scrollTop = chatBoxBody.scrollHeight;
  };

  useEffect(() => {
    if (!flagEnter) return; // 공백 Enter 체크

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

    sendMessage(chatBoxBody);
    setFlagEnter(false);
    setChat('');
  }, [flagEnter]);

  const start_ment = `Prompt Module Test`;

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
            <div class="response">{start_ment}</div>
          </div>

          <Live2DViewerTest emotion={emotion} />

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

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
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
