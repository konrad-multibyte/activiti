<template>
  <form action="" enctype="multipart/form-data" @submit.prevent="sendFile">
    <div class="field">
      <label for="app">Upload Document</label>
      <input
        id="app"
        ref="file"
        type="file"
        name="file"
        required
        @change="selectFile"
      >
    </div>
    <div class="field">
      <button class="button button-primary">
        Upload
      </button>
    </div>
  </form>
</template>

<script>
export default {
    name: 'AppUpload',
    data () {
        return {
            file: ''
        }
    },
    methods: {
        selectFile () {
            this.file = this.$refs.file.files[0]
        },
        async sendFile () {
            const documentTemplateData = new FormData()
            documentTemplateData.append('file', this.file)
            try {
                await $fetch('/api/template', {
                    method: 'post',
                    body: documentTemplateData
                })
            } catch (error) {
                console.log(error)
            }
            refreshNuxtData()
        }
    }
}
</script>
