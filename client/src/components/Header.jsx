import React from "react";
import HamburgerMenu from "./HamburgerMenu";
import { navLinks } from "../utils/constant";
import SubscribeEmail from "./SubscribeEmail";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Header = ({ active }) => {
  return (
    <header className="w-full border-b">
      <nav className="w-full max-w-[72rem] py-5 px-6 mx-auto flex justify-between items-center lg:px-10">
        <Link to="/" className="flex gap-1 items-center">
          <img
            src="./assets/images/logo.png"
            alt="Logo Icon"
            className="w-12"
          />
          <h3 className="text-xl font-semibold capitalize tracking-tight text-primary-500">
            Campus Connect
          </h3>
        </Link>

        <ul className="hidden gap-4 capitalize text-[0.95rem] md:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <Link
                to={link.path}
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
              </Link>
            </li>
          ))}
        </ul>

        <Link to="/login">
          <Button
            type="submit"
            size="sm"
            className="hidden border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white transition duration-200 md:block"
          >
            Login
          </Button>
        </Link>

        <div className="flex items-center md:hidden">
          <HamburgerMenu />
        </div>
      </nav>
    </header>
  );
};

export default Header;
