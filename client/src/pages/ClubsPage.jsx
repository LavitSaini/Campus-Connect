import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useClubStore from "../stores/clubStore";
import { Link } from "react-router-dom";
import { Loader2, CalendarDays } from "lucide-react";
import useAuthStore from "../stores/authStore";

const ClubsPage = () => {
  const { clubs, isClubsFetched, getClubs, followClub, unfollowClub } =
    useClubStore();
  const { authUser } = useAuthStore();

  const [followingClubsIds, setFollowingClubsIds] = useState([]);

  useEffect(() => {
    getClubs();
  }, []);

  useEffect(() => {
    if (clubs.length > 0) {
      const followedClubIds = clubs
        .filter(
          (club) =>
            club.followers &&
            Array.isArray(club.followers) &&
            club.followers.some((follower) => follower._id === authUser?._id)
        )
        .map((club) => club._id);

      setFollowingClubsIds(followedClubIds);
    }
  }, [clubs]);


  const handleClick = async (e, clubId) => {
    e.preventDefault();
    e.stopPropagation();
    if (followingClubsIds.includes(clubId)) {
      await unfollowClub(clubId);
      setFollowingClubsIds((prev) => prev.filter((id) => id !== clubId));
    } else {
      await followClub(clubId);
      setFollowingClubsIds((prev) => [...prev, clubId]);
    }
  };

  const formatMongoDate = (mongoDate) => {
    const date = new Date(mongoDate);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

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
                            club.clubImageUrl ||
                            "../assets/images/image_avatar.jpg"
                          }
                          alt={club.name}
                          className="w-full aspect-[3/2] object-cover"
                        />
                        <div className="flex flex-col gap-3 p-4">
                          <div className="flex flex-wrap justify-between items-center gap-3">
                            <h2 className="text-xl font-bold text-primary-500 leading-6 tracking-wide">
                              {club.name}
                            </h2>
                            <button
                              type="button"
                              className={`px-2 py-1 rounded-sm text-[0.75rem] border-2 ${
                                followingClubsIds.includes(club._id)
                                  ? "bg-primary-500 text-white border-primary-500 hover:bg-primary-300 hover:border-primary-300"
                                  : "bg-white text-primary-500 border-primary-500 hover:bg-primary-500 hover:text-white"
                              }`}
                              onClick={(e) => handleClick(e, club._id)}
                            >
                              {followingClubsIds.includes(club._id)
                                ? "Following"
                                : "Follow"}
                            </button>
                          </div>
                          <p className="text-sm text-gray-600">
                            {club.description}
                          </p>
                          <div className="flex items-center gap-2">
                            <CalendarDays className="w-5 h-5 text-primary-500" />
                            <span className="text-sm text-primary-500 font-[500]">
                              Created On: {formatMongoDate(club.createdAt)}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                          {club.admins.length > 0 && (
                              <div className="flex flex-col gap-1.5">
                                <h6 className="text-[0.875rem] text-primary-500 font-semibold">
                                  Admins
                                </h6>
                                <ul className="flex flex-col gap-2">
                                  {club.admins.map((adminObj) => (
                                    <li
                                      key={adminObj.admin._id}
                                      className="flex items-center gap-1.5 border border-primary-500 p-[0.3rem] rounded-sm"
                                    >
                                      <img
                                        src={
                                          adminObj.admin.profileImageUrl ||
                                          "../assets/images/avatar.png"
                                        }
                                        alt={adminObj.admin.name}
                                        className="size-8 rounded-full border border-primary-500"
                                      />
                                      <span className="text-[0.775rem] text-primary-500 font-[500] line-clamp-1">
                                        {adminObj.admin.name}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {club.events.length > 0 && (
                              <div className="flex flex-col gap-1.5">
                                <h6 className="text-[0.875rem] text-primary-500 font-semibold">
                                  Events
                                </h6>
                                <ul className="flex flex-col gap-2">
                                  {club.events.map((event) => (
                                    <li
                                      key={event._id}
                                      className="flex items-center gap-1.5 border border-primary-500 p-[0.3rem] rounded-sm"
                                    >
                                      <img
                                        src={
                                          event.eventImageUrl ||
                                          "../assets/images/image_avatar.jpg"
                                        }
                                        alt={event.title}
                                        className="size-8 rounded-full border border-primary-500"
                                      />
                                      <span className="text-[0.775rem] text-primary-500 font-[500] line-clamp-1">
                                        {event.title}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <h3>No Clubs Found!</h3>
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
