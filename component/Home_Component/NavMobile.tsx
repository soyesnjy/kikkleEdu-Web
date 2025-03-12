/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

import { useRecoilState } from 'recoil';
import { log } from '@/store/state';

import NavDropDown from './NavDropDown';

type NavMobileComponentType = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void; // isOpen Setter
  navList_info: { title: string; items: { href: string; label: string }[] }[];
  menuItems: { href: string; label: string }[];
  logoutHandler: () => void; // Logout Handler
};

const NavMobile = ({
  isOpen,
  setIsOpen,
  navList_info,
  menuItems,
  logoutHandler,
}: NavMobileComponentType) => {
  const [login] = useRecoilState(log);
  const [startX, setStartX] = useState<number | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // 메뉴 외부 클릭 핸들러
  const handleClickOutside = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 터치 드래그
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      setStartX(e.touches[0].clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (startX === null) return;
      const touchX = e.touches[0].clientX;
      const diffX = touchX - startX;

      if (diffX > 50) {
        // 50px 이상 드래그했을 때 닫힘
        toggleMenu();
        setStartX(null);
      }
    };

    const handleTouchEnd = () => {
      setStartX(null);
    };

    const sideMenu = menuRef.current;
    if (sideMenu) {
      sideMenu.addEventListener('touchstart', handleTouchStart);
      sideMenu.addEventListener('touchmove', handleTouchMove);
      sideMenu.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      if (sideMenu) {
        sideMenu.removeEventListener('touchstart', handleTouchStart);
        sideMenu.removeEventListener('touchmove', handleTouchMove);
        sideMenu.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [isOpen, startX]);

  return (
    <NavMenuContainer ref={menuRef}>
      {/* Btn */}
      <NavMobileBtn onClick={toggleMenu}>
        <Image
          src="/src/Home_IMG/Nav_IMG/Home_Nav_Combine_3_IMG.png"
          alt={'soyes_logo'}
          width={16}
          height={14}
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </NavMobileBtn>
      {/* SideMenu Section */}
      <SideMenu isOpen={isOpen}>
        {/* Close Btn */}
        <CloseButton onClick={toggleMenu}>
          <CloseIcon />
        </CloseButton>
        <MenuList>
          {navList_info.map((el, index) => {
            return (
              <NavDropDown
                key={`${JSON.stringify(el)}_${index}`}
                toggleMenu={toggleMenu}
                navItem={el}
              />
            );
          })}
        </MenuList>
        {/* End Section */}
        {login ? (
          <NavEndContainer>
            {menuItems.map((item, index) => {
              const { href, label } = item;
              return (
                <Link
                  key={`NavMobile_${href}_${label}_${index}`}
                  href={href}
                  passHref
                >
                  <NavMobileButton onClick={toggleMenu}>
                    {label}
                  </NavMobileButton>
                </Link>
              );
            })}
            <NavMobileButton
              onClick={logoutHandler}
            >{`LOGOUT`}</NavMobileButton>
          </NavEndContainer>
        ) : (
          <NavEndContainer>
            <Link href="/login" passHref>
              <NavMobileButton onClick={toggleMenu}>{`LOGIN`}</NavMobileButton>
            </Link>
            <Link href="/signup" passHref>
              <NavMobileButton
                onClick={toggleMenu}
              >{`SIGN UP`}</NavMobileButton>
            </Link>
          </NavEndContainer>
        )}
      </SideMenu>
    </NavMenuContainer>
  );
};

type SideMenuType = {
  isOpen?: boolean;
};

type NavMobileBtnType = {
  login?: string;
};

const NavMenuContainer = styled.div`
  z-index: 3;
`;

const NavMobileBtn = styled.button<NavMobileBtnType>`
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

const SideMenu = styled.div<SideMenuType>`
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
  padding: 1.2rem;

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

export default NavMobile;
