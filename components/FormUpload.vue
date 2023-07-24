<template>
  <form action="" enctype="multipart/form-data" @submit.prevent="sendFile">
    <div class="field">
      <label for="app">Upload app</label>
      <input
        id="form"
        ref="file"
        type="file"
        accept="application/json"
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
            const formData = new FormData()
            formData.append('file', this.file)
            try {
                await $fetch('/api/form', {
                    method: 'post',
                    body: formData
                })
            } catch (error) {
                console.log(error)
            }
            refreshNuxtData('getFormsForFormDisplay')
        }
    }
}
</script>
