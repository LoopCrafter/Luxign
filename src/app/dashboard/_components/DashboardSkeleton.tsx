const DashboardSkeleton = () => {
  return (
    <div className="p-6 lg:p-10 space-y-10">
      <div className="flex justify-between items-center">
        <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />

        <div className="h-10 w-40 bg-gray-200 rounded-lg animate-pulse" />
      </div>

      <div>
        <div className="h-5 w-40 bg-gray-200 rounded mb-10 animate-pulse" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="w-full rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm"
            >
              <div className="w-full h-[180px] bg-gray-200 animate-pulse" />

              <div className="p-3 space-y-3">
                <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
                <div className="h-3 w-1/2 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
