import { create } from "zustand";
import { axios_auth } from "../config/config";

export const JobProviderStore = create((set) => ({
  getJobProvider: async (
    status: string,
    assending: boolean,
    page: number,
    limit: number
  ) => {
    try {
      const response = await axios_auth.get(
        `/admin/getAllJobProviders?verified_status=${status}&assending=${assending}&page=${page}&limit=${limit}`
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
}));
