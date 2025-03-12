import styled from 'styled-components';

import React from 'react';

const TeacherSearchBar = ({ teacherClass, setTeacherClass }) => {
  // TagButton Click Handler
  const tagButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setTeacherClass(e.currentTarget.value);
  };
  return (
    <SearchContainer>
      <TagButton
        selected={teacherClass === 'ballet'}
        value="ballet"
        onClick={tagButtonHandler}
      >
        {`발레`}
      </TagButton>
      <TagButton
        selected={teacherClass === 'dance'}
        value="dance"
        onClick={tagButtonHandler}
      >
        {`댄스`}
      </TagButton>
      <TagButton
        selected={teacherClass === 'yoga'}
        value="yoga"
        onClick={tagButtonHandler}
      >
        {`요가`}
      </TagButton>
      <TagButton
        selected={teacherClass === 'pila'}
        value="pila"
        onClick={tagButtonHandler}
      >
        {`필라테스`}
      </TagButton>
      <TagButton
        selected={teacherClass === 'art'}
        value="art"
        onClick={tagButtonHandler}
      >
        {`미술`}
      </TagButton>
    </SearchContainer>
  );
};

type TagButtonType = {
  selected?: boolean;
};

const SearchContainer = styled.section`
  width: 100%;
  border-radius: 24px;

  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.3rem;
  }
`;

const TagButton = styled.button<TagButtonType>`
  background-color: ${(props) =>
    props.selected ? '#378E56' : 'rgba(255, 255, 255, 0.01)'};
  border: 1px solid #378e56;
  border-radius: 24px;

  padding: 0.7rem 1.7rem;

  color: ${(props) => (props.selected ? 'white' : 'black')};
  text-align: center;
  text-decoration: none;

  font-size: 1rem;
  font-weight: 600;
  font-family: Pretendard;

  cursor: pointer;
  &:hover {
    background-color: #378e56;
    color: white;
  }
  transition: 0.2s;

  @media (max-width: 768px) {
    min-width: 90px;
    font-size: 1.1rem;
    padding: 0.9rem;
    margin-bottom: 0;
  }
`;

export default TeacherSearchBar;
