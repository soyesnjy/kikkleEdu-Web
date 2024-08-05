import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import { loginAPI_OAuth_URL_Kakao } from '@/fetchAPI';

// Component usage
const KakaoOAuthBtn = ({ setUrl }) => {
  const { t } = useTranslation('login');

  const handleLogin = async (e) => {
    e.preventDefault(); // 새로고침 방지

    // Kakao 인증 페이지로 이동
    // window.Kakao.Auth.authorize({
    //   redirectUri: `${process.env.NEXT_PUBLIC_REDIRECT_URI}?type=kakao`, // 로그인 성공 후 리디렉션 될 페이지의 URI
    //   prompt: 'select_account',
    // });
    const data = await loginAPI_OAuth_URL_Kakao();
    const directUrl = data.url;

    if (directUrl) {
      setUrl(directUrl);
    } else {
      setUrl(window.location.href + '?code=response_fail');
    }
  };

  return (
    <KakaoLoginButton value="google" onClick={handleLogin}>
      <KakaoIcon className="google-icon" />
      {t('login_kakaoBtn_title')}
    </KakaoLoginButton>
  );
};

const KakaoLoginButton = styled.button`
  background-color: #f9e000; // Google Blue
  color: black;
  padding: 1rem;
  border: 1px solid #c9c9c9;

  border-radius: 20px;
  cursor: pointer;

  font-size: 20px;
  font-weight: 400;
  text-align: center;
  font-family: AppleSDGothicNeoL00;
  transition: background-color 0.3s;

  &:hover {
    background-color: #3a2929;
    color: #ffffff;
  }

  &:active {
    background-color: #3a2929;
    color: #ffffff;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(66, 133, 244, 0.5); // Google Blue with transparency
  }

  // Icon alignment, if you choose to include a Google icon
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 0.7rem;

  @media (max-width: 768px) {
    width: 100%;
    padding: 0.5rem;
  }
`;

const KakaoIcon = styled.img.attrs({
  src: '/src/Login_IMG/Login_Kakao_Icon_IMG.png', // The path to your Google icon image file
  alt: 'Google sign-in',
})`
  width: 33px;
  height: 38px;
`;

export default KakaoOAuthBtn;
