import React from 'react';
import styled from 'styled-components';
import ContentBlock from './ContentBlock';
// import ContentBlockWeb from './ContentBlockWeb';
// import { useEffect, useState } from 'react';

const contentArr = [
  {
    title: '음악 명상',
    subtitle: '내마음을 차분하게 해줄 음악을 선택하여 마음을 힐링해 보세요.',
    iconPath: '/src/Content_IMG/Icon_IMG/Icon_음악명상.png',
    linkUrl: '/meditation_music',
    backColor: '#FFFBE9',
    color: '#FF7D95',
  },
  {
    title: '그림 명상',
    subtitle: '내마음을 차분하게 해줄 음악을 선택하여 마음을 힐링해 보세요.',
    iconPath: '/src/Content_IMG/Icon_IMG/Icon_그림명상.png',
    linkUrl: '/meditation_painting',
    backColor: '#F6FCFF',
    color: '#17A3D4',
  },
  {
    title: '요가 명상',
    subtitle: '내마음을 차분하게 해줄 음악을 선택하여 마음을 힐링해 보세요.',
    iconPath: '/src/Content_IMG/Icon_IMG/Icon_요가명상.png',
    linkUrl: '/meditation_painting',
    backColor: '#FBF9FF',
    color: '#9051FF',
  },
];

const ContentCard = () => {
  return (
    <ContentCardContainer>
      {contentArr.map((content, index) => {
        return (
          <ContentBlock
            key={index}
            title={content.title}
            subtitle={content.subtitle}
            iconPath={content.iconPath}
            linkUrl={content.linkUrl}
            color={content.color}
            backColor={content.backColor}
          />
        );
      })}
    </ContentCardContainer>
  );
};

const ContentCardContainer = styled.div`
  max-width: 80vw;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;

  @media (max-width: 768px) {
    max-width: 100%;
    flex-direction: column;
    gap: 0.3rem;
  }
`;

export default ContentCard;
