<template>
    <form @submit.prevent="sendFile" action="" enctype="multipart/form-data">
        <div class="field">
            <label for="app">Upload app</label>
            <input type="file" accept="application/json" name="file" ref="file" id="form" required @change="selectFile">
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
                await $fetch("/api/form", {
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