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
          <ul className="flex flex-row items-center justify-between space-x-5 ">
            {currentUser ? (
              <>
                <li>
                  <p className="font-medium">
                    Welcome,{" "}
                    <span className="text-xl font-medium">
                      {currentUser.username}
                    </span>
                  </p>
                </li>
                <li className="hover:bg-gray-200 p-3 rounded-lg font-medium">
                  <a href="/dashboard">Dashboard</a>
                </li>
                <button
                  onClick={handleSignout}
                  className="bg-black p-2 rounded-lg text-white font-medium hover:scale-105 transition-transform duration-100"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <li className="hover:bg-gray-200 p-3 rounded-lg font-medium">
                  <a href="/">Home</a>
                </li>

                <li className="hover:bg-gray-200 p-3 rounded-lg font-medium">
                  <a href="/register">Register</a>
                </li>
                <li className="hover:bg-gray-200 p-3 rounded-lg font-medium">
                  <a href="/login">Sign In</a>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
