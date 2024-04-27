import { z } from "zod";

export const registerUserSchema = z.object({
  first_name: z.string().min(1, "Required"),
  last_name: z.string().min(1, "Required"),
  email: z.string().email(),
  password: z.string().min(5),
  phone: z.string().length(10, "Enter a valid phone number"),
});

export const createAuctionSchema = z.object({
  title: z.string().min(5),
  description: z.string().min(25),
  start_date: z.date(),
  end_date: z.date(),
  starting_bid_price: z.number().min(100, "Starting Bid amount should be minimum of Rs. 100"),
});
