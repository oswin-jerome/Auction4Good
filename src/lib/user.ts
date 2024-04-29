import { auth } from "@/auth";
import { db } from "./db";

export const getSessionUser = async () => {
  const session = await auth();
  if (!session?.user) {
    return null;
  }
  const user = db.user.findUnique({
    where: {
      id: session?.user.user_id,
    },
  });

  return user;
};
