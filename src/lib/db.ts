import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI as string);
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  if (!(global as any)._mongoClientPromise) {
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  clientPromise = client.connect();
}

export async function connectToDatabase() {
  try {
    const client = await clientPromise;
    console.log("Connected to Database successfully!");
    return client.db(process.env.MONGODB_DB);
  } catch (error) {
    console.error("Database connection failed. Exiting now...");
    console.error(error);
    process.exit(1);
  }
}
