import styled from 'styled-components';
import TeacherProfileCard from './TeacherProfileCard';

// 기관 페이지 5종에 들어가는 MiddleFourthSection
const AgencyMiddleFourthSection = ({ backimgurl, router, teacherDataArr }) => {
  return (
    <MiddleSectionFourth backimgurl={backimgurl}>
      <MiddleSectionSubtitle>OUR PROGRAM CLASS</MiddleSectionSubtitle>
      <MiddleSectionTitle>수업 강사</MiddleSectionTitle>
      <TeacherContainer>
        {teacherDataArr.length > 0
          ? teacherDataArr.map((el) => {
              const { id, name, introduce, profileImg } = el;
              return (
                <TeacherProfileCard
                  key={id}
                  name={name}
                  introduce={introduce}
                  imgUrl={profileImg}
                  onClick={() => router.push(`/teacher/${id}`)}
                />
              );
            })
          : ''}
      </TeacherContainer>
    </MiddleSectionFourth>
  );
};

const MiddleSectionFourth = styled.section`
  width: 100vw;
  min-height: 100vh;

  background-color: white;

  background-image: url('/src/Agency_IMG/Agency_kindergarden_Teacher_Background_IMG.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 1rem;

  @media (max-width: 1080px) {
    width: 100%;
    flex-direction: column;
    padding: 2rem;
  }
`;

const TeacherContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  gap: 1rem;
  margin-top: 3rem;

  @media (max-width: 768px) {
    flex-direction: column;
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

export default AgencyMiddleFourthSection;
