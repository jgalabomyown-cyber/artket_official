import React, { useState } from "react";
import "../styles/layout.css";
import LogoutButton from "../components/LogoutButton";
import { useAuth } from "../context/AuthContext";

export default function Sidebar({ isOpen }) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const { isUserValid } = useAuth();

  const toggleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  return (
    <nav id="sidebar" className={`sidebar ${isOpen ? "active" : ""}`}>
      <ul>

        {/* Home */}
        <li>
          <a href="/" className="active">
            <img src="/images/home-icon.png" style={{ width: "24px", marginRight: "10px" }} />
            Home
          </a>
        </li>

        {/* Dropdown */}
        <li className="dropdown">
          <button className="dropdown-btn" onClick={toggleDropdown}>
            <img src="/images/draw.png" style={{ width: "22px", marginRight: "10px" }} />
            Draw
          </button>

          {openDropdown && (
            <ul className="dropdown-content">
              <li>
                <a href="/draWish">
                  <img src="/images/draWish-icon.png" style={{ width: "18px", marginRight: "10px" }} />
                  DraWish
                </a>
              </li>

              <li>
                <a href="/drawCreate">
                  <img src="/images/drawCreate-icon.png" style={{ width: "18px", marginRight: "10px" }} />
                  DrawCreate
                </a>
              </li>
            </ul>
          )}
        </li>

        {/* Artists */}
        <li>
          <a href="/artists">
            <img src="/images/artists.png" style={{ width: "22px", marginRight: "10px" }} />
            Artists
          </a>
        </li>

        {/* Guild */}
        <li>
          <a href="/guild">
            <img src="/images/Guild-icon.png" style={{ width: "22px", marginRight: "10px" }} />
            Guilds
          </a>
        </li>

        <p>
          Come! Become a member of Call Inside Art Studio's top performing Guilds
        </p>

        {/* Auth Section */}
        {!isUserValid ? (
          <>
            <li className="sidebar-login-opt">
              <a href="/login">Sign In</a>
            </li>

            <li className="sidebar-login-opt">
              <a href="/signup" style={{ color: "#FD705D" }}>
                Sign Up
              </a>
            </li>
          </>
        ) : (
          <li className="sidebar-login-opt">
            <LogoutButton />
          </li>
        )}

      </ul>
    </nav>
  );
}
