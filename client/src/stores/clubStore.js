import axiosInstance from "../utils/axios";
import toast from "react-hot-toast";
import { create } from "zustand";

const useClubStore = create((set) => ({
  clubs: [],
  isClubsFetched: false,
  isCreatingClub: false,
  club: null,
  isClubFetched: false,

  getClubs: async () => {
    try {
      const res = await axiosInstance.get("/api/clubs");
      set({ clubs: res.data.clubs, isClubsFetched: true });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  getSingleClub: async (clubId) => {
    try {
      const res = await axiosInstance.get(`/api/clubs/${clubId}`);
      set({ club: res.data.club, isClubFetched: true });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  createNewClub: async (data) => {
    set({ isCreatingClub: true });
    try {
      await axiosInstance.post("/api/clubs", data);
      toast.success("Club Created Success!");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isCreatingClub: false });
    }
  },

  followClub: async (clubId) => {
    try {
      const res = await axiosInstance.post(`/api/clubs/follow/${clubId}`);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  unfollowClub: async (clubId) => {
    try {
      const res = await axiosInstance.post(`/api/clubs/unfollow/${clubId}`);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
}));

export default useClubStore;
