<template>
    <form @submit.prevent="sendFile" action="" enctype="multipart/form-data">
        <div class="field">
            <label for="app">Upload app</label>
            <input type="file" accept="application/zip, application/octet-stream, application/x-zip-compressed, multipart/x-zip" name="file" ref="file" id="app" required @change="selectFile">
        </div>
        <div class="field">
            <button class="button button-primar">Upload</button>
        </div>
    </form>
</template>

<script>
export default {
    name: "appUpload",

    data() {
        return {
            file: ""
        };
    },

    methods: {
        selectFile() {
            this.file = this.$refs.file.files[0];
        },
        async sendFile() {
            const formData = new FormData();
            formData.append("file", this.file);
            try {
                await $fetch("/api/app", {
                    method: "post",
                    body: formData
                });
            } catch (error) {
                console.log(error);
            }
            refreshNuxtData();
        }
    }
}
</script>