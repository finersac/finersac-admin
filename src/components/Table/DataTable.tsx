import React, { FC, useState, useEffect, useRef } from "react";
import { ReduceName } from "../../store/reducers";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { TabView, TabPanel, TabViewTabChangeParams } from "primereact/tabview";

import { IDataTable, ITabView } from "../../models/dataTable";
import { WithTranslation, withTranslation } from "react-i18next";
import Table from "./Table";

interface DataTableProps extends WithTranslation {
  reduceName?: ReduceName;
  title?: string;
  toolBarTitle?: string;
  textButtonCreate?: string;
  textButtonCancel?: string;
  tabViews?: ITabView[];
  exportExcelFields?: string[];
  onTabChange?: (index: number) => void;
  onSave?: (item: any, isUpdate?: boolean) => Promise<void>;
  onClose?: () => void;
  onDelete?: (item: any | []) => Promise<void>;
  onBlock?: (item: any | []) => Promise<void>;
  onUploadExcel?: (item: any) => void;
  columnTable: IDataTable[];
  AddOrEditComponent?: React.FC<{
    item: any;
    onChangeItem: (key: string, value: any) => void;
  }>;
  formSuccess?: boolean;
}

const DataTableComponent: FC<DataTableProps> = ({
  t,
  reduceName,
  tabViews,
  title,
  toolBarTitle,
  textButtonCreate,
  columnTable,
  formSuccess,
  exportExcelFields,
  onTabChange,
  onSave,
  onClose,
  onDelete,
  onBlock,
  onUploadExcel,
  AddOrEditComponent,
}) => {
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [addDialog, setAddDialog] = useState<boolean>(false);
  const [deleteDialog, setDeleteDialog] = useState<boolean>(false);
  const [blockUnlockDialog, setBlockUnlockDialog] = useState<boolean>(false);
  const [deleteMoreDialog, setDeleteMoreDialog] = useState<boolean>(false);

  const [tabPosition, setTabPosition] = useState<number>(0);

  const [item, setItem] = useState<any | null>(null);
  const [selectedItems, setSelectedItems] = useState<any[] | null>(null);
  const toast = useRef<Toast | null>(null);

  useEffect(() => {
    if (addDialog && formSuccess) {
      setAddDialog(false);
      setDeleteDialog(false);
      setDeleteMoreDialog(false);
      setItem(null);
      onClose?.();
    }
  }, [formSuccess, addDialog, onClose]);

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

  const hideBlockUnlockDialog = () => {
    setBlockUnlockDialog(false);
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

  const confirmBlockUnlockItem = (_item: any) => {
    setItem({ ..._item });
    setBlockUnlockDialog(true);
  };

  const confirmDeleteProduct = (_item: any) => {
    setItem({ ..._item });
    setDeleteDialog(true);
  };

  const blockUnlockItem = async () => {
    if (!item) {
      return;
    }
    await onBlock?.(item);
    try {
      hideBlockUnlockDialog();
      onClose?.();
    } catch (e) {}
  };

  const deleteItem = async () => {
    if (!item) {
      return;
    }
    await onDelete?.(item);
    onClose?.();
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
      //const _items = localList.filter((val) => !item.includes(val));
      //setLocalList(_items);
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
              {toolBarTitle}
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
  const confirmDialogFooter = (
    <React.Fragment>
      <Button
        label={t("button.no")}
        icon="pi pi-times"
        className="p-button-text"
        onClick={
          blockUnlockDialog ? hideBlockUnlockDialog : hideDeleteProductDialog
        }
      />
      <Button
        label={t("button.yes")}
        icon="pi pi-check"
        className="p-button-text"
        onClick={blockUnlockDialog ? blockUnlockItem : deleteItem}
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

  const handleOnTabChange = (tab: TabViewTabChangeParams) => {
    setTabPosition(tab.index);
    onTabChange?.(tab.index);
  };

  return (
    <div className="">
      <Toast ref={toast} />

      <div>
        <div className="bg-white rounded mb-4 py-3 justify-content-center shadow-md radius pr-3 pl-7">
          <ToolbarTemplate />
        </div>
        <div className="h-400-px">
          {tabViews?.length ? (
            <TabView activeIndex={tabPosition} onTabChange={handleOnTabChange}>
              {tabViews.map((tab, key) => (
                <TabPanel header={tab.title} key={key}>
                  <Table
                    reduceName={tab.reduceName}
                    title={title}
                    columnTable={columnTable}
                    exportExcelFields={exportExcelFields}
                    onUploadExcel={onUploadExcel}
                    onDelete={confirmDeleteProduct}
                    onEdit={editProduct}
                    isTab
                  />
                </TabPanel>
              ))}
            </TabView>
          ) : (
            <Table
              reduceName={reduceName || "panelUsers"}
              title={title}
              columnTable={columnTable}
              exportExcelFields={exportExcelFields}
              onUploadExcel={onUploadExcel}
              onBlock={confirmBlockUnlockItem}
              onDelete={confirmDeleteProduct}
              onEdit={editProduct}
            />
          )}
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
        footer={confirmDialogFooter}
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
        visible={deleteDialog}
        style={{ width: "450px" }}
        header={t("common.confirm")}
        modal
        footer={confirmDialogFooter}
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
        visible={blockUnlockDialog}
        style={{ width: "450px" }}
        header={t("common.confirm")}
        modal
        footer={confirmDialogFooter}
        onHide={hideDeleteProductDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />

          <span>
            {t(`common.${item?.blocked ? "sureUnlock" : "sureBlock"}`)}
          </span>
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
