import axiosInstance from "../utils/axios";
import toast from "react-hot-toast";
import { create } from "zustand";

const useEventStore = create((set) => ({
  events: [],
  isEventsFetched: false,
  isCreatingEvent: false,
  event: null,
  isEventFetched: false,

  getEvents: async () => {
    try {
      const res = await axiosInstance.get("/api/events");
      set({ events: res.data.events, isEventsFetched: true });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  getSingleEvent: async (eventId) => {
    try {
      const res = await axiosInstance.get(`/api/events/${eventId}`);
      set({ event: res.data.event, isEventFetched: true });
    } catch (error) {
      toast.error(error.response.data.message);
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
}));

export default useEventStore;
