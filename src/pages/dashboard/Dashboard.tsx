import React, { useEffect, useState } from "react";
import Layout from "../../layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { Area, AreaChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../components/ui/chart";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";
import axiosInstance from "../../service/AxiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import axios from "axios";
import { BASE_URL_APP } from "../../utils";
import { LinearProgress } from "@mui/material";

function Dashboard() {
  const [data, setData] = useState<any>([]);
  const [data2, setData2] = useState<any>([]);
  const [data3, setData3] = useState<any>([]);
  const [data4, setData4] = useState<any>([]);
  const [data5, setData5] = useState<any>([]);

  const [filter, setFilter] = useState<string>("Online");
  const [filter2, setFilter2] = useState<string>("Online");
  const [filter3, setFilter3] = useState<string>("all");
  const [filter4, setFilter4] = useState<number>(1);
  const [filter5, setFilter5] = useState<string>("Online");

  useEffect(() => {
    axiosInstance
      .get(`/fposupplier/InventoryInoutStock`, {
        params: { filter_type: filter, status: "instock" },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  }, [filter]);

  useEffect(() => {
    axiosInstance
      .get(`/fposupplier/InventoryInoutStock`, {
        params: { filter_type: filter2, status: "outstock" },
      })
      .then((res) => {
        setData2(res.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  }, [filter2]);

  useEffect(() => {
    axiosInstance
      .get(`/fposupplier/CheckBuyerisFarmerorNot`, {
        params: { filter_type: filter3 },
      })
      .then((res) => {
        setData3(res.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  }, [filter3]);

  useEffect(() => {
    axiosInstance
      .get(`/fposupplier/MonthlySales`, {
        params: { filter_type: filter4 },
      })
      .then((res) => {
        setData4(res.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  }, [filter4]);

  useEffect(() => {
    axiosInstance
      .get(`/fposupplier/TotalSales`, {
        params: { filter_type: filter4, sales_status: filter5 },
      })
      .then((res) => {
        setData5(res.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  }, [filter4, filter5]);

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "green",
    },
  } satisfies ChartConfig;
  // const chartData = [
  //   { month: "January", desktop: 186 },
  //   { month: "February", desktop: 305 },
  //   { month: "March", desktop: 237 },
  //   { month: "April", desktop: 73 },
  //   { month: "May", desktop: 209 },
  //   { month: "June", desktop: 214 },
  // ];
  function processApiData(apiResponse: any) {
    // Create an object to hold the total amount for each month
    const monthlyTotals: any = {};

    // Process each sale
    apiResponse?.forEach((sale: any) => {
      // Parse the date
      const date = new Date(sale.sales_date);
      // Get the month name
      const monthName = date.toLocaleString("default", { month: "long" });

      // If this month doesn't exist in our totals yet, initialize it
      if (!monthlyTotals[monthName]) {
        monthlyTotals[monthName] = 0;
      }

      // Add this sale's amount to the month's total
      monthlyTotals[monthName] += sale.total_amount;
    });

    // Convert the monthlyTotals object into an array of objects
    const chartData = Object.entries(monthlyTotals).map(
      ([month, total]: any) => ({
        month: month,
        desktop: Math.round(total), // Rounding to whole numbers, remove if you want decimals
      }),
    );

    return chartData;
  }

  const chartData = processApiData(data4);

  const [dataa, setDataa] = useState<any>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigae = useNavigate();
  const lan = useAppSelector((state) => state.lan.lan);

  useEffect(() => {
    axiosInstance
      .get(`/fposupplier/GetallFPOGovtSchemes`)
      .then((r) => {
        if (r.data.status === "success") {
          setDataa(r.data.schemes);
        } else {
          toast.error("Something went wrong");
        }
      })
      .catch((r) => {
        console.log(r);
        toast.error(r.message);
      });
  }, [lan]);

  const handleSearchChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = dataa.filter((item: any) =>
    item.scheme_name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const truncateText = (text: any, wordLimit: any) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  return (
    <>
    
      <div className="relative grid grid-cols-1 md:grid-cols-12">
        <div className="col-span-12 md:col-span-8">
          <div className="space-y-2 bg-gray-100 p-4">
            <h1 className="text-2xl font-bold">
              Business Performance Dashboard
            </h1>
            <Card>
              <CardHeader className="flex justify-between">
                <div>
                  <CardTitle>Sales Insights</CardTitle>

                  <CardDescription className="flex flex-row items-center justify-between py-2">
                    <Tabs defaultValue="account">
                      <TabsList>
                        <TabsTrigger
                          onClick={() => setFilter4(1)}
                          value="account"
                        >
                          Agricultural Inputs
                        </TabsTrigger>
                        <TabsTrigger
                          onClick={() => setFilter4(2)}
                          value="password"
                        >
                          Crops
                        </TabsTrigger>
                        <TabsTrigger onClick={() => setFilter4(3)} value="regt">
                          Finished Product
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                    <Tabs defaultValue="account" className="my-2">
                      <TabsList>
                        <TabsTrigger
                          value="account"
                          onClick={() => setFilter5("Online")}
                        >
                          Online
                        </TabsTrigger>
                        <TabsTrigger
                          value="password"
                          onClick={() => setFilter5("Offline")}
                        >
                          Offline
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="flex items-center space-x-2">
                    <PackageIcon className="h-5 w-5 text-yellow-500" />
                    <div>
                      <p className="text-sm font-medium">Total Sales</p>
                      <p className="text-lg font-bold">
                        {data5?.sales_count} (Units)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSignIcon className="h-5 w-5 text-purple-500" />
                    <div>
                      <p className="text-sm font-medium">Total Sales Amount</p>
                      <p className="text-lg font-bold">
                        ₹{data5?.total_sales_amount}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <PieChartIcon className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="text-sm font-medium">Total Profit</p>
                      <p className="text-lg font-bold">
                        ₹{data5?.total_profit}
                      </p>
                    </div>
                  </div>
                </div>
                <CardContent>
                  {data4.length ? (
                    <>
                      <ChartContainer config={chartConfig}>
                        <AreaChart
                          accessibilityLayer
                          data={chartData}
                          margin={{
                            left: 12,
                            right: 12,
                          }}
                        >
                          <CartesianGrid vertical={false} />
                          <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                          />
                          <YAxis aria-activ />

                          <ChartTooltip
                            cursor={true}
                            content={<ChartTooltipContent indicator="line" />}
                          />
                          <Area
                            dataKey="desktop"
                            type="natural"
                            fill="var(--color-desktop)"
                            fillOpacity={0.2}
                            stroke="var(--color-desktop)"
                          />
                        </AreaChart>
                      </ChartContainer>
                    </>
                  ) : (
                    <div className="flex h-40 flex-row items-center justify-center">
                      <h1 className="text-2xl font-bold">No Sale Data</h1>
                    </div>
                  )}
                </CardContent>

              </CardContent>
            </Card>
            <div
              className="grid gap-6 md:grid-cols-2"
              style={{ marginTop: "35px" }}
            >
              <Card>
                <CardHeader className="flex justify-between pb-1 pt-4">
                  <div>
                    <CardTitle>In Stock</CardTitle>
                    <CardDescription>
                      <Tabs defaultValue="account" className="my-2">
                        <TabsList>
                          <TabsTrigger
                            value="account"
                            onClick={() => setFilter("Online")}
                          >
                            Online
                          </TabsTrigger>
                          <TabsTrigger
                            value="password"
                            onClick={() => setFilter("Offline")}
                          >
                            Ofline
                          </TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="h-[170px] overflow-y-auto">
                  {data?.inventory?.map((item: any) => (
                    <>
                      <div className="flex justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            {item.productname}
                          </p>
                          <p className="font-medium">{item.stock}</p>
                        </div>
                        <div>
                          <p className="text-right text-sm text-muted-foreground">
                            Ex. Date
                          </p>
                          <p className="font-medium">{item.expiry_date}</p>
                        </div>
                      </div>
                    </>
                  ))}
                </CardContent>
                <CardFooter className="mt-8 flex justify-between  pt-2">
                  <div className="flex items-center space-x-2">
                    <PackageIcon className="h-5 w-5 text-blue-500" />
                    <p className="text-sm font-medium">
                      {data?.total_inventory}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Total Stock In
                  </p>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="flex justify-between pb-1 pt-4">
                  <div>
                    <CardTitle>Out Stock</CardTitle>
                    <CardDescription>
                      <Tabs defaultValue="account" className="my-2">
                        <TabsList>
                          <TabsTrigger
                            value="account"
                            onClick={() => setFilter2("Online")}
                          >
                            Online
                          </TabsTrigger>
                          <TabsTrigger
                            value="password"
                            onClick={() => setFilter2("Offline")}
                          >
                            Ofline
                          </TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="h-[170px] overflow-y-auto">
                  {data2?.inventory?.map((item: any) => (
                    <>
                      <div className="flex justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            {item.productname}
                          </p>
                          <p className="font-medium">{item.stock}</p>
                        </div>
                        <div>
                          <p className="text-right text-sm text-muted-foreground">
                            Ex. Date
                          </p>
                          <p className="font-medium">{item.expiry_date}</p>
                        </div>
                      </div>
                    </>
                  ))}
                </CardContent>
                <CardFooter className="mt-8 flex justify-between  pt-2">
                  <div className="flex items-center space-x-2">
                    <PackageIcon className="h-5 w-5 text-blue-500" />
                    <p className="text-sm font-medium">
                      {data2?.total_inventory}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Total Stock In
                  </p>
                </CardFooter>
              </Card>
            </div>
            <Card className="relative w-full" style={{ marginTop: "35px" }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-bold">
                  Total Farmers
                </CardTitle>
                <Tabs defaultValue="account" className="my-2">
                  <TabsList>
                    <TabsTrigger
                      value="account"
                      onClick={() => setFilter3("all")}
                    >
                      All
                    </TabsTrigger>
                    <TabsTrigger
                      value="password"
                      onClick={() => setFilter3("active")}
                    >
                      Active
                    </TabsTrigger>
                    <TabsTrigger
                      value="passwords"
                      onClick={() => setFilter3("inactive")}
                    >
                      Inactive
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex items-baseline space-x-2">
                  <div className="text-3xl font-bold">{data3?.count}</div>
                  <div className="text-sm text-gray-500">
                    Farmers Registered
                  </div>
                </div>
                <div className="grid h-[200px] grid-cols-2 gap-4 overflow-auto">
                  {data3?.farmers?.map((farmer: any, index: any) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src="/placeholder-avatar.jpg"
                          alt={farmer.name}
                        />
                        <AvatarFallback>
                          {farmer?.buyer_name?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium">
                          {farmer?.buyer_name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {farmer?.mobile_no}
                        </div>
                        <div className="mt-1 flex items-center space-x-1">
                          <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                          <span className="text-xs text-green-500">
                            Actively Selling
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
             
            </Card>
          </div>
        </div>
        <div className="col-span-12 p-4 md:col-span-4 ">
          <div className="rounded-sm bg-white p-6 shadow-md md:mt-10">
            <div className="font-bitter pb-2 text-right text-[25px] font-medium leading-[41.99px] tracking-[0.25px]">
              Most Viewed Schemes
            </div>
            <div className="h-[250px] overflow-auto bg-white p-4">
              {filteredData.map((item: any, index: number) => {
                return (
                  <div
                    key={index}
                    className="mt-1 flex flex-row gap-2 rounded border-b border-gray-300 pb-2 hover:cursor-pointer hover:shadow-lg"
                    onClick={() => {
                      navigae(`/dashboard/governmentSchemes/${item.scheme_id}`);
                    }}
                  >
                    <img
                      src={`${BASE_URL_APP}${item.scheme_image}`}
                      className="m-1 rounded"
                      width={50}
                    />
                    <div>
                      <div className="font-roboto text-left text-[13px] text-base font-semibold leading-5 tracking-[0.15px]">
                        {item.scheme_name}
                      </div>
                      <div className="font-roboto text-left text-[10px] text-base font-normal leading-4 tracking-[0.15px] text-[#64748B]">
                        {truncateText(item.details, 5)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="rounded-sm bg-white p-6 shadow-md md:mt-10">
            <div className="font-bitter mt-4 pb-2 text-right text-[25px] font-medium leading-[41.99px] tracking-[0.25px]">
              Recent Updates
            </div>
            <div className="h-[250px] overflow-auto rounded bg-white p-4">
              {filteredData.map((item: any, index: number) => {
                return (
                  <div
                    key={index}
                    className="mt-1 flex flex-row gap-2 rounded border-b border-gray-300 pb-2 hover:cursor-pointer hover:shadow-lg"
                    onClick={() => {
                      navigae(`/dashboard/governmentSchemes/${item.scheme_id}`);
                    }}
                  >
                    <img
                      src={`${BASE_URL_APP}${item.scheme_image}`}
                      className="m-1 rounded"
                      width={50}
                    />
                    <div>
                      <div className="font-roboto text-left text-[13px] text-base font-semibold leading-5 tracking-[0.15px]">
                        {item.scheme_name}
                      </div>
                      <div className="font-roboto text-left text-[10px] text-base font-normal leading-4 tracking-[0.15px] text-[#64748B]">
                        {truncateText(item.details, 5)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;

function DollarSignIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function LinechartChart(props: any) {
  return (
    <div {...props}>
      <ChartContainer
        config={{
          desktop: {
            label: "Desktop",
            color: "#a49d9d",
          },
        }}
      >
        <LineChart
          accessibilityLayer
          data={[
            { month: "January", desktop: 186 },
            { month: "February", desktop: 305 },
            { month: "March", desktop: 237 },
            { month: "April", desktop: 73 },
            { month: "May", desktop: 209 },
            { month: "June", desktop: 214 },
          ]}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Line
            dataKey="desktop"
            type="natural"
            stroke="var(--color-desktop)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}

function PackageIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}

function PieChartIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
      <path d="M22 12A10 10 0 0 0 12 2v10z" />
    </svg>
  );
}

function UsersIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function XIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
