"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import React from "react";

function CreateForm({ minBid }: { minBid: BigInt }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Place a Bid</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Place your bid</SheetTitle>
          <SheetDescription>Your bid amount cannot be lesser than minimum bid or the top bid amount</SheetDescription>
          <form>
            <div className="input mt-8">
              <Label>Amount</Label>
              <Input min={minBid.toString()} type="number" defaultValue={minBid.toString()}></Input>
              {/* <ErrorMessage error={errors.image?.message?.toString()} /> */}
            </div>
            <Button className="mt-4 w-full">Place Bid</Button>
          </form>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export default CreateForm;
