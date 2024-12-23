import React from 'react';
import styled from 'styled-components';
import { useDaumPostcodePopup } from 'react-daum-postcode';

// 다음 우편번호 서비스 스크립트 URL
const scriptUrl =
  'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';

// PostBtn 컴포넌트 Props 타입 정의
type PostBtnPropsType = {
  setAddressA: React.Dispatch<React.SetStateAction<string>>;
};

const PostBtn = ({ setAddressA }: PostBtnPropsType) => {
  const open = useDaumPostcodePopup(scriptUrl);

  const handleComplete = (data: { address: string }) => {
    const fullAddress = data.address;
    setAddressA(fullAddress);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <Button type="button" onClick={handleClick}>
      {`찾기`}
    </Button>
  );
};

const Button = styled.button`
  width: 20%;
  background-color: #45b26b;
  border: 1px solid white;
  border-radius: 15px;

  padding: 1.1rem;

  color: white;
  text-align: center;
  text-decoration: none;

  font-size: 1rem;
  font-weight: 400;
  font-family: Pretendard;

  cursor: pointer;

  transition: 0.2s;

  @media (max-width: 768px) {
    width: 25%;
    font-size: 1rem;
    padding: 1rem;
  }
`;

export default PostBtn;
