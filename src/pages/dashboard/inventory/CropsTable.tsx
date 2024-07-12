import React, { useEffect, useMemo, useState } from 'react'
import Table from '../../../components/table'
import { axiosInstance } from '../../../service/AxiosInstance';
import { toast } from 'react-toastify';
import { Box } from '@mui/material';
import { BASE_URL_APP } from '../../../utils';

function CropsTable() {

    
    const [data, setData] = useState<any>([]);
    console.log(data);

    useEffect(() => {
        axiosInstance
          .post(`/ShowInventory`,{
            filter_type:"Crops"
          })
          .then((res) => {
            if(res.data.status === "success"){
                setData(res.data.fpo_product);
            } else{
                toast.error("something went wrong!")
            }
          })
          .catch((error) => {
            console.log(error);
            toast.error(error.message)
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
                accessorKey: "productName",
                enableClickToCopy: true,
                filterVariant: "autocomplete",
                header: "Product Name",
              },
          {
            accessorFn: (row:any) => `${row.productName}`, //accessorFn used to join multiple data into a single cell
            id: 'product_image', //id is still required when using accessorFn instead of accessorKey
            header: 'Product Image',
            Cell: ({ renderedCellValue, row }:any) => (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <img
                  alt="avatar"
                  src={`${BASE_URL_APP}${row.original.product_image}`}
                  loading="lazy"
                  style={{   
                  width: '50px',  // Adjust as needed
                  height: '50px', // Adjust as needed
                  objectFit: 'cover' }}
                />
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                {/* <span>{renderedCellValue}</span> */}
              </Box>
            ),
          },
          {
            accessorKey: "manufacturerName",
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Manufacturer Name",
          },
          {
            accessorKey: "crop_name",
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Crop Name",
          },
          {
            accessorKey: "quantity",
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Quantity",
          },
        ],
      },
    ],
    []
  );
  return (
    <div className="tableDatadiv px-3 py-2">
        <Table
          {...tableProps}
          columns={columns}
          data={data}
        ></Table>
        </div>
  )
}

export default CropsTable