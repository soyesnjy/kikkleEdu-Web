import React, { useState } from 'react';
import styled from 'styled-components';
import SelectRow from './SelectRow';

const SelectBubble = ({ select_data, setChat, setNext }) => {
  const { role, select_content } = select_data;
  const [selected, setSelected] = useState(-1);

  const selectHandler = (value, index) => {
    if (selected === -1) {
      setChat(value);
      setSelected(index);
      setNext(true);
    }
  };

  return (
    <EBTestBubbleContainer>
      <ImgContanier>
        <StyledBubble role={role}>
          <BubbleContainer role={role}>
            {select_content.map((el, index) => {
              const { selection, value } = el;
              return (
                <SelectRow
                  key={index}
                  selectHandler={setChat && selectHandler}
                  value={value}
                  index={index}
                  message={selection}
                  role={role}
                  selected={selected === index}
                />
              );
            })}
          </BubbleContainer>
        </StyledBubble>
      </ImgContanier>
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

export default SelectBubble;
