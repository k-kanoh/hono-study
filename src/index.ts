import { Hono } from "hono";
import post from "./post";
import { basicAuth } from "hono/basic-auth";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.use(
  "/posts",
  basicAuth({
    username: "hono",
    password: "hono",
  })
);

app.use(
  "/post/*",
  basicAuth({
    username: "hono",
    password: "hono",
  })
);

app.route("/", post);

export default app;
