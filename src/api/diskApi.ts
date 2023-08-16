import axios, { Axios, AxiosResponse } from "axios";
import { instance, tokenInstance } from "./api";
import { PatchType } from "../components/editDisk/EditDisk";

export const getDiskList = async () => {
  try {
    const res = await tokenInstance.get("/api/v1/disks/mydisks");
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getDisk = async (diskId: string) => {
  try {
    const res = await tokenInstance.get(`/api/v1/disks/${diskId}`);
    return res.data;
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
export const patchDisk = async (data: any): Promise<AxiosResponse<any>> => {
  try {
    const res = await tokenInstance.patch(
      `api/v1/disks/${data.diskId}`,
      data.frm,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          responseType: "blob",
        },
      }
    );
    console.log(res);
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
    return res.data;
  } catch (err) {
    throw err;
  }
};
