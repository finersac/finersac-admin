import React, { FC, ReactElement } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

// components

import AdminNavbar from "../components/Navbars/AdminNavbar";
import Sidebar from "../components/Sidebar/Sidebar";
import HeaderStats from "../components/Headers/HeaderStats";
import FooterAdmin from "../components/Footers/FooterAdmin";

// views

import Dashboard from "../views/admin/Dashboard";
import Users from "../views/admin/Users";
import Maps from "../views/admin/Maps";
import Settings from "../views/admin/Settings";
import Tables from "../views/admin/Tables";

interface AdminProps {
  children?: JSX.Element;
}

const Admin: FC<AdminProps> = (): ReactElement => {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <HeaderStats hiddenStats />
        <div className="px-4 md:px-10 mx-auto w-full">
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/tables" element={<Tables />} />
            {/* Header
            <Route path="/maps" element={<Maps />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/tables" element={<Tables />} /> */}
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Admin;