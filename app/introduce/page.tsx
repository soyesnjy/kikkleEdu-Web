import React from 'react';

import { MainContainer } from '@/component/Introduction_Component/Introduction.styled';
import IntroductionHeader from '@/component/Introduction_Component/IntroductionHeader';
import IntroductionMiddler from '@/component/Introduction_Component/IntroductionMiddler';
import IntroductionCarousel from '@/component/Introduction_Component/IntroductionCarousel';
import EndSection from '@/component/Home_Component/EndSection';

const HistoryPage = () => {
  return (
    <MainContainer>
      {/* 헤더 섹션 */}
      <IntroductionHeader
        title={`Kids Class edu`}
        subTitle={`회사 연혁`}
        description={`우리아이의 건강한 마음과 행복을 위해`}
        bottomTitle={`소예키즈 소개`}
        bottomSubTitle={`회사 연혁`}
        $imgPath={`/src/Introduce_IMG/Company/Introduce_CompanyIntro_Header_Background_IMG.png`}
      />
      {/* 미들 섹션 */}
      <IntroductionMiddler
        title={`KK EDU - History`}
        subTitle={`회사 연혁`}
        $imgPath={`/src/Introduce_IMG/Introduce_Middle_Icon_IMG.png`}
      />
      {/* 캐러셀 섹션 */}
      <IntroductionCarousel />

      {/* 엔드 섹션 */}
      <EndSection
        Title={`우리아이의 성장 소예키즈와 함께 \n 몸과 마음을 성장시켜요`}
        btnTitle={`콘텐츠 소개`}
        routePath={`/program`}
      />
    </MainContainer>
  );
};

export default HistoryPage;
