import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { handleSignupDelete, handleSignupUpdate } from '@/fetchAPI/signupAPI';
import { handleClassGet } from '@/fetchAPI/classAPI';

import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import { logoutAPI } from '@/fetchAPI';
import { useRecoilState } from 'recoil';
import { log, uid, agencyClass } from '@/store/state';

const possLocalArr = ['서울', '부산', '기타'];
const possDayArr = ['월', '화', '수', '목', '금', '토', '일'];
const partTimeArr = [
  { title: '오전\n(10:00~12:00)', value: '오전' },
  { title: '오후\n(1:00~5:00)', value: '오후' },
  { title: '야간\n(5:00~10:00)', value: '야간' },
];

const TeacherTablePrivacyBody = ({ data }) => {
  const router = useRouter();
  const [login, setLogin] = useRecoilState(log);
  const [userId, setUserId] = useRecoilState(uid);
  const [agencyType, setAgencyType] = useRecoilState(agencyClass);

  const [updateFlag, setUpdateFlag] = useState(false);
  const [isPending, setIsPending] = useState(false); // 회원가입 버튼 활성화 state

  const [possClassArr, setPossClassArr] = useState([]);

  const [teacherIdx, setTeacherIdx] = useState(0);
  const [introduce, setIntroduce] = useState('');
  const [name, setName] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [profileImg, setProfileImg] = useState(null);
  const [possClass, setPossClass] = useState([]); // 희망 수업
  const [possDay, setPossDay] = useState([]); // 희망 요일
  const [possTimes, setPossTimes] = useState([]); // 희망 시간대
  const [location, setLocation] = useState('');
  const [history, setHistory] = useState('');
  const [education, setEducation] = useState('');

  // const [approveStatus, setApproveStatus] = useState(-1);
  // const [profilePreviewImg, setprofilePreviewImg] = useState(null);

  // 발레 수업 DB 조회
  useEffect(() => {
    if (!possClassArr.length) {
      // Class Read API 호출 메서드
      handleClassGet()
        .then((res) => res.data.data)
        .then((data) => {
          // console.log(data);
          setPossClassArr([
            ...data.map((el) => {
              return { id: el.kk_class_idx, title: el.kk_class_title };
            }),
          ]);
        });
    }
  }, []);

  useEffect(() => {
    if (data) {
      // console.log(data);
      setTeacherIdx(data.kk_teacher_idx);
      setName(data.kk_teacher_name);
      setIntroduce(data.kk_teacher_introduction);
      setPhoneNum(data.kk_teacher_phoneNum);

      setPossClass([
        ...data.kk_teacher_class_idxs.split('/').map((el) => Number(el)),
      ]); // 수업 추가
      setPossDay([...data.kk_teacher_dayofweek.split('/')]); // 요일 추가
      setPossTimes([...data.kk_teacher_time.split('/')]); // 시간대 추가

      setLocation(data.kk_teacher_location);
      setHistory(data.kk_teacher_history);
      setEducation(data.kk_teacher_education);
      // setApproveStatus(data.kk_teacher_approve_status);
    }
  }, [data]);

  // useEffect(() => {
  //   console.log(possDay);
  // }, [possDay]);

  // 강사 정보 update 핸들러
  const signupUpdateHandler = async (e) => {
    e.preventDefault();
    // 수정 확인 버튼 비활성화

    // if (approveStatus === -1) {
    //   alert('승인 여부를 선택하세요');
    //   return;
    // }

    setIsPending(true);

    const reader = new FileReader();
    // 파일 onloadend 메서드
    reader.onloadend = async () => {
      const base64Data = reader.result;
      try {
        const res = await handleSignupUpdate({
          SignUpData: {
            userIdx: teacherIdx,
            userClass: 'teacher',
            introduce,
            name,
            phoneNum,
            location,
            history,
            education,
            fileData: {
              fileName: profileImg.name,
              fileType: profileImg.type,
              baseData: base64Data,
            },
            approveStatus: 1,
          },
        });

        if (res.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Update Success!',
            text: 'Page Reloading...',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            // 화면 새로고침
            window.location.reload();
          });
        } else if (res.status === 403) {
          Swal.fire({
            icon: 'error',
            title: '중복된 이메일입니다',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Update Fail',
          });
        }
        // 회원가입 버튼 활성화
        setIsPending(false);
      } catch (error) {
        console.error('업로드 실패:', error);
      }
    };
    // profileImg가 있을 경우 -> reader의 파일 정보를 읽고 onloadend 메서드 실행
    if (profileImg) reader?.readAsDataURL(profileImg);
    // profileImg가 없을 경우 -> 아래 코드 실행
    else {
      try {
        const res = await handleSignupUpdate({
          SignUpData: {
            userIdx: teacherIdx,
            userClass: 'teacher',
            introduce,
            name,
            phoneNum,
            location,
            possDay, // 강사 수업 가능 요일
            possClass, // 강사 가능 수업
            possTimes, // 강사 가능 시간대
            history,
            education,
            approveStatus: 1,
          },
        });

        if (res.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Update Success!',
            text: 'Page Reloading...',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            // 화면 새로고침
            window.location.reload();
          });
        } else if (res.status === 403) {
          Swal.fire({
            icon: 'error',
            title: '중복된 이메일입니다',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Update Up Fail',
          });
        }
        // 회원가입 버튼 활성화
        setIsPending(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  // 강사 정보 delete 핸들러
  const teacherDeleteHandler = async () => {
    try {
      if (confirm('회원 탈퇴 하시겠습니까?') === true) {
        const res = await handleSignupDelete({
          userClass: 'teacher',
          userIdx: localStorage.getItem('userIdx'),
        });

        if (res.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Delete Success!',
            text: 'Main Page Move...',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            // 로그아웃과 동일한 로직
            logoutAPI();
            localStorage.removeItem('log');
            setLogin(false);
            localStorage.removeItem('id');
            setUserId('');
            localStorage.removeItem('agencyType');
            setAgencyType('');
            localStorage.removeItem('userIdx');
            router.replace('/');
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Teacher Delete Fail',
          });
        }
      } else return;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PrivacyContainer>
      <PageContainer>
        <Title>강사 정보 수정</Title>
        <Form>
          <FormRow>
            <Label>이름</Label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </FormRow>
          <FormRow>
            <Label>소개글</Label>
            <input
              type="text"
              id="introduce"
              value={introduce}
              onChange={(e) => {
                setIntroduce(e.target.value);
              }}
            />
          </FormRow>
          <FormRow>
            <Label>희망 수업</Label>
            <CheckboxGroup>
              {possClassArr.map((el) => {
                const { id, title } = el;
                return (
                  <CheckboxWrapper key={id}>
                    <input
                      type="checkbox"
                      id={id}
                      value={id}
                      checked={possClass.includes(id)}
                      onChange={(e) => {
                        // 선택 취소
                        if (possClass.includes(id))
                          setPossClass([
                            ...possClass.filter((el) => el !== id),
                          ]);
                        // 선택
                        else
                          setPossClass([...possClass, Number(e.target.value)]);
                      }}
                    />
                    <label htmlFor={id}>{title}</label>
                  </CheckboxWrapper>
                );
              })}
            </CheckboxGroup>
          </FormRow>
          <FormRow>
            <Label>희망 지역</Label>
            <RadioGroup>
              {possLocalArr.map((el, index) => {
                return (
                  <>
                    <input
                      key={index}
                      type="radio"
                      id={el}
                      name="location"
                      checked={location === el}
                      onChange={() => {
                        // 지역 선택
                        setLocation(el);
                      }}
                    />
                    <label htmlFor={el}>{el}</label>
                  </>
                );
              })}
            </RadioGroup>
          </FormRow>
          <FormRow>
            <Label>희망 요일</Label>
            <CheckboxGroup>
              {possDayArr.map((day, index) => {
                return (
                  <CheckboxWrapper key={index}>
                    <input
                      type="checkbox"
                      id={day}
                      value={day}
                      checked={possDay.includes(day)}
                      onChange={() => {
                        // 선택 취소
                        if (possDay.includes(day))
                          setPossDay([...possDay.filter((el) => el !== day)]);
                        // 선택
                        else setPossDay([...possDay, day]);
                      }}
                    />
                    <label htmlFor={day}>{day}</label>
                  </CheckboxWrapper>
                );
              })}
            </CheckboxGroup>
          </FormRow>
          <FormRow>
            <Label>희망 시간대</Label>
            <CheckboxGroup>
              {partTimeArr.map((el, index) => {
                const { title, value } = el;
                return (
                  <CheckboxWrapper key={value}>
                    <input
                      type="checkbox"
                      id={value}
                      value={value}
                      checked={possTimes.includes(value)}
                      onChange={() => {
                        // 선택 취소
                        if (possTimes.includes(value))
                          setPossTimes([
                            ...possTimes.filter((el) => el !== value),
                          ]);
                        // 선택
                        else setPossTimes([...possTimes, value]);
                      }}
                    />
                    <label htmlFor={value}>{title}</label>
                  </CheckboxWrapper>
                );
              })}
            </CheckboxGroup>
          </FormRow>
          <FormRow>
            <Label>경력</Label>
            <input
              type="text"
              id="history"
              value={history}
              onChange={(e) => {
                setHistory(e.target.value);
              }}
            />
          </FormRow>
          <FormRow>
            <Label>학력</Label>
            <input
              type="text"
              id="education"
              value={education}
              onChange={(e) => {
                setEducation(e.target.value);
              }}
            />
          </FormRow>
          <FormRow>
            <Label>연락처</Label>
            <input
              type="text"
              id="phoneNum"
              value={phoneNum}
              onChange={(e) => {
                setPhoneNum(e.target.value);
              }}
            />
          </FormRow>
        </Form>

        <ButtonGroup>
          <CancelButton>취소</CancelButton>
          <SaveButton onClick={signupUpdateHandler}>확인</SaveButton>
        </ButtonGroup>
      </PageContainer>
      <Button onClick={teacherDeleteHandler}>회원 탈퇴</Button>
    </PrivacyContainer>
  );
};

const PrivacyContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 1.5rem;

  @media (max-width: 768px) {
    gap: 0.4rem;
  }
`;

const Button = styled.button`
  background-color: ${(props) => (props.attendTrigger ? '#61b15a' : '#CACACA')};
  color: white;
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 20px;

  font-size: 1rem;
  font-family: Pretendard;
  font-weight: 600;
  text-align: left;

  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    padding: 0.6rem;
    font-size: 0.8rem;
  }
`;

const PageContainer = styled.div`
  width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
  font-weight: bold;
`;

const ProfileImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 0.5rem;
`;

const UserName = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  border-top: 1px solid #ddd;
  padding: 0.5rem 0;
`;

const Label = styled.div`
  width: 80px;
  font-weight: bold;
  font-size: 0.9rem;
`;

const Text = styled.div`
  font-size: 0.9rem;
`;

const PasswordInput = styled.input`
  flex: 1;
  padding: 0.5rem;
  border: none;
  background: #f3f3f3;
  border-radius: 4px;
`;

const ResetButton = styled.button`
  padding: 0.5rem;
  background: none;
  color: #007bff;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
`;

const CancelButton = styled.button`
  flex: 1;
  background: #ddd;
  border: none;
  border-radius: 4px;
  padding: 0.75rem;
  margin-right: 0.5rem;
  font-weight: bold;
  cursor: pointer;
`;

const SaveButton = styled.button`
  flex: 1;
  background: #007bff;
  border: none;
  color: white;
  border-radius: 4px;
  padding: 0.75rem;
  font-weight: bold;
  cursor: pointer;
`;

export default TeacherTablePrivacyBody;
