import { Link, useParams } from "react-router-dom";
import useClubStore from "../stores/clubStore";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  Loader2,
  Users,
  CalendarDays,
  UserPlus,
  UserCheck,
  MessageCircle,
} from "lucide-react";
import useAuthStore from "../stores/authStore";

const SingleClubPage = () => {
  const { clubId } = useParams();
  const { authUser } = useAuthStore();
  const { club, isClubFetched, getSingleClub, followClub, unfollowClub } =
    useClubStore();

  const [isFollowing, setIsFollowing] = useState(
    authUser.followingClubs.map((club) => club._id).includes(clubId)
  );

  useEffect(() => {
    getSingleClub(clubId);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const handleClick = async () => {
    if (isFollowing) {
      await unfollowClub(clubId);
    } else {
      await followClub(clubId);
    }
    setIsFollowing((prev) => !prev);
  };

  return (
    <>
      <Header />
      <main>
        <div className="w-full max-w-[72rem] py-8 px-6 mx-auto md:px-10">
          <div className="min-h-[65vh] rounded-md shadow-md border-[1px]">
            {isClubFetched ? (
              <div>
                <div className="relative w-full h-64 md:h-96 rounded-md transition group">
                  <img
                    src={
                      club.clubImageUrl || "../assets/images/image_avatar.jpg"
                    }
                    alt={club.name}
                    className="w-full h-full object-cover rounded-t-md"
                  />
                  <div className="hidden absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent items-center justify-center group-hover:flex">
                    <h2 className="text-white text-3xl font-bold">
                      {club.name}
                    </h2>
                  </div>
                </div>

                <div className="flex flex-col gap-6 p-8">
                  <div className="flex flex-col items-start gap-3">
                    <h1 className="text-3xl text-primary-500 font-semibold text-primary-600">
                      {club.name}
                    </h1>
                    <div className="flex gap-3">
                      <button
                        className={`px-4 py-2 text-sm font-semibold rounded-md flex items-center gap-2 border-2
                          ${
                            isFollowing
                              ? "bg-primary-500 text-white border-primary-500 hover:bg-primary-300 hover:border-primary-300"
                              : "bg-white border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white"
                          }`}
                        onClick={handleClick}
                      >
                        {isFollowing ? (
                          <>
                            <UserCheck className="size-5" />
                            Following
                          </>
                        ) : (
                          <>
                            <UserPlus className="size-5" />
                            Follow
                          </>
                        )}
                      </button>
                      <button className="px-4 py-2 text-sm font-semibold rounded-md flex items-center gap-2 border-2 bg-primary-500 text-white border-primary-500 hover:bg-primary-300 hover:border-primary-300">
                        <MessageCircle className="size-5" />
                        <span>Chat</span>
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-700 text-md leading-relaxed">
                    {club.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-100 p-5 rounded-md shadow flex flex-col gap-2">
                      <h3 className="text-md font-semibold flex items-center gap-2">
                        <Users className="w-5 h-5 text-primary-500" />
                        Followers
                      </h3>
                      <p className="text-gray-600">
                        {club.followers.length} Members
                      </p>
                    </div>

                    <div className="bg-gray-100 p-5 rounded-md shadow flex flex-col gap-2.5">
                      <h3 className="text-md font-semibold flex items-center gap-2">
                        <Users className="w-5 h-5 text-primary-500" />
                        Admins
                      </h3>
                      <ul className="flex flex-col gap-2 text-gray-600 text-sm">
                        {club.admins.length > 0 ? (
                          club.admins.map((adminObj) => (
                            <li
                              key={adminObj.admin._id}
                              className="flex items-center gap-2 p-1.5 border rounded-sm"
                            >
                              <img
                                src={
                                  adminObj.admin.profileImageUrl ||
                                  "../assets/images/avatar.png"
                                }
                                alt={adminObj.admin.name}
                                className="size-8 rounded-full border border-primary-500"
                              />
                              {adminObj.admin.name}
                            </li>
                          ))
                        ) : (
                          <p>No Admins</p>
                        )}
                      </ul>
                    </div>

                    <div className="bg-gray-100 p-5 rounded-md shadow flex flex-col gap-2">
                      <h3 className="text-md font-semibold flex items-center gap-2">
                        <CalendarDays className="w-5 h-5 text-primary-500" />
                        Events
                      </h3>
                      <p className="text-gray-600">
                        {club.events.length} Organized Events
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    <h2 className="text-2xl font-bold text-primary-500">
                      Club Events:
                    </h2>
                    {club.events.length > 0 ? (
                      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {club.events.map((event) => (
                          <li
                            key={event._id}
                            className="bg-white p-4 shadow-md rounded-md border flex flex-col gap-3.5 items-start"
                          >
                            <img
                              src={
                                event.eventImageUrl ||
                                "../assets/images/image_avatar.jpg"
                              }
                              alt={event.title}
                              className="w-full rounded-md aspect-[3/2] object-cover"
                            />
                            <div className="flex flex-col gap-1.5">
                              <h3 className="text-lg font-semibold text-primary-500">
                                {event.title}
                              </h3>
                              <div className="flex items-center gap-3 text-gray-600">
                                <CalendarDays className="text-primary-500 size-6" />
                                <span className="font-medium text-sm">
                                  {formatDate(event.date)}
                                </span>
                              </div>
                            </div>
                            <Link
                              to={`/events/${event._id}`}
                              className="text-primary-500 hover:underline text-sm"
                            >
                              View Details
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500">No events yet!.</p>
                    )}
                  </div>
                </div>
              </div>
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

export default SingleClubPage;
