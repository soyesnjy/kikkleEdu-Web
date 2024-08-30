import axios from 'axios';

// TODO# READ
export const handleMypageGet = async (query) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/mypage/read?${query?.userIdx ? `userIdx=${query?.userIdx}&` : ''}${query?.name ? `name=${query?.name}&` : ''}${query?.pageNum ? `pageNum=${query?.pageNum}&` : ''}`,
      {
        headers: {
          'Content-Type': 'application/json',
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
// TODO# CREATE
export const handleMypageCreate = async (post) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/signup/create`,
      post,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );

    // console.log(res);

    return response;
  } catch (err) {
    // 에러시 false 반환
    console.log(err);
    return { status: err.response.status };
  }
  // // console.log(url, post);
  // try {
  //   const res = await fetch(`${url}/signup/ai`, {
  //     method: 'POST',
  //     // content-type을 명시하지 않으면 json 파일인지 인식하지 못함
  //     headers: {
  //       'Content-Type': 'application/json',
  //       // Authorization: document.cookies.accessToken,
  //     },
  //     body: JSON.stringify(post),
  //   });

  //   // console.log(res);

  //   return res.ok;
  // } catch (err) {
  //   // 에러시 false 반환
  //   console.log(err);
  //   return false;
  // }
};
// TODO# UPDATE
export const handleMypageUpdate = async (post) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/mypage/update`,
      post,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
    // console.log(response);
    return response;
  } catch (err) {
    console.log('Gpt API 호출 실패');
    console.error(err);
    return {
      status: err.response.status,
    };
  }
};
// TODO# DELETE
export const handleMypageDelete = async (query) => {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_URL}/signup/delete?${query?.userClass ? `userClass=${query?.userClass}&` : ''}${query?.userIdx ? `userIdx=${query?.userIdx}&` : ''}`,
      {
        headers: {
          'Content-Type': 'application/json',
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
