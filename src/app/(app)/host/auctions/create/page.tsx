"use client";

import { createAuction } from "@/actions/auction";
import ErrorMessage from "@/components/ErrorMessage";
import { Label } from "@/components/ui/label";
import { createAuctionSchema } from "@/zod/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { Button, Callout, TextArea, TextField, ThickCheckIcon } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { z } from "zod";

type RegisterData = z.infer<typeof createAuctionSchema>;
export default function CreateAuctionPage() {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<RegisterData>({
    resolver: zodResolver(createAuctionSchema),
  });
  return (
    <div className="">
      <form
        onSubmit={handleSubmit(async (data) => {
          const f = new FormData();
          f.set("image", data.image?.[0]);
          const res = await createAuction(
            {
              ...data,
              image: [
                {
                  size: data.image?.[0].size,
                  type: data.image?.[0].type,
                },
              ],
            },
            f
          );
          console.log(res);
          if (res.success) {
            reset();
          }
        })}
        className="grid gap-4"
      >
        <div className="input">
          <Label>Images</Label>
          <input {...register("image", {})} type="file"></input>
          <ErrorMessage error={errors.image?.message?.toString()} />
        </div>
        <div className="input">
          <Label>Title</Label>
          <TextField.Root {...register("title")} size={"3"}></TextField.Root>
          <ErrorMessage error={errors.title?.message} />
        </div>
        <div className="input">
          <Label>Description</Label>
          <TextArea {...register("description")}></TextArea>
          <ErrorMessage error={errors.description?.message} />
        </div>
        <div className="input">
          <Label>Starting Big Price</Label>
          <TextField.Root
            {...register("starting_bid_price", {
              valueAsNumber: true,
            })}
            size={"3"}
            type="number"
          ></TextField.Root>
          <ErrorMessage error={errors.starting_bid_price?.message} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="input">
            <Label>Bid Start Date</Label>
            <TextField.Root
              {...register("start_date", {
                valueAsDate: true,
              })}
              type="date"
              size={"3"}
            ></TextField.Root>
            <ErrorMessage error={errors.start_date?.message} />
          </div>{" "}
          <div className="input">
            <Label>Bid End Date</Label>
            <TextField.Root
              {...register("end_date", {
                valueAsDate: true,
              })}
              type="date"
              size={"3"}
            ></TextField.Root>
            <ErrorMessage error={errors.end_date?.message} />
          </div>
          {isSubmitSuccessful && (
            <Callout.Root size={"1"} className="col-span-2" color="grass">
              <Callout.Icon>
                <CheckCircledIcon />
              </Callout.Icon>
              <Callout.Text>Auction Created</Callout.Text>
            </Callout.Root>
          )}
          <div className="flex justify-center col-span-2 mt-8">
            <Button disabled={isSubmitting} className="cursor-pointer">
              Create
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
