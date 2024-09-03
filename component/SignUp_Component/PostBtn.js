import React from 'react';
import styled from 'styled-components';
import { useDaumPostcodePopup } from 'react-daum-postcode';

const scriptUrl =
  'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';

const PostBtn = ({ setAddressA }) => {
  const open = useDaumPostcodePopup(scriptUrl);

  const handleComplete = (data) => {
    let fullAddress = data.address;

    // let extraAddress = '';
    // if (data.addressType === 'R') {
    //   if (data.bname !== '') {
    //     extraAddress += data.bname;
    //   }
    //   if (data.buildingName !== '') {
    //     extraAddress +=
    //       extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
    //   }
    //   fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    // }

    // console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    setAddressA(fullAddress);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <Button type="button" onClick={handleClick}>
      찾기
    </Button>
  );
};

const Button = styled.button`
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
    width: 30%;
    font-size: 1rem;
    padding: 1rem;
  }
`;

export default PostBtn;
