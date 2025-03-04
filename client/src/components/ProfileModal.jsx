import React, { useEffect } from "react";
import useAuthStore from "../stores/authStore";
import { LayoutDashboard, LogOut, UserPen } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const ProfileModal = ({
  profileModalRef,
  handleMouseDown,
  setShowProfileModal,
}) => {
  const { logout, authUser } = useAuthStore();

  const { pathname } = useLocation();

  useEffect(() => {
    document.addEventListener("mousedown", handleMouseDown);
    return () => {
      document.addEventListener("mousedown", handleMouseDown);
    };
  }, []);

  const handleClick = () => {
    logout();
    setShowProfileModal(false);
  };

  return (
    <motion.div
      ref={profileModalRef}
      style={{ zIndex: 10 }}
      className={`absolute bg-primary-500 rounded-md shadow-box top-[115%] ${
        authUser.role === "admin" ? "md:-left-[280%]" : "md:-left-[215%]"
      } ${authUser.role === "admin" ? "-left-[95%]" : "-left-[60%]"}`}
      initial={{ opacity: 0, scale: 0.9, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -10 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      <div
        className="absolute top-0 left-[80%] -translate-x-1/2 -translate-y-full w-0 h-0 
                      border-l-[6px] border-l-transparent 
                      border-r-[6px] border-r-transparent 
                      border-b-[6px] border-b-primary-500"
      ></div>

      <ul className="flex flex-col">
        <li className="border-b-[1px]">
          <Link
            to="/profile"
            className={`px-6 py-2.5 text-[0.95rem] flex items-center gap-3.5 text-gray-300 hover:text-white ${
              pathname === "/profile" ? "text-white" : ""
            }`}
          >
            <UserPen className="size-[1.2rem]" />
            <span>Profile</span>
          </Link>
        </li>
        {authUser.role === "admin" && (
          <li className="border-b-[1px]">
            <Link
              to="/dashboard"
              className={`px-6 py-2.5 text-[0.95rem] flex items-center gap-3.5 text-gray-300 hover:text-white ${
                pathname === "/dashboard" ? "text-white" : ""
              }`}
            >
              <LayoutDashboard className="size-[1.2rem]" />
              <span>Dashboard</span>
            </Link>
          </li>
        )}
        <li>
          <button
            onClick={handleClick}
            className="px-6 py-2.5 text-[0.95rem] flex items-center gap-3.5 text-gray-300 hover:text-white"
          >
            <LogOut className="size-[1.2rem]" />
            <span>Logout</span>
          </button>
        </li>
      </ul>
    </motion.div>
  );
};

export default ProfileModal;
