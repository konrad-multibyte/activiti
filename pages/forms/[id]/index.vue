<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div v-bind="form">
    <h1 class="form-header">
      {{ form.name }}
    </h1>
    <p v-if="form.description != null || form.description != ''" class="from-description">
      {{ form.description }}
    </p>
    <div class="form-action-buttons">
      <a href="/forms/">
        <button class="form-action-button button button-danger" :data-form-id="`${form._id}`" @click="deleteForm">
          Remove
        </button>
      </a>
      <FormUpdate :form-id="form._id" />
      <a :href="`/api/form/${form._id}`">
        <button class="form-action-button button button-primary">
          View Raw
        </button>
      </a>
    </div>
    <FormPreview :form="form" />
  </div>
</template>

<script setup lang='ts'>
const route = useRoute()
const { data: form } = useFetch(`/api/form/${route.params.id}`,
    {
        key: 'getForm',
        method: 'GET'
    })

async function deleteForm (event: MouseEvent) {
    if (event.target != null && event.target instanceof Element) {
        const formId = event.target.getAttribute('data-form-id')
        await fetch(`/api/form/${formId}`, { method: 'DELETE' })
    }
}
</script>
