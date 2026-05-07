import React, { Suspense } from "react";
import History from "./_components/History";
import Loading from "./_components/Loading";
import { Container } from "@/src/components/layout/Container";
import DashboardSkeleton from "./_components/DashboardSkeleton";

type Props = {
  searchParams: Promise<{
    page?: string;
  }>;
};

const DashboardPage = async ({ searchParams }: Props) => {
  const params = await searchParams;
  return (
    <Container>
      <Suspense fallback={<DashboardSkeleton />}>
        <History page={Number(params.page) || 1} />
      </Suspense>
    </Container>
  );
};

export default DashboardPage;
