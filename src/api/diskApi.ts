import axios, { Axios, AxiosResponse } from "axios";
import { tokenInstance } from "./api";

export const getDiskList = async () => {
  try {
    const res = await tokenInstance.get("/api/v1/disks/mydisks");
    if (res.status === 200) {
      return res.data;
    }
  } catch (err) {
    throw err;
  }
};

export const postDisk = async (data: any): Promise<AxiosResponse<any>> => {
  try {
    const res = await tokenInstance.post("/api/v1/disks", data, {
      headers: {
        "Content-Type": "multipart/form-data",
        responseType: "blob",
      },
    });
    return res;
  } catch (err) {
    throw err;
  }
};

export const getBookmarkDiskList = async (memberId: string) => {
  try {
    const res = await tokenInstance.get(
      `/api/v1/disks/all/bookmarked/${memberId}`
    );
    if (res.status === 200) {
      return res.data;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};
// data :
// {
//   "diskName": "diskName",
//   "content": "content",
//   "diskColor": “PINK",
//   "isPrivate": false,
//   “isBookmark”: false,
// }
// file : [MultipartFile]!
