import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { ReduceProp } from "../../../store/reducers";
import { resetPasswordAction } from "../../../store/actions/user.action";
import { setAlertAction } from "../../../store/actions/alert.action";

import ResetPassword from "./ResetPassword";

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators(
    {
      resetPasswordAction,
      setAlertAction,
    },
    dispatch
  );
}

const mapStateToProps = (state: ReduceProp) => ({});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ResetPassword);
