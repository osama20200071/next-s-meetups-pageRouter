import { dbConnection } from "@/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { client, meetupsCollection } = await dbConnection();
    const result = await meetupsCollection.insertOne(req.body);
    client.close();

    res.status(201).json({ message: "done", data: result });
  }
}
