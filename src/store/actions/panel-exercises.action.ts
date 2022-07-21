// redux/actions.js
import { normalizeCatchActions, setStore } from "../../utils/functions";
import {
  SET_PANEL_UNVERIFIED_EXERCISES,
  SET_PANEL_VERIFIED_EXERCISES,
} from "../../utils/constants/reducers";
import { AnyAction } from "@reduxjs/toolkit";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { IExercise } from "../../models/exercise";

import {
  getPanelVerifiedExercisesServices,
  getPanelUnverifiedExercisesServices,
  createPanelExerciseServices,
  updatePanelExerciseServices,
  uploadPanelExerciseServices,
} from "../../services/panel-service";
import { setAlertAction } from "./alert.action";
import { ReduceProp } from "../../store/reducers";

export const panelExercisesAction =
  (verified?: boolean): ThunkAction<void, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    try {
      const data = await (verified
        ? getPanelVerifiedExercisesServices()
        : getPanelUnverifiedExercisesServices());
      dispatch(
        setStore(
          verified
            ? SET_PANEL_VERIFIED_EXERCISES
            : SET_PANEL_UNVERIFIED_EXERCISES,
          data.result
        )
      );
    } catch (e: any) {
      console.log(e.response);
      normalizeCatchActions(dispatch, e.response?.data?.codeError);
      throw e;
    }
  };

//CREATE EXERCISE
export const createPanelExerciseAction = (
  newExercise: IExercise
): ThunkAction<Promise<void>, any, {}, AnyAction> => {
  return async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    getState: () => ReduceProp
  ): Promise<void> => {
    try {
      const panelExercises = getState().panelVerifiedExercises;
      const response = await createPanelExerciseServices(newExercise);
      panelExercises.push(response.result);
      dispatch(setStore(SET_PANEL_VERIFIED_EXERCISES, panelExercises));
      dispatch(
        setAlertAction({
          visible: true,
          type: "success",
          description: "success.exercise_created",
        })
      );
    } catch (e: any) {
      normalizeCatchActions(dispatch, e.response?.data?.codeError);
      throw e;
    }
  };
};

//UPDATE EXERCISE
export const updatePanelExerciseAction = (
  exercise: IExercise,
  idExercise: IExercise["id"],
  isVerified: boolean
): ThunkAction<Promise<void>, any, {}, AnyAction> => {
  return async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    getState: () => ReduceProp
  ): Promise<void> => {
    try {
      const exercises = isVerified
        ? getState().panelVerifiedExercises
        : getState().panelUnverifiedExercises;

      const response = await updatePanelExerciseServices({
        ...exercise,
        id: idExercise,
      });

      const index = exercises.findIndex(
        (_exercise) => _exercise.id === idExercise
      );

      if (index < 0) {
        dispatch(panelExercisesAction());
        return;
      }

      isVerified && (exercises[index] = { ...exercises[index], ...exercise });
      !isVerified && exercises.splice(index, 1);

      dispatch(
        setStore(
          isVerified
            ? SET_PANEL_VERIFIED_EXERCISES
            : SET_PANEL_UNVERIFIED_EXERCISES,
          exercises
        )
      );
      // REMOVE EXERCISE VERIFIED FROM UNVERIFIED LIST AND ADD VERIFIED LIST
      if (!isVerified) {
        const panelVerifiedExercises = getState().panelVerifiedExercises;
        panelVerifiedExercises.push(response.result);
        dispatch(
          setStore(SET_PANEL_VERIFIED_EXERCISES, panelVerifiedExercises)
        );
      }
      dispatch(
        setAlertAction({
          visible: true,
          type: "success",
          description: "success.exercise_updated",
        })
      );
    } catch (e: any) {
      normalizeCatchActions(dispatch, e.response?.data?.codeError);
      throw e;
    }
  };
};

//DELETED EXERCISE
export const deletePanelExerciseAction = (
  idExercise: IExercise["id"],
  verified: boolean
): ThunkAction<Promise<void>, any, {}, AnyAction> => {
  return async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    getState: () => ReduceProp
  ): Promise<void> => {
    try {
      const panelExercises = verified
        ? getState().panelVerifiedExercises
        : getState().panelUnverifiedExercises;
      await updatePanelExerciseServices({ id: idExercise, deleted: true });

      const index = panelExercises.findIndex(
        (exercise) => exercise.id === idExercise
      );

      if (index < 0) {
        dispatch(panelExercisesAction(verified));
      }

      panelExercises.splice(index, 1);

      dispatch(
        setStore(
          verified
            ? SET_PANEL_VERIFIED_EXERCISES
            : SET_PANEL_UNVERIFIED_EXERCISES,
          panelExercises
        )
      );
      dispatch(
        setAlertAction({
          visible: true,
          type: "success",
          description: "success.user_deleted",
        })
      );
    } catch (e: any) {
      normalizeCatchActions(dispatch, e.response?.data?.codeError);
      throw e;
    }
  };
};

//UPLOAD EXERCISE
export const uploadPanelExercisesAction = (
  newExercises: IExercise[]
): ThunkAction<Promise<void>, any, {}, AnyAction> => {
  return async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    getState: () => ReduceProp
  ): Promise<void> => {
    try {
      await uploadPanelExerciseServices({ exercises: newExercises });

      dispatch(getPanelVerifiedExercisesServices);
      dispatch(
        setAlertAction({
          visible: true,
          type: "success",
          description: "success.exercises_created",
        })
      );
    } catch (e: any) {
      normalizeCatchActions(dispatch, e.response?.data?.codeError);
      throw e;
    }
  };
};
