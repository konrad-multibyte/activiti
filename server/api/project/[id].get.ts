import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";

export default defineEventHandler(async (event) => {
    // @ts-ignore
    const { id } = event.context.params;
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
        const project = await client.db(config.mongoDb).collection("projects").findOne( {_id: new ObjectId(id) });
        return { project };
    }
    finally {
        await client.close();
    }
});