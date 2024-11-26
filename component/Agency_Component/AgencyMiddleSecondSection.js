import styled from 'styled-components';

// 기관 페이지 5종에 들어가는 MiddleFirstSection
const AgencyMiddleSecondSection = ({ agency, youtubeUrl }) => {
  return (
    <MiddleSectionSecond>
      <MiddleSectionSubtitle>Our Program Video</MiddleSectionSubtitle>
      <MiddleSectionTitle>{agency} 수업 영상</MiddleSectionTitle>
      <VideoContent>
        <iframe
          src={youtubeUrl} // 수업 영상 유튜브 링크
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </VideoContent>
    </MiddleSectionSecond>
  );
};

const MiddleSectionSecond = styled.section`
  width: 100vw;
  min-height: 262px;

  background-color: white;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  gap: 1rem;

  @media (max-width: 1080px) {
    width: 100%;
    flex-direction: column;
    padding: 2rem;
  }
`;

const MiddleSectionTitle = styled.h2`
  color: #313131;

  font-size: 3rem;
  font-family: Pretendard;
  font-weight: 700;

  @media (max-width: 1080px) {
    font-size: 24px;
  }
`;

const MiddleSectionSubtitle = styled.h2`
  color: #7067aa;

  font-size: 18px;
  font-family: Nunito;
  font-weight: 700;

  @media (max-width: 1080px) {
    font-size: 12px;
  }
`;

const VideoContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 2rem;

  iframe {
    width: 900px;
    height: 528px;
  }
  min-height: 360px;

  @media (max-width: 1080px) {
    iframe {
      width: 100%;
      height: 328px;
    }
  }
`;

export default AgencyMiddleSecondSection;
