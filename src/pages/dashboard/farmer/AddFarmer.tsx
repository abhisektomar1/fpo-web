import React, { useState } from "react";
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
import { axiosInstance } from "../../../service/AxiosInstance";

function AddFarmer() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<any>();

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    console.log(data);

    try {
      axiosInstance.post("/Add_FarmerbyFpo", {
        ...data,
      });
      toast("Product details added successfully");
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
        <DialogTrigger asChild>
          <Button className="rounded">Add Farmer</Button>
        </DialogTrigger>
        <DialogContent className="h-[300px]">
          <DialogHeader>
            <DialogTitle>Add Farmer</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>

            <DialogDescription>

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
            </DialogDescription>
            <Button className="w-full rounded" type="submit">
              {" "}
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Add farmer
            </Button>
      </form>
            
          </DialogHeader>
        </DialogContent>
    </Dialog>
  );
}

export default AddFarmer;
