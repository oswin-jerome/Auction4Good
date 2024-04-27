import { auth } from "@/app/api/auth/[...nextauth]/route";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import React from "react";

export default async function CreateAuctionPage() {
  return (
    <div className="">
      <form action="" className="grid gap-4">
        <div className="input">
          <Label>Title</Label>
          <TextField.Root size={"3"}></TextField.Root>
        </div>
        <div className="input">
          <Label>Description</Label>
          <TextArea></TextArea>
        </div>
        <div className="input">
          <Label>Starting Big Price</Label>
          <TextField.Root size={"3"} type="number"></TextField.Root>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="input">
            <Label>Bid Start Date</Label>
            <TextField.Root type="date" size={"3"}></TextField.Root>
          </div>{" "}
          <div className="input">
            <Label>Bid End Date</Label>
            <TextField.Root type="date" size={"3"}></TextField.Root>
          </div>
          <div className="flex justify-center col-span-2 mt-8">
            <Button className="cursor-pointer">Create</Button>
          </div>
        </div>
      </form>
    </div>
  );
}
