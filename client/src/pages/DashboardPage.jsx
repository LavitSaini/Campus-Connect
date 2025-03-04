import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { dashboardSidebarLabels } from "../utils/constant";

const DashboardPage = () => {
  const [activeLabel, setActiveLabel] = useState("events");
  return (
    <>
      <Header active="profile" />
      <main>
        <div className="w-full max-w-[72rem] py-8 px-6 mx-auto lg:px-10">
          <div className="grid grid-cols-8 min-h-screen rounded-md shadow-md border-[1px]">
            <aside className="col-span-2 h-full border-r-[1px]">
              <ul className="flex flex-col">
                {dashboardSidebarLabels.map((label) => (
                  <li key={label.id}>
                    <button
                      className={`w-full py-1.5 capitalize transition-colors ${
                        label.text === activeLabel
                          ? "bg-primary-500 text-white"
                          : "bg-primary-50 text-black"
                      }`}
                      onClick={() => setActiveLabel(label.text)}
                    >
                      {label.text}
                    </button>
                  </li>
                ))}
              </ul>
            </aside>
            <section className="col-span-6 h-full"></section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default DashboardPage;
