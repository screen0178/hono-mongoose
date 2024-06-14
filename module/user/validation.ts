import { z } from "zod";
import mongoose from "mongoose";

export const userSchema = z.object({
  _id: z.string().refine((val) => {
    return mongoose.Types.ObjectId.isValid(val);
  }),
  username: z.string(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  verified: z.boolean(),
});

export const createUser = userSchema.omit({ _id: true, verified: true });

export const updateUser = userSchema
  .omit({ _id: true, password: true })
  .partial();
