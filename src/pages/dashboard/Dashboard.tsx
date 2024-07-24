import React from 'react'
import Layout from '../../layout'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar'
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../../components/ui/chart'

function Dashboard() {
  return (
    <Layout><div className="p-6 space-y-6 bg-gray-100">
    <h1 className="text-2xl font-bold">Business Performance Dashboard</h1>
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader className="flex justify-between">
          <div>
            <CardTitle>In Stock</CardTitle>
            <CardDescription className="text-green-500">ONLINE</CardDescription>
          </div>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="This Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Item Name</p>
              <p className="font-medium">Item 1</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Date</p>
              <p className="font-medium">01/01/2023</p>
            </div>
          </div>
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Item Name</p>
              <p className="font-medium">Item 2</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Date</p>
              <p className="font-medium">01/02/2023</p>
            </div>
          </div>
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Item Name</p>
              <p className="font-medium">Item 3</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Date</p>
              <p className="font-medium">01/03/2023</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex items-center space-x-2">
            <PackageIcon className="w-5 h-5 text-blue-500" />
            <p className="text-sm font-medium">10293</p>
          </div>
          <p className="text-sm text-muted-foreground">Total Stock Out</p>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader className="flex justify-between">
          <div>
            <CardTitle>Out Stock</CardTitle>
            <CardDescription className="text-red-500">OFFLINE</CardDescription>
          </div>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="This Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Item Name</p>
              <p className="font-medium">Item 1</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Date</p>
              <p className="font-medium">01/01/2023</p>
            </div>
          </div>
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Item Name</p>
              <p className="font-medium">Item 2</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Date</p>
              <p className="font-medium">01/02/2023</p>
            </div>
          </div>
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Item Name</p>
              <p className="font-medium">Item 3</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Date</p>
              <p className="font-medium">01/03/2023</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex items-center space-x-2">
            <PackageIcon className="w-5 h-5 text-orange-500" />
            <p className="text-sm font-medium">10293</p>
          </div>
          <p className="text-sm text-muted-foreground">Total Stock Out</p>
        </CardFooter>
      </Card>
    </div>
    <Card>
      <CardHeader className="flex justify-between">
        <div>
          <CardTitle>Total Farmers</CardTitle>
          <CardDescription className="text-green-500">Activity Selling</CardDescription>
        </div>
        <div className="flex items-center space-x-2">
          <UsersIcon className="w-5 h-5 text-blue-500" />
          <p className="text-sm font-medium">10293</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>U1</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">User 1</p>
            <p className="text-sm text-muted-foreground">Activity Selling</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>U2</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">User 2</p>
            <p className="text-sm text-muted-foreground">Activity Selling</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>U3</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">User 3</p>
            <p className="text-sm text-muted-foreground">Activity Selling</p>
          </div>
        </div>
      </CardContent>
    </Card>
    <Card>
      <CardHeader className="flex justify-between">
        <div>
          <CardTitle>Sales Insights</CardTitle>
          <CardDescription className="text-green-500">ONLINE</CardDescription>
        </div>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="This Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="this-year">This Year</SelectItem>
            <SelectItem value="last-year">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex items-center space-x-2">
            <PackageIcon className="w-5 h-5 text-yellow-500" />
            <div>
              <p className="text-sm font-medium">Total Sales</p>
              <p className="text-lg font-bold">2340 (Units)</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <DollarSignIcon className="w-5 h-5 text-purple-500" />
            <div>
              <p className="text-sm font-medium">Total Sales Amount</p>
              <p className="text-lg font-bold">₹102,933</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <PieChartIcon className="w-5 h-5 text-green-500" />
            <div>
              <p className="text-sm font-medium">Total Profit</p>
              <p className="text-lg font-bold">₹8,996</p>
            </div>
          </div>
        </div>
        <LinechartChart className="w-full aspect-[4/3]" />
      </CardContent>
    </Card>
  </div></Layout>
  )
}

export default Dashboard



function DollarSignIcon(props:any) {
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
  )
}


function LinechartChart(props:any) {
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
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Line dataKey="desktop" type="natural" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
        </LineChart>
      </ChartContainer>
    </div>
  )
}


function PackageIcon(props:any) {
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
  )
}


function PieChartIcon(props:any) {
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
  )
}


function UsersIcon(props:any) {
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
  )
}


function XIcon(props:any) {
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
  )
}