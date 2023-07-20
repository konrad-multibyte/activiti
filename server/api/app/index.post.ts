import { MongoClient, ServerApiVersion } from "mongodb";
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";

export default defineEventHandler(async (event) => {
    const uploadfiles = await readMultipartFormData(event);
    const config = useRuntimeConfig(event);
    if (uploadfiles !== undefined) {
        if (!("filename" in uploadfiles[0])) {
            throw createError({ statusCode: 400, statusMessage: "Bad Request", message: "The payload is not specified."  })
        }
        const client = new MongoClient(config.mongoUri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });
        let files = [];
        try {
            await client.connect();
            for (let file of uploadfiles) {
                try {
                    const id = randomUUID();
                    const key = `${id}.${file.filename?.split(".")[file.filename.split(".").length - 1]}`
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
                            Key: key,
                            Body: file.data
                        }
                    }).done();
                    if (response instanceof Object && "ETag" in response) {
                        const metadata = {
                            id: id,
                            key: key,
                            filename: file.filename,
                            name: file.name,
                            type: file.type,
                            etag: response.ETag,
                            bucket: response.Bucket,
                            location: response.Location
                        };
                        await client.db(config.mongoDb).collection("apps").insertOne(metadata);
                        files.push(metadata);
                    } else {
                        console.log("Upload failed." + response)
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            return { files }
        } finally {
            await client.close();
        }
    }
    
})
