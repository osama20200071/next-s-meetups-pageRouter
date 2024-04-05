import { MongoClient } from "mongodb";

export async function dbConnection() {
  const client = await MongoClient.connect(process.env.CONNECTION_STRING);
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  return { meetupsCollection, client };
}
