import React, { useState } from 'react';
import styled from 'styled-components';
import EBTSelectRow from './EBTSelectRow';
import { motion } from 'framer-motion';
import Image from 'next/image';

const EBTestBubble = ({
  message,
  role,
  imgURL,
  setSelect,
  setNext,
  score,
  // selected,
}) => {
  const [selected, setSelected] = useState(-2);
  const selectHandler = (value) => {
    setSelect(value);
    setSelected(value);
    setNext(true);
  };

  return (
    <EBTestBubbleContainer>
      {role !== 'user' ? (
        <Image
          src="/src/Consult_IMG/Icon/Consult_Soyes_Icon_IMG.png"
          alt={'avartar_icon'}
          width={45}
          height={45}
        />
      ) : null}
      {imgURL ? (
        <ImgContanier message={message[0]}>
          {role !== 'user' ? <AvartarTitle>심리상담 소예</AvartarTitle> : null}
          <StyledBubble role={role}>
            {role === 'user' ? (
              <BubbleContainer role={role}>
                {message.map((el, index) => (
                  <EBTSelectRow
                    key={index}
                    selectHandler={setSelect && selectHandler}
                    value={score[index]}
                    index={index}
                    message={message[index]}
                    imgURL={imgURL[index]}
                    role={role}
                    selected={selected === score[index] ? true : false}
                  />
                ))}
              </BubbleContainer>
            ) : (
              <BubbleContainer role={role}>
                <EBTSelectRow message={message} imgURL={imgURL} role={role} />
              </BubbleContainer>
            )}
          </StyledBubble>
        </ImgContanier>
      ) : (
        <TextContanier>
          {role !== 'user' ? <AvartarTitle>심리상담 소예</AvartarTitle> : null}
          <StyledBubble role={role}>
            <MessageP>{message}</MessageP>
          </StyledBubble>
        </TextContanier>
      )}
    </EBTestBubbleContainer>
  );
};

// Styled Components

const EBTestBubbleContainer = styled.div`
  display: flex;
  justify-content: ${(props) => (props.role === 'user' ? 'right' : 'left')};
  gap: 0.3rem;

  @media (max-width: 768px) {
  }
`;

const StyledBubble = styled.div`
  max-width: 100%;
  padding: ${(props) => (props.role === 'assistant' ? '1rem' : '0')};
  border-radius: 1rem;
  margin: 0.2rem 0.1rem;
  word-wrap: break-word;

  color: ${(props) => (props.role === 'assistant' ? 'black' : 'black')};
  background-color: ${(props) => (props.role === 'assistant' ? 'white' : null)};
  align-self: ${(props) => (props.role === 'user' ? 'flex-end' : 'flex-start')};

  p {
    margin: 0;
  }

  border: ${(props) => (props.role === 'user' ? '0' : '3px solid #ececec')};
  text-align: left;
  margin-left: ${(props) => (props.role === 'user' ? 'auto' : null)};
  white-space: pre-wrap;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

// const StyledBubble = styled.div`
//   padding: 10px;
//   border-radius: 10px;
//   margin: 0.2rem 0.1rem;

//   word-wrap: break-word;
//   color: ${(props) => (props.role !== 'user' ? 'white' : 'black')};
//   background-color: ${(props) =>
//     props.role !== 'user' ? '#0b93f6' : '#e5e5ea'};
//   align-self: ${(props) => (props.role === 'user' ? 'flex-end' : 'flex-start')};
//   white-space: pre-wrap;

//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

const ImgContanier = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const AvartarTitle = styled.span`
  font-size: 1.2rem;
  margin-left: 0.2rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const BubbleContainer = styled.div`
  /* width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  gap: 0.5rem; */

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: ${(props) =>
    props.role === 'user' ? 'flex-end' : 'flex-start'};
  gap: 0.3rem;

  @media (max-width: 768px) {
  }
`;

const TextContanier = styled.div`
  width: 100%;
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

export default EBTestBubble;
