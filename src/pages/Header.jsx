import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useNavigate, useLoaderData } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { GiHamburgerMenu } from "react-icons/gi";
import LogoutBnt from "../components/auth/LogoutBnt";

const Header = () => {
  const [showMenu, setShowMenu] = useState(true);
  const nav = useNavigate();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();

  const sessionCheck = async () => {
    const res = await axios.get("/api/session-check");
    if (res.data.success) {
      dispatch({
        type: "USER_LOGIN",
      });
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    const res = await axios.post("/api/logout");
    if (res.data.success) {
      dispatch({
        type: "USER_LOGOUT",
      });
      nav("/");
    }
  };

  useEffect(() => {
    sessionCheck()
    setShowMenu(false);
  }, []);

  return isLoggedIn ? (
    <>
      <nav className="flex lg:hidden justify-between items-center h-16 px-10 bg-gold text-primary-dark m-0">
        <div className="flex w-1/4 justify-between items-center">
          <GiHamburgerMenu onClick={() => setShowMenu(!showMenu)} />

          {showMenu && (
            <div className="absolute left-0 top-[6vh] bg-gold h-[90vh] w-1/3 flex flex-col items-start z-10">
              <NavLink
                to="/"
                className="navButton"
                onClick={() => setShowMenu(!showMenu)}
              >
                Home
              </NavLink>
              <NavLink
                to="/decks"
                className="navButton"
                onClick={() => setShowMenu(!showMenu)}
              >
                Your Decks
              </NavLink>
              <NavLink
                to="/public-decks"
                className="navButton"
                onClick={() => setShowMenu(!showMenu)}
              >
                All Decks
              </NavLink>
            </div>
          )}
        </div>
        <div className="flex">
          <NavLink to="/profile" className="navButton" onClick={() => setShowMenu(false)}>
            Profile
          </NavLink>
          <LogoutBnt onLogout={handleLogout} onClick={() => setShowMenu(false)}/>
        </div>
      </nav>

      <nav className="hidden lg:flex justify-between items-center h-16 px-10 bg-gold text-primary-dark sticky top-0">
        <div className="flex w-1/4 justify-between items-center">
          <NavLink to="/" className="navButton">
            Home
          </NavLink>
          <NavLink to="/decks" className="navButton">
            Decks
          </NavLink>
          <NavLink to="/public-decks" className="navButton">
            All Decks
          </NavLink>
        </div>
        <div className="flex">
          <NavLink to="/profile" className="navButton">
            Profile
          </NavLink>
          <LogoutBnt onLogout={handleLogout} />
        </div>
      </nav>
    </>
  ) : (
    <>
      <nav className="flex lg:hidden justify-between items-center h-16 px-10 bg-gold text-primary-dark m-0">
        <div className="flex w-1/4 justify-normal items-center">
          <GiHamburgerMenu onClick={() => setShowMenu(!showMenu)} />
          {showMenu && (
            <div className="absolute left-0 top-[10vh] bg-gold h-[90vh] w-1/3 flex flex-col items-start z-10">
              <NavLink
                to="/"
                className="navButton"
                onClick={() => setShowMenu(!showMenu)}
              >
                Home
              </NavLink>
              <NavLink
                to="/public-decks"
                className="navButton"
                onClick={() => setShowMenu(!showMenu)}
              >
                All Decks
              </NavLink>
            </div>
          )}
        </div>

        <div>
          <NavLink to="/auth" className="navButton">
            Login
          </NavLink>
        </div>
      </nav>

      <nav className="hidden lg:flex justify-between items-center h-16 px-10 bg-gold text-primary-dark m-0">
        <div className="flex w-1/4 justify-normal items-center">
          <NavLink to="/" className="navButton">
            Home
          </NavLink>
          <NavLink to="/public-decks" className="navButton">
            PublicDecks
          </NavLink>
        </div>

        <div>
          <NavLink to="/auth" className="navButton" onClick={() => setShowMenu(false)}>
            Login
          </NavLink>
        </div>
      </nav>
    </>
  );
};

export default Header;
