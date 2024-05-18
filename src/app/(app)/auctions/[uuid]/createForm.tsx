"use client";

import { createAuction } from "@/actions/auction";
import { createBid } from "@/actions/bid";
import ErrorMessage from "@/components/ErrorMessage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

function CreateForm({ minBid, auctionId }: { minBid: BigInt; auctionId: string }) {
  const [open, setOpen] = useState(false);
  const addBidSchema = z.object({
    amount: z.number().min(Number(minBid), "Minimum Bid for this auctions is " + minBid),
  });

  type T = z.infer<typeof addBidSchema>;

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<T>({
    resolver: zodResolver(addBidSchema),
  });

  const router = useRouter();

  return (
    <Sheet
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
      }}
    >
      <SheetTrigger asChild>
        <Button
          onClick={() => {
            setOpen(true);
          }}
        >
          Place a Bid
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Place your bid</SheetTitle>
          <SheetDescription>Your bid amount cannot be lesser than minimum bid or the top bid amount</SheetDescription>
          <form
            onSubmit={handleSubmit(async (data) => {
              clearErrors();
              const bid = await createBid(auctionId, data);
              setOpen(false);
              router.refresh();
            })}
          >
            <div className="input mt-8">
              <Label>Amount</Label>
              <Input
                {...register("amount", {
                  valueAsNumber: true,
                })}
                type="number"
                defaultValue={minBid.toString()}
              ></Input>
              <ErrorMessage error={errors.amount?.message?.toString()} />
            </div>
            <Button className="mt-4 w-full">Place Bid</Button>
          </form>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export default CreateForm;
