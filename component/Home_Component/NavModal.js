/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
// import { useSession } from "next-auth/react";

const NavModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <NavMenuContainer>
      <NavMobileBtn onClick={toggleMenu}>
        <Image
          src="/src/Home_IMG/Nav_IMG/Home_Nav_Combine_3_IMG.png"
          alt={'soyes_logo'}
          width={16}
          height={14}
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </NavMobileBtn>

      <SideMenu isOpen={isOpen}>
        <CloseButton onClick={toggleMenu}>
          <CloseIcon />
        </CloseButton>
        <MenuList>
          <MenuItem>소예기즈 소개</MenuItem>
          <MenuItem>기업 및 기관</MenuItem>
          <MenuItem>강사</MenuItem>
          <MenuItem>교육 프로그램</MenuItem>
          <MenuItem>게시판</MenuItem>
        </MenuList>
        <LoginButton>LOGIN</LoginButton>
      </SideMenu>
    </NavMenuContainer>
  );
};

const NavMenuContainer = styled.div`
  z-index: 2;
`;

const NavMobileBtn = styled.button`
  background-color: ${(props) => (props.login ? '#45b26b' : 'white')};
  color: ${(props) => (props.login ? 'white' : '#45b26b')};
  font-family: Nunito;

  border: 1px solid #45b26b;
  border-radius: 10px;

  padding: 1.2rem;

  text-align: center;
  text-decoration: none;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;

  white-space: nowrap;

  cursor: pointer;

  transition: 0.3s;
`;
const SideMenuContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);

  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;

  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  flex-direction: column;
`;

const SideMenu = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 250px;
  height: 100%;
  background-color: white;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const CloseButton = styled.button`
  align-self: flex-end;
  background: none;
  border: none;
  cursor: pointer;
  margin-bottom: 20px;
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  flex-grow: 1;
`;

const MenuItem = styled.li`
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  &:hover {
    color: #0070f3;
  }
`;

const LoginButton = styled.button`
  padding: 10px 20px;
  border: 1px solid #0070f3;
  color: #0070f3;
  background-color: white;
  cursor: pointer;
  align-self: center;
  margin-top: auto;
  &:hover {
    background-color: #0070f3;
    color: white;
  }
`;

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

export default NavModal;
