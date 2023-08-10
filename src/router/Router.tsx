import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import TestPage from "../pages/TestPage";
import SignUpPage from "../pages/SignUpPage";
import NewDiskPage from "../pages/NewDiskPage";
import LoginPage from "../pages/LoginPage";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/new-disk" element={<NewDiskPage />} />
      <Route path="/test" element={<TestPage />} />
      <Route path="/signUp" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};

export default Router;
