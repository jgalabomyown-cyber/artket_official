import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function RedirectToOwnProfile() {
  const { user } = useAuth();
  if (!user) return null;
  return <Navigate to={`/user/${user.id}`} replace />;
}
