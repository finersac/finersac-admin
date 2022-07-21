import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import {
  panelExercisesAction,
  createPanelExerciseAction,
  updatePanelExerciseAction,
  uploadPanelExercisesAction,
  deletePanelExerciseAction,
} from "../../../store/actions/panel-exercises.action";
import { ReduceProp } from "../../../store/reducers";

import Exercises from "./Exercises";

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators(
    {
      panelExercisesAction,
      createPanelExerciseAction,
      updatePanelExerciseAction,
      uploadPanelExercisesAction,
      deletePanelExerciseAction,
    },
    dispatch
  );
}

const mapStateToProps = (state: ReduceProp) => ({
  user: state.user,
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Exercises);
