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
    return '';
  }

  // getDay() 메서드를 사용하여 요일 인덱스를 가져옵니다.
  const dayIndex = date.getDay();

  // 요일 이름을 반환합니다.
  return days[dayIndex];
};

const todayCheckHandler = (date) => {
  const dateObj = new Date();
  const year = dateObj.getFullYear();
  const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
  const day = ('0' + dateObj.getDate()).slice(-2);
  const today = `${year}-${month}-${day}`;

  return new Date(today) < new Date(date);
};

const TeacherTableAttendBody = ({ data, page }) => {
  const [isPending, setIsPending] = useState(false); // 회원가입 버튼 활성화 state
  const [attendIdx, setAttendIdx] = useState(0);
  const [attendStatus, setAttendStatus] = useState(0);
  const [attendTrigger, setAttendTrigger] = useState(0);

  useEffect(() => {
    setAttendIdx(data.kk_attend_idx);
    setAttendStatus(data.kk_attend_status);
  }, [data]);

  useEffect(() => {
    setAttendTrigger(0);
  }, [page]);

  const attendUpdateHandler = async (e) => {
    e.preventDefault();
    // 미래 수업 변경 불가 Check
    if (todayCheckHandler(data.kk_attend_date)) {
      alert('아직 변경할 수 없습니다.');
      setAttendStatus(data.kk_attend_status);
      setAttendTrigger(0);
      return;
    }

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
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          // 화면 새로고침
          // window.location.reload();
          setAttendTrigger(0);
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
          <CheckboxContainer
            onClick={() => {
              setAttendStatus(1);
              setAttendTrigger(1);
            }}
          >
            <CheckboxWrapper status={attendStatus}>
              <CheckIcon />
            </CheckboxWrapper>
            <CheckboxLabel>출근</CheckboxLabel>
          </CheckboxContainer>
          <CheckboxContainer
            onClick={() => {
              setAttendStatus(0);
              setAttendTrigger(1);
            }}
          >
            <CheckboxWrapper status={!attendStatus}>
              <CheckIcon />
            </CheckboxWrapper>
            <CheckboxLabel>미출근</CheckboxLabel>
          </CheckboxContainer>
        </AttendContainer>
      </TableCell>
      <TableCell>
        <Button
          onClick={attendUpdateHandler}
          disabled={!attendTrigger}
          attendtrigger={attendTrigger}
        >
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

  @media (max-width: 768px) {
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

  @media (max-width: 768px) {
    min-width: 100px;
    padding: 0.3rem;
    font-size: 0.8rem;
    text-align: center;
  }
`;
const AttendContainer = styled.div`
  display: flex;
  align-items: center;

  gap: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.4rem;
  }
`;

const CheckboxContainer = styled.div`
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
  width: 30px;
  height: 30px;
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
  color: #61b15a;
  font-size: 1rem;
  font-family: Pretendard;
  font-weight: 700;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    min-width: 50px;
  }
`;

const Button = styled.button`
  background-color: ${(props) => (props.attendtrigger ? '#61b15a' : '#CACACA')};
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
export default TeacherTableAttendBody;
