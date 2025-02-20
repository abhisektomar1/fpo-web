import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Button } from "../../../components/ui/button";
import axiosInstance from "../../../service/AxiosInstance";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import Layout from "../../../layout";
import { Card } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { useNavigate } from "react-router-dom";

type FormData = {
  shop_opentime: string;
  shop_closetime: string;
  shop_opendays: string;
  shop_closedon: string;
  shopName:string;
  shopContactNo:number;
  shopLongitude:number;
  shopLatitude:number;
};

const timeOpenOptions = [
  "1 a.m", "2 a.m", "3 a.m", "4 a.m", "5 a.m", "6 a.m",
  "7 a.m", "8 a.m", "9 a.m", "10 a.m", "11 a.m",
];

const timeCloseOptions = [
  "12 p.m", "1 p.m", "2 p.m", "3 p.m", "4 p.m", "5 p.m",
  "6 p.m", "7 p.m", "8 p.m", "9 p.m", "10 p.m", "11 p.m",
];

const shopDaysOptions = [
  "Monday - Tuesday", "Monday - Wednesday", "Monday - Thursday",
  "Monday - Friday", "Monday - Saturday", "Monday - Sunday",
];

const shopClosedOptions = [
  "Monday", "Tuesday", "Wednesday", "Thursday",
  "Friday", "Saturday", "Sunday",
];

const ShopEdit: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>();
  const { control, handleSubmit, setValue, register } = useForm<FormData>();
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get(`/fposupplier/UserProfileView`)
      .then((res) => {
        // Set form values when data is loaded
        if (res.data.data.shop_details) {
          const shopDetails = res.data.data.shop_details;
          console.log(shopDetails);
          
          setValue('shop_opentime', shopDetails.shop_opentime);
          setValue('shop_closetime', shopDetails.shop_closetime);
          setValue('shop_opendays', shopDetails.shop_opendays);
          setValue('shop_closedon', shopDetails.shop_closedon);
          setValue('shopName', shopDetails.shopName);
          setValue('shopContactNo', shopDetails.shopContactNo);
          setValue('shopLongitude', shopDetails.shopLongitude);
          setValue('shopLatitude', shopDetails.shopLatitude);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setValue]);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    try {
       await axiosInstance.put(`/fposupplier/UpdateProfile`, data);
      toast("Profile Updated Successfully!!");
      navigate("/dashboard/userProfile")

    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    
           <Card className="min-h-screen rounded p-4">
      <div className="container mx-auto p-1">
        <div className="relative grid grid-cols-1 gap-4 md:grid-cols-12 w-2/3">
        <h1 className="p-3 text-xl font-bold">Shop</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="col-span-12 space-y-4"
          >
            <div className="flex flex-row items-center justify-between gap-4 p-2">
                  <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
                  Shop Name
                  </div>
                  <div className="w-[350px]">
                    <Input
                      {...register("shopName")}
                      placeholder="Shop Name"
                    />
                  </div>
                </div>
                <div className="flex flex-row items-center justify-between gap-4 p-2">
                  <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
                  Shop Contact No.
                  </div>
                  <div className="w-[350px]">
                    <Input
                      {...register("shopContactNo",{
                        valueAsNumber:true
                      })}
                      placeholder="Shop Contact No."
                    />
                  </div>
                </div>
                <div className="flex flex-row items-center justify-between gap-4 p-2">
                  <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
                  Shop Latitude
                  </div>
                  <div className="w-[350px]">
                    <Input
                      {...register("shopLatitude",{
                        valueAsNumber:true
                      })}
                      placeholder="Shop Latitude"
                    />
                  </div>
                </div>
                <div className="flex flex-row items-center justify-between gap-4 p-2">
                  <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
                  Shop Longitude
                  </div>
                  <div className="w-[350px]">
                    <Input
                      {...register("shopLongitude",{
                        valueAsNumber:true
                      })}
                      placeholder="Shop Longitude"
                    />
                  </div>
                </div>
            <Controller
              name="shop_opentime"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select opening time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeOpenOptions.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <Controller
              name="shop_closetime"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select closing time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeCloseOptions.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />

            <Controller
              name="shop_opendays"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select shop days" />
                  </SelectTrigger>
                  <SelectContent>
                    {shopDaysOptions.map((days) => (
                      <SelectItem key={days} value={days}>
                        {days}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <Controller
              name="shop_closedon"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select closed day" />
                  </SelectTrigger>
                  <SelectContent>
                    {shopClosedOptions.map((day) => (
                      <SelectItem key={day} value={day}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />

            <Button type="submit" className="w-full rounded">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save
            </Button>
          </form>
        </div>
      </div>
      </Card>
  );
};

export default ShopEdit;