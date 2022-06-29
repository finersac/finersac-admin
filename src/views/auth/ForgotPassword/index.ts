import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { ReduceProp } from "../../../store/reducers";
import { forgotPasswordAction } from "../../../store/actions/user.action";

import ForgotPassword from "./ForgotPassword";

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators(
    {
      forgotPasswordAction: forgotPasswordAction,
    },
    dispatch
  );
}

const mapStateToProps = (state: ReduceProp) => ({});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ForgotPassword);
