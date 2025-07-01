import ApprovedProvider from "@/components/Admin/ApprovedProvider";
import PendingProvider from "@/components/Admin/PendingProvider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

const page = () => {
  return (
    <div className="p-4 w-full">
      <h2 className="text-xl font-semibold mb-4">Manage Service Providers</h2>
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="w-full rounded-none h-fit">
          <TabsTrigger value="pending" className="rounded-none text-base">Pending Service Providers</TabsTrigger>
          <TabsTrigger value="approved" className="rounded-none text-base">Approved Service Providers</TabsTrigger>
        </TabsList>
        <TabsContent value="pending">
          <PendingProvider />
        </TabsContent>
        <TabsContent value="approved">
          <ApprovedProvider />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
