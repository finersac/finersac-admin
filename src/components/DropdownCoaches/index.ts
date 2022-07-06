import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { logOutAction } from "../../store/actions/user.action";
import { ReduceProp } from "../../store/reducers";

import DropdownCoaches from "./DropdownCoaches";

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({}, dispatch);
}

const mapStateToProps = (state: ReduceProp) => ({
  coaches: state.coaches,
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(DropdownCoaches);
