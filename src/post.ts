import { Hono } from "hono";

const app = new Hono();

let sample = [
  { id: 1, content: "message 1" },
  { id: 2, content: "message 2" },
  { id: 3, content: "message 3" },
];

app.get("/posts", (c) => c.json(sample));

app.get("/post/:id", async (c) => {
  const id = +c.req.param("id");
  const target = sample.find((x) => x.id === id);

  if (!target) return c.text("not found", 404);

  return c.json(target);
});

app.post("/post", async (c) => {
  const { content } = await c.req.json();

  if (content) {
    const maxid = Math.max(...sample.map((x) => x.id));

    const newpost = { id: maxid + 1, content };
    sample = [...sample, newpost];
    return c.json(sample, 201);
  } else {
    return c.json({ errmsg: "content is empty" }, 400);
  }
});

app.put("/post/:id", async (c) => {
  const id = +c.req.param("id");
  const target = sample.find((x) => x.id === id);

  if (!target) return c.text("not found", 404);

  const { content } = await c.req.json();

  if (content) {
    target.content = content;
    return c.json(target, 200);
  } else {
    return c.json({ errmsg: "content is empty" }, 400);
  }
});

app.delete("/post/:id", async (c) => {
  const id = +c.req.param("id");
  const target = sample.find((x) => x.id === id);

  if (!target) return c.text("not found", 404);

  sample = sample.filter((x) => x.id !== id);

  return c.text("success", 200);
});

export default app;
