/* eslint-disable @next/next/no-async-client-component */
'use client';
import React from 'react';
import axios from 'axios';
import HomePage from '@/component/Home_Component/HomePage';

// Client Teacher Data Type 지정
type ClientTeacherDataType = {
  id: number;
  name: string;
  introduce: string;
  profileImg: string;
};

// Server Teacher Data Type 지정
type ServerTeacherDataType = {
  kk_teacher_idx: number;
  kk_teacher_name: string;
  kk_teacher_introduction: string;
  kk_teacher_profileImg_path: string;
};

async function getTeacherData(): Promise<ClientTeacherDataType[]> {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/teacher/read?main=true`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );

    const result: ServerTeacherDataType[] = res.data.data;

    if (result?.length) {
      return result.map((el) => ({
        id: el.kk_teacher_idx,
        name: el.kk_teacher_name,
        introduce: el.kk_teacher_introduction,
        profileImg: el.kk_teacher_profileImg_path,
      }));
    }

    return [];
  } catch (err: any) {
    console.error(err.response);
    return [];
  }
}

// Next 14 App Router
// Home 페이지
export default async function Home() {
  const teacherDataArr = await getTeacherData();

  return <HomePage teacherDataArr={teacherDataArr} />;
}
