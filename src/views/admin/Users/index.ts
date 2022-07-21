import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import {
  panelUsersAction,
  createPanelUserAction,
  updatePanelUserAction,
  coachesAction,
  blockUnlockPanelUserAction,
  deletePanelUserAction
} from "../../../store/actions/panel.action";
import { ReduceProp } from "../../../store/reducers";

import Users from "./Users";

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators(
    {
      panelUsersAction,
      createPanelUserAction,
      updatePanelUserAction,
      blockUnlockPanelUserAction,
      deletePanelUserAction,
      coachesAction,
    },
    dispatch
  );
}

const mapStateToProps = (state: ReduceProp) => ({
  user: state.user,
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Users);
