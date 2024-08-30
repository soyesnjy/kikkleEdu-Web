import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { handleSignupDelete, handleSignupUpdate } from '@/fetchAPI/signupAPI';
import Swal from 'sweetalert2';

const TeacherTableMusicBody = ({ data }) => {
  const [updateFlag, setUpdateFlag] = useState(false);
  const [isPending, setIsPending] = useState(false); // 회원가입 버튼 활성화 state

  const [agencyIdx, setAgencyIdx] = useState(0);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [type, setType] = useState('');
  const [file, setFile] = useState(null); // 기관 첨부파일
  const [approveStatus, setApproveStatus] = useState(-1);

  useEffect(() => {
    setAgencyIdx(data.kk_agency_idx);
    setName(data.kk_agency_name);
    setAddress(data.kk_agency_address);
    setPhoneNum(data.kk_agency_phoneNum);
    setType(data.kk_agency_type);
    setApproveStatus(data.kk_agency_approve_status);
  }, [data]);

  const signupUpdateHandler = async (e) => {
    e.preventDefault();
    // 수정 확인 버튼 비활성화
    if (approveStatus === -1) {
      alert('승인 여부를 선택하세요');
      return;
    }

    setIsPending(true);
    try {
      const res = await handleSignupUpdate({
        SignUpData: {
          // pUid: email,
          userIdx: agencyIdx,
          userClass: 'agency',
          // passWord: pwd,
          // introduce,
          name,
          address,
          phoneNum,
          typeA: type,
          // location,
          // history,
          // education,
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
          title: 'Sign Up Success!',
          text: 'Login Page로 이동합니다',
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
      // 회원가입 버튼 활성화
      setIsPending(false);
    } catch (error) {
      console.error('기관 업데이트 실패:', error);
    }
  };

  const signupDeleteHandler = async () => {
    try {
      const res = await handleSignupDelete({
        userClass: 'agency',
        userIdx: agencyIdx,
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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {!updateFlag ? (
        <TableRow>
          <TableCell>{data.kk_agency_idx}</TableCell>
          <TableCell>
            <div>{data.kk_agency_uid}</div>
            <div>{data.kk_agency_pwd}</div>
          </TableCell>
          <TableCell>{data.kk_agency_name}</TableCell>
          <TableCell>{data.kk_agency_address}</TableCell>
          <TableCell>{data.kk_agency_phoneNum}</TableCell>
          <TableCell>{data.kk_agency_type}</TableCell>
          <TableCell>
            <a href={data.kk_agency_file_path}>Download</a>
          </TableCell>
          <TableCell>
            <Status status={data.kk_agency_approve_status}>
              {data.kk_agency_approve_status === 0 ? '미승인' : '승인'}
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
          <TableCell>{data.kk_agency_idx}</TableCell>
          <TableCell>
            <div>{data.kk_agency_uid}</div>
            <div>{data.kk_agency_pwd}</div>
          </TableCell>
          <TableCell>
            <StyledInput
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </TableCell>
          <TableCell>
            <StyledInput
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </TableCell>
          <TableCell>
            <StyledInput
              value={phoneNum}
              onChange={(e) => setPhoneNum(e.target.value)}
            />
          </TableCell>
          <TableCell>
            <select
              id="pet-select"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">선택</option>
              <option value="유치원">유치원</option>
              <option value="초등학교">초등학교</option>
              <option value="문화센터">문화센터</option>
              <option value="커뮤니티센터">커뮤니티센터</option>
              <option value="아동(복지)센터">아동(복지)센터</option>
            </select>
          </TableCell>
          <TableCell>
            <a href={data.kk_agency_file_path}>Download</a>
          </TableCell>
          <TableCell>
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
  max-width: 200px;

  padding: 1rem;
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

export default TeacherTableMusicBody;
