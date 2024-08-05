import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Image from 'next/image';
// comment: 배포용 주석
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    console.log(imageUrl);
  }, [imageUrl]);

  useEffect(() => {
    console.log(file);
  }, [file]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    // 파일 용량이 50MB 이상일 경우
    if (selectedFile?.size > MAX_FILE_SIZE) {
      alert('파일 크기가 너무 큽니다. 50MB 이하의 파일을 선택해주세요.');
      return;
    }
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    // 파일을 선택하지 않은 경우
    if (!file) {
      alert('파일을 선택해주세요.');
      return;
    }

    setIsPending(true); // 로딩 걸기

    const reader = new FileReader();
    // 파일 읽기 완료 시점에 수행되는 이벤트 핸들러
    reader.onloadend = async () => {
      const base64Data = reader.result;

      try {
        // 파일 업로드 API 호출
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_URL}/openAI/analysis_img`,
          {
            name: file.name,
            mimeType: file.type,
            data: base64Data,
            pUid: localStorage.getItem('id'),
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        console.log('업로드 성공:', response.data);
        setImageUrl(response.data.imageUrl); // 서버에서 반환된 이미지 URL 설정
        setIsPending(false);
      } catch (error) {
        console.error('업로드 실패:', error);
      }
    };

    // 파일 읽기 시작 (현재 state로 관리되는 file 읽기)
    reader.readAsDataURL(file);
  };

  return (
    <BackgroundImage>
      <UploadContainer>
        <Title>파일 업로드</Title>
        <Input type="file" onChange={handleFileChange} />
        <Button onClick={handleUpload} disabled={isPending}>
          {isPending ? '업로드 중...' : '업로드'}
        </Button>
        <ImageContainer>
          {imageUrl && (
            <Image
              src={imageUrl}
              alt="Upload Image"
              layout="responsive"
              width={500}
              height={500}
            />
          )}
        </ImageContainer>
      </UploadContainer>
    </BackgroundImage>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['login', 'nav'])),
    },
  };
}

const BackgroundImage = styled.div`
  background-image: url('/src/soyesKids_Background_image.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 40vw;
  padding: 2rem;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  margin-bottom: 1rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #005bb5;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ImageContainer = styled.div`
  width: 70%;
  margin-top: 1rem;
  position: relative;
`;

export default UploadPage;
