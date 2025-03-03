export const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

export const checkRegiValidation = (
  image,
  fullName,
  email,
  password,
  setErrors
) => {
  let newErrors = {};
  if (!image) {
    newErrors.photo = "Please select a profile photo";
  } else {
    delete newErrors.photo;
  }

  if (!fullName) {
    newErrors.fullName = "Enter your full name";
  } else {
    delete newErrors.fullName;
  }

  if (!validateEmail(email)) {
    newErrors.email = "Enter valid email";
  } else {
    delete newErrors.email;
  }

  if (password.length < 8) {
    newErrors.password = "Password must be at least 8 characters";
  } else {
    delete newErrors.password;
  }

  setErrors(newErrors);

  if (!image && !fullName && !validateEmail(email) && password.length < 8) {
    return;
  }
};
