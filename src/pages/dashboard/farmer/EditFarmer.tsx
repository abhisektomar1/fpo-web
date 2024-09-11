import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Input } from "../../../components/ui/input";
import { Loader2 } from "lucide-react";
import axiosInstance from "../../../service/AxiosInstance";
import Layout from "../../../layout";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "../../../components/ui/card";

function EditFarmer() {
    const { id } = useParams()
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm<any>();
  useEffect(() => {
    axiosInstance
      .get(`/fposupplier/GetSingleFarmerDetailsbyFPO`,{
        params: {
        farmer_id:id
        },
      })
      .then((res) => {
        setData(res.data.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  useEffect(() => {
    if (data) {
        setValue('farmer_name', data.farmer_name);
        setValue('farmer_mobile', data.farmer_mobile);
        setValue('farmer_village', data.farmer_village);
        setValue('farmer_block', data.farmer_block);
        setValue('farmer_district', data.farmer_district);
      }
  } ,[data])

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
     await axiosInstance.put("/fposupplier/FarmerByFPO", {
        ...data,
        farmer_id:id
      });
      toast("Farmer Edited Successfully!!");
    navigate(`/dashboard/farmer`)

    } catch (error: any) {
      console.log(error);
      reset()
      toast.error(error.response.data.msg || "something went weong");
    } finally {
      setIsLoading(false);

    }
  };

  return (
 <div className="m-4 grid w-2/3 grid-cols-1 gap-4">
 <Card className="rounded border-none p-4 shadow-md">
          <h1>Edit Farmer</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-8 flex flex-col items-start justify-start">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-primary"
                >
                  Farmer Name
                </label>
                <Input
                  {...register("farmer_name", {
                    required: true,
                  })}
                />
                {errors.farmer_name && (
                  <p style={{ color: "#ff0000", fontSize: 12 }}>
                    Farmer Name is required
                  </p>
                )}
              </div>
              <div className="my-4 flex flex-col items-start justify-start">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-primary"
                >
                  Farmer Mobile No.
                </label>
                <Input
                  {...register("farmer_mobile", {
                    required: true,
                  })}
                />
                {errors.farmer_mobile && (
                  <p style={{ color: "#ff0000", fontSize: 12 }}>
                    Mobile No. is required
                  </p>
                )}
              </div>
              <div className="mt-8 flex flex-col items-start justify-start">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-primary"
                >
                  Farmer Village
                </label>
                <Input
                  {...register("farmer_village", {
                    required: true,
                  })}
                />
                {errors.farmer_village && (
                  <p style={{ color: "#ff0000", fontSize: 12 }}>
                    Farmer Village is required
                  </p>
                )}
              </div>{" "}
              <div className="mt-8 flex flex-col items-start justify-start">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-primary"
                >
                  Farmer Block
                </label>
                <Input
                  {...register("farmer_block", {
                    required: true,
                  })}
                />
                {errors.farmer_block && (
                  <p style={{ color: "#ff0000", fontSize: 12 }}>
                    Farmer Block is required
                  </p>
                )}
              </div>{" "}
              <div className="mt-8 flex flex-col items-start justify-start">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-primary"
                >
                District
                </label>
                <Input
                  {...register("farmer_district", {
                    required: true,
                  })}
                />
                {errors.farmer_district && (
                  <p style={{ color: "#ff0000", fontSize: 12 }}>
                    District is required 
                  </p>
                )}
              </div>
            <Button className="w-full rounded mt-2" type="submit">
              {" "}
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Edit farmer
            </Button>
          </form>
          </Card>
          </div>
  );
}

export default EditFarmer;
