import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { ReduceProp } from "../../../store/reducers";
import { logInAction } from "../../../store/actions/user.action";

import Login from "./Login";

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators(
    {
      logInAction: logInAction,
    },
    dispatch
  );
}

const mapStateToProps = (state: ReduceProp) => ({});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Login);
