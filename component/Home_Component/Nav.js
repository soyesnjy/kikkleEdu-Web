/* eslint-disable react-hooks/exhaustive-deps */
import styled, { keyframes } from 'styled-components';
import Link from 'next/link';
import LanguageSwitcher from './LanguageSwitcher';
import { useRecoilState } from 'recoil';
import { log, avarta, mobile, uid } from '../../store/state';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { logoutAPI } from '@/fetchAPI';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';

export default function Nav() {
  const router = useRouter();
  const { t } = useTranslation('nav');
  const currentPath = router.pathname;
  const [login, setLogin] = useRecoilState(log);
  const [avartaAI, setAvartaAI] = useRecoilState(avarta);
  const [userId, setUserId] = useRecoilState(uid);
  const [showMenu, setShowMenu] = useState(false); // currentPath !== '/' ? true : false
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

  // useMemo 적용
  const menuItems = useMemo(
    () => [
      { href: '/music', label: 'music' },
      { href: '/test_ebt', label: t('ebt') },
      { href: '/test_pt', label: t('pt') },
      { href: '/consult_intro', label: t('consult') },
      { href: '/review', label: t('review') },
      { href: '/meditation_intro', label: t('meditation_intro') },
      { href: '/shop', label: t('shop') },
      { href: '/mypage', label: t('mypage') },
    ],
    [t]
  );

  return (
    <NavContainer show={showNavbar}>
      <Link href="/" passHref>
        <Image
          src="/src/Login_IMG/Login_Logo_IMG.png"
          alt={'soyes_logo'}
          width={220}
          height={36}
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </Link>
      {login ? (
        <NavUl>
          {/* <NavLi>
            <Link href="/meditation_intro" passHref>
              <NavBtn>meditation_intro</NavBtn>
            </Link>
          </NavLi> */}
          {/* <NavLi>
            <Link href="/" passHref>
              <NavBtn>{t('main')}</NavBtn>
            </Link>
          </NavLi> */}
          {/* <NavLi>
            <Link href="/upload" passHref>
              <NavBtn>Upload</NavBtn>
            </Link>
          </NavLi> */}
          {/* <NavLi>
            <Link href="/meditation" passHref>
              <NavBtn>Meditation</NavBtn>
            </Link>
          </NavLi> */}
          {mobileFlag ? (
            <NavListContainer>
              <NavBtn onClick={() => setShowMenu(!showMenu)}>
                {showMenu ? '▲' : '▼'}
              </NavBtn>
              <NavMenuContainer>
                {showMenu &&
                  menuItems.map((item) => (
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
            </NavListContainer>
          ) : (
            menuItems.map((item) => (
              <NavLi key={item.href}>
                <Link href={item.href} passHref>
                  <NavBtn selected={item.href === currentPath}>
                    {item.label}
                  </NavBtn>
                </Link>
              </NavLi>
            ))
          )}
          <NavLi>
            <NavBtn onClick={logoutHandler}>{t('logout')}</NavBtn>
          </NavLi>
          <LanguageSwitcher />
        </NavUl>
      ) : (
        <NavUl>
          {/* <NavLi>
            <Link href="/" passHref>
              <NavBtn>{t('main')}</NavBtn>
            </Link>
          </NavLi> */}
          <NavLi>
            <Link href="/login" passHref>
              <NavBtn>{t('login')}</NavBtn>
            </Link>
          </NavLi>
          <NavLi>
            <Link href="/signup" passHref>
              <NavBtn>{t('signup')}</NavBtn>
            </Link>
          </NavLi>
          <LanguageSwitcher />
        </NavUl>
      )}
    </NavContainer>
  );
}

const slideDown = keyframes`
    from {
        top: -60px;
    }
    to {
        top: 0;
    }
`;

const NavContainer = styled.div`
  width: 100vw;
  background-color: ${(props) =>
    props.show ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.01)'};
  position: fixed;
  /* ${(props) => (props.show ? 'sticky' : 'fixed')}; */
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  height: auto;
  z-index: 1;

  /* animation: ${(props) =>
    props.show ? slideDown : 'none'} 0.3s ease-in-out; */

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

const NavLiMenu = styled.li`
  width: 100%;
  display: flex;
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const NavListContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 1;

  @media (max-width: 768px) {
    align-items: center;
  }
`;

const NavMenuContainer = styled.li`
  position: absolute;
  top: 100%;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const NavBtn = styled.button`
  background-color: ${(props) =>
    props.selected ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 42, 255, 0.5)'};
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

  white-space: nowrap;

  &:hover {
    ${(props) => (props.selected ? null : 'padding: 15px 25px;')}
    background-color: rgba(0, 42, 255, 0.5);
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
