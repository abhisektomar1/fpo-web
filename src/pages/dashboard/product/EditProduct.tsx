import React, { useEffect, useState } from "react";
import Layout from "../../../layout";
import { Card } from "../../../components/ui/card";
import { useAppSelector } from "../../../store/hooks";
import { Controller, FieldError, useForm } from "react-hook-form";
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
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../service/AxiosInstance";
import { log } from "node:console";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [crops, setCrops] = useState<any>();
  const [cropsId, setCropsId] = useState<any>(4);

  const [variety, setVariety] = useState<any>();
  const [varietyId, setVarietyId] = useState<any>();

  const [status, SetStatus] = useState<any>();
  const [mType, setmType] = useState<any>();

  const [data, setData] = useState<any>();
  const lan = useAppSelector((state) => state.lan.lan);
  const [productType, setProductType] = useState<number>();
  const [measurement, setMeasurement] = useState<any>()
console.log(data,"data");


  useEffect(() => {
    axiosInstance
      .get(`/fposupplier/GetMeasurements`)
      .then((res) => setMeasurement(res.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axiosInstance
      .get(`fposupplier/GetallFPOCrops`)
      .then((res) => setCrops(res.data.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axiosInstance
      .get(`/fposupplier/GetFPOCropVariety`, {
        params: { crop_id: cropsId },
      })
      .then((res) => setVariety(res.data.data))
      .catch((error) => console.log(error));
  }, [cropsId]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<any>({
    defaultValues: data,
  });

  const onSubmit = async (data: any) => {
    const { composition, manufacturerName, ...dataMy } = data;

    setIsLoading(true);

    let dataa;
    if (productType === 3) {
      dataa = {
        ...data,
        purchase_price: Number(data.purchase_price),
        selling_price: Number(data.unit_price),
        discount: Number(data.discount),
        final_price: Number(data.final_price),
        measurement_type: mType,
        selling_status: status,
        measurement_unit: Number(data.measurement_unit),
        quantity: Number(data.quantity),
      };
    } else if (productType === 2) {
      dataa = {
        ...dataMy,
        purchase_price: Number(data.purchase_price),
        selling_price: Number(data.unit_price),
        discount: Number(data.discount),
        final_price: Number(data.final_price),
        measurement_type: mType,
        selling_status: status,
        fk_crops_id: cropsId,
        fk_variety_id: varietyId,
        measurement_unit: Number(data.measurement_unit),
        quantity: Number(data.quantity),
      };
    } else {
      dataa = {
        ...data,
        purchase_price: Number(data.purchase_price),
        selling_price: Number(data.unit_price),
        discount: Number(data.discount),
        final_price: Number(data.final_price),
        measurement_type: mType,
        selling_status: status,
        measurement_unit: Number(data.measurement_unit),
        quantity: Number(data.quantity),
      };
    }

    try {
      await axiosInstance.put(`/fposupplier/ProductDetailsAddGetDelUpdate`, {
        ...dataa,
        product_id: [id],
      });
      toast("Product Updated Successfully");
      navigate("/dashboard/productList");
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message || "something went wrong!!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    axiosInstance
      .get(`/fposupplier/ProductDetailsAddGetDelUpdate`, {
        params: { product_id: id },
      })
      .then((res) => setData(res.data.data[0]))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    setProductType(data?.fk_productype_id);
    setValue("productName", data?.productName);
    setValue("productDescription", data?.productDescription);
    setValue("unit_price", data?.prices[0]?.unit_price);
    setValue("purchase_price", data?.prices[0]?.purchase_price);
    setValue("discount", data?.prices[0]?.discount);
    setValue("final_price", data?.prices[0]?.final_price_unit);
    setValue("measurement_unit", data?.measurement_unit);
    setValue("quantity", data?.quantity);
    setValue("Category", data?.Category);
    setValue("composition", data?.composition);
    setValue("manufacturerName", data?.manufacturerName);
    setmType(data?.measurement_type);
    SetStatus(data?.selling_status);
    setCropsId(data?.crop_id);
    setVarietyId(data?.variety);
  }, [data, setValue]);

  const renderErrorMessage = (error: FieldError | any) => {
    return error ? (
      <p className="text-sm text-destructive">{error.message}</p>
    ) : null;
  };

  return (
      <Card className="min-h-screen rounded p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-12">
            <div className="col-span-12 p-4 md:col-span-8">
              <h1 className="p-3 text-xl font-bold">Edit Products</h1>
              <div className="flex flex-col">
                <div className="flex flex-row items-center justify-between gap-4 p-2">
                  <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
                    Product Name <span className="text-destructive">*</span>
                  </div>
                  <div className="w-[350px]">
                    <Input
                      {...register("productName", {
                        required: "Product name is required",
                      })}
                      placeholder="Product name"
                    />
                    {renderErrorMessage(errors.productName)}
                  </div>
                </div>
                <div className="flex flex-row items-start justify-between gap-4 p-2">
                  <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
                    Description
                  </div>
                  <Textarea
                    {...register("productDescription")}
                    placeholder="Description"
                    className="w-[350px]"
                  />
                </div>
                {productType === 2 && (
                  <>
                    <div className="flex flex-row items-center justify-between gap-4 p-2">
                      <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
                        Crop Type
                      </div>
                      <Controller
                        name="fk_crops_id"
                        control={control}
                        render={({ field }) => (
                          <Select
                            onValueChange={(e: any) => {
                              field.onChange(e);
                              setCropsId(e);
                            }}
                            value={field.value || cropsId}
                          >
                            <SelectTrigger className="w-[350px]">
                              <SelectValue placeholder="Select Crop Type" />
                            </SelectTrigger>
                            <SelectContent>
                              {crops?.map((crop: any) => (
                                <SelectItem
                                  key={crop.id}
                                  value={crop.crop_id.toString()}
                                >
                                  {crop.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>
                    <div className="flex flex-row items-center justify-between gap-4 p-2">
                      <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
                        Variety Type
                      </div>
                      <Controller
                        name="fk_variety_id"
                        control={control}
                        render={({ field }) => (
                          <Select
                            onValueChange={(e: any) => {
                              field.onChange(e);
                              setVarietyId(e);
                            }}
                            value={field.value || varietyId}
                          >
                            <SelectTrigger className="w-[350px]">
                              <SelectValue placeholder="Select Variety Type" />
                            </SelectTrigger>
                            <SelectContent>
                              {variety?.map((crop: any) => (
                                <SelectItem
                                  key={crop.id}
                                  value={crop.variety_id.toString()}
                                >
                                  {crop.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>
                  </>
                )}
                {productType !== 2 && (
                  <>
                    <div className="flex flex-row items-center justify-between gap-4 p-2">
                      <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
                        Composition
                      </div>
                      <Input
                        {...register("composition")}
                        placeholder="composition"
                        className="w-[350px]"
                      />
                    </div>
                    <div className="flex flex-row items-center justify-between gap-4 p-2">
                      <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
                        Manufacturer Name
                      </div>
                      <Input
                        {...register("manufacturerName")}
                        placeholder="Manufacturer Name"
                        className="w-[350px]"
                      />
                    </div>
                  </>
                )}
                <div className="flex flex-row items-center justify-between gap-4 p-2">
                  <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
                    Unit Price <span className="text-destructive">*</span>
                  </div>
                  <div className="w-[350px]">
                    <Input
                      {...register("unit_price", {
                        required: "Unit price is required",
                        pattern: {
                          value: /^\d+(\.\d{1,2})?$/,
                          message: "Invalid price format",
                        },
                      })}
                      placeholder="Selling Price"
                    />
                    {renderErrorMessage(errors.unit_price)}
                  </div>
                </div>

                <div className="flex flex-row items-center justify-between gap-4 p-2">
                  <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
                    Purchase price
                  </div>
                  <Input
                    {...register("purchase_price")}
                    placeholder="Purchase Price"
                    className="w-[350px]"
                  />
                </div>
                <div className="flex flex-row items-center justify-between gap-4 p-2">
                  <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
                    discount
                  </div>
                  <Input
                    {...register("discount")}
                    placeholder="Price"
                    className="w-[350px]"
                  />
                </div>
                <div className="flex flex-row items-center justify-between gap-4 p-2">
                  <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
                    Final Price
                  </div>
                  <Input
                    {...register("final_price")}
                    placeholder=" Final Price"
                    className="w-[350px]"
                  />
                </div>
                <div className="flex flex-row items-center justify-between gap-4 p-2">
                  <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
                    Measurement Unit
                  </div>
                  <Input
                    {...register("measurement_unit")}
                    placeholder="Measurement Unit"
                    className="w-[350px]"
                  />
                </div>
                <div className="flex flex-row items-center justify-between gap-4 p-2">
                  <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
                    Quantity
                  </div>
                  <Input
                    {...register("quantity")}
                    placeholder="Quantity"
                    className="w-[350px]"
                  />
                </div>
                <div className="flex flex-row items-center justify-between gap-4 p-2">
                  <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
                    Measurement Type
                  </div>
                  <Controller
                    name="measurement_type"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={(e: any) => {
                          field.onChange(e);
                          setmType(e);
                        }}
                        value={field.value || mType}
                      >
                        <SelectTrigger className="w-[350px]">
                          <SelectValue placeholder="Select Measurement Type" />
                        </SelectTrigger>
                        <SelectContent>
                        {measurement?.map((m: any) => (
                            <SelectItem
                              key={m.measurement_id}
                              value={m?.measurement_id?.toString()}
                            >
                              {m.description}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div className="flex flex-row items-center justify-between gap-4 p-2">
                  <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
                    Selling Status
                  </div>
                  <Controller
                    name="selling_status"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={(e: any) => {
                          field.onChange(e);
                          SetStatus(e);
                        }}
                        value={field.value || status}
                      >
                        <SelectTrigger className="w-[350px]">
                          <SelectValue placeholder="Select Selling Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Online">Online</SelectItem>
                          <SelectItem value="Offline">Offline</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div className="flex flex-row items-center justify-between gap-4 p-2">
                  <div className="font-roboto text-left text-base font-medium leading-6 tracking-wide">
                    Category
                  </div>
                  <Input
                    {...register("Category")}
                    placeholder="Category"
                    className="w-[350px]"
                  />
                </div>

                <div className="flex flex-row">
                  <div className="w-[580px]" />
                  <Button type="submit" className="rounded">
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
  );
}

export default EditProduct;
