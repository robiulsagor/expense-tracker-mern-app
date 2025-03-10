import { useContext, useEffect, useState } from "react";
import Input from "../../components/Inputs/Input";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import { checkRegiValidation } from "../../utils/helper";
import PhotoSelector from "../../components/Inputs/PhotoSelector";
import ErrorMessage from "../../components/ErrorMessage";
import ButtonSpinner from "../../components/ButtonSpinner";
import { API_PATHS } from "../../utils/apiPath";
import axiosInstance from "../../utils/axiosInstance";
import { UserContext } from "../../context/UserContext";
import { uploadPic } from "../../utils/uploadPic";

const Register = () => {
  const { updateUser, user } = useContext(UserContext);
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});
  const [focus, setFocus] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFocus(true); // set to true to start watch mode for errors

    const hasErrors = checkRegiValidation(fullName, email, password, setErrors);
    if (Object.keys(hasErrors).length > 0) return; // if there are errors, return and don't submit form

    // call register API
    try {
      setLoading(true); // set loading to true to show spinner
      let photoUrl = "";
      if (image) {
        photoUrl = await uploadPic(image); // upload image if selected any
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profilePhotoUrl: photoUrl,
      });

      const { token, user } = response.data;

      if (token && user) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);

      setErrors({
        message:
          error?.response?.data?.message ||
          error?.message ||
          "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (focus) {
      checkRegiValidation(fullName, email, password, setErrors);
    }
  }, [focus, fullName, email, password]);

  // redirect to dashboard page if user is already logged in
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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
              // required={true}
            />

            <Input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email Address"
              placeholder="Enter your email address"
              // required={true}
            />
            <div className="col-span-2">
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                placeholder="Min 6 characters"
                // required={true}
              />
            </div>
          </div>

          <ErrorMessage errors={errors} />

          {/* submit button */}
          <button
            type="submit"
            disabled={
              (Object.keys(errors).length > 0 &&
                !Object.values(errors).includes("Network Error")) || // Exclude "Network Error"
              loading
            }
            className="btn-primary "
          >
            {loading ? <ButtonSpinner /> : "Register"}
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
