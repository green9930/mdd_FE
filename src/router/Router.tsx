import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import SignUpPage from "../pages/SignUpPage";
import LoginPage from "../pages/LoginPage";
import DiskListPage from "../pages/DiskListPage";
import NewDiskPage from "../pages/NewDiskPage";
import TestPage from "../pages/TestPage";
import SettingsPage from "../pages/SettingsPage";
import MainPage from "../pages/MainPage";
import EditDiskPage from "../pages/EditDiskPage";
import { getLoc } from "../utils/localStorage";

const Router = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const accessToken = getLoc("accessToken");

  useEffect(() => {
    if (accessToken) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={isLogin ? <Navigate to="/home" /> : <HomePage />}
      />
      <Route
        path="/signUp"
        element={isLogin ? <Navigate to="/home" /> : <SignUpPage />}
      />
      <Route
        path="/login"
        element={isLogin ? <Navigate to="/home" /> : <LoginPage />}
      />
      <Route path="/disk-list" element={<DiskListPage />} />
      <Route path="/new-disk" element={<NewDiskPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/home/:id" element={<MainPage />} />
      <Route path="/test" element={<TestPage />} />
      <Route path="/edit-disk/:id" element={<EditDiskPage />} />
    </Routes>
  );
};

export default Router;
