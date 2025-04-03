/* eslint-disable @next/next/no-img-element */
import styled from 'styled-components';

const ProgramClassDetailSection = ({ detailImgPath, backImgPath }) => {
  return (
    <ClassDetailSection
      defaultChecked={
        detailImgPath === '/src/Program_IMG/Program_Default_ClassDetail_IMG.png'
      }
      backImgPath={backImgPath}
    >
      <img
        src={detailImgPath || '/src/soyesKids_Logo.png'}
        alt="DetailPath"
        width={1321}
        height={3044}
        style={{ maxWidth: '100%', height: '100%' }}
      />
    </ClassDetailSection>
  );
};

type ClassDetailSectionProps = {
  defaultChecked: boolean;
  backImgPath?: string;
};

const ClassDetailSection = styled.section<ClassDetailSectionProps>`
  width: 100vw;

  min-height: ${(props) => (props.defaultChecked ? '150vh' : '0')};
  background-color: white;

  background-image: ${(props) =>
    props.backImgPath
      ? `url(${props.backImgPath})`
      : '/src/soyesKids_Logo.png'};
  background-size: cover;
  background-position: top;
  background-repeat: no-repeat;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 10rem;

  @media (max-width: 728px) {
    min-height: 0;
    flex-direction: column;
    justify-content: flex-start;
    padding: 5rem 0.5rem;
    background-size: cover;
  }
`;

export default ProgramClassDetailSection;
