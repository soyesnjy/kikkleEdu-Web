import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { handleSignupUpdate, handleSignupDelete } from '@/fetchAPI/signupAPI';
import Swal from 'sweetalert2';

const AdminTableTeacherBody = ({ data }) => {
  const [updateFlag, setUpdateFlag] = useState(false);
  const [isPending, setIsPending] = useState(false); // 회원가입 버튼 활성화 state

  const [teacherIdx, setTeacherIdx] = useState(0);
  const [introduce, setIntroduce] = useState('');
  const [name, setName] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [profileImg, setProfileImg] = useState(null);
  const [location, setLocation] = useState('');
  const [history, setHistory] = useState('');
  const [education, setEducation] = useState('');
  // const [file, setFile] = useState(null);
  const [approveStatus, setApproveStatus] = useState(-1);

  useEffect(() => {
    setTeacherIdx(data.kk_teacher_idx);
    setIntroduce(data.kk_teacher_introduction);
    setName(data.kk_teacher_name);
    setPhoneNum(data.kk_teacher_phoneNum);
    // setProfileImg(data.kk_teacher_profileImg_path);
    setLocation(data.kk_teacher_location);
    setHistory(data.kk_teacher_history);
    setEducation(data.kk_teacher_education);
    setApproveStatus(data.kk_teacher_approve_status);
  }, [data]);

  // useEffect(() => {
  //   console.log(typeof approveStatus);
  // }, [approveStatus]);

  const handleProfileImgChange = (e) => {
    const selectedFile = e.target.files[0];
    setProfileImg(selectedFile);
  };

  const signupUpdateHandler = async (e) => {
    e.preventDefault();
    // 수정 확인 버튼 비활성화

    if (approveStatus === -1) {
      alert('승인 여부를 선택하세요');
      return;
    }

    setIsPending(true);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Data = reader.result;
      try {
        const res = await handleSignupUpdate({
          SignUpData: {
            // pUid: email,
            userIdx: teacherIdx,
            userClass: 'teacher',
            // passWord: pwd,
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
    if (profileImg) reader?.readAsDataURL(profileImg);
    else {
      try {
        const res = await handleSignupUpdate({
          SignUpData: {
            // pUid: email,
            userIdx: teacherIdx,
            userClass: 'teacher',
            // passWord: pwd,
            introduce,
            name,
            phoneNum,
            location,
            history,
            education,
            // fileData: {
            //   fileName: profileImg.name,
            //   fileType: profileImg.type,
            //   baseData: base64Data,
            // },
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
          <TableCell>{data.kk_teacher_phoneNum}</TableCell>
          <TableCell>
            {data.kk_teacher_profileImg_path ? (
              <a href={data.kk_teacher_profileImg_path} target="_blank">
                Show
              </a>
            ) : (
              'None'
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
            <StyledInput
              value={introduce}
              onChange={(e) => setIntroduce(e.target.value)}
            />
          </TableCell>
          <TableCell>
            <StyledInput
              value={phoneNum}
              onChange={(e) => setPhoneNum(e.target.value)}
            />
          </TableCell>
          <TableCell>
            <StyledInput
              type="file"
              accept=".jpg"
              onChange={handleProfileImgChange}
            />
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
          <TableCell>{data.kk_teacher_time}</TableCell>
          <TableCell>
            <StyledInput
              value={history}
              onChange={(e) => setHistory(e.target.value)}
            />
          </TableCell>
          <TableCell>
            <StyledInput
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

export default AdminTableTeacherBody;
