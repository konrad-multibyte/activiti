<template>
  <div class="create-form">
    <form
      v-show="activitiForm == null"
      id="createForm"
      action=""
      method="get"
      class="form"
      @submit.prevent="createForm"
    >
      <div class="form-field">
        <label for="formName">Form Name</label>
        <input id="formName" class="form-control" type="text" name="formName">
      </div>
      <div class="form-field">
        <button class="button button-primary" type="submit">
          Create
        </button>
      </div>
    </form>
    <div :key="activitiForm" v-bind="activitiForm">
      <button class="button button-primary" @click="copyFormJson">
        Copy JSON
      </button>
      <h1>{{ activitiForm.name }}</h1>
      <div class="activiti-tabs">
        <h2>Tabs</h2>
        <div class="activiti-tabs-display">
          <ul :key="activitiForm.formDefinition.tabs" class="form-preview-tabs">
            <li
              v-for="tab in activitiForm.formDefinition.tabs"
              :id="tab.id"
              :key="tab.id"
              class="form-preview-tab"
              href="#"
              :data-tab-id="tab.id"
              :data-tab-title="tab.title"
              @click="selectTab"
            >
              {{ tab.title }}
            </li>
          </ul>
        </div>
        <button v-show="!addTabFormVisible" class="button button-primary" @click="addTabFormVisible = ref(true)">
          Add Tabs
        </button>
        <div v-show="addTabFormVisible">
          <form id="addTabForm" action="#" class="form" @submit.prevent="addTabFormSumbit">
            <div class="form-field">
              <label for="tabCsvTable">Tab TSV Table</label>
              <textarea id="tabCsvTable" class="form-control" name="tabCsv" />
            </div>
            <div class="form-field">
              <button type="submit" class="form-field button button-primary" @click="addTabFormVisible = ref(false)">
                Add Tabs
              </button>
            </div>
          </form>
        </div>
        <div class="activiti-fields">
          <button v-show="selectedTabId != null && !addFieldsToAllTabsVisible" class="button button-primary" @click="addFieldsToAllTabsVisible = ref(true)">
            add containers to all tabs
          </button>
          <form v-show="addFieldsToAllTabsVisible" id="addTabForm" action="#" class="form" @submit.prevent="addFieldToAllTabs">
            <div class="form-field">
              <label for="fieldCsvTable">Field CSV Table</label>
              <textarea id="fieldCsvTable" class="form-control" name="fieldCsv" />
            </div>
            <div class="form-field">
              <button type="submit" class="form-field button button-primary" @click="addFieldsToAllTabsVisible = ref(false)">
                Add Containers
              </button>
            </div>
          </form>
          <button v-show="selectedTabId != null && !addFieldToTabVisible" id="addContainerToTab" class="button button-primary" @click="addFieldToTabVisible = ref(true)">
            Add containers to "{{ selectedTabTitle }}" tab
          </button>
          <form v-show="addFieldToTabVisible" id="addTabForm" action="#" class="form" @submit.prevent="addFieldToTab">
            <div class="form-field">
              <label for="fieldCsvTable">Field CSV Table</label>
              <textarea id="fieldCsvTable" class="form-control" name="fieldCsv" />
            </div>
            <div class="form-field">
              <button type="submit" class="form-field button button-primary" @click="addFieldToTabVisible = ref(false)">
                Add Containers
              </button>
            </div>
          </form>
          <div v-for="field of activitiForm.formDefinition.fields" :key="field.id">
            <div v-if="field.tab">
              <div v-if="field.tab === selectedTabId">
                <div v-if="field.fieldType === 'ContainerRepresentation'">
                  <h4>{{ field.fieldType }}: {{ field.name }}</h4>
                  <p>id: {{ field.id }}</p>
                  <p>class: {{ field.className }}</p>
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
                  <div class="container-representation-buttons">
                    <button v-show="selectedTabId != null && !addFieldsToContainerVisible" class="button button-primary" @click="addFieldsToContainerVisible = ref(true)">
                      add fields to "{{ field.name }}" container
                    </button>
                    <form v-show="addFieldsToContainerVisible" id="addTabForm" action="#" class="form" @submit.prevent="addFieldsToContainer">
                      <div class="form-field hidden">
                        <input id="containerId" class="form-control" name="containerId" :value="activitiForm.formDefinition.fields.indexOf(field)" readonly>
                      </div>
                      <div class="form-field">
                        <label for="fieldCsvTable">Field CSV Table</label>
                        <textarea id="fieldCsvTable" class="form-control" name="fieldCsv" />
                      </div>
                      <div class="form-field">
                        <button type="submit" class="form-field button button-primary" @click="addFieldsToContainerVisible = ref(false)">
                          add fields
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <h4>{{ field.name }}</h4>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Form, { Tab, Field, FieldLayout, ContainerRepresentation } from '../../../types/Form'
export default {
    name: 'CreateForm',
    data () {
        return {
            activitiForm: ref(new Form('New form')),
            activitiFormUpdate: ref(0),
            activitiTabsUpdate: ref(0),
            addTabFormVisible: ref(false),
            addFieldToTabVisible: ref(false),
            addFieldsToAllTabsVisible: ref(false),
            addFieldsToContainerVisible: ref(false),
            selectedTabId: ref(null),
            selectedTabTitle: ref(null)
        }
    },
    watch: {
        selectedTabTitle: function (_oldValue, newValue) {
            document.getElementById('addContainerToTab').innerText = `Add containers to ${newValue} tab`
        }
    },
    methods: {
        parseCsv (csvString) {
            const table = csvString.split('\n')
            const header = table.shift().trim().split('\t')
            const objects = []
            for (const row of table) {
                if (row.trim() !== '') {
                    const obj = {}
                    const cells = row.trim().split('\t')
                    for (let i = 0; i < header.length; i++) {
                        obj[header[i]] = cells[i] ? cells[i] : undefined
                    }
                    objects.push(obj)
                }
            }
            objects.forEach((obj) => {
                if (obj.options != null) {
                    obj.options = JSON.parse(obj.options)
                }
                if (obj.params != null) {
                    obj.params = JSON.parse(obj.params)
                }
                if (obj.layout != null) {
                    obj.layout = new FieldLayout(JSON.parse(obj.layout))
                }
                if (obj.visibilityCondition != null) {
                    obj.visibilityCondition = JSON.parse(obj.visibilityCondition)
                }
            })
            return objects
        },
        createForm (submitEvent) {
            console.log('create')
            this.activitiForm = new Form(submitEvent.target.elements.formName.value)
            this.activitiFormUpdate += 1
        },
        addTabFormSumbit (submitEvent) {
            const table = submitEvent.target.elements.tabCsv.value.split('\n')
            const header = table.shift().trim().split('\t')
            for (const row of table) {
                if (row.trim() !== '') {
                    const obj = {}
                    const cells = row.trim().split('\t')
                    for (let i = 0; i < header.length; i++) {
                        obj[header[i]] = cells[i] ? cells[i] : undefined
                    }
                    this.activitiForm.formDefinition.tabs.push(new Tab(obj.title))
                }
            }
            this.selectedTabId = this.activitiForm.formDefinition.tabs[0].id
            this.selectedTabTitle = this.activitiForm.formDefinition.tabs[0].title
            document.getElementById(this.selectedTabId).classList.add('active')
        },
        selectTab (clickEvent) {
            if (clickEvent.target != null && clickEvent.target instanceof Element) {
                document.getElementById(this.selectedTabId).classList.remove('active')
                this.selectedTabId = clickEvent.target.getAttribute('data-tab-id')
                this.selectedTabTitle = clickEvent.target.getAttribute('data-tab-title')
                clickEvent.target.classList.add('active')
            }
        },
        copyFormJson (clickEvent) {
            if (clickEvent.target != null && clickEvent.target instanceof Element) {
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(
                        JSON.stringify(
                            this.activitiForm,
                            (_key, value) => { return value === undefined ? null : value })
                    )
                    const buttonText = clickEvent.target.innerText
                    clickEvent.target.innerText = '💣 🌾 🎡 🎢 🔥 🎆 🧨 🎭 👑'.split(' ')[Math.floor(Math.random() * 8)]
                    setTimeout(() => {
                        clickEvent.target.innerText = buttonText
                    }, 500)
                }
            }
        },
        addFieldToTab (submitEvent) {
            const objects = this.parseCsv(submitEvent.target.elements.fieldCsv.value)
            objects.forEach((obj) => { obj.tab = this.selectedTabId })
            for (const obj of objects) {
                this.activitiForm.formDefinition.fields.push(new ContainerRepresentation(obj))
            }
            console.log(objects)
        },
        addFieldToAllTabs (submitEvent) {
            const objects = this.parseCsv(submitEvent.target.elements.fieldCsv.value)
            for (const obj of objects) {
                this.activitiForm.formDefinition.fields.push(new ContainerRepresentation(obj))
            }
            console.log(objects)
        },
        addFieldsToContainer (submitEvent) {
            const objects = this.parseCsv(submitEvent.target.elements.fieldCsv.value)
            const containerId = submitEvent.target.elements.containerId.value
            for (const obj of objects) {
                this.activitiForm.formDefinition.fields[containerId].fields['1'].push(new Field(obj))
            }
            console.log(this.activitiForm)
        }
    }
}
</script>
