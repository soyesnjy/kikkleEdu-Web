import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  handleReservationUpdate,
  handleReservationDelete,
} from '@/fetchAPI/reservationAPI';
import Swal from 'sweetalert2';
import AdminCalendar from './AdminCalendar';
import Calendar from '@/component/MyPage_Component/Calendar';

const getUniqueWeekdays = (dateArr) => {
  const weekdays = ['월', '화', '수', '목', '금', '토', '일'];

  // 요일 정렬용 매핑
  const dayIndex = weekdays.reduce((acc, day, index) => {
    acc[day] = index;
    return acc;
  }, {});

  // console.log(dayIndex);

  const sortDays = (arr) => arr.sort((a, b) => dayIndex[a] - dayIndex[b]);

  // 날짜를 요일로 변환해 중복 제거 후 정렬
  const uniqueWeekdays = Array.from(
    new Set(
      dateArr
        .map((dateString) => {
          const date = new Date(dateString);
          if (isNaN(date)) return null; // 유효성 체크
          return weekdays[date.getDay() === 0 ? 6 : date.getDay() - 1]; //
        })
        .filter((day) => day !== null) // 유효하지 않은 날짜 필터링
    )
  );
  return sortDays(uniqueWeekdays);
};

const areArraysEqual = (arr1, arr2) => {
  // 배열의 길이가 다르면 true 반환
  if (arr1.length !== arr2.length) return true;

  // 배열을 정렬한 후 비교
  const sortedArr1 = [...arr1].sort(); // 원본 배열 변경 방지
  const sortedArr2 = [...arr2].sort();

  for (let i = 0; i < sortedArr1.length; i++) {
    if (sortedArr1[i] !== sortedArr2[i]) {
      return true;
    }
  }

  return false;
};

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

const AdminTableReservationBody = ({ data }) => {
  const [updateFlag, setUpdateFlag] = useState(false);
  const [isPending, setIsPending] = useState(false); // 회원가입 버튼 활성화 state
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

  const [reservationIdx, setReservationIdx] = useState(0);
  const [dateArr, setDateArr] = useState([]);
  const [dayArr, setDayArr] = useState([]);
  const [teacherArr, setTeacherArr] = useState([]);
  const [matchingTeacher, setMatchingTeacher] = useState(null);
  const [approveStatus, setApproveStatus] = useState(-1);
  const [updatedDateArr, setUpdatedDateArr] = useState([]);

  useEffect(() => {
    setReservationIdx(data.kk_reservation_idx);
    // setName(data.kk_agency_name);
    // setPhoneNum(data.kk_agency_phoneNum);
    if (data.kk_reservation_date) {
      setDateArr(data.kk_reservation_date.split('/')); // 예약 날짜 Array
      setUpdatedDateArr(data.kk_reservation_date.split('/')); // 예약 수정 날짜 Array (초기값)
    }
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
    // setPartTime(data.kk_reservation_time);
    setMatchingTeacher(data.kk_teacher_idx);
    setApproveStatus(data.kk_reservation_approve_status);
  }, [data]);

  useEffect(() => {
    // console.log(dateArr);
    if (dateArr.length) {
      setDayArr([...getUniqueWeekdays(dateArr)]);
    }
  }, [dateArr]);

  // 예약 수정 핸들러
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
          // 날짜 수정 || 첫 강사 매칭일 경우
          ...((areArraysEqual(dateArr, updatedDateArr) ||
            !data.kk_teacher_idx) && {
            dateArr: updatedDateArr,
          }),
          // attendTrigger: 처음 강사를 매칭시킬 경우 출석 Table Insert Trigger
          attendTrigger: !data.kk_teacher_idx,
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
  // 예약 삭제 핸들러
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
          <TableCell>{formatPhoneNumber(data.kk_agency_phoneNum)}</TableCell>
          <TableCell>{data.kk_class_title}</TableCell>
          <TableCell>
            <CellContainer>
              {`${dateArr[0]}\n ${dateArr[dateArr.length - 1]}`}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  // alert('개발중...');
                  setIsOpen(!isOpen);
                }}
              >
                전체보기
              </button>
            </CellContainer>
          </TableCell>
          <TableCell>
            {data.kk_teacher_idx ? (
              teacherArr.filter((el) => el.idx === data.kk_teacher_idx)[0]?.name
            ) : (
              <NonMatchingSpan>미정</NonMatchingSpan>
            )}
          </TableCell>
          <TableCell>{dayArr.join('/')}</TableCell>
          <TableCell>{data.kk_reservation_time}</TableCell>
          {/* <TableCell>진행중</TableCell> */}
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

          {isOpen && (
            <ReservationModalContainer
              isOpen={isOpen}
              onClick={(e) => {
                if (e.target !== e.currentTarget) return;
                setIsOpen(!isOpen);
              }}
            >
              <ReservationModalContentContainer>
                <ReservationModalContentHeaderContainer>
                  <ReservationModalHeaderTitle>
                    {`전체 날짜 (총 ${dateArr.length}일)`}
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
          )}
        </TableRow>
      ) : (
        <TableRow>
          <TableCell>{data.kk_reservation_idx}</TableCell>
          <TableCell>{data.kk_agency_name}</TableCell>
          <TableCell>{formatPhoneNumber(data.kk_agency_phoneNum)}</TableCell>
          <TableCell>{data.kk_class_title}</TableCell>
          <TableCell>
            <CellContainer>
              {`${updatedDateArr[0]}\n ${updatedDateArr[updatedDateArr.length - 1]}`}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  // alert('개발중...');
                  setIsUpdateOpen(!isUpdateOpen);
                }}
              >
                날짜수정
              </button>
            </CellContainer>
          </TableCell>
          <TableCell>
            <select
              id="pet-select"
              value={matchingTeacher}
              onChange={(e) => setMatchingTeacher(Number(e.target.value))}
            >
              <option value="-1">선택</option>
              {teacherArr.map((el) => {
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
          {/* <TableCell>진행중</TableCell> */}
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
          {isUpdateOpen && (
            <ReservationModalContainer
              isOpen={isUpdateOpen}
              onClick={(e) => {
                if (e.target !== e.currentTarget) return;
                setIsUpdateOpen(!isUpdateOpen);
              }}
            >
              <ReservationModalContentContainer>
                <ReservationModalContentHeaderContainer>
                  <ReservationModalHeaderTitle>
                    {`Updated All Reservation Dates\n(총 ${updatedDateArr.length}일)`}
                  </ReservationModalHeaderTitle>
                  <CloseButton
                    onClick={(e) => {
                      e.preventDefault();
                      setIsUpdateOpen(!isUpdateOpen);
                    }}
                  >
                    <CloseIcon />
                  </CloseButton>
                </ReservationModalContentHeaderContainer>
                <Calendar setDate={setUpdatedDateArr} date={updatedDateArr} />
              </ReservationModalContentContainer>
            </ReservationModalContainer>
          )}
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
  max-width: 100px;

  padding: 1rem 0.4rem;
  padding-left: 1rem;
  border-bottom: 1px solid #ddd;

  font-size: 0.9rem;
  font-family: Pretendard;
  font-weight: 700;
  text-align: left;

  select,
  a {
    text-decoration: none;
    font-size: 0.9rem;
    font-family: Pretendard;
    font-weight: 700;
    text-align: left;

    option {
      font-size: 0.9rem;
      font-family: Pretendard;
      font-weight: 700;
      text-align: left;

      :hover {
        background-color: white;
        opacity: 0.8;
      }
    }

    :nth-child(2) {
      color: blue;
    }
    :nth-child(3) {
      color: red;
    }
  }

  @media (max-width: 768px) {
    min-width: 100px;
    padding: 0.3rem;
    font-size: 0.8rem;
    text-align: center;
  }
`;

const NonMatchingSpan = styled.span`
  color: red;

  font-size: 0.9rem;
  font-family: Pretendard;
  font-weight: 700;
  text-align: left;
`;

const CellContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;

  font-size: 0.8rem;
  font-family: Pretendard;
  font-weight: 600;
  text-align: left;

  white-space: pre-line;

  button {
    width: 70px;
    padding: 0.1rem 0;
    background-color: #61b15a;
    color: white;
    border-radius: 6px;
    border: 1px solid gray;

    font-size: 0.8rem;
    font-family: Pretendard;
    font-weight: 600;
    text-align: center;

    cursor: pointer;
  }

  @media (max-width: 768px) {
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

  :nth-child(1) {
    background-color: #61b15a;
    color: white;
  }

  :nth-child(2) {
    background-color: rgb(249, 25, 25);
    color: white;
  }
`;

const Button = styled.button`
  padding: 0.2rem 0.4rem;
  border-radius: 8px;

  cursor: pointer;

  font-size: 0.9rem;
  font-family: Pretendard;
  font-weight: 600;
  text-align: left;
`;

// Modal 관련
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

  white-space: pre;
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

export default AdminTableReservationBody;
