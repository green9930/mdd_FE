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
import { loginState, routeState, signUpState } from "../state/atom";
import NotFound from "../pages/NotFound";

const Router = () => {
  const [loading, setLoading] = useRecoilState(routeState);
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const [isSignUp, setIsSignUp] = useRecoilState(signUpState);

  const accessToken = getLoc("accessToken");
  const memberId = getLoc("memberId");

  useEffect(() => {
    console.log("ROUTE RENDERING...", loading);
    console.log("ISSIGNUP", isSignUp);
    console.log("ISLOGIN", isLogin);
    if (!isSignUp && !isLogin) {
      accessToken ? setIsLogin(true) : setIsLogin(false);
    }
    setLoading(false);
  }, [loading]);

  return (
    <>
      {!loading ? (
        <Routes>
          <Route
            path="/"
            element={
              isLogin || isSignUp ? (
                <Navigate to={`/home/${memberId}`} />
              ) : (
                <HomePage />
              )
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
            // element={
            //   isLogin || isSignUp ? <NewDiskPage /> : <Navigate to="/" />
            // }
            element={
              isLogin ? (
                <NewDiskPage />
              ) : isSignUp ? (
                <NewDiskPage />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/edit-disk/:id"
            element={
              isLogin || isSignUp ? <EditDiskPage /> : <Navigate to="/" />
            }
          />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      ) : (
        <></>
      )}
    </>
  );
};

export default Router;
