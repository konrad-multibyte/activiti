import { MongoClient, ServerApiVersion } from "mongodb";

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event);
    const client = new MongoClient(config.mongoUri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });
    try {
        await client.connect();
        const projects = await client.db(config.mongoDb).collection("projects").find({}).toArray();
        return { projects };
    } catch (error) {
        console.log(error);
    } finally {
        await client.close();
    }
});