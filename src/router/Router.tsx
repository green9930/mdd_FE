import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import TestPage from "../pages/TestPage";
import SignUpPage from "../pages/SignUpPage";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/test" element={<TestPage />} />
      <Route path="/signUp" element={<SignUpPage />} />
    </Routes>
  );
};

export default Router;
