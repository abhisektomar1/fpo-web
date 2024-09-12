import { Skeleton } from "./ui/skeleton";

export default function DashboardSkeleton() {
  return (
    <div className="w-full space-y-6 p-4">
      <Skeleton className="h-10 w-full max-w-2xl bg-white" />
      <div className="relative grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-8">
          <div className="space-y-6">
            <Skeleton className="h-8 w-2/3 bg-white" />
            {/* <div className="flex space-x-4">
              <Skeleton className="h-10 w-32 bg-white" />
              <Skeleton className="h-10 w-32 bg-white" />
              <Skeleton className="h-10 w-32 bg-white" />
            </div> */}
            <div className="flex justify-between">
              <Skeleton className="h-8 w-32 bg-white" />
              <Skeleton className="h-8 w-32 bg-white" />
            </div>
            <Skeleton className="h-64 w-full bg-white" />
            <div className="space-y-3">
              <Skeleton className="h-6 w-full bg-white" />
              <Skeleton className="h-6 w-full bg-white" />
              <Skeleton className="h-6 w-3/4 bg-white" />
            </div>
           
          </div>
        </div>
        <div className="col-span-12 p-4 md:col-span-4 mt-[-60px]">
          <div className="space-y-6">
            <Skeleton className="h-8 w-1/2 bg-white" />
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="flex-grow space-y-3">
                    <Skeleton className="h-6 w-full max-w-md bg-white" />
                    <Skeleton className="h-4 w-2/3 bg-white" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6 mt-8">
            <Skeleton className="h-8 w-1/2 bg-white" />
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="flex-grow space-y-3">
                    <Skeleton className="h-6 w-full max-w-md bg-white" />
                    <Skeleton className="h-4 w-2/3 bg-white" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-8"></div>
    </div>
  );
}
