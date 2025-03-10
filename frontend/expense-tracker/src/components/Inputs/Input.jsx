import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Input = ({
  type,
  value,
  onChange,
  placeholder,
  label,
  required = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mb-4">
      <label htmlFor={label} className="text-[13px] text-slate-800">
        {label}{" "}
      </label>

      <div className={`input-box `}>
        <input
          id={label}
          type={type === "password" && showPassword ? "text" : type}
          className={`w-full outline-0 rounded-md px-3 py-2   `}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
        />

        {type === "password" && (
          <>
            {showPassword ? (
              <FaRegEye
                size={20}
                className=" text-slate-800 cursor-pointer mr-3"
                onClick={togglePassword}
              />
            ) : (
              <FaRegEyeSlash
                size={20}
                className=" text-slate-800 cursor-pointer mr-3"
                onClick={togglePassword}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Input;
