import { Card } from "@radix-ui/themes";
import React from "react";

export default function HostDashboard() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Card>
        <h3 className="text-black font-bold text-5xl mb-1">5</h3>
        <p>Active Auctions</p>
      </Card>
      <Card>
        <h3 className="text-black font-bold text-5xl mb-1">40</h3>
        <p>Active Bids</p>
      </Card>
    </div>
  );
}
