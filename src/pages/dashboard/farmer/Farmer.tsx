import React, { useEffect, useMemo, useRef, useState } from "react";
import Layout from "../../../layout";
import { Button } from "../../../components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { BASE_URL_APP } from "../../../utils";
import axios from "axios";
import { toast, ToastContentProps } from "react-toastify";
import AddFarmer from "./AddFarmer";
import { Card } from "../../../components/ui/card";
import Table from "../../../components/table";
import { useAppSelector } from "../../../store/hooks";
import axiosInstance from "../../../service/AxiosInstance";
import EditFarmer from "./EditFarmer";
import { MRT_PaginationState } from "material-react-table";
import FarmerTableSkeleton from "../../../components/TableLoading";

function Farmer() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [data, setData] = useState<any>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
const [loading, setIsLoading] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await axiosInstance.get('/fposupplier/GetAllFarmerbyFPO', {
          params: {
            page: pagination.pageIndex + 1, // API typically uses 1-based indexing
            page_size: pagination.pageSize,
          },
        });

        if (response.status === 200) {
          setData(response.data.results);
          // Assuming the API returns total pages information
          setTotalPages(response.data.count);
        } else {
          toast.error("Something went wrong!");
        }
      } catch (error: any) {
        console.error(error);
        toast.error(error?.response?.data?.message || "Something went wrong!");
      } finally {
        setIsLoading(false)
      }
    };

    fetchData();
  }, [pagination.pageIndex, pagination.pageSize]);




  const handleFileChange = async (event: any) => {
    
    const file = event.target.files[0];
    try {
      const formData = new FormData();
      formData.append("csv_file", file);
      const res = await axiosInstance.post(`/fposupplier/AddFarmerCsv`, formData);
      if(res.data.errors){ 
        res.data.errors.map((err: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | ((props: ToastContentProps<unknown>) => React.ReactNode) | null | undefined) => {
          toast.error(err)
        })
      }
      if(res.data.errors_count === 0){
        toast(res.data.message || "Something went wrong");
      toast(`${res.data.successful_records_count} farmers added`);
       }
    
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const tableProps = {
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableGrouping: true,
    enableColumnPinning: false,
    enableFacetedValues: false,
    enableRowActionsTrue: true, 
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
            accessorKey: "farmer_name",
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Farmer Name",
          },
          {
            accessorKey: "farmer_mobile",
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Farmer Mobile No.",
          },
          {
            accessorKey: "farmer_village",
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Farmer Village",
          }, 
          {
            accessorKey: "farmer_block",
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Farmer Block",
          },{
            accessorKey: "farmer_district",
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Farmer District",
          },
          {
            accessorKey: "created_at",
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Created At",
          },
        ],
      },
    ],
    [],
  );

  const handleDelete = async (e: React.MouseEvent, row: any) => {
    try {
     await axiosInstance.delete('/fposupplier/FarmerByFPO',{
        data:{farmer_id:[row.farmer_id]}
      });
      toast("Farmer Deleted Successfully!!");
    } catch (error) {
      console.error("Error deleting farmer:", error);
      // Handle the error (e.g., show error message to user)
      if (error instanceof Error) {
        // You can use a toast or any other method to show the error to the user
        toast.error(`Failed to delete: ${error.message}`);
      } else {
        toast.error('An unknown error occurred');
      }
    } finally{
          window.location.reload();
    }
  };

  const editClick = (e: React.MouseEvent, row: any) =>{
    navigate(`/dashboard/editFarmer/${row.farmer_id}`)
}

  return (
        <Card className="p-4">
      {
          loading ? 
          <FarmerTableSkeleton />
           :  <><div className="flex flex-row items-center justify-between">
           <h1 className="p-3 text-2xl font-bold">Farmer Details</h1>
           <div className="flex flex-row gap-4">
             <Dialog>
               <DialogTrigger asChild>
                 <Button
                   variant="outline"
                   className="rounded border-primary bg-transparent text-primary hover:text-primary"
                 >
                   <img src="/images/exel.svg" className="mr-2" />
                   Upload Data
                 </Button>
               </DialogTrigger>
               <DialogContent className="h-[300px]">
                 <DialogHeader>
                   <DialogTitle>Upload Farmer Data</DialogTitle>
                   <DialogDescription>
                     Donwload the sample file and then upload your data according
                     to the file...
                     <div className="m-4 mt-40 flex flex-row gap-2">
                       <a href="/sample/farmer.xlsx" download="sample.xlsx">
                         <Button
                           variant="outline"
                           className="rounded border-primary bg-transparent text-primary hover:text-primary"
                         >
                           <img src="/images/exel.svg" className="mr-2" />
                           Download Sample
                         </Button>
                       </a>
                       <Button
                         className="w-60 rounded"
                         onClick={() => {
                           if (fileInputRef.current) fileInputRef.current.click();
                         }}
                       >
                         Upload Csv
                       </Button>
                       <input
                         ref={fileInputRef}
                         id="xlsx-upload"
                         type="file"
                         accept=".xlsx"
                         onChange={(event) => handleFileChange(event)}
                         className="hidden"
                         onFocus={() => console.log("Input focused")}
                       />
                     </div>
                   </DialogDescription>
                 </DialogHeader>
               </DialogContent>
             </Dialog>
             <AddFarmer />
           </div>
         </div>
         <div className="tableDatadiv px-3 py-2">
               <Table
               pagination={pagination}
               setPagination={setPagination}
                 {...tableProps}
                 columns={columns}
                 data={data}
                 isDelete={true}
                 deleteClick={handleDelete}
                 isEdit={true}
                 editClick={editClick}
                 rowCount={totalPages}
               ></Table>
             </div>
             </>
      }
      
      </Card>
     
  );
}

export default Farmer;
