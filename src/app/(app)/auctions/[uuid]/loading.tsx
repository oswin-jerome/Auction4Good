"use client";

import { Skeleton } from "@radix-ui/themes";

const Loading = () => {
  return (
    <div className="container">
      <div className="grid md:grid-cols-[500px,auto] gap-8">
        <Skeleton className="aspect-square object-cover rounded-3xl md:max-w-[500px]">b</Skeleton>
        <div>
          <Skeleton className="h-8" />
          <Skeleton className="h-4 mt-2" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
