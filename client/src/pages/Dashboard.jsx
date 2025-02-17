import React from "react";
import { useNavigate } from "react-router-dom";

const Section = ({ title, description, onClick }) => {
  return (
    <section
      className="flex flex-col items-center justify-center w-1/5 h-3/5 border border-gray-400 rounded-2xl font-funnel-sans hover:bg-black hover:text-white hover:scale-105 transition-transform duration-100"
      onClick={onClick}
    >
      <div className="flex flex-col items-center justify-between w-full h-1/2 p-10">
        <h2 className="text-[1.5rem] font-semibold font-funnel-display">
          {title}
        </h2>
        <p className="w-3/4 text-base text-center">{description}</p>
      </div>
    </section>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <>
      <main className="w-full h-full flex flex-row items-center justify-center p-20 space-x-20">
        <Section
          title="Upload Single File"
          description="Start with a single Python file. Option to skip specific classes or functions."
          onClick={() => navigate("/file-upload")}
        />
        <Section
          title="Upload Folder"
          description="Upload your project folder. Option to skip specific directories and files."
          onClick={() => navigate("/folder-upload")}
        />
        <Section
          title="Using a Repository"
          description="Paste a link to your GitHub repository. Option to choose a specific branch."
        />
      </main>
    </>
  );
};

export default Dashboard;
