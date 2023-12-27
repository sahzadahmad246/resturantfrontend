import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../CSS/Account.css";
import { Profile } from "../components/Profile";
import { Address } from "../components/Address";
import { Orders } from "../components/Orders";
import { Payments } from "../components/Payments";
import { Settings } from "../components/Settings";

export const Account = () => {
  const [activeComponent, setActiveComponent] = useState("profile");

  const handleItemClick = (componentName) => {
    setActiveComponent(componentName);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case "profile":
        return <Profile />;
      case "address":
        return <Address />;
      case "orders":
        return <Orders />;
      case "payments":
        return <Payments />;
      case "settings":
        return <Settings />;
      default:
        return null;
    }
  };
  return (
    <>
      <div className="main-account">
        <div className="left-account">
          <div
            className={`left-item ${
              activeComponent === "profile" ? "active-item" : ""
            }`}
            onClick={() => handleItemClick("profile")}
          >
            <div className="left-item-text">
              <i class="fa-solid fa-user"></i>
              <p>Profile</p>
            </div>
            <div className="left-item-icon">
              <span class="material-symbols-outlined">expand_more</span>
            </div>
          </div>
          <div className={`left-item ${
              activeComponent === "orders" ? "active-item" : ""
            }`} onClick={() => handleItemClick("orders")}>
            <div className="left-item-text">
              <i class="fa-solid fa-bag-shopping"></i>
              <p>Orders</p>
            </div>
            <div className="left-item-icon">
              <span class="material-symbols-outlined">expand_more</span>
            </div>
          </div>
          <div className={`left-item ${
              activeComponent === "address" ? "active-item" : ""
            }`} onClick={() => handleItemClick("address")}>
            <div className="left-item-text">
              <i class="fa-solid fa-house"></i>
              <p>Address</p>
            </div>
            <div className="left-item-icon">
              <span class="material-symbols-outlined">expand_more</span>
            </div>
          </div>
          <div
            className={`left-item ${
              activeComponent === "payments" ? "active-item" : ""
            }`}
            onClick={() => handleItemClick("payments")}
          >
            <div className="left-item-text">
              <i class="fa-solid fa-money-bill"></i>
              <p>Payment</p>
            </div>
            <div className="left-item-icon">
              <span class="material-symbols-outlined">expand_more</span>
            </div>
          </div>
          <div
            className={`left-item ${
              activeComponent === "settings" ? "active-item" : ""
            }`}
            onClick={() => handleItemClick("settings")}
          >
            <div className="left-item-text">
              <i class="fa-solid fa-gear"></i>
              <p>Settings</p>
            </div>
            <div className="left-item-icon">
              <span class="material-symbols-outlined">expand_more</span>
            </div>
          </div>
          <div className="logout-in-account">
            <i class="fas fa-sign-out-alt"></i>
            <NavLink className="logout-btn" to="/logout">
              Logout
            </NavLink>
          </div>
        </div>
        <div className="right-account">{renderComponent()}</div>
      </div>
    </>
  );
};
