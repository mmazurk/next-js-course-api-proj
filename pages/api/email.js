import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;

    if (!email || email.trim() === "" || !email.includes("@")) {
      res.status(422).json({ message: "Invalid email address." });
      return;
    }

    const client = await MongoClient.connect(
      process.env.MONGODB_CONNECTION_STRING
    );
    const db = client.db("newsletter");
    await db.collection("emails").insertOne({ email: email });
    client.close();
    res.status(201).json({ message: "Success" });
  } else {
    res
      .status(200)
      .json({ message: "You sent a GET request to a POST route." });
  }
}

export default handler;
