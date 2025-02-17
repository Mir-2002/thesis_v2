import React from "react";
import PythonLogo from "../assets/python_logo.svg";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-row items-center justify-center w-full h-full">
        <section className="flex items-center justify-center w-1/2 h-full p-20">
          <img src={PythonLogo} alt="" />
        </section>
        <section className="flex flex-col items-center justify-center w-1/2 h-full p-20 font-funnel-sans space-y-10">
          <h1 className="text-[6rem] font-bold leading-24 font-funnel-display">
            Documentation, <br /> Made Easier.
          </h1>
          <p className="text-[1.5rem] text-center w-3/4">
            Seamlessly create documentation for your Python code using our
            AI-driven tool.
          </p>
          <button
            className="text-[1.5rem] p-3 bg-black text-white rounded-lg font-medium hover:scale-105 transition-transform duration-100"
            onClick={() => navigate("/register")}
          >
            Get Started
          </button>
        </section>
      </div>
    </>
  );
};

export default Home;
