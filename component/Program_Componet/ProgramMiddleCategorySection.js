import styled from 'styled-components';

const ProgramMiddleCategorySection = ({
  classDataArr,
  selectedClass,
  setSelectedClass,
}) => {
  return (
    <MiddleSection>
      <SearchContainer>
        {classDataArr.map((el, index) => {
          return (
            <TagButton
              key={index}
              selected={selectedClass?.title === el?.title}
              onClick={() => {
                setSelectedClass({ ...el });
              }}
            >
              {el.title}
            </TagButton>
          );
        })}
      </SearchContainer>
    </MiddleSection>
  );
};

const MiddleSection = styled.section`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    width: 100vw;
    flex-direction: column;
    justify-content: center;
    gap: 0;

    padding: 1rem;
  }
`;

const SearchContainer = styled.section`
  width: 100%;
  padding-left: 12rem;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  gap: 1rem;

  @media (max-width: 768px) {
    padding: 0rem;
    flex-wrap: wrap;
    /* justify-content: center; */
    gap: 0.5rem;
  }
`;

const TagButton = styled.button`
  background-color: ${(props) =>
    props.selected ? '#378E56' : 'rgba(255, 255, 255, 0.01)'};
  border: 1px solid #378e56;
  border-radius: 24px;

  padding: 0.7rem 2rem;

  color: ${(props) => (props.selected ? 'white' : 'black')};
  text-align: center;
  text-decoration: none;

  font-size: 1rem;
  font-weight: 600;
  font-family: Pretendard;

  cursor: pointer;
  &:hover {
    background-color: #378e56;
    color: white;
  }

  transition: 0.2s;

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.7rem;
    margin-bottom: 0;
    border-radius: 1rem;
  }
`;

export default ProgramMiddleCategorySection;
