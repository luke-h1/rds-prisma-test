import express from "express";
import { db } from "./db";


const main = async () => {

const app = express();

app.listen(3005, () => {
  console.log("Server is running on port 3005");
})

app.get("/api/health", (req, res) => {
  return res.status(200).json({
    message: "Server is running",
  });
});

app.post("/api/post", async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      message: "Missing title or content",
    });
  }

  await db.post.create({
    data: {
      title,
      content,
    },
  });

  return res.status(200).json({
    message: "Post created",
  });
});
}

main().catch(e => console.error(e))