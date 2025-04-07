import React, { useState } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';

import { useRouter } from 'next/navigation';
import { handleBoardCreate } from '@/fetchAPI/boardAPI';

// 임시 데이터 형식
// const boardData = {
//   agencyIdx: 0, // 기관 고유 idx, 실제 사용 시 변경 필요
//   title: '3',
//   content: '442',
//   isPrivate: false,
// };

const BoardCreate = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  const router = useRouter();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleIsPrivateChange = (e) => {
    setIsPrivate(e.target.checked);
  };

  const boardCreateHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await handleBoardCreate({
        agencyIdx: localStorage.getItem('userIdx'), // default userIdx === dummy 계정
        title,
        content,
        isPrivate,
      });

      if (res.status === 200) {
        Swal.fire({
          icon: 'success',
          title: '게시글 등록 성공!',
          text: '문의 페이지로 이동합니다',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          router.push('/board');
        });
      } else if (res.status === 403) {
        Swal.fire({
          icon: 'error',
          title: '중복된 이메일입니다',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: res.message,
        });
      }
    } catch (error) {
      console.error('업로드 실패:', error);
    }
  };

  return (
    <FormContainer onSubmit={boardCreateHandler}>
      <FormGroup>
        <Label htmlFor="title">제목</Label>
        <Input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="content">내용</Label>
        <TextArea
          id="content"
          value={content}
          onChange={handleContentChange}
          rows="10"
          required
        />
      </FormGroup>

      <CheckContainer>
        <Label for="isPrivate">비공개 여부</Label>
        <CheckInput
          type="checkbox"
          id="isPrivate"
          checked={isPrivate}
          onChange={handleIsPrivateChange}
        />
      </CheckContainer>
      <ButtonContainer>
        <Button type="submit">등록</Button>
      </ButtonContainer>
    </FormContainer>
  );
};

export default BoardCreate;

// Styled Components
const FormContainer = styled.form`
  width: 60%;
  margin: 0 auto;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const CheckContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: center;

  gap: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const CheckInput = styled.input`
  height: 100%;
  padding: 0.5rem;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  resize: none;
`;
const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: right;
  align-items: center;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;
