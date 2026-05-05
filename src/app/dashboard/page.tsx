import React, { Suspense } from "react";
import History from "./_components/History";
import Loading from "./_components/Loading";
import { Container } from "@/src/components/layout/Container";

const DashboardPage = () => {
  return (
    <Container>
      <Suspense fallback={<Loading />}>
        <History />
      </Suspense>
    </Container>
  );
};

export default DashboardPage;
