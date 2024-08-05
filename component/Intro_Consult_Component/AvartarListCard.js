import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import { avarta } from '../../store/state';
import Link from 'next/link';

const randomArr = ['soyes', 'lala', 'pupu', 'ubi', 'north'];

const AvartarListCard = ({
  backColor,
  borderColor,
  cardImgUrl,
  name,
  codeName,
  role,
  subMent,
}) => {
  const [avartaAI, setAvartaAI] = useRecoilState(avarta);
  const avartaCardClickHandler = () => {
    if (codeName === 'random') {
      const selectedAvartar =
        randomArr[Math.floor(Math.random() * 700) % randomArr.length];
      setAvartaAI(selectedAvartar);
      localStorage.setItem('avarta', selectedAvartar);
      return;
    }

    setAvartaAI(codeName);
    localStorage.setItem('avarta', codeName);
  };
  return (
    <StyledLink href={name === '엘라' ? '/ella/mood' : '/test_all'}>
      <Container
        backColor={backColor}
        borderColor={borderColor}
        onClick={avartaCardClickHandler}
      >
        <ImageWrapper>
          <Image
            src={cardImgUrl}
            alt="Character Image"
            width={260}
            height={271}
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </ImageWrapper>
        <TextContainer>
          <Title>
            <NameSpan>{name}</NameSpan> {role}
          </Title>
          <Subtitle>{subMent}</Subtitle>
        </TextContainer>
      </Container>
    </StyledLink>
  );
};

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  background-color: ${(props) => props.backColor || '#EBEBEB'};
  border-radius: 15px;
  border: 2px solid ${(props) => props.borderColor || '#CDCDCD'};
  padding: 1rem;

  width: 100%;
  max-width: 870px;
  height: auto;

  color: white;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    opacity: 0.9;
  }

  @media (max-width: 1200px) {
    flex-direction: column;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ImageWrapper = styled.div`
  flex-shrink: 0;
  margin-right: 1rem;
  border-radius: 10px;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  gap: 0.4rem;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 40px;
  font-weight: 400;
  font-family: AppleSDGothicNeoL00;

  letter-spacing: -0.1rem;
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const NameSpan = styled.span`
  margin: 0;
  font-size: 45px;
  font-weight: 600;
  font-family: AppleSDGothicNeoL00;

  letter-spacing: -0.1rem;
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Subtitle = styled.p`
  margin: 0;
  font-size: 26px;
  font-family: AppleSDGothicNeoL00;

  letter-spacing: -0.1rem;
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export default AvartarListCard;
