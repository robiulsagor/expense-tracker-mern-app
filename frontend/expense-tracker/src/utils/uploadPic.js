import { API_PATHS } from "./apiPath";
import axiosInstance from "./axiosInstance";

export const uploadPic = async (image) => {
  const formData = new FormData();
  formData.append("image", image);

  try {
    const response = await axiosInstance.post(
      API_PATHS.IMAGE.UPLOAD_IMAGE,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response?.data?.filePath;
  } catch (error) {
    console.log(error);
  }
};
