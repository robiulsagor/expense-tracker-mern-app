/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import AuthLayout from "../../components/layouts/AuthLayout";
import { validateEmail } from "../../utils/helper";

import { AnimatePresence, motion } from "motion/react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import { UserContext } from "../../context/UserContext";
import ButtonSpinner from "../../components/ButtonSpinner";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { updateUser, user } = useContext(UserContext);
  console.log(user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Invalid Email Address");
      return;
    } else {
      setError(null);
    }

    if (!password) {
      setError("Please enter your password");
      return;
    } else {
      setError(null);
    }

    setLoading(true);

    // API call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, user } = response.data;

      if (token && user) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong!"
      );
    } finally {
      setLoading(false);
    }
  };

  // redirect to dashboard page if user is already logged in
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full p-8 rounded-lg flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          {" "}
          Please enter your details to login
        </p>

        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email Address"
            placeholder="Enter your email address"
            required={true}
          />

          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            placeholder="Enter your Password"
            required={true}
          />

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                key="box"
                exit={{ scale: 0 }}
                className="text-red-600 bg-red-100 px-2 py-1 rounded text-sm mt-2"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? <ButtonSpinner /> : "Login"}
          </button>

          <p className=" text-sm mt-4 text-slate-700">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-purple-500 underline font-medium"
            >
              Register
            </Link>{" "}
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
