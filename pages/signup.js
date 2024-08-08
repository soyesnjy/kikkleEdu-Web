/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { signupAPI } from '@/fetchAPI';
// SweetAlert2
import Swal from 'sweetalert2';
import { useRecoilState } from 'recoil';
import { log, mobile } from '../store/state';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

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

// SignUp 페이지
export default function Signup() {
  const [userClass, setUserClass] = useState('teacher');
  const [pageNumber, setPageNumber] = useState(0);

  const [checkPwd_1, setCheckPwd_1] = useState(false);
  const [checkPwd_2, setCheckPwd_2] = useState(false);
  const [checkPwd_3, setCheckPwd_3] = useState(false);

  const [checkTerms, setCheckTerms] = useState(false);
  const [checkPrivacy, setCheckPrivacy] = useState(false);

  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pwd, setPwd] = useState('');
  const [login, setLogin] = useRecoilState(log);
  const [mobileFlag, setMobileFlag] = useRecoilState(mobile);

  const router = useRouter();

  const minlengthStd = 8;
  const maxlengthStd = 15;
  const regex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/; // 한글 및 한글 자모를 포함하는 정규 표현식

  // Pwd Check Method
  const checkPwd = () => {
    if (!pwd) {
      setCheckPwd_1(false);
      setCheckPwd_2(false);
      setCheckPwd_3(false);
      return;
    }
    let count = 0;

    const hasLetter = /[a-zA-Z]/.test(pwd);
    const hasNumber = /\d/.test(pwd);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);

    if (hasLetter) count++;
    if (hasNumber) count++;
    if (hasSpecialChar) count++;

    if (pwd.length >= 8)
      setCheckPwd_1(true); // 8글자 이상
    else setCheckPwd_1(false);

    if (count >= 2)
      setCheckPwd_2(true); // 영문, 숫자, 기호 중 2개 이상의 조합
    else setCheckPwd_2(false);

    if (pwd !== email)
      setCheckPwd_3(true); // 이메일 주소 포함X
    else setCheckPwd_3(false);
  };

  useEffect(() => {
    // 로그인 시 메인 페이지로 이동
    const loginSession = JSON.parse(localStorage.getItem('log'));
    if (loginSession) {
      router.replace('/');
      return;
    }
  }, [login]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      return checkPwd();
    }, 350);
    return () => {
      clearTimeout(debounce);
    };
  }, [pwd]);

  // 첫 페이지 체크 메서드
  const pageCheckFirst = () => {
    if (!email) {
      alert('이메일을 입력하세요');
      return false;
    }
    if (!name) {
      alert('이름을 입력하세요');
      return false;
    }
    if (!phoneNumber) {
      alert('전화번호를 입력하세요');
      return false;
    }
    if (!checkPwd_1 || !checkPwd_2 || !checkPwd_3) {
      alert('비밀번호 요구사항을 지켜주세요');
      return false;
    }
    if (!checkTerms || !checkPrivacy) {
      alert('동의항목을 체크해주세요');
      return false;
    }
    return true;
  };

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
      <FormWrap>
        {/* <Image
          src={el.src}
          alt={el.alt}
          width={el.width}
          height={el.height}
          style={{ maxWidth: '100%', height: 'auto' }}
        /> */}
        <div>
          <H1>키클에듀 id를 생성하세요.</H1>
          <H4>개인정보는 회원가입 확인에만 이용됩니다.</H4>
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
        </div>
        <FormContainer>
          <InputContainer>
            {pageNumber === 0 && (
              <PageContainer>
                <SignUpInput
                  id="email"
                  placeholder="이메일"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <SignUpInput
                  id="name"
                  placeholder="성함"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <StyledPhoneInput
                  placeholder="전화 번호"
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                  defaultCountry="KR"
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
                <PwdCheckContainer>
                  <H4>비밀번호 요구사항</H4>
                  <PwdCheckText check={checkPwd_1}>
                    <span class="material-symbols-outlined">check</span> 8글자
                    이상
                  </PwdCheckText>
                  <PwdCheckText check={checkPwd_2}>
                    <span class="material-symbols-outlined">check</span>{' '}
                    영문,숫자,기호 중 2개 이상의 조합
                  </PwdCheckText>
                  <PwdCheckText check={checkPwd_3}>
                    <span class="material-symbols-outlined">check</span> 이메일
                    주소가 포함되면 안됩니다
                  </PwdCheckText>
                </PwdCheckContainer>
                <TermsCheckboxContainer>
                  <HiddenCheckbox
                    id="checkTerms"
                    checked={checkTerms}
                    onChange={(e) => {
                      setCheckTerms(e.target.checked);
                    }}
                  />
                  <StyledCheckbox
                    checked={checkTerms}
                    onClick={(e) => {
                      setCheckTerms(!checkTerms);
                    }}
                  >
                    <Icon viewBox="0 0 24 24">
                      <polyline points="20 6 9 17 4 12" />
                    </Icon>
                  </StyledCheckbox>
                  <TermsCheckLabel for="checkTerms">
                    *이용약관에 동의합니다.
                  </TermsCheckLabel>
                </TermsCheckboxContainer>
                <TermsCheckboxContainer>
                  <HiddenCheckbox
                    id="checkPrivacy"
                    checked={checkPrivacy}
                    onChange={(e) => {
                      setCheckPrivacy(e.target.checked);
                    }}
                  />
                  <StyledCheckbox
                    checked={checkPrivacy}
                    onClick={(e) => {
                      setCheckPrivacy(!checkPrivacy);
                    }}
                  >
                    <Icon viewBox="0 0 24 24">
                      <polyline points="20 6 9 17 4 12" />
                    </Icon>
                  </StyledCheckbox>
                  <TermsCheckLabel for="checkPrivacy">
                    *개인정보 수집 및 이용에 동의합니다.
                  </TermsCheckLabel>
                </TermsCheckboxContainer>
              </PageContainer>
            )}
            {pageNumber === 1 && (
              <PageContainer>
                <H1>2 페이지</H1>
              </PageContainer>
            )}
            {pageNumber === 2 && (
              <PageContainer>
                <H1>3 페이지</H1>
              </PageContainer>
            )}
            {/* 이전 다음 버튼 관련 */}
            {pageNumber > 0 && (
              <SignUpButton
                onClick={(e) => {
                  e.preventDefault();
                  setPageNumber(pageNumber - 1);
                }}
              >
                이전 단계
              </SignUpButton>
            )}
            {pageNumber !== 2 && (
              <SignUpButton
                onClick={(e) => {
                  e.preventDefault();
                  // 첫 페이지 필수 항목 체크
                  if (pageNumber === 0 && !pageCheckFirst()) return;
                  setPageNumber(pageNumber + 1);
                }}
              >
                다음 단계
              </SignUpButton>
            )}
            {pageNumber === 2 && (
              <SignUpButton onClick={signupHandler}>회원가입</SignUpButton>
            )}
          </InputContainer>
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
    padding: 1rem;
    justify-content: center;
  }
`;

const FormWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  gap: 35rem;
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

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 0.5rem;

  @media (max-width: 768px) {
    width: 100%;
    gap: 0.5rem;
  }
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  gap: 0.5rem;

  @media (max-width: 768px) {
    width: 100%;
    gap: 0.5rem;
  }
`;

const H1 = styled.h1`
  font-size: 40px;
  font-family: Pretendard;
  font-weight: 600;
  color: white;

  margin-top: 1rem;
  margin-bottom: 3rem;
`;

const H4 = styled.h4`
  font-family: Pretendard;
  font-weight: 400;
  color: white;
`;

const SignUpInput = styled.input`
  width: 360px;
  background-color: rgba(255, 255, 255, 0.01);
  color: white;
  padding: 1rem 18px;

  border: 1px solid #bfbfbf;
  border-radius: 15px;

  font-size: 1.2rem;
  font-family: Pretendard;
  font-weight: 400;
  text-align: left;

  transition: 0.5s;

  &::placeholder {
    color: #b8b8b8;
  }

  @media (max-width: 768px) {
    width: 100%;
    font-size: 1rem;
  }
`;

const StyledPhoneInput = styled(PhoneInput)`
  width: 360px;

  border: 1px solid #bfbfbf;
  border-radius: 15px;

  .PhoneInputCountry {
    display: none;
  }
  input {
    border-radius: 15px;
    background-color: rgba(255, 255, 255, 0.01);
    color: white;

    font-size: 1.2rem;
    font-family: Pretendard;
    font-weight: 400;
    text-align: left;

    padding: 1rem 18px;
    border: none;

    transition: 0.5s;

    &::placeholder {
      color: #b8b8b8;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    font-size: 1rem;
  }
`;

const SignUpButton = styled.button`
  width: 360px;

  background-color: #606c76;
  border: none;
  border-radius: 15px;

  padding: 1.3rem 23px;

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

const UserClassButton = styled.button`
  background-color: ${(props) =>
    props.selected ? '#45b26b' : 'rgba(255, 255, 255, 0.01)'};
  border: 1px solid #45b26b;
  border-radius: 15px;

  padding: 1.3rem 3rem;
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

  transition: 0.5s;

  @media (max-width: 768px) {
    width: 100%;
    min-height: fit-content;
    min-height: 53px;
    font-size: 20px;
  }
`;

const UserClassButtonContainer = styled.div`
  margin-top: 2rem;

  display: flex;
  justify-content: left;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const PwdCheckContainer = styled.div`
  padding: 2rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  gap: 0.5rem;

  @media (max-width: 768px) {
    width: 100%;
    gap: 0.5rem;
  }
`;

const PwdCheckText = styled.div`
  color: ${(props) => (props.check ? '#00bba3' : '#758592')};

  display: flex;
  justify-content: center;
  align-items: center;

  text-align: center;
  text-decoration: none;

  font-size: 1rem;
  font-weight: 700;
  font-family: Pretendard;
`;

const TermsCheckboxContainer = styled.div`
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;

  margin-bottom: 1rem;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 3px;
`;

const StyledCheckbox = styled.div`
  display: inline-block;
  width: 26px;
  height: 26px;
  background: ${(props) => (props.checked ? '#008000' : 'white')};
  border-radius: 5px;
  transition: all 150ms;
  border: 2px solid ${(props) => (props.checked ? '#008000' : '#ccc')};
  display: flex;
  align-items: center;
  justify-content: center;

  ${Icon} {
    visibility: ${(props) => (props.checked ? 'visible' : 'hidden')};
  }
`;

const TermsCheckLabel = styled.label`
  margin-left: 8px;
  color: ${(props) => (props.checked ? '#99cc99' : '#cccccc')};

  font-size: 1rem;
  font-family: Pretendard;
  font-weight: 400;
  text-align: left;
`;
