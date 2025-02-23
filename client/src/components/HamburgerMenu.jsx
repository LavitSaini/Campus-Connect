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
import SubscribeEmail from "../components/SubscribeEmail";

const HamburgerMenu = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <img src="./assets/icons/menu.svg" alt="Menu Icon" className="w-7" />
      </SheetTrigger>
      <SheetContent className='flex flex-col'>
        <SheetHeader className='flex flex-col items-start gap-2 text-start'>
          <SheetTitle className='leading-5 -mt-2'>Subscribe to email to get latest updates!</SheetTitle>
          <SubscribeEmail hideForSm={false} />
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <ul className="flex flex-col gap-3 capitalize text-[0.95rem]">
          {navLinks.map((link) => (
            <li key={link.label} className="border-b-[1px] py-1">
              <a href={link.path} className="hover:underline">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
};

export default HamburgerMenu;
