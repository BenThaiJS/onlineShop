import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoPerson, IoPricetag, IoHome, IoLogOut } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../redux/reducers/authSlice";
import { clearCart } from "../redux/reducers/cartSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(clearCart());
    dispatch(reset());
    navigate("/");
  };
  return (
    <div>
      <aside className='menu pl-2 has-shadow'>
        <p className='menu-label'>General</p>
        <ul className='menu-list'>
          <li>
            <NavLink to={"/dashboard"}>
              <IoHome style={{ marginRight: "1rem" }} />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to={"/products"}>
              <IoPricetag style={{ marginRight: "1rem" }} />
              Products
            </NavLink>
          </li>
        </ul>
        {user && user.role === "admin" && (
          <div>
            <p className='menu-label'>Admin</p>
            <ul className='menu-list'>
              <li>
                <NavLink to={"/users"}>
                  <IoPerson style={{ marginRight: "1rem" }} />
                  Users
                </NavLink>
              </li>
            </ul>
          </div>
        )}

        <p className='menu-label'>Settings</p>
        <ul className='menu-list'>
          <li>
            <NavLink to={`/account/user/${user?.uuid}`}>
              <IoPerson style={{ marginRight: "1rem" }} />
              Account
            </NavLink>
          </li>
          <li>
            <button onClick={logout} className='button is-white'>
              <IoLogOut style={{ marginRight: "1rem" }} />
              Logout
            </button>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
