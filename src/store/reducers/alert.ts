import { SET_ALERT, REMOVE_ALL } from "../../utils/constants/reducers";
import { IAlert } from "../../models/alert";

const INITIAL_STATE: IAlert = {
  visible: false,
  title: "",
  subTitle: "",
  description: "",
  type: "success",
  position: { vertical: "top", horizontal: "right" },
};

function alertReducer(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case SET_ALERT:
      return { ...state, ...action.payload };
    case REMOVE_ALL:
      return INITIAL_STATE;
    default:
      return state;
  }
}

export default alertReducer;
