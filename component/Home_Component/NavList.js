/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';

export default function NavList({ title, items }) {
  const router = useRouter();
  const currentPath = router.pathname;
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();

  // 메뉴 외부 클릭 핸들러
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Resize 상태 처리

  return (
    <NavListContainer>
      <NavBtn onClick={() => setShowMenu(!showMenu)}>{title}</NavBtn>
      {items.length > 0 && showMenu && (
        <NavMenuContainer ref={menuRef}>
          {items.map((item) => (
            <NavLiMenu key={item.href}>
              <Link href={item.href} passHref>
                <NavBtn
                  selected={item.href === currentPath}
                  onClick={() => setShowMenu(false)}
                >
                  {item.label}
                </NavBtn>
              </Link>
            </NavLiMenu>
          ))}
        </NavMenuContainer>
      )}
    </NavListContainer>
  );
}

const NavListContainer = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  user-select: none;

  @media (max-width: 768px) {
    align-items: center;
  }
`;

const NavLiMenu = styled.li`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const NavMenuContainer = styled.div`
  position: absolute;
  top: 100%;
  background-color: white;

  border-radius: 20px;

  padding: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 0.4rem;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const NavBtn = styled.button`
  background-color: white;
  color: black;
  font-family: Pretendard;
  font-weight: 600;

  border: none;
  border-radius: 15px;

  padding: 0.3rem;

  text-align: center;
  text-decoration: none;

  display: inline-block;
  font-size: 1rem;

  white-space: nowrap;

  &:hover {
    color: #45b26b;
  }

  @media (max-width: 1150px) {
    font-size: 13px;
    margin: 2px;
    padding: 10px 15px;

    &:hover {
      ${(props) => (props.selected ? null : 'padding: 10px 15px;')}
      background-color: rgba(0, 42, 255, 0.5);
    }
  }

  @media (max-width: 768px) {
    font-size: 10px;
    margin: 2px;
    padding: 7px 10px;

    &:hover {
      ${(props) => (props.selected ? null : 'padding: 7px 10px;')}
      background-color: rgba(0, 42, 255, 0.5);
    }
  }

  cursor: pointer;

  transition: 0.3s;
`;
