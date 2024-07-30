import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../../layout";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import Table from "../../components/table";
import axiosInstance from "../../service/AxiosInstance";
import { Box } from "@mui/material";


function CustomerList() {
  const navigate = useNavigate();
  const [data, setData] = useState<any>([]);

 console.log(data);
 
  useEffect(() => {
    axiosInstance
      .post(`/GetCustomerDetailsFPO`)
      .then((res) => {
        if (res.status === 200) {
          setData(res.data.data);
        } else {
          toast.error("Something went wrong!");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  }, []);

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
            accessorKey: "buyer_name",
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Name",
          },
          {
            accessorKey: "mobile_no",
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Mobile No.",
          },
          {
            accessorKey: "address",
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Address",
          },
          {
            accessorFn: (row: any) => `${row}`, //accessorFn used to join multiple data into a single cell
            id: "name", //id is still required when using accessorFn instead of accessorKey
            header: "Is Farmer",
            size: 250,
            Cell: ({ renderedCellValue, row }: any) => (
           
                !row?.original.is_farmer ? (
                 <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    color:"red",
                  }}
                >
                    <span>Not a farmer</span>
                </Box>
                ) : (
                  <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    color:"green",
                  }}
                >
                    <span>Farmer</span>
                </Box>
                )
           
            ),
          },
        ],
      },
    ],
    [],
  );


  

  return (
    <Layout>
      <Card className="p-4">
        <div className="flex flex-row justify-between">
          <h1 className="p-3 text-xl font-bold">Customer List</h1>
          {/* <Button className="rounded mt-2" onClick={() => {
            navigate("/dashboard/addSale")
          }} >
            Add Sale  
        </Button> */}
        </div>
         
          <div className="tableDatadiv px-3 py-2">
            <Table
              {...tableProps}
              columns={columns}
              data={data}
            ></Table>
          </div>
      </Card>
    </Layout>
  );
}

export default CustomerList;
