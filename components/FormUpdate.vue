<template>
    <form @submit.prevent="sendFile" action="" enctype="multipart/form-data" :data-form-id="formId">
        <div class="field">
            <label for="app">Update form</label>
            <input type="file" accept="application/json" name="file" ref="file" id="form" required @change="selectFile">
        </div>
        <div class="field">
            <button class="button button-primary">Update</button>
        </div>
    </form>
</template>

<script>

export default {
    name: "updateForm",
    props: ["formId"],
    data() {
        return {
            file: ""
        };
    },

    methods: {
        selectFile() {
            this.file = this.$refs.file.files[0];
        },
        async sendFile(event) {
            const formId = event.target.getAttribute("data-form-id");
            console.log(formId)
            const formData = new FormData();
            formData.append("file", this.file);
            try {
                await $fetch(`/api/form/${formId}`, {
                    method: "put",
                    body: formData
                });
            } catch (error) {
                console.log(error);
            }
            refreshNuxtData("getForm");
        }
    }
}
</script>