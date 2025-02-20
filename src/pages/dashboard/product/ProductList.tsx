import React, { useRef, useState } from "react";
import Layout from "../../../layout";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import { Card } from "../../../components/ui/card";
import InputsTable from "./InputsTable";
import CropsTable from "./CropsTable";
import { Button } from "../../../components/ui/button";
import { useNavigate } from "react-router-dom";
import FinishedGoods from "./FinishedGoods";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { BASE_URL_APP } from "../../../utils";
import { toast, ToastContentProps } from "react-toastify";
import axios from "axios";
import { ChevronDown } from "lucide-react";
import { useAppSelector } from "../../../store/hooks";
import axiosInstance from "../../../service/AxiosInstance";

function ProductList() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<number>(1);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleFileChange = async (event: any) => {
    const file = event.target.files[0];
    if(!file){
      toast.error("Please Select a file and try again!!")
      return;
    }
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("producttype", filter as any);
      const res = await axiosInstance.post(`/fposupplier/ADDProductDetailsCSV`, formData);
      if(res.data.errors){ 
        res.data.errors.map((err: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | ((props: ToastContentProps<unknown>) => React.ReactNode) | null | undefined) => {
          toast.error(err)
        })
      }
      toast(res.data.message || "Something went wrong");
    } catch (error) {
      console.log(error);
    }
  };
  return (
      <Card className="p-4">
        <div className="flex flex-row items-center justify-between">
          <h1 className="p-3 text-xl font-bold">Product List</h1>
          <div className="flex flex-row gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="rounded border-primary bg-transparent text-primary hover:text-primary"
                >
                  <img src="/images/exel.svg" className="mr-2" />
                  Upload  Data
                </Button>
              </DialogTrigger>
              <DialogContent className="">
                <DialogHeader>
                  <DialogTitle>Upload Product Data</DialogTitle>
                  <DialogDescription>
                    Donwload the sample file and then upload your data according
                    to the file...
                    <div className="my-6 flex flex-col gap-2">
                      {
                        filter === 1 && <a href="/sample/Inputs.xlsx" download="sample/.xlsx">
                        <Button
                          variant="outline"
                          className="w-full rounded border-primary bg-transparent text-primary hover:text-primary"
                        >
                          <img src="/images/exel.svg" className="mr-2" />
                          Download Sample for Agriculture Inputs
                        </Button>
                      </a>
                      }
                       {
                        filter === 2 &&  <a href="/sample/Crops.xlsx" download="sample.xlsx">
                        <Button
                          variant="outline"
                          className="w-full rounded border-primary bg-transparent text-primary hover:text-primary"
                        >
                          <img src="/images/exel.svg" className="mr-2" />
                          Download Sample for Crops
                        </Button>
                      </a>
                      }
                       {
                        filter === 3 &&   <a href="/sample/goods.xlsx" download="sample.xlsx">
                        <Button
                          variant="outline"
                          className="w-full rounded border-primary bg-transparent text-primary hover:text-primary"
                        >
                          <img src="/images/exel.svg" className="mr-2" />
                          Download Sample for Finished Goods
                        </Button>
                      </a>
                      }
                     
                     
                      <img src="/images/sample.svg" className="mt-2"/>
                      <Button
                        className="mt-4 w-full rounded"
                        onClick={() => {
                          if (fileInputRef.current)
                            fileInputRef.current.click();
                        }}
                      >
                        Upload Csv
                      </Button>
                      <input
                        ref={fileInputRef}
                        id="xlsx-upload"
                        type="file"
                        accept=".xlsx"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            <div className="relative" ref={menuRef}>
              <Button className="rounded" onClick={toggleMenu}>
                Add Product <ChevronDown />
              </Button>
              {isMenuOpen && (
                <div className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white py-1 shadow-lg">
                  <a
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      navigate("/dashboard/newProducts/Agricultural Inputs");
                    }}
                  >
                    Agricultural Inputs
                  </a>
                  <a
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      navigate("/dashboard/newProducts/Crops");
                    }}
                  >
                    Crops
                  </a>
                  <a
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      navigate("/dashboard/newProducts/Finish Goods");
                    }}
                  >
                    Finished Goods
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
        <Tabs defaultValue="account">
          <TabsList>
            <TabsTrigger
              value="account"
              onClick={() => {
                setFilter(1);
              }}
            >
              Agricultural Inputs
            </TabsTrigger>
            <TabsTrigger value="password" onClick={() => setFilter(2)}>
              Crops
            </TabsTrigger>
            <TabsTrigger
              value="passwords"
              onClick={() => setFilter(3)}
            >
              Finished Goods
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <InputsTable />
          </TabsContent>
          <TabsContent value="password">
            <CropsTable  />
          </TabsContent>
          <TabsContent value="passwords">
            <FinishedGoods />
          </TabsContent>
        </Tabs>
      </Card>
  );
}

export default ProductList;
