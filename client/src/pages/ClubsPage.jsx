import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loader2, CalendarDays } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useClubStore from "../stores/clubStore";

const ClubsPage = () => {
  const { clubs, isClubsFetched, getClubs } = useClubStore();

  useEffect(() => {
    getClubs();
  }, []);

  return (
    <>
      <Header active="clubs" />
      <main>
        <div className="w-full max-w-[72rem] py-8 px-6 mx-auto lg:px-10">
          <div className="relative min-h-[65vh]">
            {isClubsFetched ? (
              clubs.length > 0 ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 custom-lg:grid-cols-3 gap-6">
                  {clubs.map((club) => (
                    <li
                      key={club._id}
                      className="bg-primary-50 shadow-md rounded-md overflow-hidden border border-primary-300 transition hover:shadow-[0px_4px_20px_rgba(59,130,246,0.3)]"
                    >
                      <Link to={`/clubs/${club._id}`}>
                        <img
                          src={
                            club.clubImageUrl || "../assets/images/image_avatar.jpg"
                          }
                          alt={club.name}
                          className="w-full aspect-[3/2] object-cover"
                        />
                        <div className="flex flex-col gap-3 p-4">
                          <h2 className="text-xl font-bold text-primary-500 leading-6 tracking-wide">
                            {club.name}
                          </h2>
                          <p className="text-sm text-gray-600">
                            {club.description.length > 200
                              ? club.description.slice(0, 200) + "..."
                              : club.description}
                          </p>
                          <div className="flex items-center gap-2">
                            <CalendarDays className="w-5 h-5 text-primary-500" />
                            <span className="text-sm text-primary-500 font-[500]">
                              Created On:{" "}
                              {new Date(club.createdAt).toLocaleDateString(
                                "en-GB",
                                {
                                  day: "2-digit",
                                  month: "long",
                                  year: "numeric",
                                }
                              )}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <h3 className="text-center text-lg text-gray-600">
                  No Clubs Found!
                </h3>
              )
            ) : (
              <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2">
                <Loader2 className="size-10 animate-spin text-primary-500" />
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ClubsPage;
