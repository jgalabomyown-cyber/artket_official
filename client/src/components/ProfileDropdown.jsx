import React, { useState } from "react";
import LogoutButton from "./LogoutButton";
import { useNavigate } from "react-router-dom";

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="profile-dropdown-container">
      {/* Profile Icon + Arrow */}
      <button className="profile-toggle" onClick={() => setOpen(!open)}>
        <img src="/images/profile.png" alt="Profile" className="profile-avatar" />
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

          <li onClick={() => navigate("/profile")}>Profile</li>
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
