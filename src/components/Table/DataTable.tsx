import React, { FC, useState, useEffect, useRef, ReactElement } from "react";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
// import { ProductService } from "../service/ProductService";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { Rating } from "primereact/rating";
import { Toolbar } from "primereact/toolbar";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import { InputNumber } from "primereact/inputnumber";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import "./DataTable.css";
import { IDataTable } from "../../models/dataTable";
import { WithTranslation, withTranslation } from "react-i18next";

interface DataTableProps extends WithTranslation {
  list: any[];
  title?: string;
  textButtonSave?: string;
  textButtonCancel?: string;
  onSave?: (item: any, isUpdate?: boolean) => void;
  onDelete?: (item: any | []) => void;
  columnTable: IDataTable[];
  AddOrEditComponent?: React.FC<{ item: any }>;
}

const DataTableComponent: FC<DataTableProps> = ({
  t,
  list,
  title,
  columnTable,
  onSave,
  onDelete,
  AddOrEditComponent,
}) => {
  const emptyProduct = {};

  const [localList, setLocalList] = useState<any[]>([]);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [addDialog, setAddDialog] = useState<boolean>(false);
  const [deleteDialog, setDeleteDialog] = useState<boolean>(false);
  const [deleteMoreDialog, setDeleteMoreDialog] = useState<boolean>(false);

  const [item, setItem] = useState(emptyProduct);
  const [selectedItems, setSelectedItems] = useState<any[] | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState<string | null>(null);
  const toast = useRef<Toast | null>(null);
  const dt = useRef(null);

  useEffect(() => {
    setLocalList(list);
  }, [list]);

  const openNew = () => {
    setItem(emptyProduct);
    setAddDialog(true);
    setIsUpdate(false);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setAddDialog(false);
    setIsUpdate(false);
  };

  const hideDeleteProductDialog = () => {
    setDeleteDialog(false);
  };

  const hideDeleteProductsDialog = () => {
    setDeleteMoreDialog(false);
  };

  const saveProduct = () => {
    setSubmitted(true);

    /*if (product.name.trim()) {
      const _localList = [...localList];
      const _product = { ...product };
      if (product.id) {
        const index = findIndexById(product.id);

        _localList[index] = _product;
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Product Updated",
          life: 3000,
        });
      } else {
        _product.id = createId();
        _localList.push(_product);
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Product Created",
          life: 3000,
        });
      }

      setLocalList(_products);
      setProductDialog(false);
      setProduct(emptyProduct);
    }*/
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

  const deleteProduct = () => {
    /*let _products = products.filter((val) => val.id !== product.id);
    setLocalList(_products);
    setDeleteProductDialog(false);
    setProduct(emptyProduct);*/
    toast.current?.show({
      severity: "success",
      summary: "Successful",
      detail: "Product Deleted",
      life: 3000,
    });
  };

  const findIndexById = (id: any) => {
    /*let index = -1;
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;*/
  };

  const confirmDeleteSelected = () => {
    setDeleteMoreDialog(true);
  };

  const deleteSelectedProducts = () => {
    if (!selectedItems) {
      return;
    }
    let _products = localList.filter((val) => !selectedItems.includes(val));
    setLocalList(_products);
    setDeleteMoreDialog(false);
    setSelectedItems(null);
    toast.current?.show({
      severity: "success",
      summary: "Successful",
      detail: "Products Deleted",
      life: 3000,
    });
  };

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label="New"
          icon="pi pi-plus"
          className="p-button-success mr-2"
          onClick={openNew}
        />
        <Button
          label="Delete"
          icon="pi pi-trash"
          className="p-button-danger"
          onClick={confirmDeleteSelected}
          disabled={!selectedItems}
        />
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
          placeholder="Search..."
        />
      </span>
    </div>
  );
  const productDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
      <Button
        label="Save"
        icon="pi pi-check"
        className="p-button-text"
        onClick={saveProduct}
      />
    </React.Fragment>
  );
  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteProductDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteProduct}
      />
    </React.Fragment>
  );
  const deleteProductsDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteProductsDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteSelectedProducts}
      />
    </React.Fragment>
  );

  return (
    <div className="">
      <Toast ref={toast} />

      <div className="card">
        <Toolbar
          className="mb-4"
          left={leftToolbarTemplate}
          // right={rightToolbarTemplate}
        ></Toolbar>

        <DataTable
          ref={dt}
          value={localList}
          selection={selectedItems}
          onSelectionChange={(e) => setSelectedItems(e.value)}
          dataKey="id"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          globalFilter={globalFilter}
          header={header}
          responsiveLayout="scroll"
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

      <Dialog
        visible={addDialog}
        style={{ width: "450px" }}
        header=""
        modal
        className="p-fluid"
        footer={productDialogFooter}
        onHide={hideDialog}
      >
        {AddOrEditComponent && <AddOrEditComponent item={item} />}
      </Dialog>

      <Dialog
        visible={deleteDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteProductDialogFooter}
        onHide={hideDeleteProductDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />

          <span>Are you sure you want to delete?</span>
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

          <span>Are you sure you want to delete the selected products?</span>
        </div>
      </Dialog>
    </div>
  );
};

export default withTranslation()(DataTableComponent);
