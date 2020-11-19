import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const packages = await db
    .collection("SecureSECO-collection")
    .find({})
    .sort({ trustScore: -1 })
    .limit(20)
    .toArray();

  res.json(packages);
};