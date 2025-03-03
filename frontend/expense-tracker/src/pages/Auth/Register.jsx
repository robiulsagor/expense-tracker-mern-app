import { useEffect, useState } from "react";
import Input from "../../components/Inputs/Input";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link } from "react-router-dom";
import { checkRegiValidation } from "../../utils/helper";
import PhotoSelector from "../../components/Inputs/PhotoSelector";
import ErrorMessage from "../../components/ErrorMessage";

const Register = () => {
  const [image, setImage] = useState(null);

  const [fullName, setFullName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [focus, setFocus] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    checkRegiValidation(image, fullName, email, password, setErrors);
    setFocus(true);
  };

  useEffect(() => {
    if (focus) {
      checkRegiValidation(image, fullName, email, password, setErrors);
    }
  }, [focus, image, fullName, email, password]);

  console.log(Object.values(errors).length >= 1);

  return (
    <AuthLayout>
      <div className="w-full h-3/4 md:h-full p-8 rounded-lg flex flex-col justify-center ">
        <h3 className="text-xl font-semibold text-black">Create an account</h3>
        <p className="text-xs text-slate-800">
          Join us today by entering your details below
        </p>

        <form className="mt-12" onSubmit={handleSubmit}>
          <PhotoSelector image={image} setImage={setImage} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <Input
              type={"text"}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              label={"First Name"}
              placeholder={"Enter your first name"}
            />

            <Input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email Address"
              placeholder="Enter your email address"
            />
            <div className="col-span-2">
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                placeholder="Min 6 characters"
              />
            </div>
          </div>

          <ErrorMessage errors={errors} />

          <button
            type="submit"
            disabled={Object.values(errors).length >= 1}
            className="btn-primary "
          >
            Register
          </button>

          <p className=" text-sm mt-4 text-slate-700">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-500 underline font-medium">
              Login
            </Link>{" "}
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Register;
