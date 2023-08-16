import axios, { Axios, AxiosResponse } from "axios";
import { instance, tokenInstance } from "./api";

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
    const res = await instance.post("/api/v1/disks", data, {
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

export const deleteDisk = async (diskId: number) => {
  try {
    await tokenInstance.delete(`/api/v1/disks/${diskId}`);
  } catch (err) {
    throw err;
  }
};

export const bookmarkDisk = async (diskId: number) => {
  try {
    await tokenInstance.post(`/api/v1/disks/bookmark/${diskId}`);
  } catch (err) {
    throw err;
  }
};

export const likeDisk = async (diskId: number) => {
  try {
    await tokenInstance.post(`/api/v1/disks/like/${diskId}`);
  } catch (err) {
    throw err;
  }
};

export const getBookmarkDiskList = async (memberId: string) => {
  try {
    const res = await instance.get(`/api/v1/disks/all/bookmarked/${memberId}`);
    if (res.status === 200) {
      return res.data;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};
