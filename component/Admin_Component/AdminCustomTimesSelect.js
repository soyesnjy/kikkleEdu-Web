import React, { useState } from 'react';
import styled from 'styled-components';

export default function AdminCustomTimesSelect({
  updatedCourseTimes,
  setUpdatedCourseTimes,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (time) => {
    setUpdatedCourseTimes(time);
    setIsOpen(false);
  };

  return (
    <TimesSelectWrapper>
      <SelectedTimes onClick={() => setIsOpen(!isOpen)}>
        <label>{`${updatedCourseTimes ? updatedCourseTimes + '분' : '수업시간을 선택하세요'}`}</label>
      </SelectedTimes>
      {isOpen && (
        <Dropdown>
          {[30, 40, 50, 60].map((time) => (
            <DropdownItem key={time} onClick={() => handleSelect(time)}>
              <span>{`${time}분`}</span>
            </DropdownItem>
          ))}
        </Dropdown>
      )}
    </TimesSelectWrapper>
  );
}

const TimesSelectWrapper = styled.div`
  width: 100%;
  position: relative;
`;

const SelectedTimes = styled.div`
  padding: 0.3rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;

  label {
    width: 100%;

    font-size: 0.9rem;
    font-family: Pretendard;
    font-weight: 400;
    text-align: left;
  }
`;

const Dropdown = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  list-style: none;
  margin: 0;
  padding: 0;
  z-index: 10;
`;

const DropdownItem = styled.li`
  width: 100%;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  cursor: pointer;

  span {
    width: 100%;
    font-size: 0.9rem;
    font-family: Pretendard;
    font-weight: 400;
    text-align: center;
  }

  &:hover {
    background-color: #f0f0f0;
  }
`;
