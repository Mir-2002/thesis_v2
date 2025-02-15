import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { doSignInWithEmailAndPassword, doSignout } from "../auth/auth";
import { useAuth } from "../contexts/AuthContext";

const Input = ({ type, name, id, label, value, onChange }) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        className="p-2 border border-gray-600 rounded-lg"
      />
    </>
  );
};

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("userCreated") === "true") {
      setMessage("User created successfully.");
    }
  }, [location.search]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    try {
      setLoading(true);
      await doSignInWithEmailAndPassword(email, password);
      console.log("User signed in successfully");
      setLoading(false);
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <>
      <section className="flex flex-col justify-center items-center w-full h-full font-funnel-sans space-y-10">
        <h1 className="text-[3rem] font-bold font-funnel-display">Sign In</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center space-y-5 w-1/4 h-3/5 border border-gray-400 p-15 rounded-2xl"
        >
          <div className="flex flex-col space-y-2 w-3/4">
            <Input
              type="email"
              name="email"
              id="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col space-y-2 w-3/4">
            <Input
              type="password"
              name="password"
              id="password"
              label="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <a href="">Forgot Password?</a>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="bg-black text-white w-1/3 p-2 rounded-lg"
            disabled={loading}
          >
            Sign In
          </button>
          <p>
            Don't have an account?{" "}
            <span>
              <Link to="/register" className="hover:underline">
                Register
              </Link>
            </span>
          </p>
        </form>
        {message && <p className="text-green-500">{message}</p>}
      </section>
    </>
  );
};

export default Login;
