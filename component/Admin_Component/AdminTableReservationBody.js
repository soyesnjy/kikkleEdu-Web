import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  handleReservationUpdate,
  handleReservationDelete,
} from '@/fetchAPI/reservationAPI';
import Swal from 'sweetalert2';
import AdminCalendar from './AdminCalendar';

const getUniqueWeekdays = (dateArr) => {
  const weekdays = ['월', '화', '수', '목', '금', '토', '일'];

  // 요일 정렬용 매핑
  const dayIndex = weekdays.reduce((acc, day, index) => {
    acc[day] = index;
    return acc;
  }, {});

  const sortDays = (arr) => arr.sort((a, b) => dayIndex[a] - dayIndex[b]);

  // 날짜를 요일로 변환해 중복 제거 후 정렬
  const uniqueWeekdays = Array.from(
    new Set(
      dateArr
        .map((dateString) => {
          const date = new Date(dateString);
          if (isNaN(date)) return null; // 유효성 체크
          return weekdays[date.getDay()];
        })
        .filter((day) => day !== null) // 유효하지 않은 날짜 필터링
    )
  );

  return sortDays(uniqueWeekdays);
};

const AdminTableReservationBody = ({ data }) => {
  const [updateFlag, setUpdateFlag] = useState(false);
  const [isPending, setIsPending] = useState(false); // 회원가입 버튼 활성화 state
  const [isOpen, setIsOpen] = useState(false);

  const [reservationIdx, setReservationIdx] = useState(0);
  const [name, setName] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [dateArr, setDateArr] = useState([]);
  const [dayArr, setDayArr] = useState([]);
  const [partTime, setPartTime] = useState('');
  const [teacherArr, setTeacherArr] = useState([]);
  const [matchingTeacher, setMatchingTeacher] = useState(null);
  const [approveStatus, setApproveStatus] = useState(-1);

  useEffect(() => {
    setReservationIdx(data.kk_reservation_idx);
    setName(data.kk_agency_name);
    setPhoneNum(data.kk_agency_phoneNum);
    if (data.kk_reservation_date)
      setDateArr(data.kk_reservation_date.split('/')); // 예약 날짜 Array
    if (data.teacher_info)
      setTeacherArr(
        data.teacher_info.split('|').map((el) => {
          const [id_entry, name_entry] = el.split(',');
          const [id_key, id_value] = id_entry.split(':');
          const [name_key, name_value] = name_entry.split(':');
          // console.log({ idx: Number(id_value), name: name_value });
          return { idx: Number(id_value), name: name_value };
        })
      );
    setPartTime(data.kk_reservation_time);
    setMatchingTeacher(data.kk_teacher_idx);
    setApproveStatus(data.kk_reservation_approve_status);
  }, [data]);

  useEffect(() => {
    if (dateArr.length) {
      setDayArr([...getUniqueWeekdays(dateArr)]);
    }
  }, [dateArr]);

  const reservationUpdateHandler = async (e) => {
    e.preventDefault();

    if (matchingTeacher === -1 || !matchingTeacher) {
      alert('강사를 확정하세요');
      return;
    }
    // 수정 확인 버튼 비활성화
    if (approveStatus === -1) {
      alert('승인 여부를 선택하세요');
      return;
    }

    setIsPending(true);
    try {
      const res = await handleReservationUpdate({
        SignUpData: {
          reservationIdx,
          teacherIdx: matchingTeacher,
          dateArr,
          attendTrigger: !data.kk_teacher_idx, // attendTrigger: 처음 강사를 매칭시킬 경우 출석 Table Insert Trigger
          approveStatus,
        },
      });

      if (res.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Reservation Update Success!',
          text: 'Reloading...',
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

  const reservationDeleteHandler = async () => {
    try {
      if (confirm('삭제 하시겠습니까?') === true) {
        const res = await handleReservationDelete({
          reservationIdx,
        });

        if (res.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Reservation Delete Success!',
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
            title: 'Reservation Delete Fail',
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
          <TableCell>{data.kk_reservation_idx}</TableCell>
          <TableCell>{data.kk_agency_name}</TableCell>
          <TableCell>{data.kk_agency_phoneNum}</TableCell>
          <TableCell>{data.kk_class_title}</TableCell>
          <TableCell>
            {dateArr[0]} ~ {dateArr[dateArr.length - 1]} -{' '}
            <button
              onClick={(e) => {
                e.preventDefault();
                // alert('개발중...');
                setIsOpen(!isOpen);
              }}
            >
              전체보기
            </button>
          </TableCell>
          <TableCell>
            {data.kk_teacher_idx
              ? teacherArr.filter((el) => el.idx === data.kk_teacher_idx)[0]
                  ?.name
              : 'Non Matching'}
          </TableCell>
          <TableCell>{dayArr.join('/')}</TableCell>
          <TableCell>{data.kk_reservation_time}</TableCell>
          <TableCell>개발중...</TableCell>
          <TableCell>
            <Status status={data.kk_reservation_approve_status}>
              {data.kk_reservation_approve_status === 0 ? '미승인' : '승인'}
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
              <Button onClick={reservationDeleteHandler}>삭제</Button>
            </ButtonContainer>
          </TableCell>

          <ReservationModalContainer isOpen={isOpen}>
            <ReservationModalContentContainer>
              <ReservationModalContentHeaderContainer>
                <ReservationModalHeaderTitle>
                  All Reservation
                </ReservationModalHeaderTitle>
                <CloseButton
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(!isOpen);
                  }}
                >
                  <CloseIcon />
                </CloseButton>
              </ReservationModalContentHeaderContainer>
              <AdminCalendar dateArr={dateArr} />
            </ReservationModalContentContainer>
          </ReservationModalContainer>
        </TableRow>
      ) : (
        <TableRow>
          <TableCell>{data.kk_reservation_idx}</TableCell>
          <TableCell>{data.kk_agency_name}</TableCell>
          <TableCell>{data.kk_agency_phoneNum}</TableCell>
          <TableCell>{data.kk_class_title}</TableCell>
          <TableCell>
            {dateArr[0]} ~ {dateArr[dateArr.length - 1]}
          </TableCell>
          <TableCell>
            <select
              id="pet-select"
              value={matchingTeacher}
              onChange={(e) => setMatchingTeacher(Number(e.target.value))}
            >
              <option value="-1">선택</option>
              {teacherArr.map((el, index) => {
                return (
                  <option key={el.idx} value={el.idx}>
                    {el.name}
                  </option>
                );
              })}
            </select>
          </TableCell>
          <TableCell>{dayArr.join('/')}</TableCell>
          <TableCell>{data.kk_reservation_time}</TableCell>
          <TableCell>개발중...</TableCell>
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
              <Button onClick={reservationUpdateHandler} disabled={isPending}>
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

  @media (max-width: 768px) {
  }
`;

const TableCell = styled.td`
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

const ReservationModalContainer = styled.div`
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

const ReservationModalContentContainer = styled.div`
  width: fit-content;
  height: 80%;
  background-color: white;
  border-radius: 16px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  padding: 2rem;

  gap: 2rem;

  @media (max-width: 768px) {
    height: 70%;
    padding: 1rem;
  }
`;

const ReservationModalContentHeaderContainer = styled.div`
  width: 100%;

  background-color: white;

  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const ReservationModalHeaderTitle = styled.span`
  font-family: Pretendard;
  font-weight: 700;
  font-size: 1.5rem;
  color: black;
`;

const CloseButton = styled.button`
  align-self: flex-end;
  background: none;
  border: none;
  cursor: pointer;
  margin-bottom: 20px;
`;

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

// const StyledInput = styled.input`
//   max-width: 7rem;
// `;

export default AdminTableReservationBody;
