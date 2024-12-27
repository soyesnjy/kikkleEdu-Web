import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

import { useRouter } from 'next/router';
import { useState } from 'react';

type NavDropDownComponentType = {
  navItem: { title: string; items: { href: string; label: string }[] };
  toggleMenu: () => void;
};

const NavDropDown = ({ toggleMenu, navItem }: NavDropDownComponentType) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <NavDropDownContainer>
      <NavDropDownHeaderContainer onClick={() => toggleDropDown()}>
        <NavDropDownTitle isOpen={isOpen}>{navItem?.title}</NavDropDownTitle>
        <Image
          src="/src/Home_IMG/Nav_IMG/Home_Nav_Mobile_Icon_IMG.png"
          alt="Home_Nav_Mobile_Icon_IMG"
          width={5.5}
          height={5.5}
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </NavDropDownHeaderContainer>
      {isOpen &&
        navItem?.items.map((el, index) => {
          const { label, href } = el;
          return (
            <NavDropDownLabel
              key={`NavDropDownLabel_${href}_${label}_${index}`}
              selected={router.pathname === href}
              onClick={() => {
                // toggleDropDown();
                toggleMenu();
                router.replace(href);
              }}
            >
              {label}
            </NavDropDownLabel>
          );
        })}
    </NavDropDownContainer>
  );
};

export default NavDropDown;

type NavDropDownTitleType = {
  isOpen?: boolean;
};

type NavDropDownLabelType = {
  selected?: boolean;
};

const NavDropDownContainer = styled.div`
  width: 100%;
  height: auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  padding: 0.4rem;

  gap: 1rem;

  @media (max-width: 1080px) {
    margin: 0;
  }
`;

const NavDropDownHeaderContainer = styled.div`
  width: 100%;
  height: auto;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 1.4rem;

  @media (max-width: 1080px) {
    margin: 0;
  }
`;

const NavDropDownTitle = styled.div<NavDropDownTitleType>`
  text-align: left;
  color: ${(props) => (props.isOpen ? '#45B26B' : 'black')};

  font-size: 1.2rem;
  font-family: Pretendard;
  font-weight: 700;

  @media (max-width: 1080px) {
  }
`;

const NavDropDownLabel = styled.div<NavDropDownLabelType>`
  text-align: left;
  color: ${(props) => (props.selected ? '#45B26B' : 'black')};

  padding-left: 2rem;

  font-size: 1rem;
  font-family: Pretendard;
  font-weight: 700;

  @media (max-width: 1080px) {
  }
`;
