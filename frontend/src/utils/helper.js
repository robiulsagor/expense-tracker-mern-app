export const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

export const checkRegiValidation = (fullName, email, password, setErrors) => {
  let newErrors = {};

  if (!fullName) {
    newErrors.fullName = "Full name is required";
  } else {
    delete newErrors.fullName;
  }

  if (!email) {
    newErrors.email = "Email is required";
  } else if (!validateEmail(email)) {
    newErrors.email = "Enter valid email";
  } else {
    delete newErrors.email;
  }

  if (!password) {
    newErrors.password = "Password is required";
  } else if (password.length < 6) {
    newErrors.password = "Password must be at least 6 characters";
  } else {
    delete newErrors.password;
  }

  setErrors(newErrors);
  return newErrors;
};
