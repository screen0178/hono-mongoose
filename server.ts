import { Hono } from "hono";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { cors } from "hono/cors";
import { swaggerUI } from "@hono/swagger-ui";

import connectDB from "./config/db";
import { errorHandler, notFound } from "./middlewares";
import v1 from "./routes/v1.routes";
import spec from "./openapi.txt";

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
app.get("/", (c) => c.json({ status: "API server is ready" }));
app.route("/api", v1);
app.get("/ui", swaggerUI({ url: "/doc" }));
app.get("/doc", (c) => c.text(spec));

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
