import { IDataTable, ITabView } from "../../../models/dataTable";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";

// components

import { Checkbox } from "primereact/checkbox";

import DataTable from "../../../components/Table/DataTable";
import { generateColumnTable } from "../../../utils/functions";
import {
  panelExercisesAction as typePanelExercisesAction,
  createPanelExerciseAction as typeCreatePanelExerciseAction,
  updatePanelExerciseAction as typeUpdatePanelExerciseAction,
  uploadPanelExercisesAction as typeUploadPanelExercisesAction,
  deletePanelExerciseAction as typeDeletePanelExerciseAction,
} from "../../../store/actions/panel-exercises.action";

import { IUser } from "../../../models/user";
import Input from "../../../components/Input";

import { withTranslation, WithTranslation } from "react-i18next";

import { IExercise } from "../../../models/exercise";

import _ from "lodash";

interface ExercisesProps extends WithTranslation {
  panelExercisesAction: typeof typePanelExercisesAction;
  createPanelExerciseAction: typeof typeCreatePanelExerciseAction;
  updatePanelExerciseAction: typeof typeUpdatePanelExerciseAction;
  deletePanelExerciseAction: typeof typeDeletePanelExerciseAction;
  uploadPanelExercisesAction: typeof typeUploadPanelExercisesAction;
  panelExercise?: IExercise[];
  user?: IUser;
}

const exerciseFields = ["exercise_name", "video_url"];

const Exercises: FC<ExercisesProps> = ({
  t,
  panelExercisesAction,
  createPanelExerciseAction,
  updatePanelExerciseAction,
  uploadPanelExercisesAction,
  deletePanelExerciseAction,
}) => {
  const columnTable = useMemo(
    (): IDataTable[] => generateColumnTable(exerciseFields),
    []
  );

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [formSuccess, setFormSuccess] = useState<boolean>(false);

  const tabIndex = useRef<number>(0);

  const tabViews = useMemo(
    (): ITabView[] => [
      {
        reduceName: "panelVerifiedExercises",
        title: t("dataTable.verified_exercises"),
        callback: () => {},
      },
      {
        reduceName: "panelUnverifiedExercises",
        title: t("dataTable.unverified_exercises"),
        callback: () => {},
      },
    ],
    [t]
  );

  const onUploadExcel = async (data: any) => {
    try {
      await uploadPanelExercisesAction(data);
    } catch (e) {}
  };

  const getInitialData = useCallback(async () => {
    try {
      await panelExercisesAction(true);
      await panelExercisesAction();
    } catch (e) {
      console.error(e);
    }
  }, [panelExercisesAction]);

  useEffect(() => {
    getInitialData();
  }, [getInitialData]);

  const handleOnSave = async (data: any, isUpdate?: boolean): Promise<void> => {
    setSubmitted(true);
    if (!data?.exercise_name) {
      return;
    }
    if (!data) {
      return;
    }
    const newData: IExercise = _.pickBy(
      {
        exercise_name: data?.exercise_name,
        video_url: data?.video_url,
        preview_base64: data?.preview_base64,
      },
      _.identity
    );

    try {
      await (isUpdate ? updatePanelExerciseAction : createPanelExerciseAction)(
        { ...newData, is_verified: data?.is_verified },
        data?.id,
        tabIndex.current === 0
      );
      setFormSuccess(true);
    } catch (e) {
      setFormSuccess(false);
    }
  };

  const handleOnDelete = async (exercise: any) => {
    try {
      await deletePanelExerciseAction(exercise.id, exercise?.is_verified);
      setSubmitted(false);
      setFormSuccess(true);
    } catch (e) {}
  };

  const component = ({
    item,
    onChangeItem,
  }: {
    item: any;
    onChangeItem: (key: string, value: any) => any;
  }): JSX.Element => {
    const onChangeInput = (key: string, value: any) => {
      onChangeItem(key, value);
      setSubmitted(false);
    };

    return (
      <>
        <div className="formgrid grid">
          <div className="field col-6">
            <Input
              keyName="exercise_name"
              label={t("dataTable.exercise_name")}
              required
              submitted={submitted}
              autoFocus
              value={item?.exercise_name}
              onChange={(e) => onChangeInput("exercise_name", e.target.value)}
            />
          </div>
          <div className="field col-6">
            <Input
              keyName="video_url"
              label={t("dataTable.video_url")}
              submitted={submitted}
              value={item?.video_url}
              onChange={(e) => onChangeInput("video_url", e.target.value)}
            />
          </div>

          {tabIndex.current === 1 && (
            <div>
              <label htmlFor="cbv" className="p-checkbox-label mr-2">
                {t("dataTable.verified_exercise")}
              </label>
              <Checkbox
                inputId="cbv"
                onChange={(e) =>
                  onChangeInput("is_verified", e.checked ? 1 : 0)
                }
                checked={item?.is_verified === 1}
              />
            </div>
          )}
        </div>
      </>
    );
  };

  const onCloseModal = () => {
    setSubmitted(false);
    setFormSuccess(false);
  };

  const onTabChange = (index: number) => {
    tabIndex.current = index;
  };

  return (
    <>
      <div className="h-full bg-blueGray-100">
        <div className="w-full px-12">
          <DataTable
            tabViews={tabViews}
            toolBarTitle={t("sideBar.exercises")}
            columnTable={columnTable}
            exportExcelFields={exerciseFields}
            textButtonCreate={t("button.createExercise")}
            formSuccess={formSuccess}
            AddOrEditComponent={component}
            onTabChange={onTabChange}
            onSave={handleOnSave}
            onDelete={handleOnDelete}
            onUploadExcel={onUploadExcel}
            onClose={onCloseModal}
          />
        </div>
      </div>
    </>
  );
};

export default withTranslation()(Exercises);
