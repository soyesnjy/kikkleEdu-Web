/* eslint-disable no-unreachable */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import {
  loginAPI,
  loginAPI_OAuth_Approve_Google,
  loginAPI_OAuth_Approve_Kakao,
} from '@/fetchAPI';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { log, uid, mobile, agencyClass } from '../store/state';
import Swal from 'sweetalert2';
import { useSearchParams } from 'next/navigation';
import GoogleOAuthBtn from '@/component/Login_Componet/googleOAuthBtn';
import KakaoOAuthBtn from '@/component/Login_Componet/kakaoOAuthBtn';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import Link from 'next/link';

// 로그인 만료시간 설정 (hour 시간)
const expireSetHourFunc = (hour) => {
  const today = new Date();
  return today.setHours(today.getHours() + hour);
};

// const AvartarIconArr = [
//   {
//     src: '/src/Login_IMG/Login_Ella_Icon_IMG.png',
//     alt: 'Ella_Icon',
//     width: 246,
//     height: 156,
//     top: '-28%',
//     left: '-3%',
//   },
//   {
//     src: '/src/Login_IMG/Login_Pupu_Icon_IMG.png',
//     alt: 'Pupu_Icon',
//     width: 191,
//     height: 150,
//     top: '-5%',
//     left: '-15%',
//   },
//   {
//     src: '/src/Login_IMG/Login_Soyes_Icon_IMG.png',
//     alt: 'Soyes_Icon',
//     width: 153,
//     height: 171,
//     left: '-13%',
//     bottom: '5%',
//   },
//   {
//     src: '/src/Login_IMG/Login_Ubi_Icon_IMG.png',
//     alt: 'Ubi_Icon',
//     width: 194,
//     height: 190,
//     top: '-28%',
//     right: '0%',
//   },
//   {
//     src: '/src/Login_IMG/Login_North_Icon_IMG.png',
//     alt: 'North_Icon',
//     width: 169,
//     height: 173,
//     top: '-10%',
//     right: '-13%',
//   },
// ];

export default function Login() {
  const { t } = useTranslation('login');
  const [userClass, setUserClass] = useState('teacher');

  const [id, setId] = useState('');
  const [userId, setUserId] = useRecoilState(uid);
  const [pwd, setPwd] = useState('');
  const [login, setLogin] = useRecoilState(log);
  const [url, setUrl] = useState('');
  const [agencyType, setAgencyType] = useRecoilState(agencyClass);
  // const [mobileFlag, setMobileFlag] = useRecoilState(mobile);

  const router = useRouter();

  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const type = searchParams.get('type');

  // 일반 로그인
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!id || !pwd) {
      Swal.fire({
        icon: 'error',
        title: t('login_input_empty_title'),
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
        title: t('login_success_title'),
        text: t('login_success_text'),
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        console.log(res.data);
        setLogin(true);
        localStorage.setItem(
          'log',
          JSON.stringify({
            expires: expireSetHourFunc(1),
          })
        );
        // ID 저장
        if (res.data.id) {
          localStorage.setItem('id', res.data.id);
          setUserId(res.data.id);
        }
        localStorage.setItem('userIdx', res.data.userIdx);
        // 기관 로그인일 경우. 기관 타입 저장
        if (res.data.type) {
          localStorage.setItem('agencyType', res.data.type);
          setAgencyType(res.data.type);
        }

        router.back(); // 뒤로가기
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
        text: '관리자에의해 승인 대기중인 계정입니다',
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: t('login_fail_title'),
        text: t('login_fail_text'),
      });
    }
  };
  // TODO# 구글 로그인
  const oauthGoogleHandler = async () => {
    if (code) {
      try {
        const res = await loginAPI_OAuth_Approve_Google({ code });
        console.log(res.status);
        if (res.status === 200) {
          Swal.fire({
            icon: 'success',
            title: t('login_success_title'),
            text: t('login_success_text'),
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            setLogin(true);
            localStorage.setItem(
              'log',
              JSON.stringify({
                expires: expireSetHourFunc(1),
              })
            );
            localStorage.setItem('id', res.data.id);
            setUserId(res.data.id);
            router.push('/');
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
            text: '관리자에의해 승인 대기중인 계정입니다',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: t('login_fail_title'),
            text: t('login_fail_text'),
          });
        }
      } catch (err) {
        console.error(err);
      }
    }
  };
  // TODO# 카카오 로그인
  const oauthKakaoHandler = async () => {
    if (code) {
      try {
        const res = await loginAPI_OAuth_Approve_Kakao({ code });
        console.log(res.data);

        if (res.status === 200) {
          Swal.fire({
            icon: 'success',
            title: t('login_success_title'),
            text: t('login_success_text'),
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            setLogin(true);
            localStorage.setItem(
              'log',
              JSON.stringify({
                expires: expireSetHourFunc(1),
              })
            );
            localStorage.setItem('id', res.data.id);
            setUserId(res.data.id);
            router.push('/');
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
            text: '관리자에의해 승인 대기중인 계정입니다',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: t('login_fail_title'),
            text: t('login_fail_text'),
          });
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
    }
  }, []);

  useEffect(() => {
    const loginSession = JSON.parse(localStorage.getItem('log'));
    if (loginSession) {
      router.replace('/');
      return;
    }
  }, [login]);

  useEffect(() => {
    if (url) {
      window.location.href = url;
    }
  }, [url]);

  useEffect(() => {
    if (!code) return;
    if (type === 'kakao') oauthKakaoHandler();
    else oauthGoogleHandler();
  }, [code]);

  return (
    <LoginPageContainer>
      <FormWrap>
        <Image
          src="/src/Login_IMG/Login_Vector_IMG.png"
          alt={'soyes_logo'}
          width={93}
          height={12}
          style={{ maxWidth: '100%', height: 'auto' }}
        />
        <H1>{t('login_title')}</H1>
        <H3>키클에듀에 오신 것을 환영합니다.</H3>
        <UserClassButtonContainer>
          <UserClassButton
            selected={userClass === 'teacher'}
            value="teacher"
            onClick={(e) => {
              setUserClass(e.target.value);
            }}
          >
            강사
          </UserClassButton>
          <UserClassButton
            selected={userClass === 'agency'}
            value="agency"
            onClick={(e) => {
              setUserClass(e.target.value);
            }}
          >
            기관
          </UserClassButton>
        </UserClassButtonContainer>
        <FormContainer>
          <InputContainer>
            <LoginInput
              color="black"
              placeholder="이메일 주소"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <LoginInput
              color="black"
              type="password"
              placeholder="비밀 번호"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
            />
            <LoginButton onClick={submitHandler}>
              {t('login_submit')}
            </LoginButton>
            <StyledLink href="#">비밀번호를 잊으셨나요?</StyledLink>
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
            <H4>
              아직 키클에듀 회원이 아니신가요?{' '}
              <StyledLink href="/signup">회원가입</StyledLink>
            </H4>
          </InputContainer>
        </FormContainer>
      </FormWrap>
    </LoginPageContainer>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['login', 'nav'])),
    },
  };
}

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
    padding: 2rem 3rem;
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

const OAuthWrap = styled.div`
  padding: 2rem 2rem 0 2rem;

  border-radius: 40px;

  display: flex;
  justify-content: center;
  align-items: center;

  gap: 0.5rem;

  @media (max-width: 768px) {
    margin-top: 1rem;
    width: 100%;
    flex-direction: column;
    padding: 0;
  }
`;

const UserClassButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const UserClassButton = styled.button`
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
