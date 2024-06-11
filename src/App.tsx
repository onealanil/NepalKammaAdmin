import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Reports from "./pages/Reports";
import Payment from "./pages/Payment";
import Gigs from "./pages/Gigs";
import JobProviders from "./pages/JobProviders";
import JobSeekers from "./pages/JobSeekers";
import Jobs from "./pages/Jobs";
import Login from "./pages/loginSignup/Login";
import { useGlobalStore } from "./config/Store";
import Deactivated from "./pages/Deactivated";
import CreateNotification from "./pages/CreateNotification";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await useGlobalStore.getState().checkAuth();
        if (response) {
          const getUser = useGlobalStore.getState().user;
          if (getUser.role !== "admin") {
            setIsLoggedIn(false);
            console.log("Not Authorized");
          } else {
            setIsLoggedIn(true);
          }
        } else {
          setIsLoggedIn(false);
          console.log("Not Authenticated");
        }
      } catch (error) {
        console.log("Error occurred while checking authentication:", error);
      } finally {
        setLoading(false);
      }
    };
    checkAuthentication();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/home" /> : <Login />}
        />
        <Route
          path="/home"
          element={isLoggedIn ? <Home /> : <Navigate to="/" />}
        />
        <Route
          path="/reports"
          element={isLoggedIn ? <Reports /> : <Navigate to="/" />}
        />
        <Route
          path="/payment"
          element={isLoggedIn ? <Payment /> : <Navigate to="/" />}
        />
        <Route
          path="/gigs"
          element={isLoggedIn ? <Gigs /> : <Navigate to="/" />}
        />
        <Route
          path="/job-providers"
          element={isLoggedIn ? <JobProviders /> : <Navigate to="/" />}
        />
        <Route
          path="/job-seekers"
          element={isLoggedIn ? <JobSeekers /> : <Navigate to="/" />}
        />
        <Route
          path="/jobs"
          element={isLoggedIn ? <Jobs /> : <Navigate to="/" />}
        />
         <Route
          path="/create-notification"
          element={isLoggedIn ? <CreateNotification /> : <Navigate to="/" />}
        />
        <Route
          path="/deactivated-accounts"
          element={isLoggedIn ? <Deactivated /> : <Navigate to="/" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
