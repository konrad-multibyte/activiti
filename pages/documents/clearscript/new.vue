<template>
  <main class="responsive">
    <div class="cards">
      <div class="card w-100">
        <form class="form" @submit.prevent="confluenceInput">
          <div class="form-input">
            <label for="confluenceInput">
              Field table from confluence
            </label>
            <textarea id="confluenceInput" name="fieldTable" required />
            <small>
              Field table from Confluence
            </small>
          </div>
          <div class="form-input">
            <button class="button button-primary" type="submit">
              Sumbit
            </button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
export default {
    name: 'ClearScriptNew',
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
        confluenceInput (submitEvent) {
            const confluenceFields = this.parseTsv(submitEvent.target.elements.fieldTable.value)
            const parents = []
            const ifSyntax = /[iI][fF]/g
            const syntax = /([iI][fF])\s*".*?"\s*?=\s*((".*")|(\w*))/
            confluenceFields.forEach((field) => {
                if (field.Displayed !== 'Always') {
                    if (syntax.test(field.Displayed)) {
                        const statement = syntax.exec(field.Displayed)
                        if (statement != null) {
                            const leftSide = statement[0].split('=')[0]
                            const rightSide = statement[0].split('=')[1]
                            const ifField = leftSide.replaceAll(ifSyntax, '').replaceAll('"', '').trim()
                            const ifValue = rightSide.replaceAll('"', '').trim()
                            const parentField = confluenceFields.find(f => f.Label === ifField)
                            if (parentField !== undefined) {
                                const parent = parents.find(p => p.field === parentField && p.conditionValue === ifValue)
                                if (parent !== undefined) {
                                    parent.children.push(field)
                                } else {
                                    parents.push({
                                        field: parentField,
                                        conditionValue: ifValue,
                                        children: [field]
                                    })
                                }
                            } else {
                                console.log(`Parent field not found. Looking for ${ifField}`)
                            }
                        }
                    } else {
                        console.log(`Structured Form Language Error: Could not get If synatx from ${field.Displayed}`)
                    }
                }
            })
        }
    }
}
</script>
