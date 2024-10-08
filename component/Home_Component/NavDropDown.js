import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Image from 'next/image';

// const dummyData = {
//   title: '소예키즈 소개',
//   items: [
//     { href: '/introduce', label: '회사연혁' },
//     { href: '/introduce/content', label: '소예키즈 콘텐츠' },
//     { href: '/introduce/patent', label: '특허 및 저작권' },
//     { href: '/introduce/partner', label: '파트너사' },
//     { href: '/introduce/map', label: '주소 및 약도' },
//   ],
// };

const NavDropDown = ({ toggleMenu, navItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  console.log(navItem);
  // const { title, items } = navItem;

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
              key={index}
              onClick={() => {
                // toggleDropDown();
                toggleMenu();
                router.push(href);
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

// Styled Components

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

const NavDropDownTitle = styled.div`
  text-align: left;
  color: ${(props) => (props.isOpen ? '#45B26B' : 'black')};

  font-size: 1.2rem;
  font-family: Pretendard;
  font-weight: 700;

  @media (max-width: 1080px) {
  }
`;

const NavDropDownLabel = styled.div`
  text-align: left;
  color: black;

  padding-left: 2rem;

  font-size: 1rem;
  font-family: Pretendard;
  font-weight: 700;

  @media (max-width: 1080px) {
  }
`;
