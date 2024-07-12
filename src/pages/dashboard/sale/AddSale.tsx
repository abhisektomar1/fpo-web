import React, { useEffect, useState } from "react";
import Layout from "../../../layout";
import { Card } from "../../../components/ui/card";
import { useAppSelector } from "../../../store/hooks";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { BASE_URL_APP } from "../../../utils";
import axios from "axios";
import { toast } from "react-toastify";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/text-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Button } from "../../../components/ui/button";
import { Loader2 } from "lucide-react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../../service/AxiosInstance";
import { Autocomplete, TextField } from "@mui/material";

function NewSale() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>([]);
console.log(data);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

  useEffect(() => {
    axiosInstance
      .post(`/GetFPOAllProducts`)
      .then((res) => {
        console.log(res);
        
        if (res.status === 200) {
          setData(res.data.products);
        } else {
          toast.error("Something went wrong!");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  }, []);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });
  function formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }
  
  // Usage:
  const today = formatDate(new Date()); 

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    const saleData = {
      ...data,
      sale_date: today,
    };
    console.log(saleData);
    
    try {
      await axiosInstance.post(
        `${BASE_URL_APP}/AddSalesbyFPO`,
          saleData
      );
      toast("Sale Done Successfully");
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Layout>
      <Card className="min-h-screen rounded p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-12">
            <div className="col-span-12 p-4 md:col-span-8">
              <h1 className="p-3 text-xl font-bold">Add Sale</h1>
              <div className="flex flex-col">
                <div className="flex flex-row items-center justify-between gap-4 p-2">
                  <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
                    Buyer Name <span className="text-destructive">*</span>
                  </div>
                  <Input
                    className="w-[350px]"
                    {...register("buyer_name", {
                      required: "Buyer name is required",
                    })}
                    placeholder="Buyer Name"
                  />
                </div>
                <div className="flex flex-row items-start justify-between gap-4 p-2">
                  <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
                    Mobile Number
                  </div>
                  <Input
                    className="w-[350px]"
                    {...register("mobile_no", {
                      required: "Mobile number is required",
                    })}
                    placeholder="Mobile Number"
                  />
                </div>
                <div className="flex flex-row items-center justify-between gap-4 p-2">
                  <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
                    Address
                  </div>
                  <Textarea
                    className="w-[350px]"
                    {...register("address", {
                      required: "Address is required",
                    })}
                    placeholder="Address"
                  />
                </div>{" "}
                <h3 className="my-2 font-medium">Products</h3>
                {fields.map((field, index) => (
                  <Card className="mb-2 rounded p-4">
                    <div key={field.id} className="flex flex-row flex-col">
                      <div className="flex flex-row items-start justify-between gap-4 p-2">
                        <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
                          Select Product
                        </div>
                        <Controller
                          name={`products.${index}.inventory_id`}
                          control={control}
                          rules={{ required: "Product is required" }}
                          render={({
                            field: { onChange, value },
                            fieldState: { error },
                          }) => (
                            <Autocomplete
                              disablePortal
                              id={`product-autocomplete-${index}`}
                              options={data}
                              sx={{ width: 300 }}
                              getOptionLabel={(option) => option.productName}
                              isOptionEqualToValue={(option, value) =>
                                option.inventory_id === (value as any)
                              }
                              onChange={(_, newValue) =>
                                onChange(newValue ? newValue.inventory_id : null)
                              }
                              value={
                                data.find(
                                  (product:any) => product.inventory_id === value,
                                ) || null
                              }
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Product"
                                  error={!!error}
                                  helperText={error?.message}
                                />
                              )}
                            />
                          )}
                        />
                      </div>
                      <div className="flex flex-row items-start justify-between gap-4 p-2">
                        <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
                          Quantity
                        </div>
                        <Input
                          type="number"
                          className="w-[350px]"
                          {...register(`products.${index}.Quantity` as const, {
                            required: "Quantity is required",
                            min: 1,
                            valueAsNumber: true, 
                          })}
                          placeholder="Quantity"
                        />
                      </div>
                      <div className="flex flex-row items-start justify-between gap-4 p-2">
                        <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
                          Price
                        </div>
                        <Input
                          type="number"
                          step="0.01"
                          className="w-[350px]"
                          {...register(
                            `products.${index}.final_price` as const,
                            {
                              required: "Price is required",
                              min: 0,
                              valueAsNumber: true, 
                            },
                          )}
                          placeholder="Price"
                        />
                      </div>
                      <Button
                        type="button"
                        className="my-2 w-[100px] self-end rounded"
                        onClick={() => remove(index)}
                      >
                        Remove
                      </Button>
                    </div>
                  </Card>
                ))}
                <div className="mt-2 flex flex-col ">
                  <Button
                    type="button"
                    className="my-2 mr-4 w-[100px] self-end rounded"
                    onClick={() =>
                      append({
                        Quantity: 0,
                        final_price: 0,
                        inventory_id:0
                      })
                    }
                  >
                    Add Product
                  </Button>
                  <Button type="submit" className="mt-2 w-full rounded">
                    {isLoading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Card>
    </Layout>
  );
}

export default NewSale;
const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: "Pulp Fiction", year: 1994 },
];
