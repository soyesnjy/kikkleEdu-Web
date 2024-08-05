import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

const PTSelectCard = ({
  message,
  imgURL,
  selectHandler,
  value,
  type,
  role,
  selected,
}) => {
  return (
    <>
      {role === 'user' ? (
        <CardContainer
          onClick={selectHandler ? () => selectHandler(value) : null}
          type={type}
          role={role}
          selected={selected}
        >
          <MessageP>{message}</MessageP>
        </CardContainer>
      ) : (
        <CardContainer
          onClick={selectHandler ? () => selectHandler(value) : null}
          type={type}
          role={role}
        >
          <MessageP>{message}</MessageP>
          <Image
            src={imgURL}
            alt={'soyes_pt_img'}
            width={1000}
            height={800}
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </CardContainer>
      )}
    </>
    // <Image
    //   src={imgURL}
    //   alt={'soyes_pt_img'}
    //   width={157}
    //   height={200}
    //   style={{ maxWidth: '100%', height: 'auto' }}
    // />
    // <CardText>{message}</CardText>
  );
};

// Styled Components
const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.selected ? 'yellow' : props.role === 'user' ? '#B88CD5' : 'white'};
  color: ${(props) =>
    props.selected ? 'black' : props.role === 'user' ? 'white' : 'black'};

  border: ${(props) => (props.role === 'user' ? '1px solid #A278BD' : null)};
  border-radius: 10px;

  width: ${(props) => (props.role === 'user' ? 'fit-content' : '30rem')};
  height: 100%;

  gap: 1rem;
  padding: 0.5rem 1.5rem;
  cursor: ${(props) => (props.role === 'user' ? 'pointer' : '')};
  /* user-select: none; */

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    padding: ${(props) => (props.role === 'user' ? '0.5rem 1.5rem' : '0')};
  }
`;

const CardText = styled.p`
  text-align: center;
  min-height: 3rem;

  @media (max-width: 768px) {
    min-height: 0;
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

export default PTSelectCard;
