import React from "react";
import { useAuth } from "../context/AuthContext";
import ProfileDropdown from "./ProfileDropdown";
import "../styles/navbar.css";

export default function TopNavbar({ toggleSidebar }) {
  const { isUserValid, loading, profilePic } = useAuth();

  if (loading) {
    return null;
  }

  return (
    <header>
        <div className="left-nav">
          <div className="hamburger-container">
            <button
              className="hamburger-menu-btn"
              onClick={toggleSidebar}
              aria-label="Toggle sidebar"
            >
              <i className="fa-solid fa-bars"></i>
            </button>
          </div>

        <div className="logo-and-brand">
          <img src="images/logo.png" alt="Call Inside logo" />
          <div className="brand-name">
            <h1>CALL INSIDE</h1>
            <h3>Art Studio</h3>
          </div>
        </div>
      </div>
      
      <div className="search-bar-and-btn">
        <input
          type="text"
          placeholder="Search here"
          className="search-bar"
          name="search-bar"
        />
        <button className="search-btn" aria-label="Search">
          <i className="fas fa-search"></i>
        </button>
      </div>

      <div className="shop-and-draw-opts">
        <a href="/shop">
          <img src="images/shop.png" alt="Shop" />
          <span>SHOP</span>
        </a>
        <a href="/drawish">
          <img src="images/draWish-icon.png" alt="Drawish" />
          <span>DRAWISH</span>
        </a>
      </div>

      {!isUserValid && (
        <div className="sign-in-sign-up">
          <a href="/login" className="sign-in-btn">SIGN-IN</a>
          <a href="/signup" className="sign-up-btn">SIGN-UP</a>
        </div>
      )}

      {isUserValid && (
        <ProfileDropdown profilePic={profilePic} />
      )}
    </header>
  );
}
