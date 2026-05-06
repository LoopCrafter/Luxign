import React, { Suspense } from "react";
import History from "./_components/History";
import Loading from "./_components/Loading";
import { Container } from "@/src/components/layout/Container";
import DashboardSkeleton from "./_components/DashboardSkeleton";

const DashboardPage = () => {
  return (
    <Container>
      <Suspense fallback={<DashboardSkeleton />}>
        <History />
      </Suspense>
    </Container>
  );
};

export default DashboardPage;
