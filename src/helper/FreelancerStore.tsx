import { create } from "zustand";
import { axios_auth } from "../config/config";

export const FreelancerStore = create((set) => ({
  getFreelancers: async (
    status: string,
    assending: boolean,
    page: number,
    limit: number
  ) => {
    try {
      const response = await axios_auth.get(
        `/admin/getAllFreelancers?verified_status=${status}&assending=${assending}&page=${page}&limit=${limit}`
      );
      if (response.status === 200) {
        return response.data;
      }
      return [];
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error(error.message);
      }
    }
  },

  verifyUser: async (userId: string) => {
    try {
      const response = await axios_auth.put(`/admin/verifyDocument/${userId}`);
      if (response.status === 200) {
        return response.data;
      }
      return [];
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error(error.message);
      }
    }
  },

  rejectUser: async (userId: string) => {
    try {
      const response = await axios_auth.put(`/admin/rejectDocument/${userId}`);
      if (response.status === 200) {
        return response.data;
      }
      return [];
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error(error.message);
      }
    }
  },
  getGrowth: async () => {
    try {
      const response = await axios_auth.get(`/admin/getUsersGraph`);
      if (response.status === 200) {
        return response.data;
      }
      return [];
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error(error.message);
      }
    }
  },
  sendNotification: async (message: string) => {
    try {
      const response = await axios_auth.post(`/admin/sendNotification`, {
        message,
      });
      if (response.status === 200) {
        return response.data;
      }
      return [];
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error(error.message);
      }
    }
  },
}));
