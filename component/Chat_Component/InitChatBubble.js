import React from 'react';
import styled from 'styled-components';
// import AudioPlayerButton from './AudioPlayerButton';
// import VideoModal from './VideoModal';
import Image from 'next/image';

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

const InitChatBubble = ({
  message,
  isMine,
  role,
  btn,
  setTestType,
  testType,
  setGameType,
  gameType,
  iconUrl,
  headerTitle,
  avarta,
}) => {
  return (
    <BubbleContainer role={role}>
      {!btn && role !== 'user' ? (
        <Image src={iconUrl} alt={'avartar_icon'} width={45} height={45} />
      ) : null}
      {btn ? (
        <InitContanier message={message}>
          <StyledBubble isMine={isMine} role={role} btn={btn}>
            <InitButton
              value={message}
              onClick={(e) => {
                if (avarta === 'lala' && !testType) setTestType(e.target.value);
                if (avarta === 'ubi' && !gameType) setGameType(e.target.value);
              }}
            >
              {ebtClassMapKorean[message]
                ? ebtClassMapKorean[message]
                : gameMapKorean[message]}
            </InitButton>
          </StyledBubble>
        </InitContanier>
      ) : (
        <InitContanier message={message}>
          {role !== 'user' ? <AvartarTitle>{headerTitle}</AvartarTitle> : null}
          <StyledBubble isMine={isMine} role={role}>
            <MessageP>{message}</MessageP>
          </StyledBubble>
        </InitContanier>
      )}
    </BubbleContainer>
  );
};
const BubbleContainer = styled.div`
  display: flex;
  justify-content: ${(props) => (props.role === 'user' ? 'right' : 'left')};
  gap: 0.3rem;
`;

// Styled Components
const StyledBubble = styled.div`
  max-width: 100%;
  padding: ${(props) => (props.btn ? '0px' : '10px')};
  border-radius: 10px;
  margin: 0.2rem 0.1rem;
  word-wrap: break-word;
  color: ${(props) => (props.role === 'assistant' ? 'black' : 'black')};
  background-color: ${(props) =>
    props.role === 'assistant' ? 'white' : '#e5e5ea'};
  align-self: ${(props) => (props.role === 'user' ? 'flex-end' : 'flex-start')};
  p {
    margin: 0;
  }

  border: ${(props) => (props.btn ? '0' : '3px solid #ececec')};

  text-align: left;
  margin-left: ${(props) => (props.role === 'user' ? 'auto' : null)};
  white-space: pre-wrap;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const InitContanier = styled.div`
  margin-top: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const MessageP = styled.p`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-family: AppleSDGothicNeoM00;

  font-size: 1.5rem;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const AvartarTitle = styled.span`
  font-size: 1.2rem;
  margin-left: 0.2rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const InitButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 15px;
  border: none;
  border-radius: 10px;
  background-color: #a374db;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #8a5bbf; /* hover 색상 변경 */
  }

  &:active {
    background-color: #096bb6; /* active 색상도 비슷하게 변경 */
  }
`;

export default InitChatBubble;
