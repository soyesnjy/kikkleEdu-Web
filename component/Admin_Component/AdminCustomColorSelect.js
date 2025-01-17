import React, { useState } from 'react';
import styled from 'styled-components';

export default function AdminCustomColorSelect({
  colors,
  setUpdatedBackColor,
}) {
  const [selectedColor, setSelectedColor] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (color) => {
    setSelectedColor(color);
    setUpdatedBackColor(color.value);
    setIsOpen(false);
  };

  return (
    <ColorSelectWrapper>
      <SelectedColor onClick={() => setIsOpen(!isOpen)}>
        {selectedColor.value && (
          <ColorSmallBox backColor={selectedColor.value} />
        )}
        <label>{selectedColor.label || '색상을 선택하세요'}</label>
      </SelectedColor>
      {isOpen && (
        <Dropdown>
          {colors.map((color) => (
            <DropdownItem key={color.value} onClick={() => handleSelect(color)}>
              <ColorSmallBox backColor={color.value} />
              <span>{color.label}</span>
            </DropdownItem>
          ))}
        </Dropdown>
      )}
    </ColorSelectWrapper>
  );
}

const ColorSelectWrapper = styled.div`
  width: 100%;
  position: relative;

  font-size: 0.9rem;
  font-family: Pretendard;
  font-weight: 400;
  text-align: left;
`;

const SelectedColor = styled.div`
  padding: 0.3rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;

  label {
    width: 100%;
    text-align: center;
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
  padding: 0.5rem;
  display: flex;
  align-items: center;
  cursor: pointer;

  span {
    width: 100%;
    text-align: center;
  }

  &:hover {
    background-color: #f0f0f0;
  }
`;

const ColorSmallBox = styled.div`
  width: 25px;
  height: 20px;
  background-color: ${(props) => props.backColor || 'none'};
  border-radius: 4px;
  margin-right: 0.5rem;
`;
