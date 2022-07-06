import React, {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Dropdown,
  DropdownChangeParams,
  DropdownProps,
} from "primereact/dropdown";

import { WithTranslation, withTranslation } from "react-i18next";
import { IUser } from "../../models/user";
import { classNames } from "primereact/utils";

interface DropdownCoachesProps extends WithTranslation, DropdownProps {
  coaches: any;
  keyName: string;
  submitted?: boolean;
}

const DropdownCoaches: FC<DropdownCoachesProps> = (props) => {
  const { keyName, coaches, t, onChange, submitted, required, value } = useMemo(
    () => props,
    [props]
  );

  const [coachSelected, setCoachSelected] = useState<any>(null);

  const findCoach = useCallback(() => {
    if (!value || !coaches.length) {
      return;
    }

    for (let i = 0; i < coaches.length; i++) {
      if (coaches[i].id === value) {
        setCoachSelected(coaches[i]);
        break;
      }
    }
  }, [coaches, value]);

  useEffect(() => {
    findCoach();
  }, [findCoach]);

  const handleOnChange = (e: DropdownChangeParams) => {
    const coachSelected: any = e.value;
    onChange?.(coachSelected?.id || null);
    setCoachSelected(coachSelected);
  };

  const selectedCountryTemplate = (option: any, props: any) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{`${option.first_name} ${option.last_name} - ${option.email}`}</div>
        </div>
      );
    }

    return <span>{props.placeholder}</span>;
  };

  const countryOptionTemplate = (option: any) => {
    return (
      <div className="country-item">
        <div>{`${option.first_name} ${option.last_name}`}</div>
        <div>{option.email}</div>
      </div>
    );
  };
  return (
    <>
      <Dropdown
        value={coachSelected}
        options={coaches}
        onChange={handleOnChange}
        optionLabel="id_coach"
        placeholder={t("dataTable.selectCoach")}
        emptyMessage={t("dataTable.emptyCoaches")}
        emptyFilterMessage={t("common.emptyResult")}
        valueTemplate={selectedCountryTemplate}
        itemTemplate={countryOptionTemplate}
        filter
        showClear
        filterBy="first_name,last_name,email"
        className={classNames({
          "p-invalid": submitted && required && !coachSelected,
        })}
      />
      {submitted && required && !coachSelected && (
        <small className="p-error">{t(`error.${keyName}_required`)}</small>
      )}
    </>
  );
};

export default memo(withTranslation()(DropdownCoaches));
