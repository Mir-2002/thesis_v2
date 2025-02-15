import React, { useState } from "react";
import { doCreateUserWithEmailandPassword } from "../auth/auth";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Input = ({ type, name, id, label, value, onChange, required }) => {
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
        required={required}
      />
    </>
  );
};

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      setLoading(true);
      await doCreateUserWithEmailandPassword(username, email, password);
      console.log("User created successfully");
      setLoading(false);
      navigate("/login?userCreated=true");
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      <section className="flex flex-col justify-center items-center w-full h-full font-funnel-sans space-y-10">
        <h1 className="text-[3rem] font-bold font-funnel-display">Register</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center space-y-5 w-1/4 h-3/4 border border-gray-400 p-15 rounded-2xl"
        >
          <div className="flex flex-col space-y-2 w-3/4">
            <Input
              type="text"
              name="username"
              id="username"
              label="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col space-y-2 w-3/4">
            <Input
              type="email"
              name="email"
              id="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
              required
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
              required
            />
          </div>
          <div className="flex flex-col space-y-2 w-3/4">
            <Input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              label="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="bg-black text-white w-1/3 p-2 rounded-lg"
            disabled={loading}
          >
            Register
          </button>
          <p>
            Already have an account?{" "}
            <span>
              <Link to="/login" className="hover:underline">
                Sign In
              </Link>
            </span>
          </p>
        </form>
      </section>
    </>
  );
};

export default Register;
