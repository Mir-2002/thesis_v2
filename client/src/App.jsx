import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import { AuthProvider } from "./contexts/AuthContext";
import FileUpload from "./pages/FileUpload";
import FolderUpload from "./pages/FolderUpload";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />

              {/* Protected Routes */}
              <Route element={<ProtectedRoutes />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/file-upload" element={<FileUpload />} />
                <Route path="/folder-upload" element={<FolderUpload />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
