/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { mobile } from '../../store/state';

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const chartNameSet = {
  1: '적응 영역',
  2: '정서적 스트레스',
  3: '주의집중/과잉행동',
};

const BarChart = ({ ebtClassData }) => {
  const [data, setData] = useState({});
  const [chartName, setChartName] = useState('');
  const [dataSet, setDataSet] = useState({});
  const [mobileFlag, setMobileFlag] = useRecoilState(mobile);

  useEffect(() => {
    const tmp = {
      1: {
        labels: ['학교생활', '또래관계', '가족관계', '자기인식'],
        datasets: [
          {
            label: 'T 점수',
            data: [
              ebtClassData.School,
              ebtClassData.Friend,
              ebtClassData.Family,
              ebtClassData.Self,
            ],
            backgroundColor: [
              '#FFBCBC',
              '#BCCFFF',
              '#FFECA7',
              '#5D8E70',
              '#D9D9D9',
            ],
            borderColor: [
              '#FF4500',
              '#1E90FF',
              '#DAA520',
              '#228B22',
              '#B9D9D9',
            ],
            borderWidth: 1,
            borderRadius: 30,
            barThickness: mobileFlag ? 30 : 80, // 막대의 고정된 너비 설정
          },
        ],
      },
      2: {
        labels: ['전반적 기분', '불안', '우울', '신체증상', '분노/공격성'],
        datasets: [
          {
            label: 'T 점수',
            data: [
              ebtClassData.Mood,
              ebtClassData.Unrest,
              ebtClassData.Sad,
              ebtClassData.Health,
              ebtClassData.Angry,
            ],
            backgroundColor: [
              '#FFBCBC',
              '#BCCFFF',
              '#FFECA7',
              '#5D8E70',
              '#D9D9D9',
            ],
            borderColor: [
              '#FF4500',
              '#1E90FF',
              '#DAA520',
              '#228B22',
              '#B9D9D9',
            ],
            borderWidth: 1,
            borderRadius: 30,
            barThickness: mobileFlag ? 25 : 70, // 막대의 고정된 너비 설정
          },
        ],
      },
      3: {
        labels: ['주의집중', '과잉행동'],
        datasets: [
          {
            label: 'T 점수',
            data: [ebtClassData.Attention, ebtClassData.Movement],
            backgroundColor: [
              '#FFBCBC',
              '#BCCFFF',
              '#FFECA7',
              '#5D8E70',
              '#D9D9D9',
            ],
            borderColor: [
              '#FF4500',
              '#1E90FF',
              '#DAA520',
              '#228B22',
              '#B9D9D9',
            ],
            borderWidth: 1,
            borderRadius: 30,
            barThickness: mobileFlag ? 30 : 90, // 막대의 고정된 너비 설정
          },
        ],
      },
    };
    // console.log(tmp);
    setDataSet({ ...tmp });
  }, []);

  useEffect(() => {
    setData({ ...dataSet[1] });
    setChartName(chartNameSet[1]);
  }, [dataSet]);

  // const data = {
  //   labels,
  //   datasets: [
  //     {
  //       label: 'T 점수',
  //       data: scores,
  //       backgroundColor: [
  //         '#FFBCBC',
  //         '#BCCFFF',
  //         '#FFECA7',
  //         '#5D8E70',
  //         '#D9D9D9',
  //       ],
  //       borderColor: ['#FF4500', '#1E90FF', '#DAA520', '#228B22', '#B9D9D9'],
  //       borderWidth: 1,
  //       borderRadius: 30,
  //       // barPercentage: 0.9,
  //       // categoryPercentage: 0.9,
  //       barThickness: 50, // 막대의 고정된 너비 설정
  //     },
  //   ],
  // };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: mobileFlag ? 8 : 14,
          },
          color: '#6A7EC8',
        },
      },
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: function (value) {
            if (value === 65 || value === 70) {
              return value + 'T';
            }
            return '';
          },
          stepSize: 5,
          font: {
            size: 14,
          },
          color: function (context) {
            if (context.tick.value === 65) {
              return '#FF8A1F';
            } else if (context.tick.value === 70) {
              return '#D21B1B';
            }
            return '#333';
          },
        },
        grid: {
          color: function (context) {
            if (context.tick.value === 70) {
              return '#D21B1B'; // Color for 70T
            }
            if (context.tick.value === 65) {
              return '#FF8A1F';
            }
            return 'rgba(0, 0, 0, 0.1)';
          },

          lineWidth: function (context) {
            if (context.tick.value === 65 || context.tick.value === 70) {
              return 3;
            } else return 0;
          },
          borderDash: function (context) {
            if (context.tick.value === 65 || context.tick.value === 70) {
              return [5, 5];
            }
            return [5, 5];
          },
          drawBorder: false,
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: chartName,
        font: {
          size: mobileFlag ? 15 : 18,
        },
        color: '#6A7EC8',
      },
      legend: {
        display: false,
      },
    },
  };

  return (
    <BarContainer>
      {data.labels && <Bar data={data} options={options} />}
      <ChangeButton
        value={1}
        onClick={(e) => {
          setData({ ...dataSet[Number(e.target.value)] });
          setChartName(chartNameSet[Number(e.target.value)]);
        }}
        top="3%"
        right="3%"
        backgroundColor="#ffa4a4"
      ></ChangeButton>
      <ChangeButton
        value={2}
        onClick={(e) => {
          setData({ ...dataSet[Number(e.target.value)] });
          setChartName(chartNameSet[Number(e.target.value)]);
        }}
        top="11.5%"
        right="2%"
        backgroundColor="#ffe486"
      ></ChangeButton>
      <ChangeButton
        value={3}
        onClick={(e) => {
          setData({ ...dataSet[Number(e.target.value)] });
          setChartName(chartNameSet[Number(e.target.value)]);
        }}
        top="19.5%"
        right="0.3%"
        backgroundColor="#b5e3f1"
      ></ChangeButton>
    </BarContainer>
  );
};

const BarContainer = styled.div`
  background-image: url('/src/EBT_Result_IMG/Background/EBT_Result_Background_Chart_IMG.png.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  padding: 4rem;

  width: 44rem;
  height: 40rem;
  margin: 0 auto;

  position: relative;

  @media (max-width: 1200px) {
    width: 33rem;
    height: 30rem;
    padding: 3rem;
  }

  @media (max-width: 768px) {
    width: 20rem;
    height: 18rem;
    padding: 2rem;
  }
`;

const ChangeButton = styled.button`
  padding: 1rem;

  background-color: ${(props) => props.backgroundColor};

  border: 0;
  position: absolute;
  top: ${(props) => props.top};
  right: ${(props) => props.right};
  cursor: pointer;

  @media (max-width: 1200px) {
    padding: 0.4rem;
  }

  @media (max-width: 768px) {
    padding: 0.4rem;
  }
`;
export default BarChart;
