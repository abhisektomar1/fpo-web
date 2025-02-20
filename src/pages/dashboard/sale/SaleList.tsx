import React, { useEffect, useMemo, useState } from "react";
import { Card } from "../../../components/ui/card";
import { useNavigate } from "react-router-dom";
import Table from "../../../components/table";
import axiosInstance from "../../../service/AxiosInstance";
import { toast } from "react-toastify";
import { Button } from "../../../components/ui/button";
import { MRT_PaginationState } from "material-react-table";

function SaleList() {
  const navigate = useNavigate();
  const [data, setData] = useState<any>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

 
  useEffect(() => {
    axiosInstance
      .get(`/fposupplier/AddGetSales`,{
        params:{
          page: pagination.pageIndex + 1, // API typically uses 1-based indexing
          page_size: pagination.pageSize,
        }
      })
      .then((res) => {
        if (res.data.results.status === "success") {
          setData(res.data.results.inventory);
          setTotalPages(res.data.count)
        } else {
          toast.error("Something went wrong!");
        }
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
            accessorKey: "name",
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Buyer Name",
          },
          {
            accessorKey: "category",
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Category",
          },
          {
            accessorKey: "quantity",
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Quantity",
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
          <h1 className="p-3 text-xl font-bold">Sale List</h1>
          <Button className="rounded mt-2" onClick={() => {
            navigate("/dashboard/addSale")
          }} >
            Add Sale  
        </Button>
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

export default SaleList;
