import React from 'react';
import styled from 'styled-components';
import { handleSignupDelete } from '@/fetchAPI/signupAPI';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { logoutAPI } from '@/fetchAPI/loginAPI';
import { useRecoilState } from 'recoil';
import { log, uid, agencyClass } from '@/store/state';

const AgencyTablePrivacyBody = () => {
  const router = useRouter();
  const [login, setLogin] = useRecoilState(log);
  const [userId, setUserId] = useRecoilState(uid);
  const [agencyType, setAgencyType] = useRecoilState(agencyClass);

  // 기관 정보 delete 핸들러
  const agencyDeleteHandler = async () => {
    try {
      if (confirm('회원 탈퇴 하시겠습니까?') === true) {
        const res = await handleSignupDelete({
          userClass: 'agency',
          userIdx: localStorage.getItem('userIdx'),
        });

        if (res.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Delete Success!',
            text: 'Main Page Move...',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            // 로그아웃과 동일한 로직
            logoutAPI();
            localStorage.removeItem('log');
            setLogin(false);
            localStorage.removeItem('id');
            setUserId('');
            localStorage.removeItem('agencyType');
            setAgencyType('');
            localStorage.removeItem('userIdx');
            router.replace('/');
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Agency Delete Fail',
          });
        }
      } else return;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PrivacyContainer>
      <Button onClick={agencyDeleteHandler}>회원 탈퇴</Button>
    </PrivacyContainer>
  );
};

const PrivacyContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  gap: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.4rem;
  }
`;

const Button = styled.button`
  background-color: ${(props) => (props.attendTrigger ? '#61b15a' : '#CACACA')};
  color: white;
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 20px;

  font-size: 1rem;
  font-family: Pretendard;
  font-weight: 600;
  text-align: left;

  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    padding: 0.6rem;
    font-size: 0.8rem;
  }
`;

export default AgencyTablePrivacyBody;
