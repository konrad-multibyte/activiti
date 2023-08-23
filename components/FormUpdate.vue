<template>
  <button class="button button-primary" onclick="updateForm.showModal()">
    Update Form
  </button>
  <!-- <div class="dialog"> -->
  <dialog id="updateForm">
    <div class="dialog">
      <div class="dialog-head">
        <p class="dialog-title">
          Update form
        </p>
        <svg
          class="dialog-close"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 16"
          onclick="updateForm.close()"
        >
          <path
            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </div>
      <form action="" enctype="multipart/form-data" :data-form-id="formId" class="form" @submit.prevent="sendFile">
        <div class="field">
          <input
            id="form"
            ref="file"
            class="form-file-picker field"
            type="file"
            name="file"
            accept="application/json"
            required
            @change="selectFile"
          >
        </div>
        <div class="field">
          <button type="submit" class="button button-primary" onclick="updateForm.close()">
            Update Form
          </button>
        </div>
      </form>
    </div>
  </dialog>
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
