import React, { useRef, useState } from 'react';
import styled from 'styled-components';

const FileUploadComponent = ({ setFile }) => {
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef(null);

  const handleButtonClick = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <FileInputContainer>
      <FileName>{fileName}</FileName>
      <CustomButton onClick={handleButtonClick}>첨부</CustomButton>
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
  max-width: 600px;
  margin: 1rem 0;
`;

const HiddenFileInput = styled.input.attrs({ type: 'file' })`
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
