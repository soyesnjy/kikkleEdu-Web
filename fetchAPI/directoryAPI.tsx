import axios from 'axios';

// Directory Data Type
type DirectoryDataType = {
  kk_directory_idx: number;
  kk_directory_parent_idx?: number;
  kk_directory_form: string;
  kk_directory_name: string;
  kk_directory_type: string;
  kk_directory_created_at: string;
  kk_directory_updated_at: string;
};
// Track Data Type
type TrackDataType = {
  kk_directory_idx: number;
  kk_file_data_id: string;
  kk_file_form: string;
  kk_file_idx: number;
  kk_file_name: string;
  kk_file_path: string;
  kk_file_created_at: string;
  kk_file_updated_at: string;
};

// API 반환 데이터 타입 지정
type DirectoryReadResponseDataType = {
  status?: number;
  message?: string;
  data: { directories: DirectoryDataType[]; tracks: TrackDataType[] };
};

// READ
export const handleDirectoryRead = async (query: {
  form: string;
}): Promise<DirectoryReadResponseDataType> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/directory/read?
${query?.form ? `form=${query?.form}&` : ''}`,
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
      message: err.response.data.message,
      data: { directories: [], tracks: [] },
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
          Authorization: `Bearer ${localStorage.getItem('refreshToken')}`,
        },
        withCredentials: true,
      }
    );
    // console.log(response);
    return response;
  } catch (err) {
    console.error(err);
    return {
      message: err.response.data.message,
      status: 400,
    };
  }
};

// (구) CREATE Video
export const handleVideoCreate = async (formData) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/directory/create/video`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('refreshToken')}`,
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          console.log(`Upload Progress: ${percentCompleted}%`);
        },
      }
    );

    // console.log('File uploaded successfully', response.data);
    return response;
  } catch (err) {
    console.error('File upload failed', err);
    return {
      message: err.response.data.message,
      status: err.response.status,
    };
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
          Authorization: `Bearer ${localStorage.getItem('refreshToken')}`,
        },
        withCredentials: true,
      }
    );
    // console.log(response);
    return response;
  } catch (err) {
    console.log('ReviewCreate API 호출 실패');
    console.error(err);
    return {
      message: err.response.data.message,
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
          Authorization: `Bearer ${localStorage.getItem('refreshToken')}`,
        },
        withCredentials: true,
      }
    );
    // console.log(response);
    return response;
  } catch (err) {
    console.error(err);
    return {
      message: err.response.data.message,
      status: 400,
    };
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
          Authorization: `Bearer ${localStorage.getItem('refreshToken')}`,
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
