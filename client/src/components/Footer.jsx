import React from "react";

const Footer = () => {
  return (
    <footer className="border-t-[1px] bg-primary-50">
      <div className="w-full max-w-[72rem] py-5 px-6 mx-auto flex flex-col gap-3 justify-between items-center lg:px-10 sm:flex-row">
        <img src="/assets/images/footer_logo.png" alt="Footer Logo Icon" className="w-40" />
        <p className="text-neutral-700">2025 <strong className="text-primary-500">Campus Connect</strong>. All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
