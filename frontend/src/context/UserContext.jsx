import { createContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPath";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const updateUser = (userData) => {
    setUser(userData);
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);
        setUser(response?.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
