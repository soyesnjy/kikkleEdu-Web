import axios from 'axios';

// READ
export const handleDirectoryRead = async (query) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/directory?${query?.form ? `form=${query?.form}&` : ''}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
    // console.log(response.data);
    return response.data;
  } catch (err) {
    console.log('Gpt API 호출 실패');
    console.error(err);
    return {
      status: err.response.status,
    };
  }
};

// CREATE
export const handleDirectoryCreate = async (input) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/directory/create`,
      { data: input },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
    console.log(response);
    return response;
  } catch (err) {
    console.log('ReviewCreate API 호출 실패');
    console.error(err);
    return {
      status: 400,
    };
  }
};
// CREATE Video
export const handleVideoCreate = async (formData) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/directory/create/video`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          console.log(`Upload Progress: ${percentCompleted}%`);
        },
      }
    );

    console.log('File uploaded successfully', response.data);
    return response;
  } catch (error) {
    console.error('File upload failed', error);
  }
};
export const handleVideoV2Create = async (input) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/directory/create/video`,
      { data: input },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
    console.log(response);
    return response;
  } catch (err) {
    console.log('ReviewCreate API 호출 실패');
    console.error(err);
    return {
      status: 400,
    };
  }
};

// DELETE
export const handleDirectoryDelete = async (query) => {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_URL}/directory/delete?${query?.form ? `form=${query?.form}&` : ''}${query?.directoryIdx ? `directoryIdx=${query?.directoryIdx}&` : ''}${query?.type ? `type=${query?.type}&` : ''}`,
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
    console.error(err);
  }
};

// TODO# UPDATE
export const handleReviewUpdate = async (input) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/review/update`,
      { ReviewData: input },
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
      message: '미안해 지금은 대화가 힘들어...조금 뒤에 다시 말해줄래?',
      emotion: 0,
    };
  }
};
