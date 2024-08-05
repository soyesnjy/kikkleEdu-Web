import React, { useState } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';

function ReviewForm({ onSubmit }) {
  const [content, setContent] = useState('');

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Min Text Limit
    // if (content.length < 10) {
    //   Swal.fire({
    //     icon: "error",
    //     title: "글자 수 최소 제한 20자",
    //     showConfirmButton: false,
    //     timer: 1500,
    //   });
    //   return;
    // }
    // Max Text Limit
    if (content.length > 300) {
      Swal.fire({
        icon: 'error',
        title: '글자 수 제한 300자',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    if (content) {
      Swal.fire({
        title: 'Do you want to Submit?',
        showDenyButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: `No`,
      })
        .then((result) => {
          if (result.isConfirmed) {
            onSubmit({
              pUid: localStorage.getItem('id'),
              profile_img_url: 'https://placehold.co/600x400',
              content,
            }).then((res) => {
              if (res) {
                Swal.fire({
                  icon: 'success',
                  title: 'Submit Success!',
                  text: 'Review Reloading...',
                  showConfirmButton: false,
                  timer: 1500,
                }).then(() => {
                  window.location.reload(true);
                });
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Submit Fail',
                  text: 'ㅠㅠ',
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <ReviewFormContainer onSubmit={handleSubmit}>
      <TextArea
        value={content}
        onChange={handleChange}
        placeholder="리뷰를 입력하세요..."
      />
      <SubmitButton type="submit">submit</SubmitButton>
    </ReviewFormContainer>
  );
}

const ReviewFormContainer = styled.form`
  display: flex;
  margin-top: 20px;
  gap: 0.5rem;
`;

const TextArea = styled.textarea`
  width: 32rem;
  height: 6rem;

  padding: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  background-color: rgba(0, 0, 0, 0.2); // 어두운 테마에 맞춰 배경색 지정
  color: #e0e0e0; // 입력 텍스트 색상
  resize: none;

  @media (max-width: 768px) {
    width: 16rem;
  }
`;

const SubmitButton = styled.button`
  height: 6rem;
  padding: 10px 10px;
  border: none;
  border-radius: 8px;
  background-color: #6a5acd; // 보라색 계열의 버튼 색상
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #483d8b;
  }
`;

export default ReviewForm;
