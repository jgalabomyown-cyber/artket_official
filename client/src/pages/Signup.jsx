// src/components/Signup.jsx
import React, { useState } from "react";
import { supabase } from "../SupabaseClient";
import "../styles/signup.css";

export default function Signup() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const password = form.password.value;
    const confirmPassword = form.confirm_password.value;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    // Fetch user IP
    const user_ip = await fetch("https://api.ipify.org?format=json")
      .then((r) => r.json())
      .then((d) => d.ip)
      .catch(() => "unknown");

    try {
      // 1️⃣ Sign up user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      const userId = authData.user.id;

      // 2️⃣ Insert user profile via secure RPC
      const { error: rpcError } = await supabase.rpc("insert_user_profile", {
        uid: userId,
        name,
        email,
        phone,
        user_ip,
      });

      if (rpcError) throw rpcError;

      setSuccess(
        "Signup successful! Please check your email to verify your account."
      );
      form.reset();
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="signup-container">
      <div className="logo-signup">
        <img src="../public/images/logo.png" alt="" />
      </div>
      <form className="signup-card" onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        <input type="text" name="name" placeholder="Full Name" required />
        <input type="email" name="email" placeholder="Email Address" required />
        <input type="text" name="phone" placeholder="Phone Number" />

        <input type="password" name="password" placeholder="Password" required />
        <input
          type="password"
          name="confirm_password"
          placeholder="Confirm Password"
          required
        />

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Sign Up"}
        </button>

        <p>Already have an account? <span><a href="/login">Login</a></span></p>
      </form>
    </div>
  </>
  );
}
