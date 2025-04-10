import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQuery } from 'react-query';
import { handleClassGet } from '@/fetchAPI/classAPI';

export type ClassDataType = {
  title: string;
  content: string;
  info: string;
  imgPath: string;
  detailPath: string;
};

const classDefaultArr: ClassDataType[] = [
  {
    imgPath: '',
    title: '서버 통신 실패',
    content: '',
    info: '',
    detailPath: '',
  },
];

export const useProgramClass = (classTag: string) => {
  const [classDataArr, setClassDataArr] = useState<ClassDataType[]>([]);
  const [selectedClass, setSelectedClass] = useState<ClassDataType>({
    title: '',
    content: 'Loading...',
    info: 'Loading...',
    imgPath: '',
    detailPath: '',
  });

  const searchParams = useSearchParams();
  const cName = searchParams ? searchParams.get('cName') : null;

  const { isLoading, error } = useQuery(
    [classTag],
    async () => {
      const res = await handleClassGet({ classTag, classDetail: true });
      return res.data;
    },
    {
      cacheTime: 10000,
      keepPreviousData: true,
      onSuccess: (data) => {
        if (data) {
          const tuningData = data.data?.map((el) => ({
            title: el.kk_class_title,
            content: el.kk_class_content || '',
            info: el.kk_class_info || '',
            imgPath: el.kk_class_file_path || '',
            detailPath: el.kk_class_detail_path || '',
          }));
          setClassDataArr([...tuningData]);
        }
      },
      onError: () => {
        setClassDataArr(classDefaultArr);
      },
    }
  );

  useEffect(() => {
    if (cName) {
      const target = classDataArr.find((el) => el.title === cName);
      if (target) setSelectedClass({ ...target });
    } else if (classDataArr.length > 0) {
      setSelectedClass({ ...classDataArr[0] });
    }
  }, [classDataArr, cName]);

  return { classDataArr, selectedClass, setSelectedClass, isLoading, error };
};
