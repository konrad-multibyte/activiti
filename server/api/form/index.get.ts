import { MongoClient, ServerApiVersion } from "mongodb";
import Form  from "../../../types/Form"

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
        const forms = await client.db(config.mongoDb).collection("forms").find<Form>({}).toArray();
        return forms;
    } catch (error) {
        console.log(error);
    } finally {
        await client.close();
    }
});