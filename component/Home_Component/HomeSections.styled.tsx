'use client';
import styled from 'styled-components';

// SectionFifthtoNineth 컴포넌트 Type 지정
type SectionFifthtoNinethProps = {
  backgroundColor: string;
};

export const MasterContainer = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const IntroSection = styled.section`
  width: 100vw;
  min-height: 59vw;
  position: relative;
  padding: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;

  @media (max-width: 768px) {
    min-height: 76vw;
    flex-direction: column;
    justify-content: flex-start;
    padding: 1.3rem 0.8rem;
  }
`;

export const ReadContainer = styled.div`
  width: 40vw;
  padding: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 1rem;
  color: white;
  z-index: 1;

  @media (max-width: 768px) {
    width: 100%;
    padding: 0 1rem;
    justify-content: flex-start;
  }
`;

export const H1 = styled.h1`
  font-size: 80px;
  font-weight: bold;
  font-family: Nunito;
  color: white;
  z-index: 1;

  @media (max-width: 768px) {
    font-size: 50px;
    width: 90%;
    color: #2e6c6d;
  }
`;

export const H4 = styled.h4`
  font-size: 20px;
  font-weight: 300;
  font-family: Pretendard;
  color: white;
  z-index: 1;

  @media (max-width: 768px) {
    color: #2e6c6d;
  }
`;

export const Button = styled.button`
  font-family: Nunito;
  background-color: #ffca1b;
  border-radius: 10px;
  border: none;
  margin-top: 5rem;
  padding: 1rem 3rem;
  color: white;
  cursor: pointer;
  z-index: 1;

  @media (max-width: 768px) {
    margin-top: 1rem;
  }
`;

export const SectionFirst = styled.section`
  width: 100vw;
  min-height: 262px;
  margin: 5rem 0;
  background-color: #f4eee5;
  padding: 3rem;
  display: flex;
  justify-content: space-around;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    background-color: white;
    flex-direction: column;
    align-items: flex-start;
    padding: 2rem;
    margin: 0;
  }
`;

export const FirstMobileContainer = styled.div`
  margin: 3rem 0;
  z-index: 1;

  @media (max-width: 768px) {
    background-color: white;
  }
`;

export const SectionSecond = styled.section`
  width: 100vw;
  min-height: 100vh;
  background-color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;

  @media (max-width: 768px) {
    height: 100%;
    padding: 1rem;
    flex-direction: column;
    justify-content: flex-start;
  }
`;

export const SectionFourth = styled.section`
  width: 100vw;
  min-height: 50vh;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    height: 100%;
    flex-direction: column;
    padding: 2rem;
  }
`;

export const SectionFifthtoNineth = styled.section<SectionFifthtoNinethProps>`
  width: 100vw;
  min-height: 50vh;
  margin: 10rem 0;
  background-color: ${(props) => props.backgroundColor || 'white'};
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    margin: 0;
    height: 100%;
    flex-direction: column;
    padding: 2rem;
  }
`;

export const SectionTenth = styled.section`
  width: 100vw;
  min-height: 70vw;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    height: 100vh;
    margin-top: 2rem;
    flex-direction: column;
  }
`;
