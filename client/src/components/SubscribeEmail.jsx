import React, { useState } from "react";
import { Button } from "./ui/button";
import toast from "react-hot-toast";

const SubscribeEmail = ({ hideForSm }) => {
  const [email, setEmail] = useState("");

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateEmail(email)) {
      // Call Api
    } else {
      toast.error("Invalid Email!");
    }
  };

  return (
    <div className={`${hideForSm ? "hidden md:block" : "block"}`}>
      <form onSubmit={handleSubmit} className="flex gap-1 items-center">
        <input
          type="email"
          className="text-sm outline-none px-2 py-1 border-2 border-solid border-primary-500 rounded-md placeholder:text-gray-600"
          name="email"
          placeholder="Enter your email..."
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button type="submit" size="sm" className='border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white transition duration-200' >
          Subscribe
        </Button>
      </form>
    </div>
  );
};

export default SubscribeEmail;
