import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import useAuthStore from "./stores/authStore";
import HomePage from "./pages/HomePage";
import CreateEventPage from "./pages/CreateEventPage";
import EventsPage from "./pages/EventsPage";

const App = () => {
  const { authUser } = useAuthStore();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route 
            path="/create-event" 
            element={authUser ? <CreateEventPage /> : <Navigate to="/" />} 
          />
          <Route path="/events" element={<EventsPage />} />
        </Routes>
      </BrowserRouter>

      <Toaster position="bottom-right" reverseOrder={true} />
    </>
  );
};

export default App;
