import React, { useEffect, useState } from 'react';

const LoadingDots = () => {
  const [dotCount, setDotCount] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prevCount) => (prevCount % 3) + 1); // 1, 2, 3으로 순환
    }, 500);

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 interval 정리
  }, []);

  return <div>처리중{'.'.repeat(dotCount)}</div>;
};

export default LoadingDots;
