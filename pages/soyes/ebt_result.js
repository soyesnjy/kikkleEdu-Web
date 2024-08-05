/* eslint-disable react-hooks/exhaustive-deps */
import styled, { keyframes } from 'styled-components';
import { useEffect, useState } from 'react';

import { handleEbtResult } from '@/fetchAPI';

// 아바타 관련 전역 변수
import { useRecoilState } from 'recoil';
import { log, mobile } from '../../store/state';
import { useRouter } from 'next/router';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import EBTResultModal from '@/component/Test_Component/EBTResultModal';
import EBTResultCard from '@/component/Test_Component/EBTResultCard';
const ebtCardInfoArr = [
  {
    ebt_class: 'Overall',
    img_url: '/src/EBT_Result_IMG/Icon/EBT_Result_Icon_Total_IMG.png',
    title: '총평',
    backColor: '#B88CD5',
    color: '#FFFFFF',
  },
  {
    ebt_class: 'School',
    img_url: '/src/EBT_Result_IMG/Icon/EBT_Result_Icon_School_IMG.png',
    title: '학교생활',
    backColor: '#FFF3B5',
    color: '#76502D',
  },
  {
    ebt_class: 'Friend',
    img_url: '/src/EBT_Result_IMG/Icon/EBT_Result_Icon_Friend_IMG.png',
    title: '친구관계',
    backColor: '#FEC2A0',
    color: '#573C3C',
  },
  {
    ebt_class: 'Family',
    img_url: '/src/EBT_Result_IMG/Icon/EBT_Result_Icon_Family_IMG.png',
    title: '가족관계',
    backColor: '#C4EDED',
    color: '#3E4857',
  },
  {
    ebt_class: 'Mood',
    img_url: '/src/EBT_Result_IMG/Icon/EBT_Result_Icon_Mood_IMG.png',
    title: '기분',
    backColor: '#CCDA94',
    color: '#423E32',
  },
  {
    ebt_class: 'Unrest',
    img_url: '/src/EBT_Result_IMG/Icon/EBT_Result_Icon_Unrest_IMG.png',
    title: '불안',
    backColor: '#C3F0D1',
    color: '#384838',
  },
  {
    ebt_class: 'Sad',
    img_url: '/src/EBT_Result_IMG/Icon/EBT_Result_Icon_Sad_IMG.png',
    title: '우울',
    backColor: '#E1C8AB',
    color: '#573C3C',
  },
  {
    ebt_class: 'Health',
    img_url: '/src/EBT_Result_IMG/Icon/EBT_Result_Icon_Health_IMG.png',
    title: '신체증상',
    backColor: '#C3D0C7',
    color: '#3C3E3C',
  },
  {
    ebt_class: 'Attention',
    img_url: '/src/EBT_Result_IMG/Icon/EBT_Result_Icon_Attention_IMG.png',
    title: '주의력 문제',
    backColor: '#FFD2D2',
    color: '#573C3C',
  },
  {
    ebt_class: 'Movement',
    img_url: '/src/EBT_Result_IMG/Icon/EBT_Result_Icon_Movement_IMG.png',
    title: '과잉행동',
    backColor: '#F4DEFF',
    color: '#3C3E3C',
  },
  {
    ebt_class: 'Angry',
    img_url: '/src/EBT_Result_IMG/Icon/EBT_Result_Icon_Angry_IMG.png',
    title: '분노/공격성',
    backColor: '#FFF5DB',
    color: '#6B3430',
  },
  {
    ebt_class: 'Self',
    img_url: '/src/EBT_Result_IMG/Icon/EBT_Result_Icon_Self_IMG.png',
    title: '자기인식',
    backColor: '#E8F9FF',
    color: '#53687B',
  },
];

// Renewel Test 페이지
export default function Test() {
  const [isOpen, setIsOpen] = useState(false);
  const [ebtDataArr, setEbtDataArr] = useState([]);
  const [ebtClassData, setEbtClassData] = useState({ content: 'default' });

  // 전역 변수
  const [login, setLogin] = useRecoilState(log);

  const router = useRouter();

  const handleEbtClassData = (ebt_class) => {
    setIsOpen(true);
    if (ebt_class === 'Overall') {
      let tmpObj = {};
      ebtDataArr.forEach((el) => (tmpObj[el.ebt_class] = el.tScore));
      setEbtClassData({ ...tmpObj });
    } else {
      const tmp = ebtDataArr.filter((el) => el.ebt_class === ebt_class)[0];
      setEbtClassData({
        ...tmp,
      });
    }
  };

  // EBT 결과 배열 Load Method
  const ebtResultLoad = async () => {
    // 유저 EBT 결과 조회 (11종)
    const data = await handleEbtResult(
      {
        pUid: `${localStorage.getItem('id')}`,
        contentKey: true,
      },
      '/openAI/ebtresult'
    );

    setEbtDataArr([...data.message]);
  };

  useEffect(() => {
    ebtResultLoad();
    return () => {};
  }, []);

  // 로그인 권한이 없는 상태에서의 접근 시 login 페이지로 redirect
  useEffect(() => {
    const loginSession = JSON.parse(localStorage.getItem('log'));
    if (!loginSession) {
      router.replace('/login');
    }
  }, [login]);

  return (
    <MainContainer>
      <CardContainer>
        {ebtCardInfoArr.map((el, index) => {
          const { ebt_class, img_url, title, backColor, color } = el;
          return (
            <EBTResultCard
              key={index}
              ebt_class={ebt_class}
              img_url={img_url}
              title={title}
              backColor={backColor}
              color={color}
              onClick={handleEbtClassData}
            />
          );
        })}
        <EBTResultModal
          isOpen={isOpen}
          onRequestClose={() => {
            setIsOpen(false);
          }}
          ebtClassData={ebtClassData}
        />
      </CardContainer>
    </MainContainer>
  );
}

// 다국어 지원 관련 getStaticProps 처리
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['consult', 'nav'])),
    },
  };
}

const MainContainer = styled.div`
  /* background-image: url('/src/soyesKids_Background_image.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; */

  background-color: ${(props) => props.backColor || '#fdf6ff'};
  width: 100vw;
  min-height: 100vh;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    overflow: hidden;
  }
`;

const CardContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100%;

  margin-top: 2rem;
  padding: 3rem;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 2rem 3rem;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
