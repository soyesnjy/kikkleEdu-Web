import React, { useState } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';

function Review({ review, onDelete, onUpdate }) {
  const pUid = localStorage.getItem('id');
  const [uContent, setUContent] = useState(review.content);
  const [updateMode, setUpdateMode] = useState(false);
  const dateFlag = review.created_at !== review.updated_at;

  return (
    <ReviewContainer>
      {updateMode ? (
        <UpdateTextArea
          value={uContent}
          onChange={(e) => {
            setUContent(e.target.value);
          }}
        />
      ) : (
        <Header>
          <ProfileImage
            src={review.profile_img_url}
            alt={`${review.uid}'s profile`}
          />
          <AuthorInfo>
            <h4>{review.uid}</h4>
            <p>
              {dateFlag
                ? review.created_at.split('T')[0]
                : review.updated_at.split('T')[0]}
            </p>
            {dateFlag && <p>(수정)</p>}
          </AuthorInfo>
          <Content>
            <p>{review.content}</p>
          </Content>
        </Header>
      )}
      {pUid === review.uid ? (
        updateMode ? (
          <ButtonContainer>
            <Button
              onClick={() => {
                if (!uContent) {
                  Swal.fire({
                    icon: 'error',
                    title: '내용을 입력하세요!',
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  return;
                }

                Swal.fire({
                  title: 'Update Content Submit?',
                  showDenyButton: true,
                  confirmButtonText: 'Yes',
                  denyButtonText: `No`,
                }).then((result) => {
                  if (result.isConfirmed) {
                    onUpdate({
                      entry_id: review.entry_id,
                      content: uContent,
                    }).then((res) => {
                      if (res) {
                        Swal.fire({
                          icon: 'success',
                          title: 'Update Success!',
                          text: 'Review Reloading...',
                          showConfirmButton: false,
                          timer: 1500,
                        }).then(() => {
                          window.location.reload(true);
                        });
                      } else {
                        Swal.fire({
                          icon: 'error',
                          title: 'Update Fail!',
                          text: 'Review Reloading...',
                          showConfirmButton: false,
                          timer: 1500,
                        }).then(() => {
                          window.location.reload(true);
                        });
                      }
                    });
                  }
                });
              }}
            >
              제출
            </Button>
            <Button
              onClick={() => {
                setUpdateMode(false);
                setUContent(review.content);
              }}
            >
              취소
            </Button>
          </ButtonContainer>
        ) : (
          <ButtonContainer>
            <Button
              onClick={() => {
                Swal.fire({
                  title: 'Modify Mode Convert?',
                  showDenyButton: true,
                  confirmButtonText: 'Yes',
                  denyButtonText: `No`,
                }).then((result) => {
                  if (result.isConfirmed) {
                    console.log('Update Mode');
                    setUpdateMode(true);
                  }
                });
              }}
            >
              수정
            </Button>
            <Button
              onClick={() => {
                Swal.fire({
                  title: 'Do you want to Delete?',
                  showDenyButton: true,
                  confirmButtonText: 'Yes',
                  denyButtonText: `No`,
                }).then((result) => {
                  if (result.isConfirmed) {
                    onDelete(review.entry_id).then((res) => {
                      if (res) {
                        Swal.fire({
                          icon: 'success',
                          title: 'Delete Success!',
                          text: 'Review Reloading...',
                          showConfirmButton: false,
                          timer: 1500,
                        }).then(() => {
                          window.location.reload(true);
                        });
                      }
                    });
                  }
                });
              }}
            >
              삭제
            </Button>
          </ButtonContainer>
        )
      ) : null}
    </ReviewContainer>
  );
}

// 배경색과 어울리는 색상을 사용
const ReviewContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.1); // 약간의 투명도를 가진 흰색 배경
  backdrop-filter: blur(5px); // 배경에 블러 효과
  padding: 20px;
  margin: 10px 0;
  border-radius: 8px;
  color: #e0e0e0; // 연한 회색 텍스트
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  gap: 1rem;

  @media (max-width: 768px) {
    gap: 0.1rem;
    margin-bottom: 0;
  }
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
  border: 2px solid #e0e0e0; // 이미지 테두리에도 연한 회색 사용

  @media (max-width: 768px) {
    margin-right: 0.2rem;
  }
`;

const AuthorInfo = styled.div`
  width: 6rem;
  word-break: break-all;
  h4 {
    margin: 0;
    color: #ffffff; // 흰색 텍스트
  }

  p {
    margin: 0;
    color: #cccccc; // 조금 더 어두운 회색으로 날짜 표시
    font-size: 0.85rem;
  }
`;

const Content = styled.div`
  width: 22rem;
  text-align: left;

  display: flex;

  align-items: center;
  font-size: 0.95rem;
  color: #d0d0d0;
  min-height: 5rem;

  word-break: break-all;

  @media (max-width: 768px) {
    width: 11rem;
    font-size: 0.75rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  gap: 0.3rem;
  @media (max-width: 768px) {
    gap: 0.1rem;
  }
`;

const Button = styled.button`
  padding: 5px 10px;
  background-color: #ff4d4f; // 붉은 색 계열의 배경
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.7;
  }

  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    padding: 5px 7px;
    font-size: 0.55rem;
  }
`;

const UpdateTextArea = styled.textarea`
  width: 34rem;
  height: 5.1rem;

  padding: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  background-color: rgba(0, 0, 0, 0.2); // 어두운 테마에 맞춰 배경색 지정
  color: #e0e0e0; // 입력 텍스트 색상
  resize: none;

  @media (max-width: 768px) {
    width: 20.5rem;
  }
`;

export default Review;
