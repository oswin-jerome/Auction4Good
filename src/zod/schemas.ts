import { z } from "zod";

export const registerUserSchema = z.object({
  first_name: z.string().min(1, "Required"),
  last_name: z.string().min(1, "Required"),
  email: z.string().email(),
  password: z.string().min(5),
  phone: z.string().length(10, "Enter a valid phone number"),
});

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const ACCEPTED_IMAGE_TYPES = ["jpeg", "jpg", "png", "webp"];

export const createAuctionSchema = z.object({
  title: z.string().min(5),
  description: z.string().min(25),
  start_date: z.date(),
  end_date: z.date(),
  starting_bid_price: z.number().min(100, "Starting Bid amount should be minimum of Rs. 100"),
  image: z
    .any()
    .optional()
    .refine((files) => {
      return files?.length != 0;
    }, "Image is required")
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, "Image should be less than 5MB")
    .refine((files) => {
      return ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type);
    }, "Only .jpg, .jpeg, .png and .webp formats are supported."),
});
