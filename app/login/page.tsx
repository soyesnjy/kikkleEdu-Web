'use client';
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { log, uid, agencyClass } from '@/store/state';
import { loginAPI } from '@/fetchAPI/loginAPI';
import Swal from 'sweetalert2';

// 로그인 만료시간 설정 (hour 시간)
const expireSetHourFunc = (hour: number) => {
  const today = new Date();
  return today.setHours(today.getHours() + hour);
};

export default function Login() {
  const [id, setId] = useState<string>('');
  const [pwd, setPwd] = useState<string>('');
  const [userClass, setUserClass] = useState<string>('teacher');

  const [userId, setUserId] = useRecoilState<string>(uid);
  const [login, setLogin] = useRecoilState<boolean>(log);
  const [agencyType, setAgencyType] = useRecoilState<string>(agencyClass);

  const router = useRouter();

  // 일반 로그인
  const submitHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> => {
    e.preventDefault();
    if (!id || !pwd) {
      Swal.fire({
        icon: 'error',
        title: `입력값이 비어 있습니다!`,
        showConfirmButton: false,
        timer: 1000,
      });
      return;
    }

    const res = await loginAPI({
      data: {
        pUid: id,
        passWord: pwd,
        type: userClass,
      },
    });

    if (res.status === 200) {
      Swal.fire({
        icon: 'success',
        title: `로그인 성공!`,
        text: `메인 페이지로 이동합니다`,
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        setLogin(true);
        localStorage.setItem(
          'log',
          JSON.stringify({
            expires: expireSetHourFunc(24), // 로그인 세션 24시간 설정
          })
        );

        // 로그인 세션 저장
        const data = res.data;
        if (data !== undefined) {
          // userIdx 저장s
          localStorage.setItem('userIdx', data.userIdx || '');

          // refreshToken 저장
          if (data.refreshToken) {
            localStorage.setItem('refreshToken', data.refreshToken);
          }
          // ID 저장
          if (data.id) {
            localStorage.setItem('id', data.id);
            setUserId(data.id);
          }
          // 기관 로그인일 경우. 기관 타입 저장
          if (data.type) {
            localStorage.setItem('agencyType', data.type);
            setAgencyType(data.type);
          }

          // 뒤로가기
          router.push('/');
        }
      });
    } else if (res.status === 401) {
      Swal.fire({
        icon: 'info',
        title: '생성 요청',
        text: '계정 생성 요청이 완료되었습니다',
      });
    } else if (res.status === 402) {
      Swal.fire({
        icon: 'question',
        title: '승인 대기',
        text: '관리자에 의해 승인 대기 중인 계정입니다',
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: `로그인 실패`,
        text: `일치하는 입력값이 없습니다`,
      });
    }
  };

  useEffect(() => {
    const logItem = localStorage.getItem('log');
    const loginSession: { expires: string } = logItem
      ? JSON.parse(logItem)
      : null;
    if (loginSession) {
      router.replace('/');
      return;
    }
  }, [login]);

  return (
    <LoginPageContainer>
      <FormWrap>
        <img
          src="/src/Login_IMG/Login_Vector_IMG.png"
          alt={'soyes_logo'}
          width={93}
          height={12}
          style={{ maxWidth: '100%', height: 'auto' }}
        />
        <H1>{`로그인`}</H1>
        <H3>{`키클에듀에 오신 것을 환영합니다.`}</H3>
        <UserClassButtonContainer>
          <UserClassButton
            selected={userClass === 'teacher'}
            value="teacher"
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
              setUserClass(e.currentTarget.value);
            }}
          >
            {`강사`}
          </UserClassButton>
          <UserClassButton
            selected={userClass === 'agency'}
            value="agency"
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
              setUserClass(e.currentTarget.value);
            }}
          >
            {`기관`}
          </UserClassButton>
        </UserClassButtonContainer>
        <FormContainer>
          <InputContainer>
            <LoginInput
              color="black"
              placeholder="이메일 주소"
              value={id}
              onChange={(e) => setId(e.target.value)}
              data-testid="id-input"
            />
            <LoginInput
              color="black"
              type="password"
              placeholder="비밀 번호"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              data-testid="pwd-input"
            />
            <LoginButton
              onClick={submitHandler}
              data-testid="login-button"
            >{`로그인`}</LoginButton>
            {/* <StyledLink href="#">비밀번호를 잊으셨나요?</StyledLink> */}
            {/* {userClass === 'teacher' && (
              <Image
                src="/src/Login_IMG/Login_Divider_IMG.png"
                alt={'soyes_logo'}
                width={360}
                height={17}
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            )}
            {userClass === 'teacher' ? (
              <OAuthWrap>
                <GoogleOAuthBtn setUrl={setUrl} />
                <KakaoOAuthBtn setUrl={setUrl} />
              </OAuthWrap>
            ) : (
              ''
            )} */}
            <H4>{`아직 키클에듀 회원이 아니신가요?`}</H4>
            <StyledLink href="/signup">{`회원가입`}</StyledLink>
          </InputContainer>
        </FormContainer>
      </FormWrap>
    </LoginPageContainer>
  );
}

// UserClassButtonType 컴포넌트 Type 지정
type UserClassButtonType = {
  selected: boolean;
};

const LoginPageContainer = styled.main`
  width: 100vw;
  height: 56.25vw; /* 16:9 비율 유지 (100 / 16 * 9) */
  position: relative;

  background-color: white;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &::before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;

    background-image: url('/src/Login_IMG/Login_Background_IMG.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: absolute;
    top: 0;
    left: 0;
  }

  @media (max-width: 768px) {
    height: 100%;
    min-height: 100vh;
    flex-direction: column;
    padding: 2rem;
  }
`;

const FormWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 0.5rem;
  padding: 3rem 5rem;

  border-radius: 40px;
  /* background-color: rgba(255, 255, 255, 0.01); */

  /* border: 10px solid #007f74; */

  position: relative;

  @media (max-width: 768px) {
    width: 100%;
    padding: 1rem 2rem;
  }
`;

const FormContainer = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  border-radius: 40px;

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    gap: 0.5rem;
  }
`;

// const OAuthWrap = styled.div`
//   padding: 2rem 2rem 0 2rem;
//   border-radius: 40px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   gap: 0.5rem;
//   @media (max-width: 768px) {
//     margin-top: 1rem;
//     width: 100%;
//     flex-direction: column;
//     padding: 0;
//   }
// `;

const UserClassButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const UserClassButton = styled.button<UserClassButtonType>`
  width: 100%;
  background-color: ${(props) =>
    props.selected ? '#45b26b' : 'rgba(255, 255, 255, 0.01)'};
  border: 1px solid #45b26b;
  border-radius: 15px;

  padding: 1rem 4.4rem;
  margin-bottom: 1rem;

  color: white;
  text-align: center;
  text-decoration: none;

  font-size: 1.2rem;
  font-weight: 400;
  font-family: Pretendard;

  cursor: pointer;
  &:hover {
    background-color: #45b26b;
  }
  transition: 0.2s;

  @media (max-width: 768px) {
    width: 100%;
    font-size: 1rem;
    padding: 1rem;
    margin-bottom: 0;
  }
`;

const H1 = styled.h1`
  font-size: 40px;
  font-family: Pretendard;
  font-weight: 600;
  color: white;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const H3 = styled.h3`
  font-family: Pretendard;
  font-weight: 400;
  color: white;

  margin-bottom: 2rem;
`;

const H4 = styled.h4`
  font-family: Pretendard;
  font-weight: 400;
  color: white;

  margin-top: 3rem;
`;

const InputContainer = styled.div`
  /* background-color: rgba(255, 255, 255, 0.1); */

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    width: 100%;
    gap: 0.5rem;
  }
`;

const LoginInput = styled.input`
  width: 360px;

  background-color: rgba(255, 255, 255, 0.01);

  color: white;

  padding: 1rem 18px;

  border-radius: 15px;
  font-size: 1.2rem;
  font-family: Pretendard;
  font-weight: 400;
  text-align: left;

  border: 1px solid #bfbfbf;

  transition: 0.5s;

  &:focus {
    /* padding: 15px 20px; */
  }

  &::placeholder {
    color: #b8b8b8;
  }

  @media (max-width: 768px) {
    width: 100%;
    font-size: 1rem;
  }
`;

const LoginButton = styled.button`
  width: 360px;

  background-color: #606c76;
  border: none;
  border-radius: 15px;

  padding: 1.3rem 23px;
  margin-bottom: 1rem;

  color: white;
  text-align: center;
  text-decoration: none;

  font-size: 1.2rem;
  font-weight: 400;
  font-family: Pretendard;

  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }

  transition: 0.5s;

  @media (max-width: 768px) {
    width: 100%;
    min-height: fit-content;
    min-height: 53px;
    font-size: 20px;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #3870ff;

  margin-bottom: 2rem;
`;
