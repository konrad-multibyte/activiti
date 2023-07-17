<template>
    <form @submit.prevent="sendFile" action="" enctype="multipart/form-data">
        <div class="field">
            <label for="project">Upload Project</label>
            <input
                type="file"
                name="file"
                ref="file"
                id="project" 
                @change="selectFile">
        </div>
        <div class="field">
            <button class="button button-primar">Upload</button>
        </div>
    </form>
</template>

<script>
    export default {
        name: "ProjectUpload",

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
                    await $fetch("/api/project", {
                        method: "post",
                        body: formData
                    });
                } catch(error) {
                    console.log(error);
                }
            }
        }
    }
</script>