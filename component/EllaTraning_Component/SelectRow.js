import React from 'react';
import styled from 'styled-components';

const SelectRow = ({
  message,
  selectHandler,
  value,
  index,
  role,
  selected,
}) => {
  return (
    <CardContainer
      onClick={selectHandler ? () => selectHandler(value, index) : null}
      role={role}
      selected={selected}
    >
      <MessageP>{message}</MessageP>
    </CardContainer>
  );
};

// Styled Components

const CardContainer = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.role === 'user' ? 'row' : 'column')};
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.selected ? 'yellow' : props.role === 'user' ? '#B88CD5' : 'white'};

  color: ${(props) =>
    props.selected ? 'black' : props.role === 'user' ? 'white' : 'black'};

  border: ${(props) => (props.role === 'user' ? '3px solid #ececec' : null)};
  border-radius: 10px;

  width: ${(props) => (props.role === 'user' ? '100%' : '30rem')};
  height: 100%;

  gap: 0.5rem;
  padding: 0.5rem 1.5rem;
  cursor: ${(props) => (props.role === 'user' ? 'pointer' : '')};
  /* user-select: none; */

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    padding: ${(props) => (props.role === 'user' ? '0.5rem 1.5rem' : '0')};
  }
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

export default SelectRow;
