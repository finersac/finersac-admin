import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { ReduceProp } from "../../store/reducers";

import CardMessage from "./CardMessage";

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({}, dispatch);
}

const mapStateToProps = (state: ReduceProp) => ({});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(CardMessage);
