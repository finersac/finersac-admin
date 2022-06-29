import React, { FC, ReactElement } from "react";
import { Routes, Route } from "react-router-dom";

// components

import Navbar from "../components/Navbars/AuthNavbar";
import FooterSmall from "../components/Footers/FooterSmall";

// views

import Login from "../views/auth/Login";
import ForgotPassword from "../views/auth/ForgotPassword";
import ResetPassword from "../views/auth/ResetPassword";

interface AuthProps {
  children?: JSX.Element;
}

const Auth: FC<AuthProps> = (): ReactElement => {
  return (
    <>
      <Navbar />
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"></div>

          <Routes>
            <Route index element={<Login />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
          </Routes>

          <FooterSmall absolute />
        </section>
      </main>
    </>
  );
};

export default Auth;
