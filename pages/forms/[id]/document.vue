<template>
  <div>
    <div class="form-preview-representation">
      <div v-for="field in form.editorJson.fields" :key="field">
        <div v-if="field.tab">
          <h4>{{ field.name }}</h4>
          <p>class: {{ field.className }}</p>
          <div v-if="field.fieldType === 'ContainerRepresentation'">
            <div v-for="childFieldCollection in field.fields" :key="childFieldCollection">
              <div v-if="childFieldCollection.length > 0">
                <div v-for="childField in childFieldCollection" :key="childField">
                  <p>
                    {{ childField }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <h4>{{ field.name }}</h4>
          <p>class: {{ field.className }}</p>
          <div v-if="field.fieldType === 'ContainerRepresentation'">
            <div v-for="childFieldCollection in field.fields" :key="childFieldCollection">
              <div v-if="childFieldCollection.length > 0">
                <div v-for="childField in childFieldCollection" :key="childField">
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

<script setup lang="ts">
const route = useRoute()
const { data: form } = useFetch(`/api/form/${route.params.id}`,
    {
        key: 'getForm',
        method: 'GET'
    })

</script>
