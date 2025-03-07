import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
// Import native components
import { Loader } from "lucide-react";
// Import Manual Components
import Navbar from "./components/Navbar"
// authStore
import { useAuthStore } from "./store/useAuthStore";
// Importing pages from page Folder
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore()

  // call imediatly as our application loading
  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    )
  }
  return (
    <div>

      <Navbar />

      <Routes>
        <Route path="/" element={authUser? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser? <SignUpPage />: <Navigate to="/"/>} />
        <Route path="/login" element={!authUser? <LoginPage />: <Navigate to="/"/>} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser? <ProfilePage />:<Navigate to="/login"/>} />
      </Routes>
    </div>
  )
}

export default App;