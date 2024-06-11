import { create } from "zustand";
import { axios_auth } from "../config/config";

export const PaymentStore = create((set) => ({
  getPayments: async (
    status: string,
    assending: boolean,
    page: number,
    limit: number
  ) => {
    try {
      const response = await axios_auth.get(
        `/admin/getAllPayments?pending_status=${status}&assending=${assending}&page=${page}&limit=${limit}`
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
  completedPayment: async (
    paymentId: string,
    freelancerId: string,
    jobProviderId: string,
    amount: number
  ) => {
    try {
      const response = await axios_auth.put(
        `/admin/completedPayment/${paymentId}`,
        {
          freelancerId,
          jobProviderId,
          amount,
        }
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
