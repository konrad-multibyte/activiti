import { writeFile } from "fs"
import { join } from "path";
import { MongoClient, ServerApiVersion } from "mongodb";
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client, CompleteMultipartUploadCommandOutput } from "@aws-sdk/client-s3";

export default defineEventHandler(async (event) => {
    const files = await readMultipartFormData(event);
    const config = useRuntimeConfig(event);
    if (files !== undefined) {
        const client = new MongoClient(config.mongoUri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });
        try {
            await client.connect();
            for (let file of files) {
                const metadata = {
                    filename: file.filename,
                    name: file.name,
                    type: file.type
                };
                try {
                    const response = await new Upload({
                        client: new S3Client({
                            endpoint: config.s3Uri,
                            credentials: {
                                accessKeyId: config.s3Key,
                                secretAccessKey: config.s3AccessKey
                            },
                            region: config.s3Region
                        }),
                        params: {
                            Bucket: config.s3Bucket,
                            Key: file.filename,
                            Body: file.data
                        }
                    }).done();
                    if (response instanceof Object && "ETag" in response) {
                        const metadata = {
                            filename: file.filename,
                            name: file.name,
                            type: file.type,
                            etag: response.ETag,
                            bucket: response.Bucket,
                            location: response.Location
                        };
                        await client.db(config.mongoDb).collection("projects").insertOne(metadata);
                    } else {
                        console.log("Upload failed." + response)
                    }

                } catch (error) {
                    console.log(error);
                }
                writeFile(join(".", "uploads", "file"), file.data, () => { console.log("Written to disk.") });
            }
        } finally {
            await client.close();
        }
    }
    return { files };
})
