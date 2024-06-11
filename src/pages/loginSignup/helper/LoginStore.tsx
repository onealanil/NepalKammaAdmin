import { create } from "zustand";
import { axios_no_auth } from "../../../config/config";

export const LoginStore = create((set) => ({
  userDetails: [],
  loginUser: async (data: any) => {
    try {
      const response = await axios_no_auth.post("/user/login", data);
      if (response.data.status === "success") {
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
