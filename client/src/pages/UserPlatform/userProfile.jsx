 import React, { useState, useEffect } from "react";
import "../../styles/userProfile.css";
import LogoutButton from "../../components/LogoutButton";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../SupabaseClient";
import { useParams } from "react-router-dom";

export default function UserProfile() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [userName, setUserName] = useState("Loading...");
  const [userEmail, setUserEmail] = useState("Loading...");
  const [userBio, setUserBio] = useState("No bio yet...");
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioInput, setBioInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [profilePic, setProfilePic] = useState("/images/profile.png");
  const [uploading, setUploading] = useState(false);
  const { userId } = useParams();
  const isOwnProfile = user?.id === userId;

  useEffect(() => {
    if (!user) {
      setProfilePic("/images/profile.png");
      return;
    }

    const fetchUserData = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("name, email, bio, profile_picture")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching user data:", error);
        setUserName("Error loading name");
        setUserEmail("Error loading email");
      } else {
        setUserName(data.name);
        setUserEmail(data.email);
        setUserBio(data.bio || "No bio yet...");
        setBioInput(data.bio || "");

        if(data.profile_picture) {
          setProfilePic(`${data.profile_picture}?t=${Date.now()}`);
        }
      }
    };

    fetchUserData();
  }, [userId, user]);



  // ✅ START EDIT
  const handleEditBio = () => {
    setIsEditingBio(true);
  };

  // ✅ CANCEL EDIT
  const handleCancelEdit = () => {
    setBioInput(userBio);
    setIsEditingBio(false);
  };

  // ✅ SAVE BIO TO SUPABASE
  const handleSaveBio = async () => {
    setLoading(true);

    const { error } = await supabase
      .from("users")
      .update({ bio: bioInput })
      .eq("id", user.id);

    if (error) {
      alert("Failed to update bio");
      console.error(error);
    } else {
      setUserBio(bioInput);
      setIsEditingBio(false);
    }

    setLoading(false);
  };

  // ✅ HANDLE PROFILE PICTURE UPLOAD
  const handleProfilePicUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("profile-pictures")
        .upload(fileName, file, { upsert: true });

      if (uploadError) {
        alert(uploadError.message);
        return;
      }

      const { data } = supabase.storage
        .from("profile-pictures")
        .getPublicUrl(fileName);

      const publicUrl = `${data.publicUrl}?t=${Date.now()}`;

      setProfilePic(publicUrl);

      await supabase
        .from("users")
        .update({ profile_picture: publicUrl })
        .eq("id", user.id);

    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
      e.target.value = ""; // ✅ critical fix
    }
  };

  console.log("Auth UID:", user?.id);

  return (
    <div className="userprofile-container">

      {/* HEADER BANNER */}
      <div className="userprofile-banner">
        <div className="userprofile-info-card">

          <div className="avatar-container">
            <img src={profilePic} alt="Profile" className="userprofile-avatar" />
          {isOwnProfile && (
            <>
            <label htmlFor="profile-pic-upload" className="upload-icon">
              <img src="/images/upload-image.png" alt="Upload" />
            </label>

            <input
              type="file"
              id="profile-pic-upload"
              accept="image/*"
              onChange={handleProfilePicUpload}
              style={{ display: 'none' }}
            />
            </>
          )}
          </div>

          <div className="user-profile-details">
            <h2 className="userprofile-name">{userName}</h2>
            <p className="userprofile-email">{userEmail}</p>


          {isEditingBio ? (
            <div className="bio-container">
              <textarea
                value={bioInput}
                onChange={(e) => setBioInput(e.target.value)}
                placeholder="Enter your bio..."
                rows="3"
                className="bio-input"
              />
              <div className="edit-bio-opt">
                <button onClick={handleSaveBio} className="save-bio-btn" disabled={loading}>
                  {loading ? "Saving..." : "Save"}
                </button>
                <button onClick={handleCancelEdit} className="cancel-bio-btn">Cancel</button>
              </div>
            </div>
            
          ) : (
            <>
              <p className="userprofile-bio">{userBio}</p>
              {isOwnProfile && (
              <button className="edit-bio-btn" onClick={handleEditBio}>Edit Bio</button>
              )}
            </>
          )}

          <button className="edit-profile-btn">Edit Profile</button>
        </div>
      </div>
      </div>

      <div className="userprofile-body">

        {/* LEFT SIDE MENU */}
        <aside className="userprofile-sidebar">
          <ul>
            <li className="active">Profile</li>
            <li onClick={() => navigate("/settings")}>Settings</li>
            <li onClick={() => navigate("/advertise")}>Start Advertising</li>
            <li onClick={() => navigate("/support")}>Ask Support</li>
            <li onClick={() => navigate("/policy")}>Policy</li>
            <li onClick={() => navigate("/terms")}>Terms & Conditions</li>
            <li className="logout"><LogoutButton /></li>
          </ul>
        </aside>

        {/* MAIN CONTENT */}
        <main className="userprofile-main">

          {/* STATS */}
          <div className="stats-box">
            <div><strong>15.3K</strong><span>Followers</span></div>
            <div><strong>875</strong><span>Following</span></div>
            <div><strong>92.7K</strong><span>Total Likes</span></div>
            <div><strong>45</strong><span>Commissions</span></div>
            <div><strong>328</strong><span>Reviews</span></div>
          </div>

          {/* PORTFOLIO */}
          <button className="post-btn">POST</button>
          <div className="featured-artwork-section">
            <h3 className="section-title">Featured Artworks</h3>

            <div className="edit-featured-artworks">
              <button className="fas-edit-icon">
                <img src="/images/drawCreate-icon.png" alt="Edit" />
                <span className="fas-edit-tooltip">Edit Featured Artworks</span>
              </button>
            </div>
          </div>

          <div className="portfolio-grid">
            <img src="/images/sample1.png" alt="" />
            <img src="/images/sample2.png" alt="" />
            <img src="/images/sample3.png" alt="" />
            <img src="/images/sample4.png" alt="" />
            <img src="/images/sample5.png" alt="" />
            <img src="/images/sample6.png" alt="" />
          </div>

          {/* USER ACTIVITY */}
          <h3 className="section-title">User Activity</h3>
          <div className="activity-box">
            <p>• Posted a new artwork “Forest Whispers” — 3 hours ago</p>
            <p>• Liked “Oona” — 1 day ago</p>
            <p>• Commented on “Nightling” — 2 days ago</p>
          </div>
        </main>

        {/* COMMISSIONS + BADGES */}
        <aside className="userprofile-right">

          <div className="commission-box">
            <h4>Commission Details</h4>
            <p><strong>Portrait Sketch</strong> — $80 — 2 days</p>
            <p><strong>Full Render</strong> — $150 — 7 days</p>
            <button className="request-btn">Request Commission</button>
          </div>

          <div className="badges-box">
            <h4>Badges & Achievements</h4>
            <div className="badge-list">
              <span>🏆 Top Artist</span>
              <span>⭐ 1k Likes</span>
              <span>🎖 100 Commissions</span>
            </div>
          </div>

        </aside>
      </div>
    </div>
  );
}
