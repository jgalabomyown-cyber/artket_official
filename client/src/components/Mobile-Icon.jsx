import React from "react";
import HomeIcon from "../assets/icons/HomeIcon";
import ArtistIcon from "../assets/icons/ArtistIcon";
import MessageIcon from "../assets/icons/MessageIcon";
import PostIcon from "../assets/icons/PostIcon";
import NotificationIcon from "../assets/icons/NotificationIcon";
import SettingsIcon from "../assets/icons/SettingsIcon";
import GuildIcon from "../assets/icons/GuildIcon";

import "../styles/mobileIconNav.css";

export default function MobileIconNav() {
  return (
    <nav className="mobile-icon-nav">
      <a href="/" className="icon-item">
        <HomeIcon />
      </a>

      <a href="/artists" className="icon-item">
        <ArtistIcon />
      </a>

      <a href="/messages" className="icon-item">
        <MessageIcon />
      </a>

      <a href="/post" className="icon-item post-btn">
        <PostIcon />
      </a>

      <a href="/notifications" className="icon-item">
        <NotificationIcon />
      </a>

      <a href="/guilds" className="icon-item">
        <GuildIcon />
      </a>

      <a href="/settings" className="icon-item">
        <SettingsIcon />
      </a>
    </nav>
  );
}
