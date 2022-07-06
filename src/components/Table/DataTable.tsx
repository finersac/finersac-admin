import React, { FC, useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

import { IDataTable } from "../../models/dataTable";
import { WithTranslation, withTranslation } from "react-i18next";
import useWindowDimensions from "../../utils/hooks/useWindowDimensions";

interface DataTableProps extends WithTranslation {
  list: any[];
  title?: string;
  textButtonCreate?: string;
  textButtonCancel?: string;
  onSave?: (item: any, isUpdate?: boolean) => Promise<void>;
  onClose?: () => void;
  onDelete?: (item: any | []) => Promise<void>;
  onChangeItemSelected?: (item: any) => void;
  columnTable: IDataTable[];
  AddOrEditComponent?: React.FC<{
    item: any;
    onChangeItem: (key: string, value: any) => void;
  }>;
  formSuccess?: boolean;
}

const DataTableComponent: FC<DataTableProps> = ({
  t,
  list,
  title,
  textButtonCreate,
  columnTable,
  formSuccess,
  onSave,
  onClose,
  onDelete,
  onChangeItemSelected,
  AddOrEditComponent,
}) => {
  const { height } = useWindowDimensions();
  const [localList, setLocalList] = useState<any[]>([]);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [addDialog, setAddDialog] = useState<boolean>(false);
  const [deleteDialog, setDeleteDialog] = useState<boolean>(false);
  const [deleteMoreDialog, setDeleteMoreDialog] = useState<boolean>(false);

  const [item, setItem] = useState<any | null>(null);
  const [selectedItems, setSelectedItems] = useState<any[] | null>(null);
  const [globalFilter, setGlobalFilter] = useState<string | null>(null);
  const toast = useRef<Toast | null>(null);
  const dt = useRef(null);

  useEffect(() => {
    if (!addDialog) {
      return;
    }
    if (!formSuccess) {
      return;
    }
    setAddDialog(false);
    setItem(null);
  }, [formSuccess, addDialog]);

  useEffect(() => {
    setLocalList(list);
  }, [list]);

  const openNew = () => {
    setItem(null);
    setAddDialog(true);
    setIsUpdate(false);
  };

  const hideDialog = () => {
    setAddDialog(false);
    setIsUpdate(false);
    onClose?.();
  };

  const hideDeleteProductDialog = () => {
    setDeleteDialog(false);
  };

  const hideDeleteProductsDialog = () => {
    setDeleteMoreDialog(false);
  };

  const saveProduct = async () => {
    if (!onSave) {
      return;
    }
    try {
      await onSave(item, isUpdate);
    } catch (e) {}
  };

  const editProduct = (_item: any) => {
    setItem({ ..._item });
    setAddDialog(true);
    setIsUpdate(true);
  };

  const confirmDeleteProduct = (_item: any) => {
    setItem({ ..._item });
    setDeleteDialog(true);
  };

  const deleteProduct = async () => {
    if (!item) {
      return;
    }
    await onDelete?.(item);
    try {
      hideDeleteProductDialog();
    } catch (e) {}
  };

  const confirmDeleteSelected = () => {
    setDeleteMoreDialog(true);
  };

  const deleteSelectedProducts = async () => {
    if (!item) {
      return;
    }
    await onDelete?.(item);
    try {
      const _items = localList.filter((val) => !item.includes(val));
      setLocalList(_items);
      setDeleteMoreDialog(false);
      setSelectedItems(null);
    } catch (e) {}
  };

  const onChangeLocalItem = (key: string, value: any) => {
    let _item = { ...item };
    _item[key] = value;
    setItem(_item);
  };

  const ToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="flex flex-row flex-wrap justify-content-between">
          <div className="flex justify-content-center align-items-center">
            <h1 className=" text-primary2 text-center font-semibold text-3xl">
              Usuarios
            </h1>
          </div>
          <div className="flex">
            <Button
              label={textButtonCreate ? textButtonCreate : t("button.create")}
              icon="pi pi-plus"
              className="bg-secondary mr-2"
              onClick={openNew}
            />
            {selectedItems && (
              <Button
                label={t("button.delete")}
                icon="pi pi-trash"
                className=""
                onClick={confirmDeleteSelected}
                disabled={!selectedItems}
              />
            )}
          </div>
        </div>
      </React.Fragment>
    );
  };

  const actionBodyTemplate = (rowData: any) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2"
          onClick={() => editProduct(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirmDeleteProduct(rowData)}
        />
      </React.Fragment>
    );
  };

  const header = (
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
  );
  const productDialogFooter = (
    <React.Fragment>
      <Button
        label={t(`button.cancel`)}
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
      <Button
        label={t(`button.${isUpdate ? "update" : "create"}`)}
        icon="pi pi-check"
        className="p-button-text"
        onClick={saveProduct}
      />
    </React.Fragment>
  );
  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button
        label={t("button.no")}
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteProductDialog}
      />
      <Button
        label={t("button.yes")}
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteProduct}
      />
    </React.Fragment>
  );
  const deleteProductsDialogFooter = (
    <React.Fragment>
      <Button
        label={t("button.no")}
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteProductsDialog}
      />
      <Button
        label={t("button.yes")}
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteSelectedProducts}
      />
    </React.Fragment>
  );

  return (
    <div className="">
      <Toast ref={toast} />

      <div>
        <div className="bg-white rounded mb-4 py-3 justify-content-center shadow-md radius pr-3 pl-7">
          <ToolbarTemplate />
        </div>
        <div className="h-400-px">
          <DataTable
            ref={dt}
            value={localList}
            selection={selectedItems}
            onSelectionChange={(e) => setSelectedItems(e.value)}
            dataKey="id"
            paginator
            rows={10}
            scrollable
            scrollHeight={`${Number(height) * 0.5}px`}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            globalFilter={globalFilter}
            header={header}
            responsiveLayout="scroll"
            emptyMessage={`${t("common.emptyList")}`}
          >
            {columnTable.map((column, index) => {
              return (
                <Column
                  {...column}
                  key={index}
                  header={t(String(column.header))}
                />
              );
            })}
            <Column
              body={actionBodyTemplate}
              exportable={false}
              style={{ minWidth: "8rem" }}
            ></Column>
          </DataTable>
        </div>
      </div>

      <Dialog
        visible={addDialog}
        header=""
        style={{ width: "600px" }}
        modal
        className="p-fluid"
        footer={productDialogFooter}
        onHide={hideDialog}
      >
        {AddOrEditComponent && (
          <AddOrEditComponent item={item} onChangeItem={onChangeLocalItem} />
        )}
      </Dialog>

      <Dialog
        visible={deleteDialog}
        style={{ width: "450px" }}
        header={t("common.confirm")}
        modal
        footer={deleteProductDialogFooter}
        onHide={hideDeleteProductDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />

          <span>{t("common.sureDelete")}</span>
        </div>
      </Dialog>

      <Dialog
        visible={deleteMoreDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteProductsDialogFooter}
        onHide={hideDeleteProductsDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />

          <span>{t("common.sureDeleteItems")}</span>
        </div>
      </Dialog>
    </div>
  );
};

export default withTranslation()(DataTableComponent);
