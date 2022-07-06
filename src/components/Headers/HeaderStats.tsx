import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

// components

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { ReduceProp } from "../../store/reducers";
import { IUser } from "../../models/user";

interface HeaderStatsProps {
  user: IUser;
}

const HeaderStats = ({ user }: HeaderStatsProps) => {
  return (
    <>
      {/* Header */}
      <div
        className={`shadow-lg-header py-3 bg-white justify-center md:overflow-hidden z-10 md:flex-row md:block md:sticky md:top-0`}
      >
        <div className="flex justify-content-center px-5">
          <div className="justify-content-center flex-1"></div>
          <div className="flex justify-content-center">
            <div className="align-items-center flex px-5 bg-white">
              <i className="pi pi-bell p-button-warning text-xl"></i>
            </div>
            <div className="align-items-center flex pr-5 bg-white">
              <h6 className="text-lg text-primary2 font-light">Hi,</h6>
              <span className="ml-2 text-lg text-primary2 font-semibold">
                {user!.first_name}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({}, dispatch);
}

const mapStateToProps = (state: ReduceProp) => ({
  user: state.user,
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(HeaderStats);
