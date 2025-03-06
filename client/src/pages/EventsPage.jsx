import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useEventStore from "../stores/eventStore";
import { Loader2, MapPin, CalendarDays, User } from "lucide-react";
import { Link } from "react-router-dom";

const EventsPage = () => {
  const { events, isEventsFetched, getEvents } = useEventStore();

  useEffect(() => {
    getEvents();
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

  return (
    <>
      <Header active="events" />
      <main>
        <div className="w-full max-w-[72rem] py-8 px-6 mx-auto lg:px-10">
          <div className="relative min-h-[65vh]">
            {isEventsFetched ? (
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
                            event.eventImageUrl ||
                            "../assets/images/image_avatar.jpg"
                          }
                          alt={event.title}
                          className="w-full aspect-[3/2] object-cover"
                        />
                        <div className="flex flex-col gap-3 p-4">
                          <h2 className="text-xl font-bold text-primary-500 leading-6 tracking-wide">
                            {event.title}
                          </h2>
                          <p className="text-sm text-gray-600">
                            {event.description.length > 200
                              ? event.description.slice(0, 200) + "..."
                              : event.description}
                          </p>
                          {event.category.length > 0 && (
                            <ul className="flex flex-wrap items-center gap-1.5">
                              {event.category.map((text) => (
                                <li
                                  key={text}
                                  className="px-2.5 py-1 rounded-sm bg-primary-500 text-white text-[0.75rem]"
                                >
                                  {text}
                                </li>
                              ))}
                            </ul>
                          )}
                          <div className="flex items-center gap-2">
                            <User className="w-5 h-5 text-primary-500" />
                            <span className="text-sm font-medium text-gray-700">
                              {event.author.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-primary-500" />
                            <span className="text-sm text-gray-600">
                              {event.location}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CalendarDays className="w-5 h-5 text-primary-500" />
                            <span className="text-sm text-gray-600">
                              {formatDate(event.date)}
                            </span>
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
        </div>
      </main>
      <Footer />
    </>
  );
};

export default EventsPage;
