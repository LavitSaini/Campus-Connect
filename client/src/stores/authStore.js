import { create } from "zustand";

const useAuthStore = create(() => ({
  authUser: null,
  isUserAuthenticating: false,
}));

export default useAuthStore;
