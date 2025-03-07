/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';

import { useRecoilState } from 'recoil';
import { log, mobile, uid, agencyClass } from '@/store/state';

import { logoutAPI } from '@/fetchAPI/loginAPI';
import NavList from './NavList';
import NavMobile from './NavMobile';
import Swal from 'sweetalert2';
import useDisableScroll from '@/hook/useDisableScroll'; // 커스텀 훅 가져오기

type NavListInfoType = {
  title: string;
  items: { href: string; label: string }[];
};

type MenuItemType = {
  href: string;
  label: string;
};

const navList_info: NavListInfoType[] = [
  {
    title: '소예키즈 소개',
    items: [
      { href: '/introduce', label: '회사연혁' },
      { href: '/introduce/content', label: '소예키즈 콘텐츠' },
      { href: '/introduce/patent', label: '특허 및 상표권' },
      { href: '/introduce/partner', label: '파트너사' },
      { href: '/introduce/map', label: '주소 및 약도' },
    ],
  },
  {
    title: '기업 및 기관',
    items: [
      { href: '/agency', label: '유치원' },
      { href: '/agency/element', label: '초등학교' },
      { href: '/agency/cultural', label: '문화센터' },
      { href: '/agency/comunity', label: '커뮤니티센터' },
      { href: '/agency/welfare', label: '아동복지센터' },
    ],
  },
  {
    title: '강사',
    items: [{ href: '/teacher', label: '강사 소개' }],
  },
  {
    title: '교육 프로그램',
    items: [
      { href: '/program', label: '발레 교육' },
      { href: '/program/dance', label: '댄스 교육' },
      { href: '/program/yoga', label: '요가 교육' },
      { href: '/program/pila', label: '필라테스 교육' },
      { href: '/program/art', label: '미술 교육' },
    ],
  },
  {
    title: '게시판',
    items: [
      { href: '/shop', label: '상점' },
      { href: '/board', label: '공지사항' },
    ],
  },
];

export default function Nav() {
  const router = useRouter();
  const currentPath = router.pathname;

  const [login, setLogin] = useRecoilState(log);
  const [_, setUserId] = useRecoilState(uid);
  const [agencyType, setAgencyType] = useRecoilState(agencyClass);
  const [mobileFlag, setMobileFlag] = useRecoilState(mobile);

  const [mobileNavisOpen, setMobileNavisOpen] = useState(false);

  // Custom Hook 설정 - 스크롤 막기 기능 적용
  useDisableScroll(mobileNavisOpen);

  // 전역 상태 MobileFlag 처리 - 모바일 반응형 플래그
  const handleResize = (): void => {
    window.innerWidth <= 728 ? setMobileFlag(true) : setMobileFlag(false);
  };

  // Login Session Expired Handler - useCallback 적용
  const handleSessionExpired = useCallback((): void => {
    Swal.fire({
      icon: 'error',
      title: '로그인 세션 만료!',
      text: 'Main Page로 이동합니다',
      showConfirmButton: false,
      timer: 1500,
    }).then(async () => {
      await logoutAPI();
      setLogin(false);
      localStorage.removeItem('log');
      setLogin(false);
      localStorage.removeItem('id');
      setUserId('');
      localStorage.removeItem('agencyType');
      setAgencyType('');
      localStorage.removeItem('userIdx');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('activeTab');
      localStorage.removeItem('teacherDataArr');
      localStorage.removeItem('teacherClassTag');
      router.replace('/');
    });
  }, [router, setLogin]);

  // Logout Handler - useCallback 적용
  const logoutHandler = useCallback((): void => {
    Swal.fire({
      title: 'Do you want to LogOut?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await logoutAPI();
        Swal.fire({
          icon: 'success',
          title: 'LogOut Success!',
          text: 'Main Page로 이동합니다',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          localStorage.removeItem('log');
          setLogin(false);
          localStorage.removeItem('id');
          setUserId('');
          localStorage.removeItem('agencyType');
          setAgencyType('');
          localStorage.removeItem('userIdx');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('activeTab');
          localStorage.removeItem('teacherDataArr');
          localStorage.removeItem('teacherClassTag');
          setMobileNavisOpen(false);

          router.push('/');
        });
      }
    });
  }, [router, setLogin]);

  // Login Menu Items - useMemo 적용
  const menuItems: MenuItemType[] = useMemo(
    () => [
      {
        href:
          agencyType === 'admin'
            ? '/administor'
            : agencyType
              ? '/mypage'
              : '/mypage/teacher',
        label: agencyType === 'admin' ? 'ADMIN PAGE' : 'MY PAGE',
      },
    ],
    [agencyType]
  );

  useEffect(() => {
    // 모바일 반응형 플래그 resize 이벤트로 설정
    handleResize();
    window.addEventListener('resize', handleResize);

    // 새로고침 시, localStorage 값 recoil 전역변수에 갱신
    if (localStorage.getItem('id')) setUserId(localStorage.getItem('id'));
    if (!agencyType && localStorage.getItem('agencyType'))
      setAgencyType(localStorage.getItem('agencyType'));

    // Unmoiunt 시, 이벤트 제거
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // router 변경 시 로그인 만료 여부 체크
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
  }, [router]);

  return (
    <NavMasterContainer>
      {!mobileFlag ? (
        <NavContainer>
          <Link href="/" passHref>
            <Image
              src="/src/Home_IMG/Nav_IMG/Home_Nav_Logo_IMG.png"
              alt={'kidsclass_logo'}
              width={131}
              height={48}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </Link>
          <NavListContainer>
            {navList_info.map((el, index) => {
              const { title, items } = el;
              return (
                <NavList
                  key={`Nav_${title}-${index}`}
                  title={title}
                  items={items}
                />
              );
            })}
          </NavListContainer>

          {login ? (
            <NavUl>
              {menuItems.map((item) => {
                const { href, label } = item;
                return (
                  <NavLi key={`Nav_${href}_${label}`}>
                    <Link href={href} passHref>
                      <NavBtn
                        login={login ? 'true' : null}
                        selected={href === currentPath}
                      >
                        {label}
                      </NavBtn>
                    </Link>
                  </NavLi>
                );
              })}
              <NavLi>
                <NavBtn onClick={logoutHandler}>{`LOGOUT`}</NavBtn>
              </NavLi>
            </NavUl>
          ) : (
            <NavUl>
              <NavLi>
                <Link href="/login" passHref>
                  <NavBtn>{`LOGIN`}</NavBtn>
                </Link>
              </NavLi>
              <NavLi>
                <Link href="/signup" passHref>
                  <NavBtn>{`SIGN UP`}</NavBtn>
                </Link>
              </NavLi>
            </NavUl>
          )}
        </NavContainer>
      ) : (
        <NavContainer>
          <Link href="/" passHref onClick={() => setMobileNavisOpen(false)}>
            <Image
              src="/src/Home_IMG/Nav_IMG/Home_Nav_Logo_IMG.png"
              alt={'soyes_logo'}
              width={131}
              height={48}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </Link>
          <NavMobile
            isOpen={mobileNavisOpen}
            setIsOpen={setMobileNavisOpen}
            logoutHandler={logoutHandler}
            navList_info={navList_info}
            menuItems={menuItems}
          />
        </NavContainer>
      )}
    </NavMasterContainer>
  );
}

type NavBtnType = {
  login?: string;
  selected?: boolean;
};

const NavMasterContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 2rem;
`;

const NavContainer = styled.div`
  width: 100vw;
  height: auto;
  background-color: #ffffff;
  padding: 1rem 8rem;

  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  z-index: 2;

  @media (max-width: 1150px) {
    align-items: start;
    padding: 1rem 1rem 0rem 1rem;
  }

  @media (max-width: 768px) {
    align-items: start;
    padding: 0.5rem 2rem;
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

const NavBtn = styled.button<NavBtnType>`
  background-color: ${(props) => (props.login ? '#45b26b' : 'white')};
  color: ${(props) => (props.login ? 'white' : '#45b26b')};
  padding: 0.7rem 3rem;

  display: inline-block;
  border: 1px solid #45b26b;
  border-radius: 10px;

  font-family: Nunito;
  font-size: 16px;
  text-align: center;
  text-decoration: none;

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
