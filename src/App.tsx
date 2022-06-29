import React, { ReactElement } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import { ReduceProp } from "./store/reducers";
import { IUser } from "./models/user";
// layouts

import Admin from "./layouts/Admin";
import Auth from "./layouts/Auth";

// views without layouts

import Landing from "./views/Landing";
import Profile from "./views/Profile";

interface AppProps {
  user: IUser;
}

function App({ user }: AppProps): ReactElement {

  return (
    <BrowserRouter>
      <Routes>
        {/* add routes with layouts */}
        {/* <Route path="/admin/*" element={<Admin />} /> */}
        <Route path="/admin/*" element={<Admin />} />
        <Route
          path="/auth/*"
          element={user ? <Navigate to="/admin" /> : <Auth />}
        />
        {/* add routes without layouts */}
        <Route path="/landing" element={<Landing />} />
        <Route path="/profile" element={<Profile />} />
        <Route index element={<Landing />} />
        {/* add redirect for first page */}
      </Routes>
    </BrowserRouter>
  );
}

const mapStateToProps = (state: ReduceProp) => ({
  user: state.user,
});

const withConnect = connect(mapStateToProps, {});

export default compose(withConnect)(App);
