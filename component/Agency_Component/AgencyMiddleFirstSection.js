import styled from 'styled-components';
import AgencyProgramCard from '@/component/Home_Component/AgencyProgramCard';

const sectionArr = [
  {
    imgPath: '/src/Agency_IMG/Icon/Agency_Icon_0_IMG.png',
    title: 'Program',
    content: '기관에 맞는 수업프로그램을 찾고 선택',
  },
  {
    imgPath: '/src/Agency_IMG/Icon/Agency_Icon_1_IMG.png',
    title: 'Teacher',
    content: '기관에서 선호하는 강사님들을 선택',
  },
  {
    imgPath: '/src/Agency_IMG/Icon/Agency_Icon_2_IMG.png',
    title: 'Time',
    content: '원하는 시간, 요일을 선택',
  },
];

// 기관 페이지 5종에 들어가는 MiddleFirstSection
const AgencyMiddleFirstSection = () => {
  return (
    <MiddleSectionFirst>
      {sectionArr.map((el, index) => {
        const { imgPath, title, content } = el;
        return (
          <AgencyProgramCard
            key={index}
            imgPath={imgPath}
            title={title}
            content={content}
          />
        );
      })}
    </MiddleSectionFirst>
  );
};

const MiddleSectionFirst = styled.section`
  width: 100vw;
  min-height: 262px;

  background-color: white;
  padding: 3rem;

  display: flex;
  justify-content: space-around;
  align-items: center;

  @media (max-width: 1080px) {
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    padding: 2rem;
  }
`;

export default AgencyMiddleFirstSection;
