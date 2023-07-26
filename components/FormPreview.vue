<template>
  <h2>Preview</h2>
  <button v-show="isVisible" class="button button-primary" @click="isVisible = false">
    Hide
  </button>
  <button v-show="!isVisible" class="button button-primary" @click="isVisible = true">
    Show
  </button>
  <div v-show="isVisible" class="form-preview">
    <ul v-if="form.editorJson.tabs.length > 0" class="form-preview-tabs">
      <li
        v-for="tab in form.editorJson.tabs"
        :id="`${tab.id}`"
        :key="tab"
        v-bind="tab.title"
        class="form-preview-tab"
        href="#"
        :data-tab-id="`${tab.id}`"
        @click="selectTab"
      >
        {{ tab.title }}
      </li>
    </ul>
  </div>
  <div v-show="isVisible" class="form-preview-representation">
    <div v-for="field in form.editorJson.fields" :key="field">
      <div v-if="field.tab">
        <div v-if="field.tab === selectedTabId">
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
      <div v-show="isVisible" v-else>
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
</template>

<script>
import Form from '../types/Form'
export default {
    name: 'FormPreview',
    props: {
        form: {
            type: Form,
            required: true
        }
    },
    data () {
        return {
            isVisible: false,
            selectedTabId: 'tab1'
        }
    },
    methods: {
        selectTab (event) {
            if (event.target != null && event.target instanceof Element) {
                document.getElementById(this.selectedTabId).classList.remove('active')
                this.selectedTabId = event.target.getAttribute('data-tab-id')
                event.target.classList.add('active')
            }
        }
    }
}
</script>
