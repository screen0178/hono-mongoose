import { Hono } from "hono";

import Auth from "../module/auth";
import Users from "../module/user";

const v1 = new Hono().basePath("/v1");

// User
v1.route("/auth", Auth);
v1.route("/users", Users);

export default v1;
