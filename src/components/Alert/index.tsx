import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { ReduceProp } from "../../store/reducers";
import { setAlertAction } from "../../store/actions/alert.action";

import Alert from "./Alert";

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators(
    {
      setAlertAction: setAlertAction,
    },
    dispatch
  );
}

const mapStateToProps = (state: ReduceProp) => ({
  alert: state.alert,
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Alert);
