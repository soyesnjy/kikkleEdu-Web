/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import NavDropDown from './NavDropDown';
// import { useSession } from "next-auth/react";

const NavModal = ({
  isOpen,
  toggleMenu,
  login,
  logoutHandler,
  navList_info,
  menuItems,
}) => {
  return (
    <NavMenuContainer>
      {/* 로고 */}
      <NavMobileBtn onClick={toggleMenu}>
        <Image
          src="/src/Home_IMG/Nav_IMG/Home_Nav_Combine_3_IMG.png"
          alt={'soyes_logo'}
          width={16}
          height={14}
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </NavMobileBtn>
      {/* Menu Section */}
      <SideMenu isOpen={isOpen}>
        {/* 닫기버튼 */}
        <CloseButton onClick={toggleMenu}>
          <CloseIcon />
        </CloseButton>
        <MenuList>
          {navList_info.map((el, index) => {
            return (
              <NavDropDown key={index} toggleMenu={toggleMenu} navItem={el} />
            );
          })}
        </MenuList>
        {/* End Section */}
        {login ? (
          <NavEndContainer>
            {/* <Link href="/mypage" passHref>
              <NavMobileButton onClick={toggleMenu}>MY PAGE</NavMobileButton>
            </Link> */}
            {menuItems.map((item, index) => (
              <Link key={index} href={item.href} passHref>
                <NavMobileButton onClick={toggleMenu}>
                  {item.label}
                </NavMobileButton>
              </Link>
            ))}
            <NavMobileButton onClick={logoutHandler}>LOGOUT</NavMobileButton>
          </NavEndContainer>
        ) : (
          <NavEndContainer>
            <Link href="/login" passHref>
              <NavMobileButton onClick={toggleMenu}>LOGIN</NavMobileButton>
            </Link>
            <Link href="/signup" passHref>
              <NavMobileButton onClick={toggleMenu}>SIGNUP</NavMobileButton>
            </Link>
          </NavEndContainer>
        )}
      </SideMenu>
    </NavMenuContainer>
  );
};

const NavMenuContainer = styled.div`
  z-index: 3;
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

const NavEndContainer = styled.div`
  padding: 1.2rem;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  white-space: nowrap;

  cursor: pointer;

  transition: 0.3s;
`;

const SideMenu = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 80%;
  height: 100%;
  background-color: white;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  padding: 20px;

  overflow-y: auto;
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

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  gap: 1rem;
`;

const NavMobileButton = styled.button`
  padding: 1rem 2rem;
  border: 1px solid #45b26b;
  border-radius: 8px;
  color: #45b26b;
  background-color: white;

  cursor: pointer;
  align-self: center;
  margin-top: auto;

  &:hover {
    background-color: #45b26b;
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
