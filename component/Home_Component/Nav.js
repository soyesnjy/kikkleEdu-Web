/* eslint-disable react-hooks/exhaustive-deps */
import styled, { keyframes } from 'styled-components';
import Link from 'next/link';
import NavList from './NavList';

import { useRecoilState } from 'recoil';
import { log, avarta, mobile, uid } from '../../store/state';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { logoutAPI } from '@/fetchAPI';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';

const navList_info = [
  {
    title: '소예키즈 소개',
    items: [
      { href: '/', label: '회사연혁' },
      { href: '/music', label: '소예키즈 콘텐츠' },
      { href: '/', label: '특허 및 저작권' },
      { href: '/', label: '파트너사' },
      { href: '/', label: '대표이사' },
      { href: '/', label: '주소 및 약도' },
    ],
  },
  {
    title: '기업 및 기관',
    items: [
      { href: '/', label: '유치원' },
      { href: '/', label: '초등학교' },
      { href: '/', label: '문화센터' },
      { href: '/', label: '아파트센터' },
      { href: '/', label: '기업' },
    ],
  },
  {
    title: '강사',
    items: [],
  },
  {
    title: '교육 프로그램',
    items: [
      { href: '/', label: '발레 교육' },
      { href: '/', label: '댄스 교육' },
      { href: '/', label: '요가 교육' },
      { href: '/', label: '필라테스 교육' },
      { href: '/', label: '마음챙김심리 교육' },
      { href: '/', label: '음악 교육' },
      { href: '/', label: '미술 교육' },
    ],
  },
  {
    title: '게시판',
    items: [
      { href: '/', label: '상점' },
      { href: '/', label: '문의하기' },
    ],
  },
];

export default function Nav() {
  const router = useRouter();
  const { t } = useTranslation('nav');
  const currentPath = router.pathname;
  const [login, setLogin] = useRecoilState(log);
  const [avartaAI, setAvartaAI] = useRecoilState(avarta);
  const [userId, setUserId] = useRecoilState(uid);
  const [showNavbar, setShowNavbar] = useState(false);
  // Resize 상태 처리
  const [mobileFlag, setMobileFlag] = useRecoilState(mobile);
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const loginSession = localStorage.getItem('log');
    // 로그인 세션 만료 처리
    if (loginSession) {
      const parsedSession = JSON.parse(loginSession);
      if (new Date(parsedSession.expires) > new Date()) {
        setLogin(true);
      } else {
        // 1시간 세션 만료 처리
        handleSessionExpired();
      }
    }
    // 아바타 확인
    const avarta = localStorage.getItem('avarta');
    if (avarta) setAvartaAI(avarta);
    // Resize 상태 처리 (MobileFlag)
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    // Nav바 스크롤 이벤트
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    if (localStorage.getItem('id')) setUserId(localStorage.getItem('id'));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 모바일 전역 state 처리
  useEffect(() => {
    if (window.innerWidth < 768) setMobileFlag(true);
    else setMobileFlag(false);
  }, [windowSize]);

  // useCallback 적용. 불필요한 리렌더링 제거
  const handleSessionExpired = useCallback(() => {
    Swal.fire({
      icon: 'error',
      title: 'Login session expires',
      text: 'Main Page로 이동합니다',
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      logoutAPI(`${process.env.NEXT_PUBLIC_URL}`);
      setLogin(false);
      localStorage.removeItem('log');
      localStorage.removeItem('id');
      localStorage.removeItem('avarta');
      router.push('/');
    });
  }, [router, setLogin, setAvartaAI]);

  const logoutHandler = useCallback(() => {
    Swal.fire({
      title: 'Do you want to LogOut?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        logoutAPI(`${process.env.NEXT_PUBLIC_URL}`);
        // 히스토리 정보 삭제
        if (typeof window !== 'undefined') {
          window.history.pushState(
            {},
            document.title,
            window.location.pathname
          );
        }
        Swal.fire({
          icon: 'success',
          title: 'LogOut Success!',
          text: 'Main Page로 이동합니다',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          setLogin(false);
          setAvartaAI('default');
          localStorage.removeItem('log');
          localStorage.removeItem('id');
          localStorage.removeItem('avarta');
          router.push('/');
        });
      }
    });
  }, [router, setLogin, setAvartaAI]);

  const menuItems = useMemo(() => [{ href: '/mypage', label: 'MY PAGE' }], [t]);

  return (
    <NavContainer show={showNavbar}>
      <Link href="/" passHref>
        <Image
          src="/src/kikkle_logo.png"
          alt={'soyes_logo'}
          width={131}
          height={48}
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </Link>
      <NavListContainer>
        {navList_info.map((el, index) => {
          const { title, items } = el;
          return <NavList key={index} title={title} items={items} />;
        })}
      </NavListContainer>

      {login ? (
        <NavUl>
          {menuItems.map((item) => (
            <NavLi key={item.href}>
              <Link href={item.href} passHref>
                <NavBtn login={login} selected={item.href === currentPath}>
                  {item.label}
                </NavBtn>
              </Link>
            </NavLi>
          ))}
          <NavLi>
            <NavBtn onClick={logoutHandler}>LOGOUT</NavBtn>
          </NavLi>
          {/* <LanguageSwitcher /> */}
        </NavUl>
      ) : (
        <NavUl>
          <NavLi>
            <Link href="/login" passHref>
              <NavBtn>LOGIN</NavBtn>
            </Link>
          </NavLi>
          <NavLi>
            <Link href="/signup" passHref>
              <NavBtn>SIGN UP</NavBtn>
            </Link>
          </NavLi>
        </NavUl>
      )}
    </NavContainer>
  );
}

const NavContainer = styled.div`
  width: 100vw;
  background-color: #ffffff;

  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 8rem;
  height: auto;
  z-index: 1;

  @media (max-width: 1150px) {
    align-items: start;
    padding: 1rem 1rem 0rem 1rem;
  }

  @media (max-width: 768px) {
    align-items: start;
    padding: 1rem 1rem 0rem 1rem;
  }
`;

const NavUl = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 1150px) {
    flex-direction: column;
    align-items: flex-end;
    padding: 0;
    gap: 0;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-end;
    padding: 0;
    gap: 0;
  }
`;

const NavLi = styled.li`
  width: 100%;
  display: flex;

  @media (max-width: 1150px) {
    justify-content: flex-end;
  }

  @media (max-width: 768px) {
    justify-content: flex-end;
  }
`;

const NavListContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  z-index: 2;

  gap: 2rem;

  @media (max-width: 768px) {
    align-items: center;
  }
`;

const NavBtn = styled.button`
  background-color: ${(props) => (props.login ? '#45b26b' : 'white')};
  color: ${(props) => (props.login ? 'white' : '#45b26b')};
  font-family: Nunito;

  border: 1px solid #45b26b;
  border-radius: 10px;

  padding: 0.7rem 3rem;

  text-align: center;
  text-decoration: none;

  display: inline-block;
  font-size: 16px;

  white-space: nowrap;

  &:hover {
    background-color: #45b26b;
    color: white;
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
