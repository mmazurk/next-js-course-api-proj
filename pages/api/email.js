function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;
    console.log(email);
    res.status(201).json({ message: "You did it!", email: email });
  } else {
    res
      .status(200)
      .json({ message: "You sent a GET request to a POST route." });
  }
}

export default handler;
