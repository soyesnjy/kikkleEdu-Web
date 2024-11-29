import styled from 'styled-components';
import Link from 'next/link';

export default function EndSection({ Title, btnTitle, routePath }) {
  return (
    <EndContainer>
      {Title && <EndTitle>{Title}</EndTitle>}
      {btnTitle && routePath && (
        <Link href={routePath}>
          <Button>{btnTitle}</Button>
        </Link>
      )}
    </EndContainer>
  );
}

const EndContainer = styled.section`
  width: 100vw;
  height: 100vh;
  background-color: white;
  position: relative;

  background-image: url('/src/Home_IMG/Home_Last_Background_IMG.png');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 2rem;

  @media (max-width: 728px) {
    width: 100%;
    background-image: url('/src/Home_IMG/Home_Last_Background_Mobile_IMG.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    gap: 1rem;
  }
`;

const EndTitle = styled.h1`
  width: 70%;
  text-align: center;
  font-size: 3rem;
  font-family: Nunito;
  font-weight: 600;
  color: #171717;

  white-space: pre;

  @media (max-width: 768px) {
    width: 90%;
    font-size: 24px;
  }
`;

const Button = styled.button`
  font-family: Nunito;
  background-color: #ff8500;

  border-radius: 10px;
  border: none;

  padding: 1rem 3rem;

  color: white;

  cursor: pointer;
  z-index: 1;

  @media (max-width: 768px) {
    margin-top: 1rem;
  }
`;
