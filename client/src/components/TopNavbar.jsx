import React from "react";
import { useAuth } from "../context/AuthContext";
import ProfileDropdown from "./ProfileDropdown";
//import LogoutButton from "./LogoutButton";

export default function TopNavbar({ toggleSidebar }) {
  const { isUserValid, loading, profilePic } = useAuth();

  if (loading) {
    return null; // or a spinner/loading component
  }

  return (
    <header className="navbar">
      <div className="top-nav">
        <div className="left">
          <button className="hamburger" id="hamburgerBtn" onClick={toggleSidebar}>
            <i className="fa-solid fa-bars"></i>
          </button>

          <div className="logo">
            <img src="/images/logo.png" alt="Logo" />
          </div>

          <div className="brand">
            <h1 className="title">CALL INSIDE</h1>
            <span className="title">ART STUDIO</span>
          </div>
        </div>

        <div className="search">
          <input type="text" placeholder="SEARCH" />
          <button>
            <i className="fas fa-search"></i>
          </button>
        </div>

        <div className="super">
          <a href="/store">
            <span className="store">
              <img src="/images/shop.png" alt="" style={{ width: "20px", marginRight: "18px" }} />
              SHOP
            </span>
          </a>
          <a href="/draWish" className="wish">
            <img src="/images/draWish-icon.png" alt="" style={{ width: "20px", marginRight: "5px" }} />
            DRAWISH
          </a>
        </div>

        {!isUserValid && (
          <div className="auth-buttons">
            <a href="/login" className="signin">SIGN IN</a>
            <button className="signup">
              <a href="/signup">SIGN UP</a>
            </button>
          </div>
        )}

        {isUserValid && (
          <ProfileDropdown profilePic={profilePic} />
        )}
      </div>

      <div className="content-header">
        <p>
          Exploring Graphic Design?{" "}
          <a href="/explore" style={{ textDecoration: "none" }}>
            <span className="highlight">
              <img
                src="/images/drawCreate-icon.png"
                alt=""
                style={{ width: "20px", marginLeft: "20px" }}
              />{" "}
              DrawCreate
            </span>
          </a>
        </p>
      </div>
    </header>
  );
}
