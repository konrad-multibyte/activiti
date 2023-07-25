<template>
  <form action="" enctype="multipart/form-data" :data-form-id="formId" @submit.prevent="sendFile">
    <div class="field">
      <label for="app">Update form</label>
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
        Update
      </button>
    </div>
  </form>
</template>

<script>
export default {
    name: 'UpdateForm',
    props: {
        formId: {
            type: String,
            required: true
        }
    },
    data () {
        return {
            file: ''
        }
    },
    methods: {
        selectFile () {
            this.file = this.$refs.file.files[0]
        },
        async sendFile (event) {
            const formId = event.target.getAttribute('data-form-id')
            const formData = new FormData()
            formData.append('file', this.file)
            try {
                await $fetch(`/api/form/${formId}`, {
                    method: 'put',
                    body: formData
                })
            } catch (error) {
                console.log(error)
            }
            refreshNuxtData('getForm')
        }
    }
}
</script>
