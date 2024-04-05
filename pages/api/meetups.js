// import { dbConnection } from "@/db";

// export default async function handler(req, res) {
//   if (req.method === "GET") {
//     console.log("need all meetups...");
//     res.status(200).json({ message: "done" });
//     const client = await dbConnection();
//     const db = client.db();

//     const collection = db.collection();
//     const meetups = await collection.find();
//     console.log(meetups);

//     client.close();

//     res.status(200).json({ data: meetups });
//   }
// }
