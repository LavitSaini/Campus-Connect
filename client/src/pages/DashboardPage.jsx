import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Events from "../components/Events";
import Clubs from "../components/Clubs";
import useAuthStore from "../stores/authStore";

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState("events");
  const { authUser } = useAuthStore();

  return (
    <>
      <Header active="profile" />
      <main>
        <div className="w-full max-w-[72rem] py-8 px-6 mx-auto lg:px-10">
          <div className="flex items-center bg-primary-50 border rounded-md">
            <button
              className={`px-8 py-3 text-base font-semibold rounded-tl-lg ${
                activeTab === "events"
                  ? "bg-primary-500 text-white"
                  : "text-primary-500 hover:bg-primary-300 hover:text-white"
              } transition-all`}
              onClick={() => setActiveTab("events")}
            >
              Events
            </button>
            <button
              className={`px-8 py-3 text-base font-semibold rounded-tr-lg ${
                activeTab === "clubs"
                  ? "bg-primary-500 text-white"
                  : "text-primary-500 hover:bg-primary-300 hover:text-white"
              } transition-all`}
              onClick={() => setActiveTab("clubs")}
            >
              Clubs
            </button>
          </div>

          <section className="mt-5 bg-white min-h-[70vh]">
            {activeTab === "events" ? (
              <Events userId={authUser._id} />
            ) : (
              <Clubs userId={authUser._id} />
            )}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default DashboardPage;
