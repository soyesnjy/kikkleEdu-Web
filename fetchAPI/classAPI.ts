import axios from 'axios';

// handleClassGet 요청 쿼리 타입 지정
type ClassGetRequestQueryType = {
  classDetail?: string;
  classTag?: string;
  classType?: string;
};

// handleClassGet 서버 데이터 타입 지정
type ClassGetDataType = {
  kk_class_idx: number;
  kk_class_title: string;
  kk_class_tag: string;
  kk_class_file_path: string;
  kk_class_content?: string;
  kk_class_info?: string;
  kk_class_detail_path?: string;
};

// handleClassGet 반환 데이터 타입 지정
type ClassGetResponseType = {
  message?: string;
  status?: number;
  data?: {
    data: ClassGetDataType[];
  };
};

export const handleClassGet = async (
  query: ClassGetRequestQueryType
): Promise<ClassGetResponseType> => {
  const { classDetail, classTag, classType } = query;
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/class/read?
${classDetail ? `classDetail=${classDetail}&` : ''}
${classTag ? `classTag=${classTag}&` : ''}
${classType ? `classType=${classType}&` : ''}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('refreshToken')}`,
        },
        withCredentials: true,
      }
    );
    // console.log(response.data);
    return response;
  } catch (err) {
    console.error(err);
    return {
      status: err.response.status,
    };
  }
};

// // CREATE
// export const handleClassCreate = async (input) => {
//   try {
//     const response = await axios.post(
//       `${process.env.NEXT_PUBLIC_URL}/review`,
//       { ReviewData: input },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${localStorage.getItem('refreshToken')}`,
//         },
//         withCredentials: true,
//       }
//     );
//     // console.log(response);
//     return response;
//   } catch (err) {
//     console.log('ReviewCreate API 호출 실패');
//     console.error(err);
//     return {
//       status: err.response.status,
//     };
//   }
// };
// // DELETE
// export const handleClassDelete = async (uri) => {
//   try {
//     const response = await axios.delete(`${uri}`, {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${localStorage.getItem('refreshToken')}`,
//       },
//       withCredentials: true,
//     });
//     // console.log(response);
//     return response;
//   } catch (err) {
//     console.error(err);
//     return {
//       status: err.response.status,
//     };
//   }
// };
// // UPDATE
// export const handleClassUpdate = async (input) => {
//   try {
//     const response = await axios.post(
//       `${process.env.NEXT_PUBLIC_URL}/review/update`,
//       { ReviewData: input },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${localStorage.getItem('refreshToken')}`,
//         },
//         withCredentials: true,
//       }
//     );
//     // console.log(response);
//     return response;
//   } catch (err) {
//     console.log('Gpt API 호출 실패');
//     console.error(err);
//     return {
//       status: err.response.status,
//     };
//   }
// };
