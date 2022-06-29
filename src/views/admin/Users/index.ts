import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { panelUsersAction } from "../../../store/actions/panel.action";
import { ReduceProp } from "../../../store/reducers";

import Users from "./Users";

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({ panelUsersAction }, dispatch);
}

const mapStateToProps = (state: ReduceProp) => ({
  panelUsers: state.panelUsers,
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Users);
