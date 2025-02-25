import { create } from "zustand";

const useAuthStore = create(() => ({
  authUser: null,
  isUserAuthenticating: false,

  login: async (data) => {},
  signup: async (data) => {},
}));

export default useAuthStore;
