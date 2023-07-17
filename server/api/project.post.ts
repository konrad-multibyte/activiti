import { writeFile } from "fs"
import { join } from "path";
import { MongoClient, ServerApiVersion } from "mongodb";

export default defineEventHandler(async (event) => {
    const files = await readMultipartFormData(event);
    const config = useRuntimeConfig(event);
    const client = new MongoClient(config.mongodb, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });
    if (files !== undefined) {
        for (let file of files) {
            const metadata = {
                filename: file.filename,
                name: file.name,
                type: file.type
            }
            try {
                await client.connect();
                await client.db("activiti").collection("projects").insertOne(metadata);
            } finally {
                await client.close();
            }
            writeFile(join(".", "uploads", "file"), file.data, () => { console.log("Written to disk.") });
        }
    }
    return { files };
})
