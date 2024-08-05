// components/CustomDropdown.js
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const LanguageSwitcher = () => {
  const router = useRouter();
  const { locales, locale, pathname, query, asPath } = router;
  const [show, setShow] = useState(false);

  const changeLanguage = (newLocale) => {
    setShow(false);
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  return (
    <Dropdown>
      <DropdownButton onClick={() => setShow(!show)}>
        {locale === 'ko' ? 'Korean' : 'English'}
      </DropdownButton>
      <DropdownContent show={show}>
        {locales.map((loc) => (
          <Option key={loc} onClick={() => changeLanguage(loc)}>
            {loc === 'ko' ? 'Korean' : 'English'}
          </Option>
        ))}
      </DropdownContent>
    </Dropdown>
  );
};

const Dropdown = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  color: white;
  border: none;
  border-radius: 15px;
  margin: 4px 2px;
  padding: 13px 23px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  transition: 0.5s;

  &:hover {
    background-color: rgba(0, 42, 255, 0.5);
    color: white;
  }

  @media (max-width: 768px) {
    font-size: 10px;
    margin: 2px;
    padding: 7px 10px;

    &:hover {
      padding: 7px 10px;
      background-color: rgba(0, 42, 255, 0.5);
    }
  }
`;

const DropdownContent = styled.div`
  display: ${(props) => (props.show ? 'block' : 'none')};
  position: absolute;

  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  margin-top: 4px;
  border-radius: 15px;
  z-index: 1;
  padding: 5px;
  width: 100%;

  @media (max-width: 768px) {
    margin-top: 0;
  }
`;

const Option = styled.div`
  color: white;
  padding: 10px 12px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
  width: 100%;
  margin-top: 3px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
    color: black;
  }
  transition: 0.3s;

  @media (max-width: 768px) {
    font-size: 10px;
    text-align: center;
    padding: 0.4rem;
  }
`;

export default LanguageSwitcher;
