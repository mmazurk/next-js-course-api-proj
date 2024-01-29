import { MongoClient } from "mongodb";

async function handler(req, res) {
  const client = await MongoClient.connect(
    process.env.MONGODB_CONNECTION_STRING
  );
  const db = client.db("events");

  if (req.method === "POST") {
    const eventId = req.query.eventId;
    const { email, name, text } = req.body;
    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      return;
    }

    const newComment = {
      id: new Date().toISOString(),
      eventId: eventId,
      email,
      name,
      text,
    };
    const response = await db.collection("comments").insertOne(newComment);
    console.log(response);

    res.status(201).json({ message: "success", newComment: newComment });
  }

  if (req.method === "GET") {
    const comments = await db
      .collection("comments")
      .find()
      .sort({ _id: -1 })
      .toArray();
    res.status(200).json({ comments: comments });
  }

  client.close();
}

export default handler;
