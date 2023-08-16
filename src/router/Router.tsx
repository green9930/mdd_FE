import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { Navigate, Route, Routes } from "react-router-dom";

import HomePage from "../pages/HomePage";
import MainPage from "../pages/MainPage";
import SignUpPage from "../pages/SignUpPage";
import LoginPage from "../pages/LoginPage";
import DiskListPage from "../pages/DiskListPage";
import NewDiskPage from "../pages/NewDiskPage";
import EditDiskPage from "../pages/EditDiskPage";
import SettingsPage from "../pages/SettingsPage";
import { getLoc } from "../utils/localStorage";
import { loginState } from "../state/atom";

const Router = () => {
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useRecoilState(loginState);

  const accessToken = getLoc("accessToken");
  const memberId = getLoc("memberId");

  useEffect(() => {
    accessToken ? setIsLogin(true) : setIsLogin(false);
    setLoading(false);
  }, [isLogin]);

  return (
    <>
      {!loading ? (
        <Routes>
          <Route
            path="/"
            element={
              isLogin ? <Navigate to={`/home/${memberId}`} /> : <HomePage />
            }
          />
          <Route path="/home/:id" element={<MainPage />} />
          <Route
            path="/signUp"
            element={
              isLogin ? <Navigate to={`/home/${memberId}`} /> : <SignUpPage />
            }
          />
          <Route
            path="/login"
            element={
              isLogin ? <Navigate to={`/home/${memberId}`} /> : <LoginPage />
            }
          />
          <Route path="/disk-list/:id" element={<DiskListPage />} />
          <Route
            path="/new-disk"
            element={isLogin ? <NewDiskPage /> : <Navigate to="/" />}
          />
          <Route
            path="/edit-disk/:id"
            element={isLogin ? <EditDiskPage /> : <Navigate to="/" />}
          />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      ) : (
        <></>
      )}
    </>
  );
};

export default Router;
