/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import styled from 'styled-components';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { log, mobile } from '@/store/state';

import { handleSignupCreate } from '@/fetchAPI/signupAPI';
import { handleClassGet } from '@/fetchAPI/classAPI';

import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import FileUploadComponent from '@/component/SignUp_Component/FileUploadComponent';
import PostBtn from '@/component/SignUp_Component/PostBtn';
import LoadingDots from '@/component/SignUp_Component/LoadingDot';
import Swal from 'sweetalert2';
// import Page from '@/component/Motion_Paging/Page';

const possLocalArr: string[] = ['서울', '부산', '기타'];
const possDayArr: string[] = ['월', '화', '수', '목', '금', '토', '일'];
const agencyTypeArr: string[] = [
  '유치원',
  '초등학교',
  '문화센터',
  '커뮤니티센터',
  '아동복지센터',
];

const partTimeArr = [
  { title: '오전\n(10:00~12:00)', value: '오전' },
  { title: '오후\n(1:00~5:00)', value: '오후' },
  { title: '야간\n(6:00~10:00)', value: '야간' },
];
const titleMap = {
  2: '스토리 (창의) 발레',
};

// SignUp 페이지
export default function Signup() {
  const [possClassArr, setPossClassArr] = useState([]);
  const [userClass, setUserClass] = useState('teacher');
  const [pageNumber, setPageNumber] = useState(0); // 강사 페이지 번호
  const [pageNumberA, setPageNumberA] = useState(0); // 기관 페이지 번호
  const [isPending, setIsPending] = useState(false); // 회원가입 버튼 활성화 state
  // 비밀번호 관련 state
  const [checkPwd_1, setCheckPwd_1] = useState(false);
  const [checkPwd_2, setCheckPwd_2] = useState(false);
  const [checkPwd_3, setCheckPwd_3] = useState(false);
  // 동의항목 관련 state
  const [checkTerms, setCheckTerms] = useState(false);
  const [checkPrivacy, setCheckPrivacy] = useState(false);

  // 강사 가입정보
  // (First Page)
  const [email, setEmail] = useState(''); // kk_teacher_uid
  const [pwd, setPwd] = useState(''); // kk_teacher_pwd
  const [name, setName] = useState(''); // kk_teacher_name
  const [phoneNumber, setPhoneNumber] = useState(''); // kk_teacher_phoneNum
  // (Second Page)
  const [possLocal, setPossLocal] = useState(''); // kk_teacher_location
  const [possClass, setPossClass] = useState([]); // 희망 수업
  const [possDay, setPossDay] = useState([]); // kk_teacher_history
  const [possTime, setPossTime] = useState([]); // kk_teacher_time
  // (Third Page)
  const [introduce, setIntroduce] = useState(''); // kk_teacher_history
  const [career, setCareer] = useState(''); // kk_teacher_history
  const [education, setEducation] = useState(''); // kk_teacher_education
  const [file, setFile] = useState(null); // kk_teacher_file_path

  // 기관 가입정보
  const [emailA, setEmailA] = useState('');
  const [pwdA, setPwdA] = useState('');
  const [nameA, setNameA] = useState('');
  const [addressA, setAddressA] = useState('');
  const [phoneNumberA, setPhoneNumberA] = useState('');
  const [typeA, setTypeA] = useState('');
  // const [fileA, setFileA] = useState(null);

  // Recoil 전역 변수
  const [login, setLogin] = useRecoilState(log);
  const [mobileFlag, setMobileFlag] = useRecoilState(mobile);

  const router = useRouter();

  // const minlengthStd = 8;
  // const maxlengthStd = 15;
  // const regex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/; // 한글 및 한글 자모를 포함하는 정규 표현식

  // Pwd Check Method
  const checkPwd = (pwd: string) => {
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

  // 발레 수업 DB 조회
  useEffect(() => {
    if (!possClassArr.length) {
      // Class Read API 호출 메서드
      handleClassGet({})
        .then((res) => res.data.data)
        .then((data) => {
          // console.log(data);
          setPossClassArr([
            ...data.map((el) => {
              return { id: el.kk_class_idx, title: el.kk_class_title };
            }),
          ]);
        })
        .catch(() => {
          setPossClassArr([]);
        });
    }
  }, []);

  useEffect(() => {
    // 로그인 시 메인 페이지로 이동
    const loginSession = JSON.parse(localStorage.getItem('log'));
    if (loginSession) {
      router.replace('/');
      return;
    }
  }, [login]);

  // 비밀번호 입력 디바운싱
  useEffect(() => {
    const debounce = setTimeout(() => {
      return checkPwd(pwd);
    }, 350);
    return () => {
      clearTimeout(debounce);
    };
  }, [pwd]);

  // title Text 변환 메서드
  const titleTransHandler = (title) => {
    return title.split(' ').join('\n');
  };
  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };
  const isValidTeacher = (email) => {
    return email.startsWith('TC_');
  };

  // 강사 페이지 체크
  // First 페이지 체크 메서드
  const pageCheckFirst = () => {
    if (!email) {
      alert('ID를 입력하세요');
      return false;
    }
    // if (!isValidEmail(email)) {
    //   alert('이메일 형식으로 입력하세요');
    //   return false;
    // }
    if (!isValidTeacher(email)) {
      alert('강사회원은 TC_(ID)입력해주세요.');
      return;
    }
    if (!name) {
      alert('이름을 입력하세요');
      return false;
    }
    // if (!phoneNumber) {
    //   alert('전화번호를 입력하세요');
    //   return false;
    // }
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
  // Second 페이지 체크 메서드
  const pageCheckSecond = () => {
    if (!possClass.length) {
      alert('희망 수업을 선택하세요');
      return false;
    }
    if (!possLocal) {
      alert('희망 지역을 선택하세요');
      return false;
    }
    if (!possDay.length) {
      alert('희망 날짜를 선택하세요');
      return false;
    }
    if (!possTime.length) {
      alert('희망 시간대를 선택하세요');
      return false;
    }
    return true;
  };
  // Third 페이지 체크 메서드
  const pageCheckThird = () => {
    if (!career) {
      alert('경력을 입력하세요');
      return false;
    }
    if (!education) {
      alert('학력을 입력하세요');
      return false;
    }
    if (!file) {
      alert('파일을 선택하세요');
      return false;
    }
    return true;
  };

  // 기관 페이지 체크
  // First 페이지 체크 메서드
  const agencyPageCheckFirst = () => {
    if (!emailA) {
      alert('이메일을 입력하세요');
      return false;
    }

    if (!isValidEmail(emailA)) {
      alert('이메일 형식으로 입력하세요');
      return false;
    }
    if (!nameA) {
      alert('이름을 입력하세요');
      return false;
    }
    // if (!phoneNumberA) {
    //   alert('전화번호를 입력하세요');
    //   return false;
    // }
    if (!addressA) {
      alert('주소를 입력하세요');
      return false;
    }
    return true;
  };
  // Second 페이지 체크 메서드
  const agencyPageCheckSecond = () => {
    if (!typeA) {
      alert('기관 유형을 선택하세요');
      return false;
    }
    // if (!fileA) {
    //   alert('파일을 선택하세요');
    //   return false;
    // }
    return true;
  };

  // 강사 회원가입 핸들러
  const signupHandler = async (e) => {
    e.preventDefault();
    // 회원가입 형식 체크
    if (pageNumber === 2 && !pageCheckThird()) return;
    // 회원가입 버튼 비활성화
    setIsPending(true);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Data = reader.result;
      try {
        const res = await handleSignupCreate({
          SignUpData: {
            pUid: email,
            userClass,
            passWord: pwd,
            name: name,
            phoneNumber: phoneNumber,
            possLocal,
            possClass,
            possDay,
            possTime,
            introduce,
            career,
            education,
            fileData: {
              fileName: file.name,
              fileType: file.type,
              baseData: base64Data,
            },
          },
        });

        if (res.status === 200) {
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
            title: res.message, // 서버측 반환 message 띄우기
          });
        }
      } catch (error) {
        console.error('업로드 실패:', error);
      }
      // 회원가입 버튼 활성화
      setIsPending(false);
    };

    reader.readAsDataURL(file);
  };
  // 기관 회원가입 핸들러
  const signupHandlerA = async (e) => {
    e.preventDefault();
    // 회원가입 형식 체크
    if (pageNumberA === 1 && !agencyPageCheckSecond()) return;
    // 회원가입 버튼 비활성화
    setIsPending(true);

    try {
      const res = await handleSignupCreate({
        SignUpData: {
          pUid: emailA,
          userClass,
          passWord: pwdA,
          name: nameA,
          phoneNumber: phoneNumberA,
          address: addressA,
          typeA,
        },
      });

      if (res.status === 200) {
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
      } else if (res.status === 403) {
        Swal.fire({
          icon: 'error',
          title: '중복된 이메일입니다',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Sign Up Fail',
        });
      }
    } catch (error) {
      console.error('업로드 실패:', error);
    }
    // 회원가입 버튼 활성화
    setIsPending(false);
  };

  return (
    <SignUpPageContainer>
      <FormWrap>
        <div>
          <H1>{`키클에듀 id를 생성하세요.`}</H1>
          <H4>{`개인정보는 회원가입 확인에만 이용됩니다.`}</H4>
          <UserClassButtonContainer>
            <UserClassButton
              selected={userClass === 'teacher'}
              value="teacher"
              onClick={(e) => {
                setUserClass(e.currentTarget.value);
              }}
            >
              {`강사`}
            </UserClassButton>
            <UserClassButton
              selected={userClass === 'agency'}
              value="agency"
              onClick={(e) => {
                setUserClass(e.currentTarget.value);
              }}
            >
              {`기관`}
            </UserClassButton>
          </UserClassButtonContainer>
        </div>
        <FormContainer>
          {userClass === 'teacher' ? (
            <InputContainer>
              {/* 회원가입 First Page */}
              {pageNumber === 0 && (
                <PageContainer>
                  <H5>{`* 표시는 필수 입력 정보입니다`}</H5>
                  <SignUpInput
                    id="name"
                    placeholder="*성함"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                  <SignUpInput
                    id="email"
                    placeholder="*아이디"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <SignUpInput
                    id="password"
                    placeholder="*비밀번호"
                    type="password"
                    value={pwd}
                    onChange={(e) => {
                      setPwd(e.target.value);
                    }}
                  />
                  <StyledPhoneInput
                    placeholder="전화 번호 (010-0000-0000)"
                    value={phoneNumber}
                    onChange={setPhoneNumber}
                    defaultCountry="KR"
                  />

                  <PwdCheckContainer>
                    <H5>{`비밀번호 요구사항`}</H5>
                    <PwdCheckText check={checkPwd_1}>
                      <span className="material-symbols-outlined">check</span>{' '}
                      {`8글자 이상`}
                    </PwdCheckText>
                    <PwdCheckText check={checkPwd_2}>
                      <span className="material-symbols-outlined">check</span>{' '}
                      {`영문,숫자,기호 중 2개 이상의 조합`}
                    </PwdCheckText>
                    <PwdCheckText check={checkPwd_3}>
                      <span className="material-symbols-outlined">check</span>{' '}
                      {`이메일 주소가 포함되면 안됩니다`}
                    </PwdCheckText>
                  </PwdCheckContainer>
                  <TermsCheckboxContainer>
                    <HiddenCheckbox
                      id="checkTerms"
                      checked={checkTerms}
                      onChange={(e) => {
                        setCheckTerms(e.currentTarget.checked);
                      }}
                    />
                    <StyledCheckbox
                      check={checkTerms}
                      onClick={() => {
                        setCheckTerms(!checkTerms);
                      }}
                    >
                      <Icon viewBox="0 0 24 24">
                        <polyline points="20 6 9 17 4 12" />
                      </Icon>
                    </StyledCheckbox>
                    <TermsCheckLabel htmlFor="checkTerms">
                      {`*`}
                      <a
                        href="https://www.soyes.kr/soyeskids_privacy_policy"
                        target="blank"
                      >
                        {`이용약관`}
                      </a>
                      {`에 동의합니다.`}
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
                      check={checkPrivacy}
                      onClick={() => {
                        setCheckPrivacy(!checkPrivacy);
                      }}
                    >
                      <Icon viewBox="0 0 24 24">
                        <polyline points="20 6 9 17 4 12" />
                      </Icon>
                    </StyledCheckbox>
                    <TermsCheckLabel htmlFor="checkPrivacy">
                      {`*`}
                      <span>{`개인정보`}</span> {`수집 및 이용에 동의합니다.`}
                    </TermsCheckLabel>
                  </TermsCheckboxContainer>
                </PageContainer>
              )}
              {/* 회원가입 Second Page */}
              {pageNumber === 1 && (
                <PageContainer>
                  <H5>{`* 표시는 필수 입력 정보입니다`}</H5>
                  <H4>{`* 희망 수업`}</H4>
                  <UserPossClassContainer
                    rowcount={Math.ceil(possClassArr.length / 5)}
                  >
                    {possClassArr.map((el, index) => {
                      const { id, title } = el;
                      return (
                        <UserPossClassButton
                          key={index}
                          value={id}
                          onClick={(e) => {
                            e.preventDefault();
                            // 선택 취소
                            if (possClass.includes(id))
                              setPossClass([
                                ...possClass.filter((el) => el !== id),
                              ]);
                            // 선택
                            else
                              setPossClass([
                                ...possClass,
                                Number(e.currentTarget.value),
                              ]);
                          }}
                          selected={possClass.includes(id)}
                        >
                          {mobileFlag
                            ? id === 2 // 스토리(창의)발레 수업명에 한해 변환
                              ? titleTransHandler(titleMap[id])
                              : titleTransHandler(title)
                            : title}
                        </UserPossClassButton>
                      );
                    })}
                  </UserPossClassContainer>
                  <H4>{`* 희망 지역`}</H4>
                  <UserPossClassContainer
                    rowcount={Math.ceil(possLocalArr.length / 5)}
                  >
                    {possLocalArr.map((possLocalName, index) => {
                      return (
                        <UserPossClassButton
                          key={index}
                          value={possLocalName}
                          onClick={(e) => {
                            e.preventDefault();
                            // 지역 선택
                            setPossLocal(e.currentTarget.value);
                          }}
                          selected={possLocal === possLocalName}
                        >
                          {possLocalName}
                        </UserPossClassButton>
                      );
                    })}
                  </UserPossClassContainer>
                  <H4>{`* 희망 날짜`}</H4>
                  <UserPossClassContainer rowcount={1} dayCheck={true}>
                    {possDayArr.map((possDayName, index) => {
                      return (
                        <UserPossClassButton
                          key={index}
                          value={possDayName}
                          onClick={(e) => {
                            e.preventDefault();
                            // 선택 취소
                            if (possDay.includes(possDayName))
                              setPossDay([
                                ...possDay.filter((el) => el !== possDayName),
                              ]);
                            // 선택
                            else
                              setPossDay([...possDay, e.currentTarget.value]);
                          }}
                          selected={possDay.includes(possDayName)}
                        >
                          {possDayName}
                        </UserPossClassButton>
                      );
                    })}
                  </UserPossClassContainer>
                  <H4>{`* 희망 시간대`}</H4>
                  <UserPossClassContainer rowcount={1} dayCheck={true}>
                    {partTimeArr.map((partTime, index) => {
                      return (
                        <UserPossClassButton
                          key={index}
                          value={partTime.value}
                          onClick={(e) => {
                            e.preventDefault();
                            // 시간대 선택
                            // setPossTime(e.target.value);

                            if (possTime.includes(partTime.value))
                              setPossTime([
                                ...possTime.filter(
                                  (el) => el !== partTime.value
                                ),
                              ]);
                            // 선택
                            else
                              setPossTime([...possTime, e.currentTarget.value]);
                          }}
                          // selected={possTime === partTime.value}
                          selected={possTime.includes(partTime.value)}
                        >
                          {partTime.title}
                        </UserPossClassButton>
                      );
                    })}
                  </UserPossClassContainer>
                </PageContainer>
              )}
              {/* 회원가입 Third Page */}
              {pageNumber === 2 && (
                <PageContainer>
                  <H5>{`* 표시는 필수 입력 정보입니다`}</H5>
                  <H4>{`* 강사 소개 (본인 소개글)`}</H4>
                  <UserInfoRowContainer>
                    <SignUpInput
                      id="introduce"
                      placeholder="강사 소개글"
                      type="text"
                      value={introduce}
                      onChange={(e) => {
                        setIntroduce(e.currentTarget.value);
                      }}
                    />
                  </UserInfoRowContainer>
                  <H4>{`* 경력 & 학력`}</H4>
                  <UserInfoRowContainer>
                    <SignUpInput
                      id="career"
                      placeholder="경력 (교육경력)"
                      type="text"
                      value={career}
                      onChange={(e) => {
                        setCareer(e.currentTarget.value);
                      }}
                    />
                    <SignUpInput
                      id="education"
                      placeholder="학력"
                      type="text"
                      value={education}
                      onChange={(e) => {
                        setEducation(e.currentTarget.value);
                      }}
                    />
                  </UserInfoRowContainer>
                  <H4>{`* 필수요청 서류 탭 (ZIP파일 제출)`}</H4>
                  <FileUploadComponent setFile={setFile} file={file} />
                  <H5>{`+ 필수 서류 확인하기`}</H5>
                  <FileCheckText>
                    <span className="material-symbols-outlined">check</span>
                    {`이력서 / 신분증 / 통장사본 / 보건증`}
                  </FileCheckText>
                  <FileCheckText>
                    <span className="material-symbols-outlined">check</span>
                    {`졸업 증명서(재학증명서) / 경력 증명서`}
                  </FileCheckText>
                  <FileCheckText>
                    <span className="material-symbols-outlined">check</span>
                    {`프로필 사진`}
                  </FileCheckText>
                </PageContainer>
              )}
              <SignUpButtonContainer>
                {/* 이전 버튼 */}
                {pageNumber > 0 && (
                  <SignUpButton
                    onClick={(e) => {
                      e.preventDefault();
                      setPageNumber(pageNumber - 1);
                    }}
                  >
                    {`이전 단계`}
                  </SignUpButton>
                )}
                {/* 다음 버튼 */}
                {pageNumber !== 2 && (
                  <SignUpButton
                    onClick={(e) => {
                      e.preventDefault();
                      // 페이지별 필수 항목 체크
                      if (pageNumber === 0 && !pageCheckFirst()) return;
                      if (pageNumber === 1 && !pageCheckSecond()) return;
                      setPageNumber(pageNumber + 1);
                    }}
                  >
                    {`다음 단계`}
                  </SignUpButton>
                )}
                {/* 가입 버튼 */}
                {pageNumber === 2 && (
                  <SignUpButton
                    onClick={signupHandler}
                    disabled={isPending}
                    isPending={isPending}
                  >
                    {isPending ? <LoadingDots /> : '회원가입'}
                  </SignUpButton>
                )}
              </SignUpButtonContainer>
            </InputContainer>
          ) : (
            <InputContainer>
              {pageNumberA === 0 && (
                <PageContainer>
                  <H5>{`* 표시는 필수 입력 정보입니다`}</H5>
                  <SignUpInput
                    id="name"
                    placeholder="* 기관명"
                    type="text"
                    value={nameA}
                    onChange={(e) => {
                      setNameA(e.currentTarget.value);
                    }}
                  />
                  <SignUpInput
                    id="email"
                    placeholder="* 이메일 (ID)"
                    type="email"
                    value={emailA}
                    onChange={(e) => {
                      setEmailA(e.currentTarget.value);
                    }}
                  />
                  <SignUpInput
                    id="password"
                    placeholder="* 비밀번호"
                    type="password"
                    value={pwdA}
                    onChange={(e) => {
                      setPwdA(e.currentTarget.value);
                    }}
                  />
                  <StyledPhoneInput
                    placeholder="전화 번호 (010-0000-0000)"
                    value={phoneNumberA}
                    onChange={setPhoneNumberA}
                    defaultCountry="KR"
                  />
                  <SignUpInputAddressContainer>
                    <SignUpInputAddress
                      id="name"
                      placeholder="* 주소"
                      type="text"
                      value={addressA}
                      disabled={true}
                    />
                    <PostBtn setAddressA={setAddressA} />
                  </SignUpInputAddressContainer>
                </PageContainer>
              )}
              {pageNumberA === 1 && (
                <PageContainer>
                  <H5>* 표시는 필수 입력 정보입니다</H5>
                  <H4>* 기관 유형</H4>
                  <UserPossClassContainer
                    rowcount={Math.ceil(agencyTypeArr.length / 5)}
                  >
                    {agencyTypeArr.map((agencyTypeName, index) => {
                      return (
                        <UserPossClassButton
                          key={index}
                          value={agencyTypeName}
                          onClick={(e) => {
                            e.preventDefault();
                            // 지역 선택
                            setTypeA(e.currentTarget.value);
                          }}
                          selected={typeA === agencyTypeName}
                        >
                          {agencyTypeName}
                        </UserPossClassButton>
                      );
                    })}
                  </UserPossClassContainer>
                  {/* <H4>* 필수요청 서류 탭 (ZIP파일 제출)</H4>
                  <FileUploadComponent setFile={setFileA} file={fileA} /> */}
                </PageContainer>
              )}
              <SignUpButtonContainer>
                {/* 이전 버튼 */}
                {pageNumberA > 0 && (
                  <SignUpButton
                    onClick={(e) => {
                      e.preventDefault();
                      setPageNumberA(pageNumberA - 1);
                    }}
                  >
                    이전 단계
                  </SignUpButton>
                )}
                {/* 다음 버튼 */}
                {pageNumberA !== 1 && (
                  <SignUpButton
                    onClick={(e) => {
                      e.preventDefault();
                      // 페이지별 필수 항목 체크
                      if (pageNumberA === 0 && !agencyPageCheckFirst()) return;
                      setPageNumberA(pageNumberA + 1);
                    }}
                  >
                    다음 단계
                  </SignUpButton>
                )}
                {/* 가입 버튼 */}
                {pageNumberA === 1 && (
                  <SignUpButton
                    onClick={signupHandlerA}
                    disabled={isPending}
                    isPending={isPending}
                  >
                    {isPending ? <LoadingDots /> : '회원가입'}
                  </SignUpButton>
                )}
              </SignUpButtonContainer>
            </InputContainer>
          )}
        </FormContainer>
      </FormWrap>
    </SignUpPageContainer>
  );
}

type SelectedType = {
  selected: boolean;
};

type CheckType = {
  check: boolean;
};

type IsPendingType = {
  isPending?: boolean;
};

type PossButtonType = {
  dayCheck?: boolean;
  rowcount: number;
};

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
    height: 100%;
    min-height: 100vh;
    flex-direction: column;
    padding: 1rem;
  }
`;

const FormWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  gap: 30rem;
  padding: 3rem 5rem;

  border-radius: 40px;
  /* background-color: rgba(255, 255, 255, 0.01); */

  /* border: 10px solid #007f74; */

  position: relative;

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    padding: 1rem;

    gap: 2rem;
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

const H5 = styled.h5`
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

const SignUpButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  gap: 0.5rem;

  margin-top: 1rem;
`;

const SignUpButton = styled.button<IsPendingType>`
  width: 360px;

  background-color: ${(props) => (props.isPending ? '#45b26b' : '#606c76')};
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
    opacity: ${(props) => (props.isPending ? '1' : '0.8')};
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
    gap: 0.5rem;
  }
`;

const UserClassButton = styled.button<SelectedType>`
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
  transition: 0.2s;

  @media (max-width: 768px) {
    width: 100%;
    font-size: 1rem;
    padding: 1rem;
    margin-bottom: 0;

    margin-bottom: 0;
  }
`;

const PwdCheckContainer = styled.div`
  padding: 1.5rem;

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

const PwdCheckText = styled.div<CheckType>`
  color: ${(props) => (props.check ? '#00bba3' : '#758592')};

  display: flex;
  justify-content: center;
  align-items: center;

  text-align: center;
  text-decoration: none;

  font-size: 14px;
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
  /* clippath: inset(50%); */
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

const StyledCheckbox = styled.div<CheckType>`
  display: inline-block;
  width: 26px;
  height: 26px;
  background: ${(props) => (props.check ? '#008000' : 'white')};
  border-radius: 5px;
  transition: all 150ms;
  border: 2px solid ${(props) => (props.check ? '#008000' : '#ccc')};
  display: flex;
  align-items: center;
  justify-content: center;

  ${Icon} {
    visibility: ${(props) => (props.check ? 'visible' : 'hidden')};
  }
`;

const TermsCheckLabel = styled.label`
  margin-left: 8px;
  color: #cccccc;

  font-size: 1rem;
  font-family: Pretendard;
  font-weight: 400;
  text-align: left;

  user-select: none;

  a {
    color: #378e56;
    text-decoration: none;
    font-size: 1rem;
    font-family: Pretendard;
    font-weight: 600;
    text-align: left;
  }

  span {
    color: #378e56;
    font-size: 1rem;
    font-family: Pretendard;
    font-weight: 600;
    text-align: left;
  }
`;

const UserPossClassContainer = styled.div<PossButtonType>`
  display: grid;
  grid-template-columns: ${(props) =>
    props.dayCheck ? 'repeat(7, 1fr)' : 'repeat(4, 1fr)'};
  grid-template-rows: ${(props) => `repeat(${props.rowcount}, 1fr)`};

  gap: 0.5rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: ${(props) =>
      props.dayCheck ? 'repeat(7, 1fr)' : 'repeat(4, 1fr)'};
    grid-template-rows: ${(props) => `repeat(${props.rowcount}, 1fr)`};
  }
`;

const UserPossClassButton = styled.button<SelectedType>`
  background-color: ${(props) =>
    props.selected ? '#45b26b' : 'rgba(255, 255, 255, 0.01)'};
  border: 1px solid #45b26b;
  border-radius: 15px;

  padding: 1.5rem 2rem;

  color: white;
  text-align: center;
  text-decoration: none;

  font-size: 1rem;
  font-weight: 400;
  font-family: Pretendard;

  cursor: pointer;

  transition: 0.2s;

  @media (max-width: 768px) {
    width: 100%;
    padding: 0.6rem;
    font-size: 0.9rem;

    white-space: pre;
  }
`;

const UserInfoRowContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  gap: 1rem;
  margin-bottom: 1rem;
`;

const FileCheckText = styled.div`
  color: #00bba3;

  display: flex;
  justify-content: center;
  align-items: center;

  text-align: center;
  text-decoration: none;

  font-size: 14px;
  font-weight: 600;
  font-family: Pretendard;
`;

const SignUpInputAddressContainer = styled.div`
  width: 360px;

  display: flex;
  justify-content: center;
  align-items: center;

  gap: 0.2rem;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SignUpInputAddress = styled.input`
  width: 80%;
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
    padding: 1rem 18px;
    font-size: 1rem;
  }
`;
