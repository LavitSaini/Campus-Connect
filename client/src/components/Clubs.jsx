import React, { useEffect } from "react";
import { Edit, Loader2, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import useClubStore from "../stores/clubStore";

const Clubs = ({ userId }) => {
  const { clubs, isClubsFetched, getUserClubs } = useClubStore();

  useEffect(() => {
    getUserClubs(userId);
  }, []);

  const handleClubEdit = (e, clubId) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleClubDelete = (e, clubId) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
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
                      {club.description.length > 80
                        ? club.description.slice(0, 80) + "..."
                        : club.description}
                    </p>
                    <div className="flex gap-2.5 items-center">
                      <button
                        onClick={(e) => handleClubEdit(e, club._id)}
                        className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-sm bg-primary-500 text-white hover:bg-primary-300"
                      >
                        <Edit className="size-4" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={(e) => handleClubDelete(e, club._id)}
                        variant="destructive"
                        className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-sm bg-red-500 text-white hover:bg-red-400"
                      >
                        <Trash2 className="size-4" />
                        <span>Delete</span>
                      </button>
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
  );
};

export default Clubs;
