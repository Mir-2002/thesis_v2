import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col w-screen">
      <header className="h-[10vh] w-full">
        <Header />
      </header>
      <main className="h-[90vh] w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
