import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Image from 'next/image';

const ReservationTeacherProfileCard = ({
  id,
  name,
  // introduce,
  imgUrl,
  setSelectedTeacher,
  selectedTeacher,
}) => {
  const [imageSrc, setImageSrc] = useState(null);

  // 이미지가 로드된 후 src를 상태로 저장
  useEffect(() => {
    if (imgUrl) {
      setImageSrc(imgUrl); // 로드할 이미지 경로 설정
    }
  }, [imgUrl]);

  return (
    <Wrapper selected={selectedTeacher.includes(id)}>
      <StyledImage
        src={
          imageSrc ? imageSrc : '/src/Teacher_IMG/Teacher_Ella_Profile_IMG.png'
        }
        alt="Background Image"
        width={300}
        height={300}
        style={{ maxWidth: '100%', height: '100%', borderRadius: '25px' }}
      />

      <Content>
        <Name>{name}</Name>
        {/* <Message>{introduce || `강사 ${name}입니다.`}</Message> */}
        <TeacherButton
          value={id}
          selected={selectedTeacher.includes(id)}
          onClick={(e) => {
            e.preventDefault();
            // setSelectedClass(Number(e.target.value));
            // 선택 취소
            if (selectedTeacher.includes(id))
              setSelectedTeacher([
                ...selectedTeacher.filter((el) => el !== id),
              ]);
            //
            else if (selectedTeacher.length > 2) alert('3명까지 선택 가능');
            // 선택
            else
              setSelectedTeacher([...selectedTeacher, Number(e.target.value)]);
          }}
        >
          {selectedTeacher.includes(id) ? '취소하기' : '선택하기'}
        </TeacherButton>
      </Content>
    </Wrapper>
  );
};

export default ReservationTeacherProfileCard;

const Wrapper = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  border-radius: 30px;

  background: linear-gradient(rgba(0, 0, 0, 0.7) 100%, black 0%);

  border: ${(props) => (props.selected ? '5px solid #45b26b' : 'none')};

  @media (max-width: 768px) {
    width: 160px;
    height: 170px;
  }
`;

const StyledImage = styled(Image)`
  opacity: 0.7;
  z-index: -1; /* 이미지가 가장 아래에 위치하도록 */
`;

const Content = styled.div`
  width: 100%;
  min-height: 100px;

  position: absolute;
  bottom: 0%;
  z-index: 1; /* 내용물이 이미지 위에 렌더링되도록 */

  padding: 1.5rem;

  color: black;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  gap: 1rem;

  z-index: 2;

  @media (max-width: 768px) {
    min-height: 30px;
    gap: 0.3rem;
    padding: 0.7rem;
  }
`;

const Name = styled.h2`
  font-family: Pretendard;
  font-weight: 700;
  font-size: 18px;
  color: white;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

// const Message = styled.p`
//   font-family: Pretendard;
//   font-weight: 600;
//   font-size: 12px;
//   color: white;

//   @media (max-width: 768px) {
//     font-size: 10px;
//   }
// `;

const TeacherButton = styled.button`
  background-color: white;

  padding: 0.5rem 1rem;

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
    min-height: fit-content;
    font-size: 0.7rem;
    padding: 0.5rem 1rem;
  }
`;
