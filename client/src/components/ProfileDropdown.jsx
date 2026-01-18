import React, { useState } from "react";
import LogoutButton from "./LogoutButton";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProfileDropdown({ profilePic }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
 
  return (
    <div className="profile-dropdown-container">
      {/* Profile Icon + Arrow */}
      <button className="profile-toggle" onClick={() => setOpen(!open)}>
        <img src={profilePic} alt="Profile" className="profile-avatar" />
        <img src="/images/arrow.png" alt="Open" className="profile-arrow" />
      </button>

      {/* Dropdown */}
      {open && (
        <ul className="profile-dropdown">
          <li>
            <button className="advertisenow-btn" onClick={() => navigate("/advertise")}>
                Advertise Now
            </button>
            </li>

          <li onClick={() => navigate(`/user/${user.id}`)}>Profile</li>
          <li onClick={() => navigate("/settings")}>Settings</li>
          <li onClick={() => navigate("/support")}>Ask Support</li>
          <li onClick={() => navigate("/terms")}>Terms & Conditions</li>
          <li onClick={() => navigate("/policy")}>Policy</li>

          <li>
            <LogoutButton />
          </li>
        </ul>
      )}
    </div>
  );
}
