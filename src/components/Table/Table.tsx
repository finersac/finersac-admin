import React, { FC, useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { FileUpload, FileUploadFilesParam } from "primereact/fileupload";
import { InputText } from "primereact/inputtext";
import { setAlertAction } from "../../store/actions/alert.action";

import _ from "lodash";

import { IDataTable } from "../../models/dataTable";
import { WithTranslation, withTranslation } from "react-i18next";
import useWindowDimensions from "../../utils/hooks/useWindowDimensions";
import { connect, useSelector } from "react-redux";
import { ReduceProp, ReduceName } from "../../store/reducers";
import { bindActionCreators, compose } from "redux";

export function useSelectorTyped<T>(fn: (state: ReduceProp) => T): T {
  return useSelector(fn);
}

interface TableProps extends WithTranslation {
  reduceName: ReduceName;
  title?: string;
  columnTable: IDataTable[];
  isTab?: boolean;
  exportExcelFields?: string[];
  onUploadExcel?: (item: any | []) => void;
  onDelete?: (item: any | []) => void;
  onEdit?: (item: any | []) => void;
  onBlock?: (item: any | []) => void;
  setAlertActionProp?: typeof setAlertAction;
}

const DataComponent: FC<TableProps> = ({
  t,
  reduceName,
  title,
  columnTable,
  isTab,
  exportExcelFields,
  onUploadExcel,
  onEdit,
  onDelete,
  onBlock,
  setAlertActionProp,
}) => {
  const list = useSelectorTyped((state) => state[reduceName]);

  const { height } = useWindowDimensions();

  const [selectedItems, setSelectedItems] = useState<any[] | null>(null);
  const [globalFilter, setGlobalFilter] = useState<string | null>(null);

  const dt = useRef<DataTable | null>(null);
  const uploadFile = useRef<FileUpload | null>(null);

  const editProduct = (_item: any) => {
    onEdit && onEdit(_item);
  };

  const confirmBlockUnlockItem = (_item: any) => {
    onBlock && onBlock(_item);
  };

  const confirmDeleteProduct = (_item: any) => {
    onDelete && onDelete(_item);
  };

  const arrayToEmptyList = () => {
    if (!exportExcelFields?.length) {
      return [];
    }
    return [
      exportExcelFields.reduce((accumulator, value) => {
        return { ...accumulator, [value]: "" };
      }, {}),
    ];
  };

  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      const emptyListModel = arrayToEmptyList();
      const worksheet = xlsx.utils.json_to_sheet(emptyListModel);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      saveAsExcelFile(excelBuffer, "list");
    });
  };

  const saveAsExcelFile = (buffer: any, fileName: string) => {
    import("file-saver").then((module) => {
      if (module && module.default) {
        let EXCEL_TYPE =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        let EXCEL_EXTENSION = ".xlsx";
        const data = new Blob([buffer], {
          type: EXCEL_TYPE,
        });

        module.default.saveAs(
          data,
          fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
        );
      }
    });
  };

  const importExcel = (e: FileUploadFilesParam) => {
    const file = e.files[0];

    import("xlsx").then((xlsx) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const wb = xlsx.read(e.target?.result, { type: "array" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = xlsx.utils.sheet_to_json(ws, { header: 1 });

        // Prepare DataTable
        const cols: any = data[0];

        const isEqual = _.isEqual(cols, exportExcelFields);

        if (!isEqual) {
          uploadFile.current?.clear();
          setAlertActionProp?.({
            visible: true,
            type: "error",
            description: "error.model_is_not_same",
          });
          return;
        }

        data.shift();

        let _importedData = data.map((d: any) => {
          return cols.reduce((obj: any, c: any, i: number) => {
            obj[c] = d[i];
            return obj;
          }, {});
        });

        onUploadExcel?.(_importedData);

        uploadFile.current?.clear();
      };

      reader.readAsArrayBuffer(file);
    });
  };

  const actionBodyTemplate = (rowData: any) => {
    return (
      <React.Fragment>
        {onBlock && (
          <Button
            icon={rowData?.blocked ? "pi pi-lock" : "pi pi-lock-open"}
            className={`p-button-rounded mr-2 p-button-text ${
              rowData?.blocked ? "p-button-warning" : "p-button-secondary"
            }`}
            onClick={() => confirmBlockUnlockItem(rowData)}
          />
        )}
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2 p-button-text"
          onClick={() => editProduct(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger p-button-text"
          onClick={() => confirmDeleteProduct(rowData)}
        />
      </React.Fragment>
    );
  };

  return (
    <div className="h-400-px">
      <React.Fragment>
        <div
          className={`flex flex-row flex-wrap justify-content-between bg-white ${
            isTab ? "" : "pt-3"
          } pb-3 pl-3`}
        >
          <div className="table-header">
            <h5 className="mx-0 my-1">{title}</h5>
            <span className="p-input-icon-left">
              <i className="pi pi-search" />
              <InputText
                type="search"
                onInput={(e) => setGlobalFilter(e.currentTarget?.value || "")}
                placeholder={`${t("common.search")}`}
              />
            </span>
          </div>
          {onUploadExcel && (
            <div className="mr-5 flex flex-row">
              <Button
                label={t("button.downloadModel")}
                icon="pi pi-download"
                className="p-button-rounded p-button-text p-button-secondary mr-1"
                onClick={exportExcel}
                data-pr-tooltip="XLS"
              />
              <FileUpload
                ref={uploadFile}
                chooseOptions={{
                  label: t("button.import"),
                  icon: "pi pi-upload",
                  className:
                    "p-button-rounded p-button-text p-button-secondary",
                }}
                mode="basic"
                name="excel"
                url="./upload"
                customUpload
                auto
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                className="mr-2"
                uploadHandler={importExcel}
              />
            </div>
          )}
        </div>
      </React.Fragment>
      <DataTable
        ref={dt}
        value={list}
        selection={selectedItems}
        onSelectionChange={(e) => setSelectedItems(e.value)}
        dataKey="id"
        paginator
        rows={10}
        scrollable
        scrollHeight={`${Number(height) * (isTab ? 0.45 : 0.5)}px`}
        rowsPerPageOptions={[5, 10, 25]}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        globalFilter={globalFilter}
        responsiveLayout="scroll"
        emptyMessage={`${t("common.emptyList")}`}
      >
        {columnTable.map((column, index) => {
          return (
            <Column {...column} key={index} header={t(String(column.header))} />
          );
        })}
        <Column
          body={actionBodyTemplate}
          exportable={false}
          align="right"
        ></Column>
      </DataTable>
    </div>
  );
};

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({ setAlertActionProp: setAlertAction }, dispatch);
}

const mapStateToProps = (state: ReduceProp) => ({});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(withTranslation()(DataComponent));
