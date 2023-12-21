import { MongoClient } from "mongodb";

async function handler(req, res) {
  const eventId = req.query.eventId;

  const client = await MongoClient.connect(
    process.env.MONGODB_CONNECTION_STRING
  );
  const db = client.db();
  const commentsCollection = db.collection("comments");

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

    const newComment = { id: new Date().toISOString(), email, name, text };
    res.status(201).json({ message: "success", newComment: newComment });
  }

  if (req.method === "GET") {
    const dummyList = [
      {
        id: "c1",
        email: "testemail1@email.com",
        name: "Max",
        text: "My first comment.",
      },
      {
        id: "c2",
        email: "testemail2@email.com",
        name: "Manuel",
        text: "My second comment",
      },
    ];
    res.status(200).json({ comments: dummyList });
  }

  client.close();
}

export default handler;
