import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

const EBTSelectRow = ({
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
          <Image
            src={imgURL}
            alt={'soyes_ebt_img'}
            width={20}
            height={20}
            style={{ maxWidth: '100%', height: 'auto' }}
          />
          <MessageP>{message}</MessageP>
        </CardContainer>
      ) : (
        <CardContainer
          onClick={selectHandler ? () => selectHandler(value) : null}
          type={type}
          role={role}
          selected={selected}
        >
          <MessageP>{message}</MessageP>
          <Image
            src={imgURL}
            alt={'soyes_ebt_img'}
            width={1000}
            height={800}
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </CardContainer>
      )}
    </>

    // <CardContainer
    //   onClick={selectHandler ? () => selectHandler(value) : null}
    //   type={type}
    //   role={role}
    //   selected={selected}
    // >
    //   <img
    //     width={role === 'assistant' ? '160px' : '16rem'}
    //     height={role === 'assistant' ? '180px' : '18rem'}
    //     src={imgURL}
    //   />
    //   <CardText>{message}</CardText>
    // </CardContainer>
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

// const CardContainer = styled.div`
//   display: flex;
//   flex-direction: ${(props) => (props.role === 'user' ? 'row' : 'column')};
//   justify-content: center;
//   align-items: center;

//   border: ${(props) => (props.role === 'user' ? '1px solid gray' : null)};
//   border-radius: 10px;
//   background-color: ${(props) =>
//     props.role === 'user' && props.selected ? 'yellow' : null};
//   font-weight: ${(props) =>
//     props.role === 'user' && props.selected ? 'bold' : null};

//   width: 100%;
//   height: 100%;
//   gap: 0.4rem;
//   padding: 10px;
//   cursor: pointer;
// `;

const CardText = styled.p`
  text-align: center;
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

export default EBTSelectRow;
