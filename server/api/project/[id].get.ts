export default defineEventHandler(async (event) => {
    const { filename } = event.context.params;
    console.log(filename);
});