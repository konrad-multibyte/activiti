<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div v-bind="form">
    <h1 class="form-header">
      {{ form.name }}
    </h1>
    <p v-if="form.description != null || form.description != ''" class="from-description">
      {{ form.description }}
    </p>
    <p v-if="form.description === ''" class="form-description-none">
      No description provided.
    </p>
    <div class="form-action-buttons">
      <a href="/forms/">
        <button class="form-action-button button button-danger" :data-form-id="`${form._id}`" @click="deleteForm">
          Remove
        </button>

      </a>
      <FormUpdate :form-id="form._id" />
    </div>
    <h2>Preview</h2>
    <div class="form-preview">
      <div v-if="form.editorJson.tabs.length > 0" class="form-preview-tabs">
        <a
          v-for="tab in form.editorJson.tabs"
          v-bind="tab.title"
          class="form-preview-tab"
          href="#"
          :data-tab-id="`${tab.id}`"
        >
          {{ tab.title }}
        </a>
      </div>
    </div>
    <div class="form-preview-representation">
      <div v-for="field in form.editorJson.fields">
        <div v-if="field.tab">
          <div v-if="field.tab === 'tab1'">
            <h4>{{ field.name }}</h4>
            <p>class: {{ field.className }}</p>
            <div v-if="field.fieldType === 'ContainerRepresentation'">
              <div v-for="childFieldCollection in field.fields">
                <div v-if="childFieldCollection.length > 0">
                  <div v-for="childField in childFieldCollection">
                    <p>
                      {{ childField }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <h4>{{ field.name }}</h4>
          <p>class: {{ field.className }}</p>
          <div v-if="field.fieldType === ' ContainerRepresentation'">
            <div v-for="childFieldCollection in field.fields">
              <div v-if="childFieldCollection.length > 0">
                <div v-for="childField in childFieldCollection">
                  <p>
                    {{ childField }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
