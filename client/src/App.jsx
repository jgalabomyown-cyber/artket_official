import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import UserProfile from './pages/UserPlatform/userProfile';
import UserHomepage from "./pages/UserPlatform/userHomepage";
import RedirectToOwnProfile from './pages/UserPlatform/redirectToOwnProfile';
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import "./styles/layout.css"

export default function App () {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                      path="/userHomepage"
                      element={
                      <ProtectedRoute>
                          <RedirectToOwnProfile />
                      </ProtectedRoute>
                      }
                    />

                    <Route path="/user/:userId" element={<UserProfile />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}
