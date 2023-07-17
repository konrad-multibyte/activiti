import { writeFile } from "fs"
import { join } from "path";

export default defineEventHandler(async (event) => {
    const files = await readMultipartFormData(event);
    console.log(files)
    if (files !== undefined) {
        for (let file of files) {
            writeFile(join(".", "uploads", "file"), file.data, () => { console.log("Written to disk.") });
        }
    }
    return { files };
})
