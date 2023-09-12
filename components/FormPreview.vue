<template>
  <h2>Preview</h2>
  <button v-show="isVisible" class="button button-primary" @click="isVisible = false">
    Hide
  </button>
  <button v-show="!isVisible" class="button button-primary" @click="isVisible = true">
    Show
  </button>
  <div v-show="isVisible" class="form-preview">
    <ul v-if="form.data.editorJson.tabs.length > 0" class="form-preview-tabs">
      <li
        v-for="tab in form.data.editorJson.tabs"
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
    <div v-for="field of form.data.editorJson.fields" :key="field">
      <div v-if="field.tab">
        <div v-if="field.tab === selectedTabId">
          <h4>{{ field.name }}</h4>
          <div class="quick-test-component">
            <dialog id="updateForm">
              <div class="dialog">
                <div class="dialog-head">
                  <p class="dialog-title">
                    Quick Test
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
                <div class="dialog-body">
                  <form v-show="isQuickTestFormVisible" id="containerSpecForm" class="form" @submit.prevent="quickTestSubmit()">
                    <button type="submit" class="button button-primary" @click="isQuickTestFormVisible = false">
                      Test
                    </button>
                    <button type="reset" class="button button-primary" @click="isQuickTestFormVisible = false">
                      Abort
                    </button>
                    <textarea name="column" />
                  </form>
                </div>
              </div>
            </dialog>
            <button v-show="!isQuickTestFormVisible" class="button button-primary" @click="isQuickTestFormVisible = true">
              Quick Test
            </button>
          </div>
          <p>class: {{ field.className }}</p>
          <div v-if="field.fieldType === 'ContainerRepresentation'">
            <div v-for="childFieldCollection of field.fields" :key="childFieldCollection">
              <div v-if="childFieldCollection.length > 0">
                <div v-for="childField of childFieldCollection" :key="childField">
                  <p>
                    ID: {{ childField.id }}
                  </p>
                  <p>
                    Label: {{ childField.name }}
                  </p>
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
                <p>
                  ID: {{ childField.id }}
                </p>
                <p>
                  Label: {{ childField.name }}
                </p>
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
            isQuickTestFormVisible: false,
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
