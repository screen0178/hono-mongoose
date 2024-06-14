import { Document, Schema, model } from "mongoose";

interface IUser {
  name: string;
  username: string;
  email: string;
  password: string;
  verified: boolean;
}

export interface IUserDoc extends IUser, Document {
  comparePassword: (pass: string) => Promise<boolean>;
}

const userSchema = new Schema<IUserDoc>(
  {
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verified: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

// Match user entered password to hashed password in database
userSchema.methods.comparePassword = async function (enteredPassword: string) {
  return Bun.password.verifySync(enteredPassword, this.password);
};

// Hash password with Bun
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  // use bcrypt
  this.password = await Bun.password.hash(this.password, {
    algorithm: "bcrypt",
    cost: 4, // number between 4-31
  });
});

const User = model("User", userSchema);
export default User;
