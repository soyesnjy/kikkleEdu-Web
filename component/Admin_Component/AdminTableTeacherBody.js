/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { handleSignupUpdate, handleSignupDelete } from '@/fetchAPI/signupAPI';
import Swal from 'sweetalert2';
import CheckIcon from '@mui/icons-material/Check'; // Check 아이콘 사용
import Image from 'next/image';
// import { loadingImg } from '@/component/Common_Component/LoadingBase64';

const partTimeArr = [
  { title: '오전 (10:00~12:00)', value: '오전' },
  { title: '오후 (1:00~5:00)', value: '오후' },
  { title: '야간 (6:00~10:00)', value: '야간' },
];

const formatPhoneNumber = (phone) => {
  // `+82`로 시작하지 않으면 그대로 반환
  if (!phone?.startsWith('+82')) return phone;

  // 국가번호(+82) 제거하고 나머지 번호만 추출
  const numbers = phone.slice(3);

  // 뒤에서부터 8자리 추출 (010-xxxx-xxxx 형식)
  const lastEightDigits = numbers.slice(-8);

  // 4자리씩 나누어 형식에 맞게 조합
  return `010-${lastEightDigits.slice(0, 4)}-${lastEightDigits.slice(4)}`;
};

const AdminTableTeacherBody = ({ data }) => {
  const [updateFlag, setUpdateFlag] = useState(false);
  const [isPending, setIsPending] = useState(false); // 회원가입 버튼 활성화 state

  const [teacherIdx, setTeacherIdx] = useState(0);
  const [introduce, setIntroduce] = useState('');
  const [name, setName] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [profileImg, setProfileImg] = useState(null);
  const [possTimes, setPossTimes] = useState([]); // 희망 시간대
  const [location, setLocation] = useState('');
  const [history, setHistory] = useState('');
  const [education, setEducation] = useState('');
  // const [file, setFile] = useState(null);
  const [approveStatus, setApproveStatus] = useState(-1);
  const [profilePreviewImg, setprofilePreviewImg] = useState(null);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setTeacherIdx(data.kk_teacher_idx);
    setIntroduce(data.kk_teacher_introduction);
    setName(data.kk_teacher_name);
    setPhoneNum(data.kk_teacher_phoneNum);
    setPossTimes(
      data.kk_teacher_time ? [...data.kk_teacher_time.split('/')] : []
    ); // 시간대 추가
    // setProfileImg(data.kk_teacher_profileImg_path);
    setLocation(data.kk_teacher_location);
    setHistory(data.kk_teacher_history);
    setEducation(data.kk_teacher_education);
    setApproveStatus(data.kk_teacher_approve_status);
  }, [data]);

  // profileImg 변경 핸들러
  const handleProfileImgChange = (e) => {
    const selectedFile = e.target.files[0];
    setProfileImg(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setprofilePreviewImg(event.target.result); // 이미지 미리보기 URL 설정
      };
      reader.readAsDataURL(selectedFile); // 파일을 데이터 URL로 변환
    }
  };

  // 강사 정보 update 핸들러
  const signupUpdateHandler = async (e) => {
    e.preventDefault();
    // 수정 확인 버튼 비활성화

    if (approveStatus === -1) {
      alert('승인 여부를 선택하세요');
      return;
    }

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
            possTimes,
            location,
            history,
            education,
            fileData: {
              fileName: profileImg.name,
              fileType: profileImg.type,
              baseData: base64Data,
            },
            approveStatus,
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
            possTimes,
            location,
            history,
            education,
            approveStatus,
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
  const signupDeleteHandler = async () => {
    try {
      if (confirm('삭제 하시겠습니까?') === true) {
        const res = await handleSignupDelete({
          userClass: 'teacher',
          userIdx: teacherIdx,
        });

        if (res.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Delete Success!',
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
            title: 'Sign Up Fail',
          });
        }
      } else return;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {!updateFlag ? (
        <TableRow>
          <TableCell>{data.kk_teacher_idx}</TableCell>
          <TableCell>
            <div>{data.kk_teacher_uid}</div>
            <div>{data.kk_teacher_pwd}</div>
          </TableCell>
          <TableCell>{data.kk_teacher_name}</TableCell>
          <TableCell>{data.kk_teacher_introduction}</TableCell>
          <TableCell>{formatPhoneNumber(data.kk_teacher_phoneNum)}</TableCell>
          <TableCell>
            {data.kk_teacher_profileImg_path ? (
              <ShowContainer>
                <StyledA href={data.kk_teacher_profileImg_path} target="_blank">
                  Link
                </StyledA>
                <ShowButton
                  // href={data.kk_teacher_profileImg_path}
                  target="_blank"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {isOpen ? 'close' : 'open'}
                </ShowButton>
                {isOpen && (
                  <Image
                    key={data.kk_teacher_profileImg_path}
                    src={data.kk_teacher_profileImg_path}
                    alt="Icon"
                    width={56}
                    height={56}
                    style={{ maxWidth: '100%', height: 'auto' }}
                    placeholder="blur"
                    blurDataURL={`/loading.svg`}
                  />
                )}
              </ShowContainer>
            ) : (
              'X'
            )}
          </TableCell>
          <TableCell>{data.kk_teacher_location}</TableCell>
          <TableCell>{data.kk_teacher_dayofweek}</TableCell>
          <TableCell>{data.kk_teacher_time}</TableCell>
          <TableCell>{data.kk_teacher_history}</TableCell>
          <TableCell>{data.kk_teacher_education}</TableCell>
          <TableCell>
            <a href={data.kk_teacher_file_path} target="_blank">
              Download
            </a>
          </TableCell>
          <TableCell>
            <Status status={data.kk_teacher_approve_status}>
              {data.kk_teacher_approve_status === 0 ? '미승인' : '승인'}
            </Status>
          </TableCell>
          <TableCell>
            <ButtonContainer>
              <Button
                onClick={() => {
                  setUpdateFlag(true);
                }}
              >
                수정
              </Button>
              <Button onClick={signupDeleteHandler}>삭제</Button>
            </ButtonContainer>
          </TableCell>
        </TableRow>
      ) : (
        <TableRow>
          <TableCell>{data.kk_teacher_idx}</TableCell>
          <TableCell>
            {data.kk_teacher_uid} / {data.kk_teacher_pwd}
          </TableCell>
          <TableCell>
            <StyledInput
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </TableCell>
          <TableCell>
            <StyledTextArea
              value={introduce}
              onChange={(e) => setIntroduce(e.target.value)}
            />
          </TableCell>
          <TableCell>
            <StyledInput
              value={formatPhoneNumber(phoneNum)}
              onChange={(e) => setPhoneNum(e.target.value)}
            />
          </TableCell>
          <TableCell>
            <StyledInput
              type="file"
              accept=".jpg, .png, .jpeg"
              onChange={handleProfileImgChange}
            />
            {profilePreviewImg && (
              <PreviewImage src={profilePreviewImg} alt="미리보기 이미지" />
            )}
          </TableCell>
          <TableCell>
            <select
              id="pet-select"
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="서울">서울</option>
              <option value="부산">부산</option>
              <option value="부산">기타</option>
            </select>
          </TableCell>
          <TableCell>{data.kk_teacher_dayofweek}</TableCell>
          <TableCell>
            <CheckboxGroup grid={1}>
              {partTimeArr.map((el, index) => {
                const { value } = el;
                return (
                  <CheckboxContainer
                    key={index}
                    value={value}
                    onClick={() => {
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
                    <CheckboxLabel>{value}</CheckboxLabel>
                  </CheckboxContainer>
                );
              })}
            </CheckboxGroup>
          </TableCell>
          <TableCell>
            <StyledTextArea
              value={history}
              onChange={(e) => setHistory(e.target.value)}
            />
          </TableCell>
          <TableCell>
            <StyledTextArea
              value={education}
              onChange={(e) => setEducation(e.target.value)}
            />
          </TableCell>
          <TableCell>
            <a href={data.kk_teacher_file_path} target="_blank">
              Download
            </a>
          </TableCell>
          <TableCell>
            {/* <Status status={data.kk_teacher_approve_status}>
              {data.kk_teacher_approve_status === 0 ? '미승인' : '승인'}
            </Status> */}
            <select
              id="pet-select"
              value={approveStatus}
              onChange={(e) => setApproveStatus(Number(e.target.value))}
            >
              <option value="-1">선택</option>
              <option value="1">승인</option>
              <option value="0">미승인</option>
            </select>
          </TableCell>
          <TableCell>
            <ButtonContainer>
              <Button onClick={signupUpdateHandler} disabled={isPending}>
                확인
              </Button>
              <Button
                onClick={() => {
                  setUpdateFlag(false);
                }}
                disabled={isPending}
              >
                취소
              </Button>
            </ButtonContainer>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableCell = styled.td`
  max-width: 150px;
  padding: 1rem 0.4rem;
  border-bottom: 1px solid #ddd;

  font-size: 0.9rem;
  font-family: Pretendard;
  font-weight: 700;
  text-align: left;

  @media (max-width: 768px) {
    min-width: 100px;
    padding: 0.3rem;
    font-size: 0.8rem;
    text-align: center;
  }
`;

const ShowContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 0.5rem;
`;

const StyledA = styled.a`
  text-decoration: none;

  font-size: 0.9rem;
  font-family: Pretendard;
  font-weight: 700;
  text-align: left;
`;

const ShowButton = styled.button`
  text-decoration: none;

  font-size: 0.7rem;
  font-family: Pretendard;
  font-weight: 700;
  text-align: left;
`;

const Status = styled.span`
  color: ${({ status }) => (status ? 'blue' : 'red')};
  font-size: 0.9rem;
  font-family: Pretendard;
  font-weight: 700;
  text-align: left;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Button = styled.button`
  padding: 0.2rem 0.4rem;
`;

const StyledInput = styled.input`
  max-width: 7rem;
`;

const StyledTextArea = styled.textarea`
  max-width: 9rem;
`;

const PreviewImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-top: 1rem;
  border: 2px solid #ddd;

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
  }
`;

const CheckboxGroup = styled.div`
  flex: 4;

  display: ${(props) => (props.grid ? 'grid' : 'flex')};
  justify-content: center;
  align-items: center;

  grid-template-columns: ${(props) =>
    props.grid ? `repeat(${props.grid}, 2fr)` : ''};

  gap: 0.2rem;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
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
    font-size: 0.7rem;
  }
`;

export default AdminTableTeacherBody;
