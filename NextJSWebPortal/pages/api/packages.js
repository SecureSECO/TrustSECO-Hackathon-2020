import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const packages = await db
    .collection("SecureSECO-collection")
    .find({})
    .sort()
    .limit(2000)
    .toArray();

  res.json(packages);
  // console.log(res.json(packages).length);
};
