import { Hono } from "hono";
import User from "../user/model";
import { genToken } from "../../utils";

const auth = new Hono();

// Login User
auth.post("/login", async (c) => {
  const { email, password } = await c.req.json();

  // Check for existing user
  if (!email || !password) {
    c.status(400);
    throw new Error("Please provide an email and password");
  }

  const user = await User.findOne({ email });
  if (!user) {
    c.status(401);
    throw new Error("No user found with this email");
  }

  if (!(await user.mathPassword(password))) {
    c.status(401);
    throw new Error("Invalid credentials");
  } else {
    const token = await genToken(user._id.toString());

    return c.json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      token,
      message: "User logged in successfully",
    });
  }
});

export default auth;
