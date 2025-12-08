import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../SupabaseClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
