import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../CSS/Navbar.css"; // Import the CSS file for desktop navbar
import "../CSS/MobileNavbar.css";
import { useAuth } from "../store/auth";

const DesktopNavbar = () => {
  const { isLoggedIn } = useAuth();

  return (
    <header>
      <div className="logo-brand">
        <NavLink to="/">Thai Chilly China</NavLink>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink exact to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/menu">Menu</NavLink>
          </li>
          <li>
            <NavLink to="/cart">Cart</NavLink>
          </li>
          {isLoggedIn ? (
            <li>
              <NavLink to="/logout">Logout</NavLink>
            </li>
          ) : (
            <>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/sign-up">Sign Up</NavLink>
              </li>
              
            </>
          )}
          <li >
                <NavLink to="/account">
                  <span className="material-symbols-outlined">
                    account_circle
                  </span>
                </NavLink>
              </li>
        </ul>
      </nav>
    </header>
  );
};

const MobileNavbar = () => {
  return (
    <nav className="navbar">
      <NavLink className="nav-item" exact to="/">
        <span className="material-symbols-outlined">home</span>
        <p>Home</p>
      </NavLink>
      <NavLink className="nav-item" to="/menu">
        <span className="material-symbols-outlined">restaurant_menu</span>
        <p>Menu</p>
      </NavLink>
      <NavLink className="nav-item" to="/cart" title="Cart">
        <span className="material-symbols-outlined">shopping_cart</span>
        <p>Cart</p>
      </NavLink>
      <NavLink className="nav-item" to="/account">
        <span className="material-symbols-outlined">account_circle</span>
        <p>Account</p>
      </NavLink>
    </nav>
  );
};

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Set initial state based on window width

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust breakpoint for mobile/desktop view as needed
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <>{isMobile ? <MobileNavbar /> : <DesktopNavbar />}</>;
};

export default Navbar;
