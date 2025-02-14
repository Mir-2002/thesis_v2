import React from "react";

const Dashboard = () => {
  return (
    <>
      <main className="w-full h-full flex flex-row items-center justify-center p-20 space-x-20">
        <section className="flex flex-col items-center justify-center w-1/5 h-3/5 border border-gray-400 rounded-2xl font-funnel-sans">
          <div className="flex flex-col items-center justify-center w-full h-1/2 ">
            <h2 className="text-[1.5rem] font-semibold font-funnel-display">
              Upload Single File
            </h2>
            <p className="w-3/4 text-base text-center">
              Start with a single Python file. Specify classes or functions you
              want to skip.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center w-full h-1/2">
            <form
              action=""
              className="flex flex-col items-center justify-center w-full h-full space-y-5"
            >
              <input
                type="file"
                name="file"
                id="file"
                allow=".py"
                className="w-3/4 p-2 border border-gray-400 rounded-lg"
              />
              <button
                type="submit"
                className="bg-black text-white w-1/3 p-2 rounded-lg"
              >
                Upload
              </button>
            </form>
          </div>
        </section>
        <section className="flex flex-col items-center justify-center w-1/5 h-3/5 border border-gray-400 rounded-2xl font-funnel-sans">
          <div className="flex flex-col items-center justify-center w-full h-1/2">
            <h2 className="text-[1.5rem] font-semibold font-funnel-display">
              Upload Folder
            </h2>
            <p className="w-3/4 text-base text-center">
              Upload your project folder. Specify directories or files you want
              to skip.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center w-full h-1/2">
            <form
              action=""
              className="flex flex-col items-center justify-center w-full h-full space-y-5"
            >
              <input
                type="file"
                name="folder"
                id="folder"
                allow=".zip"
                className="w-3/4 p-2 border border-gray-400 rounded-lg"
              />
              <button
                type="submit"
                className="bg-black text-white w-1/3 p-2 rounded-lg"
              >
                Upload
              </button>
            </form>
          </div>
        </section>
        <section className="flex flex-col items-center justify-center w-1/5 h-3/5 border border-gray-400 rounded-2xl font-funnel-sans">
          <div className="flex flex-col items-center justify-center w-full h-1/2">
            <h2 className="text-[1.5rem] font-semibold font-funnel-display">
              Using a Repository
            </h2>
            <p className="w-4/5 text-base text-center">
              Paste a link to your GitHub repository. Specify a branch{" "}
              {"(default: main)"}. List directories or files you want to skip.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center w-full h-1/2">
            <form
              action=""
              className="flex flex-col items-center justify-center w-full h-full space-y-5"
            >
              <input
                type="text"
                name="repository"
                id="repository"
                placeholder="Link to the Repository"
                className="w-3/4 p-2 border border-gray-400 rounded-lg"
              />
              <button
                type="submit"
                className="bg-black text-white w-1/3 p-2 rounded-lg "
              >
                Start
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
};

export default Dashboard;
