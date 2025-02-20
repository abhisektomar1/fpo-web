import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Card } from "../../components/ui/card";
import Table from "../../components/table";
import axiosInstance from "../../service/AxiosInstance";
import { MRT_PaginationState } from "material-react-table";


function SupplierList() {
  const navigate = useNavigate();
  const [data, setData] = useState<any>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
 
  useEffect(() => {
    axiosInstance
      .get(`/fposupplier/PurchaseInfo`, {
        params:{
          page: pagination.pageIndex + 1, 
          page_size: pagination.pageSize,
        }
      })
      .then((res) => {
          setData(res?.data?.results?.data);
          setTotalPages(res?.data?.count)
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  }, [pagination.pageIndex, pagination.pageSize]);

  const tableProps = {
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableGrouping: true,
    enableColumnPinning: false,
    enableFacetedValues: false,
    enableRowActionsTrue: false,
    enableRowSelection: false,
    showColumnFilters: true,
    showGlobalFilter: true, // Assuming this should also be passed as a prop
  };

  const columns = useMemo(
    () => [
      {
        id: "data",
        columns: [
          {
            accessorKey: "party_name",
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Supplier Name",
          },
          {
            accessorKey: "party_mobileno",
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Supplier Mobile No.",
          },
          {
            accessorKey: "party_name",
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Product Name",
          },
          {
            accessorKey: "product_type",
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Product Type",
          },
          {
            accessorKey: "quantity",
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Quantity",
          },
          {
            accessorKey: "unit_price",
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Unit Bought Price",
          },
          {
            accessorKey: "total_amount",
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Total Amount",
          },
        ],
      },
    ],
    [],
  );


  

  return (
      <Card className="p-4">
        <div className="flex flex-row justify-between">
          <h1 className="p-3 text-xl font-bold">Supplier List</h1>
          {/* <Button className="rounded mt-2" onClick={() => {
            navigate("/dashboard/addSale")
          }} >
            Add Sale  
        </Button> */}
        </div>
         
          <div className="tableDatadiv px-3 py-2">
            <Table
              pagination={pagination}
              setPagination={setPagination}
              rowCount={totalPages}
              {...tableProps}
              columns={columns}
              data={data}
            ></Table>
          </div>
      </Card>
  );
}

export default SupplierList;
