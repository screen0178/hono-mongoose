import { Hono } from "hono";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { cors } from "hono/cors";

import connectDB from "./config/db";
import { errorHandler, notFound } from "./middlewares";
import v1 from "./routes/v1.routes";

// Initialize the Hono app
const app = new Hono();

// Config MongoDB
connectDB();

// Initialize middlewares
app.use("*", logger(), prettyJSON());

// Cors
app.use(
  "*",
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// Home Route
app.get("/", (c) => c.text("Welcome to the API!"));
app.route("/api", v1);

// Error Handler
app.onError((err, c) => {
  const error = errorHandler(c);
  return error;
});

// Not Found Handler
app.notFound((c) => {
  const error = notFound(c);
  return error;
});

const port = Bun.env.PORT || 8000;

export default {
  port,
  fetch: app.fetch,
};
