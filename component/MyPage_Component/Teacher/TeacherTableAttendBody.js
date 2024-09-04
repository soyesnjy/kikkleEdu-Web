import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { handleMypageUpdate } from '@/fetchAPI/mypageAPI';
import Swal from 'sweetalert2';
import CheckIcon from '@mui/icons-material/Check'; // Check 아이콘 사용

const getDayName = (dateString) => {
  // 요일 배열을 만듭니다. 0: 일요일, 1: 월요일, ... , 6: 토요일
  const days = ['일', '월', '화', '수', '목', '금', '토'];

  // 입력된 문자열을 Date 객체로 변환합니다.
  const date = new Date(dateString);

  // 날짜가 유효한지 확인합니다.
  if (isNaN(date)) {
    return 'Invalid Date';
  }

  // getDay() 메서드를 사용하여 요일 인덱스를 가져옵니다.
  const dayIndex = date.getDay();

  // 요일 이름을 반환합니다.
  return days[dayIndex];
};

const TeacherTableAttendBody = ({ data }) => {
  const [isPending, setIsPending] = useState(false); // 회원가입 버튼 활성화 state

  const [attendIdx, setAttendIdx] = useState(0);
  const [attendStatus, setAttendStatus] = useState(0);

  useEffect(() => {
    setAttendIdx(data.kk_attend_idx);
    setAttendStatus(data.kk_attend_status);
  }, [data]);

  const attendUpdateHandler = async (e) => {
    e.preventDefault();
    // 수정 확인 버튼 비활성화
    // if (approveStatus === -1) {
    //   alert('승인 여부를 선택하세요');
    //   return;
    // }

    setIsPending(true);
    try {
      const res = await handleMypageUpdate({
        AttendData: {
          attendIdx,
          attendStatus,
        },
      });

      if (res.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Attend Update Success!',
          text: 'Login Page로 이동합니다',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          // 화면 새로고침
          // window.location.reload();
        });
      } else if (res.status === 403) {
        Swal.fire({
          icon: 'error',
          title: '중복된 이메일입니다',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Attend Update Fail',
        });
      }
      // 회원가입 버튼 활성화
      setIsPending(false);
    } catch (error) {
      console.error('출석 업데이트 실패:', error);
    }
  };

  return (
    <TableRow>
      <TableCell>{data.kk_class_title}</TableCell>
      <TableCell>{data.kk_agency_name}</TableCell>
      <TableCell>{data.kk_teacher_name}</TableCell>
      <TableCell>{data.kk_attend_date}</TableCell>
      <TableCell>{getDayName(data.kk_attend_date)}</TableCell>
      <TableCell>{data.kk_reservation_time}</TableCell>
      <TableCell>
        <AttendContainer>
          <CheckboxContainer onClick={() => setAttendStatus(1)}>
            <CheckboxWrapper status={attendStatus}>
              <CheckIcon />
            </CheckboxWrapper>
            <CheckboxLabel>출근</CheckboxLabel>
          </CheckboxContainer>
          <CheckboxContainer onClick={() => setAttendStatus(0)}>
            <CheckboxWrapper status={!attendStatus}>
              <CheckIcon />
            </CheckboxWrapper>
            <CheckboxLabel>출근 미완료</CheckboxLabel>
          </CheckboxContainer>
        </AttendContainer>
      </TableCell>
      <TableCell>
        <Button onClick={attendUpdateHandler} disabled={isPending}>
          저장하기
        </Button>
      </TableCell>
    </TableRow>
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
const AttendContainer = styled.div`
  display: flex;
  align-items: center;

  gap: 1.5rem;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;

  cursor: pointer;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background-color: ${({ status }) => (status ? '#61b15a' : '#e0e0e0')};
  color: white;
  margin-right: 0.5rem;
`;

const CheckboxLabel = styled.span`
  color: #61b15a;
  font-size: 1rem;
  font-family: Pretendard;
  font-weight: 700;
  text-align: left;
`;

const Button = styled.button`
  background-color: #61b15a;
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
`;
export default TeacherTableAttendBody;
