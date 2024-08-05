import React from 'react';
import styled from 'styled-components';
import AudioPlayerButton from './AudioPlayerButton';
import VideoModal from './VideoModal';
import Image from 'next/image';

const ChatBubble = ({
  message,
  isMine,
  role,
  audioURL,
  media,
  iconUrl,
  headerTitle,
}) => {
  // console.log(media);
  return (
    <BubbleContainer role={role}>
      {role !== 'user' ? (
        <Image src={iconUrl} alt={'avartar_icon'} width={45} height={45} />
      ) : null}

      {audioURL ? (
        <AudioContanier message={message}>
          {role !== 'user' ? <AvartarTitle>{headerTitle}</AvartarTitle> : null}
          <StyledBubble isMine={isMine} role={role}>
            <MessageP>
              {message}
              {audioURL ? <AudioPlayerButton src={audioURL} /> : null}
            </MessageP>
          </StyledBubble>
          {media ? (
            <div>
              <MediaButton onClick={media.openModal}>
                {media.videoInfo.type === 'candle' ? '촛불 명상' : '호흡 명상'}
              </MediaButton>
              <VideoModal
                isOpen={media.modalIsOpen}
                onRequestClose={media.closeModal}
                videoId={media.videoInfo.url}
              />
            </div>
          ) : null}
        </AudioContanier>
      ) : (
        <TextContanier>
          {role !== 'user' ? <AvartarTitle>{headerTitle}</AvartarTitle> : null}
          <StyledBubble isMine={isMine} role={role}>
            <MessageP>{message}</MessageP>
          </StyledBubble>
        </TextContanier>
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
  padding: 1rem;
  border-radius: 1rem;
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
  flex-direction: column;
  align-items: center;
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

const AudioContanier = styled.div`
  display: flex;
  flex-direction: column;
  /* ${(props) => (props.message.length < 30 ? 'row' : 'column')}; */
  justify-content: center;
  /* ${(props) => (props.message.length < 30 ? 'flex-start' : 'center')}; */
  align-items: flex-start;
  /* ${(props) => (props.message.length < 30 ? 'center' : 'flex-start')}; */
`;

const MediaButton = styled.button`
  font-size: 1rem;
  max-width: 100%;
  padding: 10px;
  border: 1px solid gray;
  border-radius: 10px;
  margin: 0.2rem 0.1rem;
  color: white;
  background-color: #a374db;
  cursor: pointer;
`;

const TextContanier = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

export default ChatBubble;
