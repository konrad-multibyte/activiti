import { MongoClient, ObjectId } from "mongodb";
import Form from "../../../types/Form";

export default defineEventHandler(async (event) => {
    // @ts-ignore
    const { id } = event.context.params;
    const config = useRuntimeConfig(event);
    const client = new MongoClient(config.mongoUri, {
        serverApi: {
            version: "1",
            strict: true,
            deprecationErrors: true,
        }
    });
    try {
        await client.connect();
        const form = await client.db(config.mongoDb).collection<Form>("forms").findOne({ _id: new ObjectId(id) });
        return form;
    }
    finally {
        await client.close();
    }
});