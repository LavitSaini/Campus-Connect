import React, { useEffect } from "react";
import useEventStore from "../stores/eventStore";
import { Edit, Loader2, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const Events = ({ userId }) => {
  const { events, isEventsFetched, getUserEvents, isDeletingEvent, deleteEvent } = useEventStore();

  useEffect(() => {
    getUserEvents(userId);
  }, []);

  const handleEventEdit = (e, eventId) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleEventDelete = async (e, eventId) => {
    e.preventDefault();
    e.stopPropagation();
    await deleteEvent(eventId);
    getUserEvents(userId);
  };

  return (
    <div className="relative min-h-[65vh]">
      {isEventsFetched && !isDeletingEvent  ? (
        events.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 custom-lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <li
                key={event._id}
                className="bg-primary-50 shadow-md rounded-md overflow-hidden border border-primary-300 transition hover:shadow-[0px_4px_20px_rgba(59,130,246,0.3)]"
              >
                <Link to={`/events/${event._id}`}>
                  <img
                    src={
                      event.eventImageUrl || "../assets/images/image_avatar.jpg"
                    }
                    alt={event.title}
                    className="w-full aspect-[3/2] object-cover"
                  />
                  <div className="flex flex-col gap-3 p-4">
                    <h2 className="text-xl font-bold text-primary-500 leading-6 tracking-wide">
                      {event.title}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {event.description.length > 80
                        ? event.description.slice(0, 80) + "..."
                        : event.description}
                    </p>
                    <div className="flex gap-2.5 items-center">
                      <button
                        onClick={(e) => handleEventEdit(e, event._id)}
                        className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-sm bg-primary-500 text-white hover:bg-primary-300"
                      >
                        <Edit className="size-4" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={(e) => handleEventDelete(e, event._id)}
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
          <h3>No Events Found!</h3>
        )
      ) : (
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2">
          <Loader2 className="size-10 animate-spin text-primary-500" />
        </div>
      )}
    </div>
  );
};

export default Events;
