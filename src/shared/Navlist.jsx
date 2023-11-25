import { NavLink } from "react-router-dom";

const Navlist = ({route, children}) => {
    return (
        <li>
        <NavLink
          to={route}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          {children}
        </NavLink>
      </li>
    );
};

export default Navlist;