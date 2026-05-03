import React, { Suspense } from "react";
import History from "./_components/History";
import Loading from "./_components/Loading";

const DashboardPage = () => {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <History />
      </Suspense>
    </div>
  );
};

export default DashboardPage;
