/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  FlexContainer,
  StyledButton,
  StyledInput,
} from '../styled-component/common';

import { useRouter } from 'next/router';
import { signupAPI } from '@/fetchAPI';
// SweetAlert2
import Swal from 'sweetalert2';
import { useRecoilState } from 'recoil';
import { log, mobile } from '../store/state';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const AvartarIconArr = [
  {
    src: '/src/Login_IMG/Login_Ella_Icon_IMG.png',
    alt: 'Ella_Icon',
    width: 246,
    height: 156,
    top: '-28%',
    left: '-3%',
  },
  {
    src: '/src/Login_IMG/Login_Pupu_Icon_IMG.png',
    alt: 'Pupu_Icon',
    width: 191,
    height: 150,
    top: '-5%',
    left: '-15%',
  },
  {
    src: '/src/Login_IMG/Login_Soyes_Icon_IMG.png',
    alt: 'Soyes_Icon',
    width: 153,
    height: 171,
    left: '-13%',
    bottom: '5%',
  },
  {
    src: '/src/Login_IMG/Login_Ubi_Icon_IMG.png',
    alt: 'Ubi_Icon',
    width: 194,
    height: 190,
    top: '-28%',
    right: '0%',
  },
  {
    src: '/src/Login_IMG/Login_North_Icon_IMG.png',
    alt: 'North_Icon',
    width: 169,
    height: 173,
    top: '-10%',
    right: '-13%',
  },
];

// SignUp 페이지
export default function Signup() {
  const [id, setId] = useState('');
  const [pwd, setPwd] = useState('');
  const [email, setEmail] = useState('');
  const [login, setLogin] = useRecoilState(log);
  const [mobileFlag, setMobileFlag] = useRecoilState(mobile);

  const router = useRouter();

  const minlengthStd = 8;
  const maxlengthStd = 15;
  const regex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/; // 한글 및 한글 자모를 포함하는 정규 표현식

  useEffect(() => {
    const loginSession = JSON.parse(localStorage.getItem('log'));
    if (loginSession) {
      router.replace('/');
      return;
    }
  }, [login]);

  // 회원가입 형식 체크 메서드
  const formCheck = () => {
    if (!id || !pwd) {
      Swal.fire({
        icon: 'error',
        title: 'Input is empty!',
        showConfirmButton: false,
        timer: 1000,
      });
      return false;
    }

    if (regex.test(id) || regex.test(pwd)) {
      Swal.fire({
        icon: 'error',
        title: '한글 쓰지마!!',
        showConfirmButton: false,
        timer: 1000,
      });
      return false;
    }

    if (id.length < minlengthStd) {
      Swal.fire({
        icon: 'error',
        title: `ID 길이 ${minlengthStd}글자 이상!`,
        showConfirmButton: false,
        timer: 1000,
      });
      return false;
    }

    if (id.length > maxlengthStd) {
      Swal.fire({
        icon: 'error',
        title: `ID 길이 ${maxlengthStd}글자 이하!`,
        showConfirmButton: false,
        timer: 1000,
      });
      return false;
    }

    if (pwd.length < minlengthStd) {
      Swal.fire({
        icon: 'error',
        title: `Password 길이 ${minlengthStd}글자 이상!`,
        showConfirmButton: false,
        timer: 1000,
      });
      return false;
    }

    if (pwd.length > maxlengthStd) {
      Swal.fire({
        icon: 'error',
        title: `Password 길이 ${maxlengthStd}글자 이하!`,
        showConfirmButton: false,
        timer: 1000,
      });
      return false;
    }

    return true;
  };

  const signupHandler = async (e) => {
    e.preventDefault();

    // 회원가입 형식 체크
    if (!formCheck()) return;

    const flag = await signupAPI(process.env.NEXT_PUBLIC_URL, {
      SignUpData: {
        pUid: id,
        passWard: pwd,
        Email: email,
        // name : name,
        // phoneNumber : phoneNumber
      },
    });

    // console.log(flag);

    if (flag) {
      Swal.fire({
        icon: 'success',
        title: 'Sign Up Success!',
        text: 'Login Page로 이동합니다',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        // useRouter 인스턴스의 push 메서드를 통해 페이지 이동 가능
        router.push('/login');
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Sign Up Fail',
      });
    }
  };

  return (
    <SignUpPageContainer>
      {!mobileFlag && (
        <Image
          src="/src/Login_IMG/Login_Logo_IMG.png"
          alt={'soyes_logo'}
          width={412}
          height={102}
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      )}

      <FormWrap>
        {!mobileFlag &&
          AvartarIconArr.map((el, index) => {
            return (
              <AvartarIconWrap
                key={index}
                top={el.top}
                left={el.left}
                bottom={el.bottom}
                right={el.right}
              >
                <Image
                  src={el.src}
                  alt={el.alt}
                  width={el.width}
                  height={el.height}
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </AvartarIconWrap>
            );
          })}
        <H1>회원 가입</H1>
        <FormContainer>
          <InputContainer>
            <SignUpInput
              id="id"
              placeholder="아이디"
              type="text"
              value={id}
              onChange={(e) => {
                setId(e.target.value);
              }}
            />
            <SignUpInput
              id="password"
              placeholder="비밀번호"
              type="password"
              value={pwd}
              onChange={(e) => {
                setPwd(e.target.value);
              }}
            />
            <SignUpInput
              id="email"
              placeholder="이메일"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </InputContainer>
          <SignUpButton onClick={signupHandler}>회원가입</SignUpButton>
        </FormContainer>
      </FormWrap>
    </SignUpPageContainer>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['signup', 'nav'])),
    },
  };
}

const SignUpPageContainer = styled.main`
  background-image: url('/src/Login_IMG/Login_Background_IMG.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  width: 100vw;
  height: 100vh;

  /* padding-top: 5rem; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
    justify-content: center;
  }
`;

const FormWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 0.5rem;
  padding: 3rem 5rem 5rem 5rem;

  border-radius: 40px;
  background-color: #ffffff;

  border: 10px solid #007f74;

  position: relative;

  @media (max-width: 768px) {
    width: 100%;
    padding: 2rem 3rem;
  }
`;

const FormContainer = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  border-radius: 40px;
  background-color: #ffffff;

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7rem;

  @media (max-width: 768px) {
    width: 100%;
    gap: 0.5rem;
  }
`;

const AvartarIconWrap = styled.div`
  position: absolute;
  top: ${(props) => props.top || null};
  bottom: ${(props) => props.bottom || null};
  left: ${(props) => props.left || null};
  right: ${(props) => props.right || null};
`;

const H1 = styled.h1`
  font-size: 40px;
  font-family: Cafe24Ssurround;
  color: black;

  margin-bottom: 2rem;
`;

const SignUpInput = styled.input`
  width: 27rem;
  height: 100%;
  background-color: #f9f9f9;

  color: black;

  padding: 13px 18px;

  border-radius: 20px;
  font-size: 25px;
  font-family: AppleSDGothicNeoL00;
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

const SignUpButton = styled.button`
  color: white;
  width: 180px;
  min-height: 205px;

  background-color: #007f74;
  border: none;
  border-radius: 15px;

  padding: 13px 23px;

  text-align: center;
  text-decoration: none;

  font-size: 32px;
  font-weight: bold;
  font-family: AppleSDGothicNeoEB00;

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

const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
`;
