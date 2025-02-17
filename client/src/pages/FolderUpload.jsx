// import React, { useState } from "react";
// import { useAuth } from "../contexts/AuthContext";

// const FolderUpload = () => {
//   const { currentUser } = useAuth();
//   const [fileError, setFileError] = useState("");
//   const [functionOrClassSkipList, setFunctionOrClassSkipList] = useState([]);
//   const [fileSkipList, setFileSkipList] = useState([]);
//   const [folderSkipList, setFolderSkipList] = useState([]);
//   const [inputValue, setInputValue] = useState("");
//   const [files, setFiles] = useState([]);

//   const handleAddItem = (e) => {
//     e.preventDefault();
//     if (inputValue.trim()) {
//       setSkipItems([...skipItems, inputValue]);
//       setInputValue("");
//     }
//   };

//   const handleRemoveItem = (item) => {
//     setSkipItems(skipItems.filter((item) => item !== item));
//   };

//   const handleFolderUpload = async (e) => {
//     e.preventDefault();
//     if (!currentUser) {
//       alert("Please login to upload a folder");
//       return;
//     }

//     const uploadedFiles = Array.from(e.target.files);
//     if (uploadedFiles.length === 0) {
//       setFileError("Please select a folder");
//       return;
//     }

//     setFiles(uploadedFiles);

//     const formData = new FormData();
//     uploadedFiles.forEach((file) => {
//       formData.append("files", files);
//     });
//     formData.append("skipItems", JSON.stringify(skipItems));
//   };

//   return (
//     <>
//       <main className="flex flex-row w-full h-full font-funnel-sans">
//         <section className="flex flex-col items-center justify-center w-1/2 h-full p-20">
//           <form
//             className="flex flex-col items-center justify-center space-y-10"
//             onSubmit={handleFolderUpload}
//           >
//             <label
//               htmlFor="file"
//               className="text-[2rem] font-bold font-funnel-display"
//             >
//               Upload your Project Folder
//             </label>
//             <input
//               type="file"
//               id="folder"
//               name="folder"
//               webkitdirectory="true"
//               directory="true"
//               multiple
//               className="border border-gray-400 p-5 rounded-lg hover:bg-gray-200"
//             />
//             <button
//               type="submit"
//               className="bg-black text-white px-5 py-2 rounded-lg"
//             >
//               Upload
//             </button>
//           </form>
//           {fileError && (
//             <p className="text-red-500 mt-5 text-center">{fileError}</p>
//           )}
//         </section>
//       </main>
//     </>
//   );
// };

// export default FolderUpload;

import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { directoryOpen } from "browser-fs-access";

const FolderUpload = () => {
  const { currentUser } = useAuth();
  const [fileError, setFileError] = useState("");
  const [functionSkipList, setFunctionSkipList] = useState([]);
  const [fileSkipList, setFileSkipList] = useState([]);
  const [folderSkipList, setFolderSkipList] = useState([]);
  const [functionInputValue, setFunctionInputValue] = useState("");
  const [fileInputValue, setFileInputValue] = useState("");
  const [folderInputValue, setFolderInputValue] = useState("");
  const [files, setFiles] = useState([]);

  const APIEndpoint = import.meta.env.VITE_API_ENDPOINT;

  const handleAddItem = (
    e,
    setSkipList,
    skipList,
    inputValue,
    setInputValue
  ) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setSkipList([...skipList, inputValue]);
      setInputValue("");
    }
  };

  const handleRemoveItem = (item, setSkipList, skipList) => {
    setSkipList(skipList.filter((i) => i !== item));
  };

  const handleFolderUpload = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      alert("Please login to upload a folder");
      return;
    }

    try {
      const uploadedFiles = await directoryOpen({
        recursive: true,
      });

      if (uploadedFiles.length === 0) {
        setFileError("Please select a folder");
        return;
      }

      setFiles(uploadedFiles);

      const formData = new FormData();
      uploadedFiles.forEach((file) => {
        formData.append("folder", file);
      });

      formData.append(
        "relativePaths",
        JSON.stringify(uploadedFiles.map((file) => file.webkitRelativePath))
      );

      formData.append("function_skip_list", JSON.stringify(functionSkipList));
      formData.append("file_skip_list", JSON.stringify(fileSkipList));
      formData.append("folder_skip_list", JSON.stringify(folderSkipList));

      const response = await fetch(
        `${APIEndpoint}/api/users/${currentUser.uid}/folders`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Upload failed");
      }

      const result = await response.json();
      alert("Folder uploaded successfully");
    } catch (error) {
      console.error("Upload error:", error);
      setFileError(error.message);
    }
  };
  return (
    <>
      <main className="flex flex-row w-full h-full font-funnel-sans">
        <section className="flex flex-col items-center justify-center w-1/4 h-full p-20">
          <form
            onSubmit={handleFolderUpload}
            className="flex flex-col items-center justify-center space-y-10"
          >
            <label
              htmlFor="folder"
              className="text-[2rem] font-bold font-funnel-display"
            >
              Upload your Project Folder
            </label>
            <button
              type="submit"
              className="bg-black text-white px-5 py-2 rounded-lg"
            >
              Select Folder
            </button>
          </form>
          {fileError && (
            <p className="text-red-500 mt-5 text-center">{fileError}</p>
          )}
        </section>
        <section className="flex flex-row items-center justify-center w-3/4 h-full p-20">
          <form
            onSubmit={(e) =>
              handleAddItem(
                e,
                setFunctionSkipList,
                functionSkipList,
                functionInputValue,
                setFunctionInputValue
              )
            }
            className="flex flex-col items-center justify-center space-y-10 w-1/3 h-full"
          >
            <label
              htmlFor="functionSkipItem"
              className="text-[2rem] font-bold font-funnel-display text-center"
            >
              Enter function/class names to skip
            </label>
            <p className="w-3/4 text-center">
              Case-insensitive but include underscores or dashes if it does
              include them. <br />
              <span className="font-medium">eg. add_item, delete-item</span>
            </p>
            <input
              type="text"
              id="functionSkipItem"
              placeholder="Function/Class"
              value={functionInputValue}
              onChange={(e) => setFunctionInputValue(e.target.value)}
              className="border-b border-gray-400 w-1/3 p-2 focus:outline-none focus:border-b-2 focus:w-1/2 transition-all duration-100"
            />
            <button
              type="submit"
              className="bg-black text-white px-5 py-2 rounded-lg"
            >
              Add
            </button>
            <ul className="mt-10">
              {functionSkipList.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between w-full p-2 border-b border-gray-300"
                >
                  <span>{item}</span>
                  <button
                    onClick={() =>
                      handleRemoveItem(
                        item,
                        setFunctionSkipList,
                        functionSkipList
                      )
                    }
                    className="ml-5 text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </form>

          <form
            onSubmit={(e) =>
              handleAddItem(
                e,
                setFileSkipList,
                fileSkipList,
                fileInputValue,
                setFileInputValue
              )
            }
            className="flex flex-col items-center justify-center space-y-10 mt-10 w-1/3 h-full"
          >
            <label
              htmlFor="fileSkipItem"
              className="text-[2rem] font-bold font-funnel-display"
            >
              Enter file names to skip
            </label>
            <p className="w-3/4 text-center">
              Only python files are accepted so if it's any other kind of file,
              it is automatically skipped.
            </p>
            <input
              type="text"
              id="fileSkipItem"
              placeholder="File"
              value={fileInputValue}
              onChange={(e) => setFileInputValue(e.target.value)}
              className="border-b border-gray-400 w-1/3 p-2 focus:outline-none focus:border-b-2 focus:w-1/2 transition-all duration-100"
            />
            <button
              type="submit"
              className="bg-black text-white px-5 py-2 rounded-lg"
            >
              Add
            </button>
            <ul className="mt-10">
              {fileSkipList.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between w-full p-2 border-b border-gray-300"
                >
                  <span>{item}</span>
                  <button
                    onClick={() =>
                      handleRemoveItem(item, setFileSkipList, fileSkipList)
                    }
                    className="ml-5 text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </form>

          <form
            onSubmit={(e) =>
              handleAddItem(
                e,
                setFolderSkipList,
                folderSkipList,
                folderInputValue,
                setFolderInputValue
              )
            }
            className="flex flex-col items-center justify-center space-y-10 mt-10 w-1/3 h-full"
          >
            <label
              htmlFor="folderSkipItem"
              className="text-[2rem] font-bold font-funnel-display"
            >
              Enter folder names to skip
            </label>
            <p>Case-insensitive.</p>
            <input
              type="text"
              id="folderSkipItem"
              placeholder="Folder"
              value={folderInputValue}
              onChange={(e) => setFolderInputValue(e.target.value)}
              className="border-b border-gray-400 w-1/3 p-2 focus:outline-none focus:border-b-2 focus:w-1/2 transition-all duration-100"
            />
            <button
              type="submit"
              className="bg-black text-white px-5 py-2 rounded-lg"
            >
              Add
            </button>
            <ul className="mt-10">
              {folderSkipList.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between w-full p-2 border-b border-gray-300"
                >
                  <span>{item}</span>
                  <button
                    onClick={() =>
                      handleRemoveItem(item, setFolderSkipList, folderSkipList)
                    }
                    className="ml-5 text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </form>
        </section>
      </main>
    </>
  );
};

export default FolderUpload;
