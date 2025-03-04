import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { navLinks } from "../utils/constant";
import useAuthStore from "../stores/authStore";

const HamburgerMenu = ({ active }) => {
  const { authUser } = useAuthStore();
  return (
    <Sheet>
      <SheetTrigger>
        <img src="../assets/icons/menu.svg" alt="Menu Icon" className="w-7" />
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="flex flex-col items-start gap-2 text-start">
          <SheetTitle className="leading-5 text-primary-500">
            Campus Connect
          </SheetTitle>
          <SheetDescription className="-mt-4">
            Your Campus, Your Events – All in One Place!
          </SheetDescription>
        </SheetHeader>
        <ul className="flex flex-col gap-3 capitalize text-[0.95rem]">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`${link.path}`}
                className={`relative group text-black transition duration-200 ${
                  link.label.toLowerCase() === active ? "text-primary-500" : ""
                } hover:text-primary-500`}
              >
                <span
                  className={`absolute left-0 bottom-0 h-[2px] bg-primary-500 transition-all duration-300 ${
                    link.label.toLowerCase() === active
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                ></span>
                {link.label}
              </a>
            </li>
          ))}
          {authUser && authUser.role === "admin" && (
            <li>
              <a
                href="/create-event"
                className={`relative group text-black transition duration-200 ${
                  "create-event" === active ? "text-primary-500" : ""
                } hover:text-primary-500`}
              >
                <span
                  className={`absolute left-0 bottom-0 h-[2px] bg-primary-500 transition-all duration-300 ${
                    "create-event" === active
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                ></span>
                Create Event
              </a>
            </li>
          )}
          {authUser && authUser.role === "admin" && (
            <li>
              <a
                href="create-club"
                className={`relative group text-black transition duration-200 ${
                  "create-club" === active ? "text-primary-500" : ""
                } hover:text-primary-500`}
              >
                <span
                  className={`absolute left-0 bottom-0 h-[2px] bg-primary-500 transition-all duration-300 ${
                    "create-club" === active
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                ></span>
                Create Club
              </a>
            </li>
          )}
        </ul>
      </SheetContent>
    </Sheet>
  );
};

export default HamburgerMenu;
