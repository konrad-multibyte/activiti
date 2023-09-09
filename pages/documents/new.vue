<template>
  <main class="responsive">
    <div class="cards">
      <button class="button button-primary" @click="isFormVisibleV1 = !isFormVisibleV1; isFormVisibleV2 = ref(false)">
        New V1 Section
      </button>
      <button class="button button-primary" @click="isFormVisibleV2 = !isFormVisibleV2; isFormVisibleV1 = ref(false)">
        New V2 Section
      </button>
      <div v-show="isFormVisibleV1" class="card">
        <h3>Add version 1 section</h3>
        <form class="form-flex-column" @submit.prevent="confluenceInput">
          <div class="form-input">
            <label for="headingText">Heading name</label>
            <input id="headingText" type="text" name="headingText" requred>
          </div>
          <div class="form-input">
            <label for="confluenceInput">
              Field table
            </label>
            <textarea id="confluenceInput" name="fieldTable" required />
            <small>
              Field table from Confluence
            </small>
          </div>
          <div class="form-input-group">
            <p class="form-input-header">
              Document Version
            </p>
            <div class="form-input-flex-row">
              <div class="form-input">
                <label for="documentVersion1">Version 1</label>
                <input id="documentVersion1" type="checkbox" name="v1">
              </div>
              <div class="form-input">
                <label for="documentVersion2">Version 2</label>
                <input id="documentVersion2" type="checkbox" name="v2" checked>
              </div>
            </div>
          </div>
          <div class="form-input">
            <button class="button button-primary" type="submit">
              Add Section
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="word-document-preview">
      <div v-for="section of displayableSections" :key="section">
        <h2>{{ section.name }}</h2>
        <div v-for="field of section.fields" :key="field">
          <div v-if="field.afterIsNewLine">
            <span>{{ field.before }}</span><br><span>{{ field.after }}</span>
          </div>
          <div v-else>
            <span>{{ field.before }}</span><pre class="tab">&Tab;</pre><span>{{ field.after }}</span>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
    name: 'CreateDocument',
    data: function () {
        return {
            displayableSections: ref([]),
            fieldsTableInputVisible: ref(true),
            isFormVisibleV1: ref(false),
            isFormVisibleV2: ref(false)
        }
    },
    methods: {
        parseTsv (tsvString) {
            const table = tsvString.split('\n')
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
            return objects
        },
        textualizeFieldsV1 (confluenceFields) {
            const fields = []
            confluenceFields.forEach((field) => {
                if (field['PDF Label'] !== 'N/A') {
                    if (field.Displayed === 'Always' || field['Required or optional?'] === 'Required') {
                        fields.push({
                            before: `${field['PDF Label']}`,
                            after: `<<[variables.get("${field['Label ID']}", "")]>>`,
                            bleeding: false,
                            afterIsNewLine: /(multi).*(line).*(text)/i.test(field['Form component'])
                        })
                    } else {
                        fields.push({
                            before: `${field['PDF Label']}`,
                            after: `<<[variables.get("${field['Label ID']}", "")]>><</if>>`,
                            bleeding: true,
                            bleed: `<<if [!variables.get("${field['Label ID']}").equals("")]>>`,
                            afterIsNewLine: /(multi).*(line).*(text)/i.test(field['Form component'])
                        })
                    }
                }
            })
            for (let i = 0; i < fields.length; i++) {
                const next = fields[i + 1]
                if (next == null) {
                    break
                }
                if (next.bleeding) {
                    fields[i].after += next.bleed
                }
            }
            return fields
        },
        confluenceInput (submitEvent) {
            const confluenceFields = this.parseTsv(submitEvent.target.elements.fieldTable.value)
            const fields = this.textualizeFieldsV1(confluenceFields)
            this.displayableSections.push({
                name: submitEvent.target.elements.headingText.value,
                tableName: '',
                fields,
                version: 1
            })
        },
        confluenceInputV2 (submitEvent) {
            const confluenceFields = this.parseTsv(submitEvent.target.elements.fieldTable.value)
            this.displayableSections.push({
                name: submitEvent.target.elements.headingText.value,
                tableName: submitEvent.target.elements.tableName.value,
                fields: confluenceFields,
                version: 2
            })
        }
    }
}
</script>
