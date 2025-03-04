import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { works } from "../utils/constant";

const HomePage = () => {
  return (
    <>
      <Header active="home" />
      <main>
        <section className="relative bg-primary-50 bg-[url('../assets/images/hero.png')] bg-cover bg-center bg-no-repeat">
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>

          <div className="relative w-full max-w-[72rem] mx-auto px-6 py-12 md:py-12 xl:py-16 lg:px-10">
            <div className="flex flex-col gap-4 max-w-xl">
              <h1 className="text-3xl lg:text-4xl font-extrabold text-white">
                Your Campus, Your Events – All in One Place!
              </h1>
              <p className="text-base md:text-[1.1rem] text-gray-100 leading-[1.6rem]">
                Discover, connect, and collaborate effortlessly. Stay updated on
                campus events, find teammates, and engage with your favorite
                clubs – all with CampusConnect!
              </p>
              <Link to="/events">
                <Button className="w-full sm:w-auto rounded-full border-2 border-white bg-white text-primary-500 hover:bg-primary-500 hover:text-white hover:border-primary-500 transition duration-200">
                  Explore Events
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <section className="text-center">
          <div className="w-full max-w-[72rem] px-6 py-12 lg:py-12 xl:py-16 mx-auto lg:px-10">
            <h2 className="text-3xl font-bold text-primary-500">
              How CampusConnect Works?
            </h2>
            <p className="text-lg text-neutral-700 mt-2">
              Whether you're a student looking for events or an admin organizing
              them, CampusConnect makes it simple!
            </p>
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-5">
              {works.map((step) => (
                <div
                  key={step.id}
                  className="p-4 bg-primary-50 rounded-md shadow-md flex flex-col items-center"
                >
                  {<step.icon size={32} className="text-primary-500" />}
                  <h3 className="text-[1.25rem] font-semibold text-primary-500 mt-3 leading-[1.3rem]">
                    {step.title}
                  </h3>
                  <p className="text-neutral-700 mt-3 text-[0.95rem] leading-[1.3rem]">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
