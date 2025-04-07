'use client';
import React, { useRef } from 'react';
import styled from 'styled-components';

const FileUploadComponent = ({ file, setFile }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 버튼 클릭 핸들러 (해당 버튼 클릭 시 HiddenFileInput 컴포넌트를 클릭한 것으로 간주)
  const handleButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // 파일 변경 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  return (
    <FileInputContainer>
      <FileName>{file?.name}</FileName>
      <CustomButton onClick={handleButtonClick}>{`첨부`}</CustomButton>
      <HiddenFileInput ref={fileInputRef} onChange={handleFileChange} />
    </FileInputContainer>
  );
};

const FileInputContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #45b26b;
  border-radius: 12px;

  background-color: rgba(255, 255, 255, 0.01);
  width: 100%;
  max-width: 740px;
  margin: 0.5rem 0;
`;

const HiddenFileInput = styled.input.attrs({
  type: 'file',
  accept: '.zip',
})`
  display: none;
`;

const CustomButton = styled.button`
  background-color: #67b26f;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 1.5rem 3rem;
  cursor: pointer;

  font-size: 1.2rem;
  font-family: Pretendard;

  &:hover {
    background-color: #5cae60;
  }
`;

const FileName = styled.span`
  color: white;
  font-size: 1rem;
  margin-left: 1rem;
  flex-grow: 1;
`;

export default FileUploadComponent;
