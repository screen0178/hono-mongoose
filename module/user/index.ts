import { Hono } from "hono";
import { isAdmin, protect } from "../../middlewares";
import User from "./model";
import { genToken } from "../../utils";

const users = new Hono();

// Create User
users.post("/", async (c) => {
  const { name, email, password } = await c.req.json();

  const userExists = await User.findOne({ email });
  if (userExists) {
    c.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (!user) {
    c.status(400);
    throw new Error("Invalid user data");
  }

  const token = await genToken(user._id.toString());

  c.status(201);
  return c.json({
    success: true,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    token,
    message: "User created successfully",
  });
});

// Get All Users
users.get("/", protect, isAdmin, async (c) => {
  const users = await User.find();

  return c.json({ users });
});

// Get Single User
users.get("/:id", async (c) => {
  const { id } = c.req.param();
  const user = await User.findById(id);

  if (!user) {
    c.status(404);
    throw new Error(`User with id ${id} not found`);
  }

  return c.json({
    success: true,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    message: "User retrieved",
  });
});

// Edit Single User
users.put("/:id", async (c) => {
  const { id } = c.req.param();
  const user = await User.findById(id);
  const { name, email, isAdmin } = await c.req.json();

  if (!user) {
    c.status(404);
    throw new Error(`User with id ${id} not found`);
  }

  user.updateOne();
  user.name = name;
  user.email = email;
  user.isAdmin = isAdmin;

  // Save the updated user document
  await user.save();

  return c.json({
    success: true,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    message: "User updated",
  });
});

// Delete Single User
users.delete("/:id", async (c) => {
  const { id } = c.req.param();
  const user = await User.findById(id);

  if (!user) {
    c.status(404);
    throw new Error(`User with id ${id} not found`);
  }

  await user.deleteOne();

  return c.json({
    success: true,
    data: null,
    message: "User deleted",
  });
});

export default users;
