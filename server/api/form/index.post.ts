import { MongoClient, ServerApiVersion } from "mongodb";
import Form from "../../../types/Form"

export default defineEventHandler(async (event) => {
    const uploadfiles = await readMultipartFormData(event);
    const config = useRuntimeConfig(event);

    if (uploadfiles !== undefined) {
        const client = new MongoClient(config.mongoUri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });
        let files = []
        for (let file of uploadfiles) {
            if (file.type === "application/json") {
                try {
                    const form = JSON.parse(file.data.toString())  
                    await client.connect();
                    const result = await client.db(config.mongoDb).collection<Form>("forms").insertOne(form)
                    files.push(result);
                } catch(error) {
                    console.log(error);
                } finally {
                    await client.close();
                }
            }
        }
        return { files }
    }
    else {
        throw createError({ statusCode: 400, statusMessage: "Bad Request", message: "The payload is not provided. Please provide multipart form data." })
    }
});