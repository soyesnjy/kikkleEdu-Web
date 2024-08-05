import styled from 'styled-components';

export const FlexContainer = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  display: ${(props) => props.display || 'flex'};
  flex-direction: ${(props) => (props.dir === 'col' ? 'column' : 'row')};
  flex-wrap: ${(props) => props.wrap};
  justify-content: ${(props) => props.justify || 'center'};
  align-items: ${(props) => props.align || 'center'};
  gap: ${(props) => props.gap || '1rem'};
  background-color: ${(props) => props.backColor || 'none'};
  border-radius: ${(props) => props.borderRadius || 'none'};
  flex-grow: ${(props) => props.grow};
  border-top: ${(props) => props.borderTop};
  border-bottom: ${(props) => props.borderBottom};
  padding: ${(props) => props.padding};
  overflow: ${(props) => props.overflow};
  top: ${(props) => props.top};
  min-height: ${(props) => props.min};
  opacity: ${(props) => props.opacity};
`;

export const StyledButton = styled.button`
  background-color: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px); // 불투명 필터
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  color: ${(props) => (props.color ? props.color : 'white')};

  border: none;
  border-radius: 15px;

  margin: 4px 2px;
  padding: 13px 23px;

  text-align: center;
  text-decoration: none;

  display: inline-block;
  font-size: ${(props) => (props.fontSize ? props.fontSize : '16px')};
  cursor: pointer;

  &:hover {
    padding: 15px 25px;
    background-color: rgba(0, 42, 255, 0.5);
    color: white;
  }

  transition: 0.5s;
`;

export const StyledInput = styled.input`
  background-color: transparent;
  border: 0.5px solid gray;

  color: ${(props) => (props.color ? props.color : 'white')};

  padding: 13px 18px;
  text-align: left;
  text-decoration: none;

  display: flex;
  font-size: 16px;
  border-radius: 20px;

  transition: 0.5s;

  &:focus {
    padding: 15px 20px;
  }

  &::placeholder {
    color: white;
  }
`;
