import { Button } from "@/src/components/ui/button";
import TransitionLink from "@/src/components/ui/TransitionLink";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { Plus } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import RoomList from "./RoomList";
import Pagination from "@/src/components/features/Pagination";

type Props = {
  page: number;
};

const History = async ({ page }: Props) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const { userId } = await auth();

  if (!userId) {
    redirect("/signin");
  }

  const client = await clerkClient();
  const user = await client.users.getUser(userId);

  const headerList = await headers();

  const res = await fetch(`${baseUrl}/api/userRoomList?page=${page}&limit=6`, {
    method: "GET",
    headers: {
      cookie: headerList.get("cookie") || "",
    },
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    return <div>Failed to load</div>;
  }

  const userRoomList = data.result || [];

  return (
    <div className="p-6 lg:p-10">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-xl">Hello, {user?.fullName}</h2>

        <TransitionLink href="/dashboard/create-new">
          <Button>
            <Plus />
            Redesign Room
          </Button>
        </TransitionLink>
      </div>

      <div className="py-10">
        <h2 className="font-medium text-lg text-primary mb-10">
          AI Room Studio
        </h2>

        <RoomList userRoomList={userRoomList} />

        <Pagination
          currentPage={page}
          totalPages={data.pagination.totalPages}
        />
      </div>
    </div>
  );
};

export default History;
