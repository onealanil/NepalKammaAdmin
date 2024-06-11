import { create } from "zustand";
import { axios_auth } from "../config/config";

export const ReportStore = create((set) => ({
  getAllReport: async (assending: boolean) => {
    try {
      const response = await axios_auth.get(
        `/admin/getAllReports?assending=${assending}`
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
  deactiveAccount: async (userId: string) => {
    try {
      const response = await axios_auth.put(`/admin/deactivateUser/${userId}`);
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
  activateAccount: async (userId: string) => {
    try {
      const response = await axios_auth.put(`/admin/activateUser/${userId}`);
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
  getAllDeactivatedUsers: async () => {
    try {
      const response = await axios_auth.get(`/admin/getallDeactivatedUsers`);
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
