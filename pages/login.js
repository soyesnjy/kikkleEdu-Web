/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import {
  loginAPI,
  // loginAPI_OAuth_Approve_Google,
  // loginAPI_OAuth_Approve_Kakao,
} from '@/fetchAPI';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { log, uid, mobile } from '../store/state';
import Swal from 'sweetalert2';
import { useSearchParams } from 'next/navigation';
// import GoogleOAuthBtn from '@/component/Login_Componet/googleOAuthBtn';
// import KakaoOAuthBtn from '@/component/Login_Componet/kakaoOAuthBtn';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';

const expireSetHourFunc = (hour) => {
  const today = new Date();
  return today.setHours(today.getHours() + hour);
};

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

export default function Login() {
  const { t } = useTranslation('login');

  const [id, setId] = useState('');
  const [userId, setUserId] = useRecoilState(uid);
  const [pwd, setPwd] = useState('');
  const [login, setLogin] = useRecoilState(log);
  const [url, setUrl] = useState('');
  const [mobileFlag, setMobileFlag] = useRecoilState(mobile);

  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const type = searchParams.get('type');

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
    const flag = await loginAPI(process.env.NEXT_PUBLIC_URL, {
      LoginData: {
        pUid: id,
        passWard: pwd,
      },
    });
    if (flag) {
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
        localStorage.setItem('id', id);
        setUserId(id);
        // router.push('/');
        router.back(); // Guset 로그인 시 뒤로가기 발동
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: t('login_fail_title'),
        text: t('login_fail_text'),
      });
    }
  };

  // const oauthGoogleHandler = async () => {
  //   if (code) {
  //     try {
  //       const res = await loginAPI_OAuth_Approve_Google({ code });

  //       if (res.status === 200) {
  //         Swal.fire({
  //           icon: 'success',
  //           title: t('login_success_title'),
  //           text: t('login_success_text'),
  //           showConfirmButton: false,
  //           timer: 1500,
  //         }).then(() => {
  //           setLogin(true);
  //           localStorage.setItem(
  //             'log',
  //             JSON.stringify({
  //               expires: expireSetHourFunc(1),
  //             })
  //           );
  //           localStorage.setItem('id', res.data.id);
  //           setUserId(res.data.id);
  //           router.push('/');
  //         });
  //       } else {
  //         Swal.fire({
  //           icon: 'error',
  //           title: t('login_fail_title'),
  //           text: t('login_fail_text'),
  //         });
  //       }
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }
  // };

  // const oauthKakaoHandler = async () => {
  //   if (code) {
  //     try {
  //       const res = await loginAPI_OAuth_Approve_Kakao({ code });
  //       console.log(res.data);

  //       if (res.status === 200) {
  //         Swal.fire({
  //           icon: 'success',
  //           title: t('login_success_title'),
  //           text: t('login_success_text'),
  //           showConfirmButton: false,
  //           timer: 1500,
  //         }).then(() => {
  //           setLogin(true);
  //           localStorage.setItem(
  //             'log',
  //             JSON.stringify({
  //               expires: expireSetHourFunc(1),
  //             })
  //           );
  //           localStorage.setItem('id', res.data.id);
  //           setUserId(res.data.id);
  //           router.push('/');
  //         });
  //       } else {
  //         Swal.fire({
  //           icon: 'error',
  //           title: t('login_fail_title'),
  //           text: t('login_fail_text'),
  //         });
  //       }
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }
  // };

  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      // console.log(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
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

  // useEffect(() => {
  //   if (type === 'kakao') oauthKakaoHandler();
  //   else oauthGoogleHandler();
  // }, [code]);

  return (
    <LoginPageContainer>
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
        <H1>{t('login_title')}</H1>
        <FormContainer>
          <InputContainer>
            <LoginInput
              color="black"
              placeholder={t('login_id_placeholder')}
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <LoginInput
              color="black"
              type="password"
              placeholder={t('login_password_placeholder')}
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
            />
          </InputContainer>
          <LoginButton onClick={submitHandler}>{t('login_submit')}</LoginButton>
        </FormContainer>
        <OAuthWrap>
          {/* <KakaoOAuthBtn setUrl={setUrl} />
          <GoogleOAuthBtn setUrl={setUrl} /> */}
        </OAuthWrap>
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
  padding: 3rem 5rem;

  border-radius: 40px;
  background-color: #ffffff;

  border: 10px solid #007f74;

  position: relative;

  @media (max-width: 768px) {
    width: 100%;
    padding: 2rem 3rem;
  }
`;

const AvartarIconWrap = styled.div`
  position: absolute;
  top: ${(props) => props.top || null};
  bottom: ${(props) => props.bottom || null};
  left: ${(props) => props.left || null};
  right: ${(props) => props.right || null};
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

const OAuthWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding: 2rem 2rem 0 2rem;

  border-radius: 40px;

  @media (max-width: 768px) {
    margin-top: 1rem;
    width: 100%;
    flex-direction: column;
    padding: 0;
  }
`;

const H1 = styled.h1`
  font-size: 40px;
  font-family: Cafe24Ssurround;
  color: black;

  margin-bottom: 2rem;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    width: 100%;
    gap: 0.5rem;
  }
`;

const LoginInput = styled.input`
  width: 27rem;
  height: 4.3rem;
  background-color: #f9f9f9;

  color: ${(props) => (props.color ? props.color : 'white')};

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

const LoginButton = styled.button`
  color: white;

  width: 180px;
  min-height: 153px;

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
