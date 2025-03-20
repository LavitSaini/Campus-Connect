import axiosInstance from "../utils/axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import useAuthStore from "./authStore";

const useClubStore = create((set) => ({
  clubs: [],
  isClubsFetched: false,
  isCreatingClub: false,
  isUpdatingClub: false,
  club: null,
  isClubFetched: false,
  isDeletingClub: false,

  setClubs: (data) => set({ clubs: data }),

  getClubs: async () => {
    try {
      const res = await axiosInstance.get("/api/clubs");
      set({ clubs: res.data.clubs, isClubsFetched: true });
    } catch (error) {
      toast.error(error.response.data.message);
      useAuthStore.getState().setAuthUser(null);
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

  getUserClubs: async (userId) => {
    set({ isClubsFetched: false });
    try {
      const res = await axiosInstance.get(`/api/clubs/user/${userId}`);
      set({ clubs: res.data.clubs, isClubsFetched: true });
    } catch (error) {
      toast.error(error.response.data.message);
      useAuthStore.getState().setAuthUser(null);
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

  updateClub: async (data, clubId) => {
    set({ isUpdatingClub: true });
    try {
      await axiosInstance.patch(`/api/clubs/${clubId}`, data);
      toast.success("Club Updated Success!");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingClub: false });
    }
  },

  deleteClub: async (clubId) => {
    set({ isDeletingClub: true });
    try {
      await axiosInstance.delete(`/api/clubs/${clubId}`);
      toast.success("Club Deleted Success!");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isDeletingClub: false });
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
