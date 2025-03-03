import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import AuthLayout from "../../components/layouts/AuthLayout";
import { validateEmail } from "../../utils/helper";

import { AnimatePresence, motion } from "motion/react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
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
  };

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
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email Address"
            placeholder="Enter your email address"
          />

          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            placeholder="Enter your Password"
          />

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                key="box"
                exit={{ scale: 0 }}
                className="text-red-600 text-sm mt-2"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <button type="submit" className="btn-primary">
            Login
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
