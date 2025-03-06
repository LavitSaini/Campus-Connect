import axiosInstance from "../utils/axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import useAuthStore from "./authStore";

const useEventStore = create((set) => ({
  events: [],
  isEventsFetched: false,
  isCreatingEvent: false,
  isDeletingEvent: false,
  event: null,
  isEventFetched: false,

  getEvents: async () => {
    set({ isEventsFetched: false });
    try {
      const res = await axiosInstance.get("/api/events");
      set({ events: res.data.events, isEventsFetched: true });
    } catch (error) {
      toast.error(error.response.data.message);
      useAuthStore.getState().setAuthUser(null);
    }
  },

  getSingleEvent: async (eventId) => {
    set({ isEventFetched: false });
    try {
      const res = await axiosInstance.get(`/api/events/${eventId}`);
      set({ event: res.data.event, isEventFetched: true });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  getUserEvents: async (userId) => {
    set({ isEventsFetched: false });
    try {
      const res = await axiosInstance.get(`/api/events/user/${userId}`);
      set({ events: res.data.events, isEventsFetched: true });
    } catch (error) {
      toast.error(error.response.data.message);
      useAuthStore.getState().setAuthUser(null);
    }
  },

  createNewEvent: async (data) => {
    set({ isCreatingEvent: true });
    try {
      await axiosInstance.post("/api/events", data);
      toast.success("Event Created Success!");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isCreatingEvent: false });
    }
  },

  deleteEvent: async (eventId) => {
    set({ isDeletingEvent: true });
    try {
      await axiosInstance.delete(`/api/events/${eventId}`);
      toast.success("Event Deleted Success!");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isDeletingEvent: false });
    }
  },
}));

export default useEventStore;
