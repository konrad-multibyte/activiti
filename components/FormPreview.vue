<template>
  <h2 class="">
    <img
      class="button-expand"
      src="~/assets/svg/arrowdown.svg"
      alt="Expand button"
      @click="expandPreview"
    >
    Preview
  </h2>
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
    <div v-for="field of form.editorJson.fields" :key="field">
      <div v-if="field.tab">
        <div v-if="field.tab === selectedTabId">
          <h3>{{ field.name }}</h3>
          <p>class: {{ field.className }}</p>
          <div v-if="field.fieldType === 'ContainerRepresentation'">
            <div v-for="childFieldCollection of field.fields" :key="childFieldCollection">
              <div v-if="childFieldCollection.length > 0">
                <div class="card-stack">
                  <div v-for="childField of childFieldCollection" :key="childField" class="card">
                    <img
                      class="button-expand"
                      src="~/assets/svg/arrowdown.svg"
                      alt="Expand button"
                      :data-field-id="`${childField.id}`"
                      @click="expandField"
                    >
                    <p class="header">
                      {{ childField.name == '' ? 'No label' : childField.name }}
                    </p>
                    <p>
                      ID: {{ childField.id }}
                    </p>
                    <p>
                      Type: {{ capitalize(childField.type.replaceAll('_', ' ').replaceAll('-', ' ')) }} ({{ childField.type }})
                    </p>
                    <p v-show="expandedFields.includes(childField.id)">
                      {{ childField }}
                    </p>
                  </div>
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
          <div class="quick-test-component">
            <button v-show="!isQuickTestFormVisible" class="button button-primary" @click="isQuickTestFormVisible = true">
              Quick Test
            </button>
            <form v-show="isQuickTestFormVisible" id="containerSpecForm" class="form" @submit.prevent="uploadForm()">
              <button type="submit" class="button button-primary" @click="isQuickTestFormVisible = false">
                Test
              </button>
              <button type="reset" class="button button-primary" @click="isQuickTestFormVisible = false">
                Abort
              </button>
              <textarea name="column" />
            </form>
          </div>
          <div v-for="childFieldCollection of field.fields" :key="childFieldCollection">
            <div v-if="childFieldCollection.length > 0">
              <div v-for="childField of childFieldCollection" :key="childField">
                <img
                  class="button-expand"
                  src="~/assets/svg/arrowdown.svg"
                  alt="Expand button"
                  :data-field-id="`${childField.id}`"
                  @click="expandField"
                >
                <p class="header">
                  {{ childField.name == '' ? 'No label' : childField.name }}
                </p>
                <p>
                  ID: {{ childField.id }}
                </p>
                <p>
                  Type: {{ capitalize(childField.type.replaceAll('_', ' ').replaceAll('-', ' ')) }} ({{ childField.type }})
                </p>
                <p v-show="expandedFields.includes(childField.id)">
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
import Form from '~/types/Form'
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
            isQuickTestFormVisible: false,
            selectedTabId: 'tab1',
            expandedFields: []
        }
    },
    methods: {
        selectTab (event) {
            if (event.target != null && event.target instanceof Element) {
                document.getElementById(this.selectedTabId).classList.remove('active')
                this.selectedTabId = event.target.getAttribute('data-tab-id')
                event.target.classList.add('active')
            }
        },
        capitalize (string, lower = false) {
            return (lower ? str.toLowerCase() : string).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase())
        },
        expandField (clickEvent) {
            if (clickEvent.target != null && clickEvent.target instanceof Element) {
                const selectedFieldId = clickEvent.target.getAttribute('data-field-id')
                if (this.expandedFields.includes(selectedFieldId)) {
                    const index = this.expandedFields.indexOf(selectedFieldId)
                    this.expandedFields.splice(index, 1)
                    clickEvent.target.classList.remove('rotate-90')
                    clickEvent.target.classList.add('rotate-90-reverse')
                } else {
                    this.expandedFields.push(selectedFieldId)
                    clickEvent.target.classList.remove('rotate-90-reverse')
                    clickEvent.target.classList.add('rotate-90')
                }
            }
        },
        expandPreview (clickEvent) {
            this.isVisible = !this.isVisible
            if (this.isVisible) {
                clickEvent.target.classList.remove('rotate-90-reverse')
                clickEvent.target.classList.add('rotate-90')
            } else {
                clickEvent.target.classList.remove('rotate-90')
                clickEvent.target.classList.add('rotate-90-reverse')
            }
        }
    }
}
</script>
