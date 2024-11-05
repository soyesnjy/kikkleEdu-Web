import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { handleSignupDelete, handleSignupUpdate } from '@/fetchAPI/signupAPI';
import { handleClassGet } from '@/fetchAPI/classAPI';
import Image from 'next/image';

import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import { logoutAPI } from '@/fetchAPI';
import { useRecoilState } from 'recoil';
import { log, uid, agencyClass } from '@/store/state';

import CheckIcon from '@mui/icons-material/Check'; // Check 아이콘 사용

const possLocalArr = ['서울', '부산', '기타'];
const possDayArr = ['월', '화', '수', '목', '금', '토', '일'];
const partTimeArr = [
  { title: '오전 (10:00~12:00)', value: '오전' },
  { title: '오후 (1:00~5:00)', value: '오후' },
  { title: '야간 (5:00~10:00)', value: '야간' },
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
  const [possClass, setPossClass] = useState([]); // 희망 수업
  const [possDay, setPossDay] = useState([]); // 희망 요일
  const [possTimes, setPossTimes] = useState([]); // 희망 시간대
  const [location, setLocation] = useState(''); // 희망 지역
  const [history, setHistory] = useState(''); // 경력
  const [education, setEducation] = useState(''); // 학력

  const [profileImg, setProfileImg] = useState(null);
  // const [approveStatus, setApproveStatus] = useState(-1);
  // const [profilePreviewImg, setprofilePreviewImg] = useState(null);

  const initData = (data) => {
    setTeacherIdx(data.kk_teacher_idx);
    setName(data.kk_teacher_name);
    setIntroduce(data.kk_teacher_introduction);
    setPhoneNum(data.kk_teacher_phoneNum);

    setPossClass(
      data.kk_teacher_class_idxs
        ? [...data.kk_teacher_class_idxs.split('/').map((el) => Number(el))]
        : []
    ); // 수업 추가
    setPossDay(
      data.kk_teacher_dayofweek ? [...data.kk_teacher_dayofweek.split('/')] : []
    ); // 요일 추가
    setPossTimes(
      data.kk_teacher_time ? [...data.kk_teacher_time.split('/')] : []
    ); // 시간대 추가

    setLocation(data.kk_teacher_location);
    setHistory(data.kk_teacher_history);
    setEducation(data.kk_teacher_education);
  };

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
      initData(data);
    }
  }, [data]);

  // useEffect(() => {
  //   console.log(possClass);
  // }, [possClass]);

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
      <ProfileImageContainer>
        <Image
          src={
            data?.kk_teacher_profileImg_path ||
            '/src/Teacher_IMG/Teacher_Pupu_Profile_IMG.png'
          }
          alt="profile_IMG"
          width={187}
          height={200}
          style={{
            borderRadius: '10%',
          }}
        />
        <UserName>강사 {data?.kk_teacher_name}</UserName>
      </ProfileImageContainer>
      <PageContainer>
        <Form>
          <FormRow color={true}>
            <Label>이름</Label>
            <InputContainer>
              <StyledInput
                type="text"
                id="name"
                value={name}
                placeholder="김OO"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </InputContainer>
          </FormRow>
          <FormRow>
            <Label>소개글</Label>
            <InputContainer>
              <StyledInput
                type="text"
                id="introduce"
                value={introduce}
                placeholder="강사 김OO 입니다!"
                onChange={(e) => {
                  setIntroduce(e.target.value);
                }}
              />
            </InputContainer>
          </FormRow>
          <FormRow>
            <Label>경력</Label>
            <InputContainer>
              <StyledInput
                type="text"
                id="history"
                value={history}
                placeholder="댄스 강사 5년 / 발레 강사 3년"
                onChange={(e) => {
                  setHistory(e.target.value);
                }}
              />
            </InputContainer>
          </FormRow>
          <FormRow>
            <Label>학력</Label>
            <InputContainer>
              <StyledInput
                type="text"
                id="education"
                value={education}
                placeholder="OO대학교 학사 졸업"
                onChange={(e) => {
                  setEducation(e.target.value);
                }}
              />
            </InputContainer>
          </FormRow>
          <FormRow>
            <Label>연락처</Label>
            <InputContainer>
              <StyledInput
                type="text"
                id="phoneNum"
                value={phoneNum}
                placeholder="010-XXXX-XXXX"
                onChange={(e) => {
                  setPhoneNum(e.target.value);
                }}
              />
            </InputContainer>
          </FormRow>
          <FormRow color={true}>
            <Label>희망 수업</Label>
            <CheckboxGroup grid={true}>
              {possClassArr.map((el, index) => {
                const { id, title } = el;
                return (
                  <CheckboxContainer
                    key={index}
                    value={id}
                    onClick={(e) => {
                      // 선택 취소
                      if (possClass.includes(id))
                        setPossClass([...possClass.filter((el) => el !== id)]);
                      // 선택
                      else setPossClass([...possClass, id]);
                    }}
                  >
                    <CheckboxWrapper status={possClass.includes(id)}>
                      <CheckIcon fontSize="8px" />
                    </CheckboxWrapper>
                    <CheckboxLabel>{title}</CheckboxLabel>
                  </CheckboxContainer>

                  // 구버전 코드
                  // <CheckboxWrapper key={index}>
                  //   <StyledInput
                  //     type="checkbox"
                  //     id={id}
                  //     value={id}
                  //     checked={possClass.includes(id)}
                  // onChange={(e) => {
                  //   // 선택 취소
                  //   if (possClass.includes(id))
                  //     setPossClass([
                  //       ...possClass.filter((el) => el !== id),
                  //     ]);
                  //   // 선택
                  //   else
                  //     setPossClass([...possClass, Number(e.target.value)]);
                  // }}
                  //   />
                  //   <StyledLabel htmlFor={id}>{title}</StyledLabel>
                  // </CheckboxWrapper>
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
                    <StyledRadioInput
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
                    <StyledLabel htmlFor={el}>{el}</StyledLabel>
                  </>
                );
              })}
            </RadioGroup>
          </FormRow>
          <FormRow>
            <Label>요일</Label>
            <CheckboxGroup>
              {possDayArr.map((day, index) => {
                return (
                  <CheckboxContainer
                    key={index}
                    value={day}
                    onClick={() => {
                      // 선택 취소
                      if (possDay.includes(day))
                        setPossDay([...possDay.filter((el) => el !== day)]);
                      // 선택
                      else setPossDay([...possDay, day]);
                    }}
                  >
                    <CheckboxWrapper status={possDay.includes(day)}>
                      <CheckIcon fontSize="8px" />
                    </CheckboxWrapper>
                    <CheckboxLabel>{day}</CheckboxLabel>
                  </CheckboxContainer>
                );
              })}
            </CheckboxGroup>
          </FormRow>
          <FormRow bottomColor={true}>
            <Label>시간</Label>
            <CheckboxGroup>
              {partTimeArr.map((el, index) => {
                const { title, value } = el;
                return (
                  <CheckboxContainer
                    key={index}
                    value={value}
                    onClick={(e) => {
                      // 선택 취소
                      if (possTimes.includes(value))
                        setPossTimes([
                          ...possTimes.filter((el) => el !== value),
                        ]);
                      // 선택
                      else setPossTimes([...possTimes, value]);
                    }}
                  >
                    <CheckboxWrapper status={possTimes.includes(value)}>
                      <CheckIcon fontSize="8px" />
                    </CheckboxWrapper>
                    <CheckboxLabel>{title}</CheckboxLabel>
                  </CheckboxContainer>
                );
              })}
            </CheckboxGroup>
          </FormRow>
        </Form>
        <Button onClick={teacherDeleteHandler}>탈퇴하기</Button>
        <ButtonGroup>
          <SaveButton onClick={signupUpdateHandler}>저장하기</SaveButton>
          <CancelButton
            onClick={() => {
              // 기존 강사 정보로 초기화
              initData(data);
            }}
          >
            취소하기
          </CancelButton>
        </ButtonGroup>
      </PageContainer>
    </PrivacyContainer>
  );
};

const PrivacyContainer = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: flex-start;

  gap: 3rem;

  padding: 1rem;

  @media (max-width: 768px) {
  }
`;

const Button = styled.button`
  margin-left: auto;
  background-color: white;
  color: #606c76;
  padding: 0.5rem 2rem;
  border-radius: 8px;

  border: 1px solid #606c76;

  font-size: 1rem;
  font-family: Pretendard;
  font-weight: 400;
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
  width: 70%;
  padding-bottom: 2rem;
  background: white;
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 1rem;
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
  gap: 1rem;
`;

const UserName = styled.div`
  font-family: Pretendard;
  font-weight: 600;
  font-size: 1.5rem;
`;

const Form = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const FormRow = styled.div`
  display: flex;
  align-items: center;

  gap: 1rem;
  border-top: ${(props) =>
    props.color ? '2.5px solid #45B26B' : '1px solid #ddd'};
  border-bottom: ${(props) => (props.bottomColor ? '2px solid #45B26B' : '')};
  padding: 0.5rem 0;
`;

const Label = styled.div`
  height: 100%;
  flex: 1;
  min-width: 80px;
  font-family: Pretendard;
  font-weight: 600;
  font-size: 0.9rem;
  text-align: center;
  color: #45b26b;

  user-select: none;
`;

const InputContainer = styled.div`
  flex: 4;

  display: flex;
  justify-content: center;
  align-items: center;

  border-left: 1px solid #ddd;

  padding: 1rem 0;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.3rem 0;

  font-family: Pretendard;
  font-weight: 600;
  font-size: 0.9rem;

  border: none;
  text-align: center;
`;

const StyledLabel = styled.label`
  font-family: Pretendard;
  font-weight: 600;
  font-size: 0.9rem;

  cursor: pointer;
`;

const CheckboxGroup = styled.div`
  flex: 4;

  display: ${(props) => (props.grid ? 'grid' : 'flex')};
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  grid-template-columns: repeat(5, 2fr);

  gap: ${(props) => (props.grid ? '1rem' : '2rem')};

  border-left: 1px solid #ddd;

  padding: 1.5rem 0rem;
`;

const CheckboxContainer = styled.div`
  padding-left: 1rem;

  display: flex;
  align-items: center;

  cursor: pointer;

  @media (max-width: 768px) {
  }
`;

const CheckboxWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 20px;
  height: 20px;
  border-radius: 8px;
  background-color: ${({ status }) => (status ? '#61b15a' : '#e0e0e0')};
  color: white;
  margin-right: 0.5rem;

  @media (max-width: 768px) {
    width: 20px;
    height: 20px;
  }
`;

const CheckboxLabel = styled.span`
  font-size: 0.9rem;
  font-family: Pretendard;
  font-weight: 600;
  text-align: left;

  white-space: pre;
  user-select: none;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    min-width: 50px;
  }
`;

const RadioGroup = styled.div`
  flex: 4;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  border-left: 1px solid #ddd;
  user-select: none;

  padding: 1rem 0;
`;

const StyledRadioInput = styled.input`
  -webkit-appearance: none; // 웹킷 브라우저에서 기본 스타일 제거
  -moz-appearance: none; // 모질라 브라우저에서 기본 스타일 제거
  appearance: none; // 기본 브라우저에서 기본 스타일 제거
  width: 13px;
  height: 13px;
  border: 1px solid #ccc; // 체크되지 않았을 때의 테두리 색상
  border-radius: 50%;
  outline: none; // focus 시에 나타나는 기본 스타일 제거
  cursor: pointer;

  &:checked {
    background-color: #45b26b; // 체크 시 내부 원 색상
    border: 1px solid #fff; // 라인이 아닌, 라인과 원 사이 색상
    box-shadow: 0 0 0 1px #45b26b; // 라인
  }
`;

const ButtonGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const CancelButton = styled.button`
  background: #606c76;
  border: none;
  border-radius: 8px;
  padding: 1rem 2.5rem;
  margin-right: 0.5rem;

  color: white;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;

  cursor: pointer;
`;

const SaveButton = styled.button`
  background: #378e56;
  border: none;
  border-radius: 8px;
  padding: 1rem 2.5rem;

  color: white;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;

  cursor: pointer;
`;

export default TeacherTablePrivacyBody;
