import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useAuthStore from "../stores/authStore";

const usePreviousLocation = () => {
  const location = useLocation();
  const { setPreviousLocation } = useAuthStore();

  useEffect(() => {
    setPreviousLocation(location.pathname);
  }, [location.pathname]);
};

export default usePreviousLocation;
