import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Link, NavLink } from "react-router-dom";

const Home = () => {
  const { user, clearUser } = useContext(UserContext);

  return (
    <div>
      <h2 className="text-4xl font-bold m-4">Home</h2>
      <div className="flex gap-4 mt-10 ml-4 ">
        <NavLink className="btn-1" to="/dashboard">
          Home
        </NavLink>
        <NavLink className="btn-1" to="/income">
          Income
        </NavLink>
        <NavLink className="btn-1" to="/expense">
          Expense
        </NavLink>
      </div>
    </div>
  );
};

export default Home;
