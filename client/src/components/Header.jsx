import React, { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { doSignout } from "../auth/auth";

const Header = () => {
  const { currentUser } = useAuth();

  const handleSignout = async () => {
    await doSignout();
  };

  return (
    <>
      <header className="flex flex-row items-center justify-between w-full h-full px-20 py-5">
        <div className="flex flex-row items-center justify-start w-1/2">
          <h1 className="text-[3rem] font-bold font-funnel-display">
            Exceptionals
          </h1>
        </div>
        <nav className="flex flex-row items-center justify-end w-1/2">
          <ul className="flex flex-row items-center justify-between space-x-10">
            {currentUser ? (
              <li>
                <p>Welcome, {currentUser.username}</p>
              </li>
            ) : null}
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/dashboard">Dashboard</a>
            </li>
            <li>
              <a href="/register">Register</a>
            </li>
            <li>
              <a href="/login">Sign In</a>
            </li>
            {currentUser ? (
              <button onClick={handleSignout}>Logout</button>
            ) : null}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
