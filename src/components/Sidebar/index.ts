import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { logOutAction } from "../../store/actions/user.action";
import { ReduceProp } from "../../store/reducers";

import Sidebar from "./Sidebar";

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({ logOutAction }, dispatch);
}

const mapStateToProps = (state: ReduceProp) => ({
  user: state.user,
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Sidebar);
