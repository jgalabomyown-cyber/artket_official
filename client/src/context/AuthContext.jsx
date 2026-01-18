import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../SupabaseClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profilePic, setProfilePic] = useState("/images/profile.png");

  // Fetch profile picture when user changes
  useEffect(() => {
    if (!user) {
      setProfilePic("/images/profile.png");
      return;
    }

    const fetchProfilePic = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("profile_picture")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error fetching profile picture:", error);
      } else if (data?.profile_picture) {
        setProfilePic(data.profile_picture);
      }
    };

    fetchProfilePic();
  }, [user]);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data }) => {
        console.log("AuthContext: Initial session data:", data);
        setSession(data.session ?? null);
        setUser(data.session?.user ?? null);
        setLoading(false);
      });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, sessionData) => {
        console.log("AuthContext: Auth state changed data:", sessionData);
        setSession(sessionData ?? null);
        setUser(sessionData?.user ?? null);
        setLoading(false);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const isUserValid = session && user && user.id;

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        isUserValid,
        profilePic,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
