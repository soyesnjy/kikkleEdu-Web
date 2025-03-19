import Modal from 'react-modal';
import styled, { keyframes } from 'styled-components';

type LoadingModalProps = {
  isOpen: boolean;
};

const LoadingModal = ({ isOpen }: LoadingModalProps) => {
  return (
    <Modal isOpen={isOpen} style={modalStyles} ariaHideApp={false}>
      <ModalContainer>
        <Loader />
        <LoadingText>{`Loading...`}</LoadingText>
      </ModalContainer>
    </Modal>
  );
};

// 모달 스타일 지정
const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    border: 'none',
    background: 'transparent',
    padding: 0,
    inset: 'auto',
  },
};

// 톱니바퀴 회전 애니메이션
const rotate = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  `;

const Loader = styled.div`
  width: 80px;
  height: 80px;
  border: 8px solid rgba(255, 255, 255, 0.3);
  border-top: 8px solid #ffffff;
  border-radius: 50%;
  animation: ${rotate} 1s linear infinite;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 2rem;
  border-radius: 12px;
`;

const LoadingText = styled.p`
  margin-top: 1rem;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
`;

export default LoadingModal;
