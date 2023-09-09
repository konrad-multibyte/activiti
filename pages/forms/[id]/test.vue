<template>
  <main class="responsive">
    <div class="cards">
      <div class="card w-100">
        <form class="form-flex-column" @submit.prevent="confluenceInput">
          <div class="form-input">
            <label for="confluenceInput">
              Field table
            </label>
            <textarea id="confluenceInput" name="fieldTable" required />
            <small>
              Field table from Confluence
            </small>
          </div>
          <div class="form-input">
            <button class="button button-primary" type="submit">
              Test Section
            </button>
          </div>
        </form>
      </div>
      <div></div>
    </div>
  </main>
</template>

<script setup lang="ts">
const route = useRoute()
const { data: form } = useFetch(`/api/form/${route.params.id}`,
    {
        key: 'getForm'
    })

function parseTsv (tsvString: string) {
    const table = tsvString.split('\n')
    let header = table.shift().trim().split('\t')
    header = header.map(value => value.trim().toLowerCase())
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
}

function testFormIds (formData: object, testData: object[]) {
    const results = []
    const formDataString = JSON.stringify(formData)
    for (const testRow of testData) {
        const result = {
            labelId: testRow['label id'],
            label: testRow.label,
            found: false,
            outcome: false,
            note: ''
        }
        if (formDataString.includes(testRow['label id'])) {
            result.found = true
            if (formDataString.includes(testRow.label)) {
                result.outcome = true
            } else {
                result.outcome = false
                result.note = `Label mismatch. Expected: '${testRow.label}'.`
            }
        } else if (formDataString.includes(testRow.label)) {
            result.note = 'Label is found.'
        } else {
            result.note = 'Id not found. Label not found.'
        }
        results.push(result)
    }
    return results
}

function confluenceInput (submitEvent) {
    const confluenceFields = parseTsv(submitEvent.target.elements.fieldTable.value)
    const test = testFormIds(form, confluenceFields)
    console.log(test)
}

</script>
