import React from "react";
import HamburgerMenu from "./HamburgerMenu";
import { navLinks } from "../utils/constant";
import SubscribeEmail from "./SubscribeEmail";
import { Link } from "react-router-dom";

const Header = ({ active }) => {
  return (
    <header className="w-full border-b">
      <nav className="w-full max-w-[72rem] py-5 px-6 mx-auto flex justify-between items-center lg:px-10">
        <Link to="/" className="flex gap-2 items-center">
          <img src="./assets/images/logo.png" alt="Logo Icon" className="w-8" />
          <h3 className="text-xl font-semibold uppercase tracking-tight text-primary-500">
            CGC EVENTS
          </h3>
        </Link>

        <ul className="hidden gap-4 capitalize text-[0.95rem] md:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link to={link.path} className={`${active === link.label.toLowerCase() ? 'text-black underline' : 'text-neutral-600'} hover:underline `}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <SubscribeEmail hideForSm={true} />

        <div className="flex items-center md:hidden">
          <HamburgerMenu />
        </div>
      </nav>
    </header>
  );
};

export default Header;
