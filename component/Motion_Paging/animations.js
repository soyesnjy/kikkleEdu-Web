// 이 객체는 페이지 전환 애니메이션의 다양한 상태를 정의합니다.
// 'initial' 상태는 페이지가 처음 로드될 때의 상태로, 불투명도가 0입니다.
// 'in' 상태는 페이지가 활성화될 때의 상태로, 불투명도가 1입니다.
// 'out' 상태는 페이지가 비활성화될 때의 상태로, 불투명도가 0입니다.
const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.95,
  },
  in: {
    opacity: 1,
    scale: 1,
  },
  out: {
    opacity: 0,
    scale: 0.9,
  },
};

// 이 객체는 페이지 전환 애니메이션의 전환 속성을 정의합니다.
// 'type' 속성은 애니메이션의 유형을 지정하며, 'tween'은 부드러운 전환을 의미합니다.
// 'ease' 속성은 애니메이션의 가속도 곡선을 지정하며, 'anticipate'는 시작과 끝에서 가속과 감속을 의미합니다.
// 'duration' 속성은 애니메이션의 지속 시간을 초 단위로 지정하며, 여기서는 0.1초입니다.
const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.2,
};

module.exports = {
  pageTransition,
  pageVariants,
};
