import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { avarta } from '../../store/state';
import { css } from 'styled-components';

// CharacterSelector 컴포넌트
const CharacterSelector = ({ isPending }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [avartaAI, setAvartaAI] = useRecoilState(avarta);

  const avartaArr = [
    { name: '푸푸', path: 'pupu' },
    { name: '우비', path: 'ubi' },
    { name: '엘라', path: 'lala' },
    { name: '소예', path: 'soyes' },
  ];
  const toggleMenu = () => setIsOpen(!isOpen);
  // 아바타 변경 핸들러
  const avartaChangeHandler = (e) => {
    if (isPending) {
      alert('지금은 바꿀 수 없어!');
      return;
    }
    setAvartaAI(e.target.value);
    localStorage.setItem('avarta', e.target.value);
    setIsOpen(!isOpen);
  };

  return (
    <CharacterSelectorContainer>
      <NavBtn onClick={toggleMenu}>Avarta</NavBtn>
      <ButtonsContainer>
        {avartaArr.map((character, index) => (
          <NavBtn
            value={character.path}
            key={character.name}
            hidden={!isOpen}
            style={{
              transitionDelay: `${isOpen ? index * 100 : (3 - index) * 100}ms`,
            }}
            onClick={avartaChangeHandler}
          >
            {character.name}
          </NavBtn>
        ))}
      </ButtonsContainer>
    </CharacterSelectorContainer>
  );
};

export default CharacterSelector;

import styled from 'styled-components';

const CharacterSelectorContainer = styled.div`
  position: absolute;
  top: 0.2rem;
  right: 0.2rem;
  @media (max-width: 768px) {
    top: 2rem;
    right: 37%;
  }

  z-index: 1;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NavBtn = styled.button`
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  color: white;
  border: none;
  border-radius: 15px;
  margin: 4px 2px;
  padding: 13px 23px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: rgba(0, 42, 255, 0.5);
  }

  ${(props) =>
    props.hidden &&
    css`
      visibility: hidden;
      opacity: 0;
      transform: translateY(-20px);
      transition:
        visibility 0s 0.5s,
        opacity 0.5s ease,
        transform 0.5s ease;
    `}
`;
