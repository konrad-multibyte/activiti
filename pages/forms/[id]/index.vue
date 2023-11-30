<!-- eslint-disable vue/require-v-for-key -->
<template>
  <main class="responsive">
    <div v-bind="form">
      <h1 class="form-header">
        {{ form.data.name }}
      </h1>
      <p v-if="form.data.description != null || form.data.description != ''" class="from-description">
        {{ form.data.description }}
      </p>
      <div class="form-action-buttons">
        <a href="/forms/">
          <button class="form-action-button button button-danger" :data-form-id="`${form.id}`" @click="deleteForm">
            Remove
          </button>
        </a>
        <FormUpdate :form-id="form.id" />
        <a :href="`/api/form/${form.id}`">
          <button class="form-action-button button button-primary">
            View Raw
          </button>
        </a>
      </div>
      <FormPreview :form="form.data" />
    </div>
  </main>
</template>

<script setup lang='ts'>
const route = useRoute()
const { data: form } = useFetch(`/api/form/${route.params.id}`,
    {
        key: 'getForm',
        method: 'GET'
    })
console.log(form.data)
async function deleteForm (event: MouseEvent) {
    if (event.target != null && event.target instanceof Element) {
        const formId = event.target.getAttribute('data-form-id')
        await fetch(`/api/form/${formId}`, { method: 'DELETE' })
    }
}
</script>
