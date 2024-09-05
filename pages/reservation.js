/* eslint-disable no-unreachable */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { handleReservationCreate } from '@/fetchAPI/reservationAPI';
// SweetAlert2
import Swal from 'sweetalert2';
import { useRecoilState } from 'recoil';
import { log, mobile } from '@/store/state';

import { handleClassGet } from '@/fetchAPI/classAPI';
import { handleTeacherGet } from '@/fetchAPI/teacherAPI';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
// import FileUploadComponent from '@/component/SignUp_Component/FileUploadComponent';
import Calendar from '@/component/MyPage_Component/Calendar';

const partTimeArr = [
  { title: '오전 (10:00~12:00)', value: '오전' },
  { title: '오후 (1:00~5:00)', value: '오후' },
  { title: '야간 (6:00~10:00)', value: '야간' },
];

// 날짜 -> 요일 변환 메서드
const getUniqueWeekdays = (dateArr) => {
  // 요일 배열
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

  // 날짜 배열을 순회하면서 요일로 변환하고 중복을 제거
  const uniqueWeekdays = new Set(
    dateArr.map((dateString) => {
      const date = new Date(dateString);
      return weekdays[date.getDay()]; // 요일 번호를 이용해 요일 문자열로 변환
    })
  );

  // Set을 배열로 변환하여 반환
  return Array.from(uniqueWeekdays);
};

// SignUp 페이지
export default function Signup() {
  const [pageNumber, setPageNumber] = useState(0); // 강사 페이지 번호
  const [isPending, setIsPending] = useState(false); // 회원가입 버튼 활성화 state

  // Recoil 전역 변수
  const [login, setLogin] = useRecoilState(log);
  const [mobileFlag, setMobileFlag] = useRecoilState(mobile);

  // (NavBar)
  const [navText, setNavText] = useState(''); // Nav바 Text State
  // (First Page)
  const [possClassArr, setPossClassArr] = useState([]); // DB Class Select 값
  const [selectedClass, setSelectedClass] = useState(''); // 수업 선택 State
  // (Second Page)
  const [dateArr, setDateArr] = useState([]); // 날짜 선택 배열 State
  const [partTime, setPartTime] = useState(''); // 시간 선택 State
  // (Third Page)
  const [possTeacherArr, setPossTeacherArr] = useState([]); // 수업 가능 강사 배열 State
  const [selectedTeacher, setSelectedTeacher] = useState([]); // 강사 선택 State
  // (Fourth Page)
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  // const minlengthStd = 8;
  // const maxlengthStd = 15;
  // const regex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/; // 한글 및 한글 자모를 포함하는 정규 표현식

  // 발레 수업 DB 조회
  useEffect(() => {
    if (!possClassArr.length) {
      // Class Read API 호출 메서드
      handleClassGet({ classType: '' }) // 추후 기관 타입 recoil 전역변수 넣기
        .then((res) => res.data.data)
        .then((data) => {
          setPossClassArr([
            ...data.map((el) => {
              return { id: el.kk_class_idx, title: el.kk_class_title };
            }),
          ]);
        })
        .catch(() => setPossClassArr([]));
    }
  }, []);

  // 기능 잠금
  useEffect(() => {
    // 로그인 시 메인 페이지로 이동
    const loginSession = JSON.parse(localStorage.getItem('log'));
    if (!loginSession) {
      router.replace('/login');
      return;
    }
  }, [login]);

  // pageNumber에 따른 navText값 변경
  useEffect(() => {
    if (pageNumber === 2) {
      const dayArr = getUniqueWeekdays(dateArr);
      // Class Read API 호출 메서드
      handleTeacherGet({ classIdx: selectedClass, dayofweek: dayArr, partTime }) // 추후 기관 타입 recoil 전역변수 넣기
        .then((res) => res.data.data)
        .then((data) => {
          setPossTeacherArr([
            ...data.map((el) => {
              return {
                id: el.kk_teacher_idx,
                name: el.kk_teacher_name,
                introduce: el.kk_teacher_introduction,
              };
            }),
          ]);
        })
        .catch(() => setPossTeacherArr([]));
    }
    switch (pageNumber) {
      case 0:
        setNavText('수업 선택하기');
        break;
      case 1:
        setNavText('날짜/시간 선택하기');
        break;
      case 2:
        setNavText('강사 선택하기');
        break;
      case 3:
        setNavText('결제');
        break;
    }
  }, [pageNumber]);

  // 선택한 수업 변경 시 기존 선택되었던 강사 목록 초기화
  useEffect(() => {
    setSelectedTeacher([]);
  }, [selectedClass]);

  // useEffect(() => {
  //   console.log(selectedTeacher);
  // }, [selectedTeacher]);

  // 강사 페이지 체크
  // First 페이지 체크 메서드
  const pageCheckFirst = () => {
    if (!selectedClass) {
      alert('수업을 선택해주세요');
      return false;
    }
    return true;
  };
  // Second 페이지 체크 메서드
  const pageCheckSecond = () => {
    if (!dateArr.length) {
      alert('날짜를 선택해주세요');
      return false;
    }
    if (!partTime) {
      alert('시간대를 선택하세요');
      return false;
    }
    return true;
  };
  // Third 페이지 체크 메서드
  const pageCheckThird = () => {
    if (!selectedTeacher.length) {
      alert('강사를 선택해주세요');
      return false;
    }
    return true;
  };
  // Fouth 페이지 모달 on/off 메서드
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const reservationHandler = async (e) => {
    e.preventDefault();

    setIsPending(true);

    try {
      const res = await handleReservationCreate({
        agencyIdx: localStorage.getItem('userIdx'), // default userIdx === dummy 계정
        classIdx: selectedClass,
        reservationDate: dateArr,
        reservationTime: partTime,
        reservationCand: selectedTeacher,
      });

      if (res.status === 200) {
        Swal.fire({
          icon: 'success',
          title: '예약 성공!',
          text: 'Main Page로 이동합니다',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          router.push('/');
        });
      } else if (res.status === 403) {
        Swal.fire({
          icon: 'error',
          title: '중복된 이메일입니다',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: res.message,
        });
      }

      setIsPending(false);
    } catch (error) {
      console.error('업로드 실패:', error);
    }
  };

  return (
    <ReservationPageContainer>
      <FormWrap>
        <LeftContainer>
          <ProfileContainer>
            <div>Profile name</div>
            <div>name@naver.com</div>
          </ProfileContainer>
          <StepContainer>
            <StepText seleced={pageNumber === 0}>1. 수업 선택하기</StepText>
            <StepText seleced={pageNumber === 1}>
              2. 날짜/시간 선택하기
            </StepText>
            <StepText seleced={pageNumber === 2}>3. 강사 선택하기</StepText>
            <StepText seleced={pageNumber === 3}>4. 결제</StepText>
          </StepContainer>
        </LeftContainer>
        <RightFormContainer>
          <InputContainer>
            {/* 예약 네비바 */}
            <ReservationNavContainer>
              {/* 예약 단계 Text */}
              <ReservationNavText>
                {`${pageNumber + 1}. `}
                {navText}
              </ReservationNavText>
              {/* 페이지 버튼 */}
              <ReservationButtonContainer>
                {/* 이전 버튼 */}
                {pageNumber > 0 && (
                  <ReservationButton
                    onClick={(e) => {
                      e.preventDefault();
                      setPageNumber(pageNumber - 1);
                    }}
                  >
                    이전 단계
                  </ReservationButton>
                )}
                {/* 다음 버튼 */}
                {pageNumber !== 3 && (
                  <ReservationButton
                    onClick={(e) => {
                      e.preventDefault();
                      // 페이지별 필수 항목 체크
                      if (pageNumber === 0 && !pageCheckFirst()) return;
                      if (pageNumber === 1 && !pageCheckSecond()) return;
                      if (pageNumber === 2 && !pageCheckThird()) return;
                      setPageNumber(pageNumber + 1);
                    }}
                  >
                    다음 단계
                  </ReservationButton>
                )}
                {/* 예약 버튼 */}
                {pageNumber === 3 && (
                  <ReservationButton
                    onClick={reservationHandler}
                    disabled={isPending}
                    isPending={isPending}
                  >
                    {isPending ? '처리중...' : '예약 하기'}
                  </ReservationButton>
                )}
              </ReservationButtonContainer>
            </ReservationNavContainer>
            {/* 수업 선택 */}
            {pageNumber === 0 && (
              <PageContainer>
                <ClassContainer rowCount={Math.ceil(possClassArr.length / 5)}>
                  {possClassArr.map((el, index) => {
                    const { id, title } = el;
                    return (
                      <ClassButtonContainer
                        key={index}
                        selected={selectedClass === id}
                      >
                        <ClassButtonTitle>{title}</ClassButtonTitle>
                        {selectedClass !== id && (
                          <ClassButtonSubTitle>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit..
                          </ClassButtonSubTitle>
                        )}
                        <ClassButton
                          value={id}
                          selected={selectedClass === id}
                          onClick={(e) => {
                            e.preventDefault();
                            setSelectedClass(Number(e.target.value));
                            // // 선택 취소
                            // if (possClass.includes(id))
                            //   setPossClass([
                            //     ...possClass.filter((el) => el !== id),
                            //   ]);
                            // // 선택
                            // else
                            //   setPossClass([
                            //     ...possClass,
                            //     Number(e.target.value),
                            //   ]);
                          }}
                        >
                          선택하기
                        </ClassButton>
                      </ClassButtonContainer>
                    );
                  })}
                </ClassContainer>
              </PageContainer>
            )}
            {/* 날짜/시간 선택 */}
            {pageNumber === 1 && (
              <PageContainer>
                <Calendar setDate={setDateArr} date={dateArr} />
                <div>시간 선택하기</div>
                <PartTimeButtonContainer>
                  {partTimeArr.map((el, index) => {
                    const { title, value } = el;
                    return (
                      <PartTimeButton
                        key={index}
                        value={value}
                        selected={partTime === value}
                        onClick={(e) => {
                          e.preventDefault();
                          setPartTime(e.target.value);
                        }}
                      >
                        {title}
                      </PartTimeButton>
                    );
                  })}
                </PartTimeButtonContainer>
              </PageContainer>
            )}
            {/* 강사 선택 */}
            {pageNumber === 2 && (
              <PageContainer>
                <ClassContainer rowCount={Math.ceil(possClassArr.length / 5)}>
                  {possTeacherArr.length > 0
                    ? possTeacherArr.map((el, index) => {
                        const { id, name, introduce } = el;
                        return (
                          <ClassButtonContainer
                            key={index}
                            selected={selectedTeacher.includes(id)}
                          >
                            <ClassButtonTitle>{name}</ClassButtonTitle>

                            <ClassButtonSubTitle>
                              {introduce ? introduce : '소개글이 없습니다'}
                            </ClassButtonSubTitle>

                            <TeacherButton
                              value={id}
                              selected={selectedTeacher.includes(id)}
                              onClick={(e) => {
                                e.preventDefault();
                                // setSelectedClass(Number(e.target.value));
                                // 선택 취소
                                if (selectedTeacher.includes(id))
                                  setSelectedTeacher([
                                    ...selectedTeacher.filter(
                                      (el) => el !== id
                                    ),
                                  ]);
                                //
                                else if (selectedTeacher.length > 2)
                                  alert('3명까지 선택 가능');
                                // 선택
                                else
                                  setSelectedTeacher([
                                    ...selectedTeacher,
                                    Number(e.target.value),
                                  ]);
                              }}
                            >
                              {selectedTeacher.includes(id)
                                ? '취소하기'
                                : '선택하기'}
                            </TeacherButton>
                          </ClassButtonContainer>
                        );
                      })
                    : '조건에 부합하는 강사가 없습니다'}
                </ClassContainer>
              </PageContainer>
            )}
            {/* 결제 */}
            {pageNumber === 3 && (
              <PageContainer>
                <PayButtonContainer>
                  <PayButton
                    onClick={(e) => {
                      e.preventDefault();
                      // alert('개발중...');
                      toggleMenu();
                    }}
                  >
                    <Image
                      src="/src/Reservation_IMG/Icon/Reservation_Icon_Sell_IMG_.png"
                      alt={'Sell_Img'}
                      width={59}
                      height={59}
                      style={{ maxWidth: '100%', height: 'auto' }}
                    />
                    세금계산서 발급
                  </PayButton>
                  {/* <PayButton
                    onClick={(e) => {
                      e.preventDefault();
                      alert('개발중...');
                    }}
                  >
                    <Image
                      src="/src/Reservation_IMG/Icon/Reservation_Icon_Card_IMG_.png"
                      alt={'Card_Img'}
                      width={59}
                      height={59}
                      style={{ maxWidth: '100%', height: 'auto' }}
                    />
                    카드 결제
                  </PayButton> */}
                </PayButtonContainer>
                <PayModalContainer
                  isOpen={isOpen}
                  onClick={(e) => {
                    e.preventDefault();
                    // alert('개발중...');
                    toggleMenu();
                  }}
                >
                  <PayModalContentContainer>
                    <div>세금계산서 발급 - 담당자</div>
                    <div>담당자 - 010-xxxx-xxxx</div>
                    <button>담당자 전화 연결하기</button>
                  </PayModalContentContainer>
                </PayModalContainer>
              </PageContainer>
            )}
          </InputContainer>
        </RightFormContainer>
      </FormWrap>
    </ReservationPageContainer>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['signup', 'nav'])),
    },
  };
}

const ReservationPageContainer = styled.main`
  width: 100vw;
  background-color: white;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    padding: 1rem;
    justify-content: center;
  }
`;

const FormWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  gap: 3rem;

  /* background-color: rgba(255, 255, 255, 0.01); */

  /* border: 10px solid #007f74; */

  position: relative;

  @media (max-width: 768px) {
    width: 100%;
    padding: 2rem 3rem;
  }
`;

const LeftContainer = styled.div`
  min-height: 100vh;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 2rem;

  background-color: #f8f8f8;

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const ProfileContainer = styled.form`
  height: 100%;
  padding: 2rem 4.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.2rem;

  border-bottom: 1px solid black;

  background-color: #f8f8f8;

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const StepContainer = styled.form`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: flex-start;
  gap: 1rem;

  padding-left: 2rem;

  background-color: #f8f8f8;

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const StepText = styled.div`
  font-family: Pretendard;
  font-weight: ${(props) => (props.seleced ? '700' : '600')};
  font-size: ${(props) => (props.seleced ? '1.3rem' : '1rem')};
  color: ${(props) => (props.seleced ? '#45B26B' : '#c0c0c0')};
`;

const ReservationNavContainer = styled.div`
  width: 70vw;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const ReservationNavText = styled.div`
  font-family: Pretendard;
  font-weight: 700;
  font-size: 1.4rem;
  color: #45b26b;
`;

const ReservationButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  gap: 0.5rem;

  margin-top: 1rem;
`;

const ReservationButton = styled.button`
  background-color: ${(props) => (props.isPending ? '#45b26b' : '#D9D9D9')};
  border: none;
  border-radius: 8px;

  padding: 1.1rem 2.9rem;

  color: #333333;
  text-align: center;
  text-decoration: none;

  font-size: 1.2rem;
  font-weight: 600;
  font-family: Pretendard;

  cursor: pointer;
  &:hover {
    /* opacity: ${(props) => (props.isPending ? '1' : '0.8')}; */
    background-color: #45b26b;
    color: white;
  }

  transition: 0.5s;

  @media (max-width: 768px) {
    width: 100%;
    min-height: fit-content;
    min-height: 53px;
    font-size: 20px;
  }
`;

const RightFormContainer = styled.form`
  width: 100%;
  height: 100%;

  margin-top: 2rem;

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
  padding: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  gap: 1rem;

  @media (max-width: 768px) {
    width: 100%;
    gap: 0.5rem;
  }
`;

// const H1 = styled.h1`
//   font-size: 40px;
//   font-family: Pretendard;
//   font-weight: 600;
//   color: white;

//   margin-top: 1rem;
//   margin-bottom: 3rem;
// `;

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

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 3px;
`;

const ClassContainer = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    props.dayCheck ? 'repeat(7, 1fr)' : 'repeat(4, 1fr)'};
  grid-template-rows: ${(props) => `repeat(${props.rowCount}, 1fr)`};

  gap: 0.5rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
`;

const ClassButtonContainer = styled.div`
  width: 288px;
  height: 280px;
  background: ${(props) =>
    props.selected
      ? 'linear-gradient(#cacaca 80%, black)'
      : 'linear-gradient(#cacaca 100%, black)'};

  padding: 1rem;

  border-radius: 15px;

  border: ${(props) => (props.selected ? '5px solid #45b26b' : 'none')};
  color: white;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;

  gap: 1rem;
`;

const ClassButtonTitle = styled.div`
  font-family: Pretendard;
  font-weight: 700;
  font-size: 1.2rem;
  color: white;
`;

const ClassButtonSubTitle = styled.div`
  font-family: Pretendard;
  font-weight: 400;
  font-size: 0.7rem;
  color: white;
`;
const ClassButton = styled.button`
  display: ${(props) => (props.selected ? 'none' : 'black')};
  background-color: white;

  padding: 0.5rem 1rem;
  margin-bottom: 1rem;

  border-radius: 25px;

  border: 2px solid #45b26b;

  color: #45b26b;
  text-align: center;
  text-decoration: none;

  font-size: 1rem;
  font-weight: 700;
  font-family: Pretendard;

  cursor: pointer;

  transition: 0.2s;

  @media (max-width: 768px) {
    width: 100%;
    min-height: fit-content;
    min-height: 53px;
    font-size: 20px;
  }
`;

const TeacherButton = styled.button`
  background-color: white;

  padding: 0.5rem 1rem;
  margin-bottom: 1rem;

  border-radius: 25px;

  border: 2px solid #45b26b;

  color: #45b26b;
  text-align: center;
  text-decoration: none;

  font-size: 1rem;
  font-weight: 700;
  font-family: Pretendard;

  cursor: pointer;

  transition: 0.2s;

  @media (max-width: 768px) {
    width: 100%;
    min-height: fit-content;
    min-height: 53px;
    font-size: 20px;
  }
`;

const PartTimeButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;

  gap: 1rem;
`;

const PartTimeButton = styled.button`
  background-color: ${(props) => (props.selected ? '#45b26b' : 'white')};
  color: ${(props) => (props.selected ? 'white' : '#45b26b')};

  padding: 1rem 1.5rem;
  margin-bottom: 1rem;

  border-radius: 99px;

  border: 2px solid #45b26b;

  text-align: center;
  text-decoration: none;

  font-size: 1rem;
  font-weight: 600;
  font-family: Pretendard;

  cursor: pointer;

  transition: 0.2s;

  @media (max-width: 768px) {
    width: 100%;
    min-height: fit-content;
    min-height: 53px;
    font-size: 20px;
  }
`;

const PayButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  gap: 1rem;
`;

const PayButton = styled.button`
  padding: 2rem;
  width: 507px;
  height: 197px;
  background-color: #45b26b;

  border-radius: 25px;

  border: 2px solid #45b26b;

  color: white;
  text-decoration: none;

  font-size: 2.2rem;
  font-weight: 700;
  font-family: Pretendard;

  cursor: pointer;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  gap: 2rem;

  transition: 0.2s;

  @media (max-width: 768px) {
    width: 100%;
    min-height: fit-content;
    min-height: 53px;
    font-size: 20px;
  }
`;

const PayModalContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: #1717174d;

  position: fixed;
  top: 0;
  right: 0;
  z-index: 2;

  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;

  gap: 1rem;
`;

const PayModalContentContainer = styled.div`
  width: 602px;
  height: 268px;
  background-color: white;
  border-radius: 16px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 1rem;
`;
