import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";

const HomePage = () => {
  return (
    <div>
      <Header active="home" />
      <main>
        <section className="bg-primary-50">
          <div className="w-full max-w-[72rem] py-8 px-6 mx-auto grid grid-cols-12 lg:px-10">
            <div className="col-span-6 flex flex-col items-start gap-5">
              <h1 className="text-5xl font-extrabold text-primary-500">Host, Connect, Celebrate: Your Events, Our Platform!</h1>
              <p className="text-[1.1rem] text-neutral-800 font-medium leading-6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Asperiores obcaecati iusto, ducimus unde inventore facere
                minima?
              </p>
              <Button className="rounded-full border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white transition duration-200">
                Explore Now
              </Button>
            </div>
            <div className="col-span-5 col-start-8">
              <img src="../assets/images/hero.png" alt="Hero Image" className="rounded-md shadow-md" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
