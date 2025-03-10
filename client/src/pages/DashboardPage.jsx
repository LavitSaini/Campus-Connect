import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Events from "../components/Events";
import Clubs from "../components/Clubs";
import useAuthStore from "../stores/authStore";
import { Link, useLocation } from "react-router-dom";

const DashboardPage = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.state ? location.state.activeTab : 'events');
  const { authUser } = useAuthStore();

  return (
    <>
      <Header active="profile" />
      <main>
        <div className="w-full max-w-[72rem] py-8 px-6 mx-auto lg:px-10">
          <div className="flex flex-wrap justify-between items-center gap-[1px] bg-primary-50 border rounded-md">
            <div className="flex items-center">
              <button
                className={`px-8 py-3 text-base font-semibold rounded-tl-md rounded-bl-md ${
                  activeTab === "events"
                    ? "bg-primary-500 text-white"
                    : "text-primary-500 hover:bg-primary-300 hover:text-white"
                } transition-all`}
                onClick={() => setActiveTab("events")}
              >
                Events
              </button>
              <button
                className={`px-8 py-3 text-base font-semibold rounded-tr-md rounded-br-md ${
                  activeTab === "clubs"
                    ? "bg-primary-500 text-white"
                    : "text-primary-500 hover:bg-primary-300 hover:text-white"
                } transition-all`}
                onClick={() => setActiveTab("clubs")}
              >
                Clubs
              </button>
            </div>
            <Link
              to={activeTab === "events" ? "/create-event" : "/create-club"}
              className="px-6 py-3 text-base font-semibold rounded-tr-md rounded-br-md bg-primary-500 text-white hover:bg-primary-300"
            >
              {activeTab === "events" ? "Create New Event" : "Create New Club"}
            </Link>
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
