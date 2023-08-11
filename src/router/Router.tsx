import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import SignUpPage from "../pages/SignUpPage";
import LoginPage from "../pages/LoginPage";
import DiskListPage from "../pages/DiskListPage";
import NewDiskPage from "../pages/NewDiskPage";
import TestPage from "../pages/TestPage";
import SettingsPage from "../pages/SettingsPage";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signUp" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/disk-list" element={<DiskListPage />} />
      <Route path="/new-disk" element={<NewDiskPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/test" element={<TestPage />} />
    </Routes>
  );
};

export default Router;
