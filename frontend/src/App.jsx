import Navbar from "./components/Navbar"
import { Route, Routes } from "react-router-dom";

// authStore
import { useAuthStore } from "./store/useAuthStore";
// Importing pages from page Folder
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import { useEffect } from "react";

const App = () => {
  const { authUser, checkAuth } = useAuthStore()

  // call imediatly as our application loading
  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  console.log({ authUser })
  return (
    <div>

      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  )
}

export default App;