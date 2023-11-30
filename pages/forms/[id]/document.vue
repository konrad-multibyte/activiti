<template>
  <main class="responsive">
    <h1> {{ form.data.name }}</h1>
    <div v-if="form.data.editorJson">
      <div v-for="field in form.data.editorJson.fields" :key="field" class="confluence">
        <div v-if="field.fieldType === 'ContainerRepresentation'">
          <h3 v-if="field.name !== 'Label'">
            {{ field.name }}
          </h3>
          <table class="confluence">
            <thead>
              <tr>
                <th>Field ID</th>
                <th>Label</th>
                <th>PDF Label</th>
                <th>Placeholder</th>
                <th>Form component</th>
                <th>Options</th>
                <th>Displayed</th>
                <th>Required or optional?</th>
                <th>Pre-populated?</th>
                <th>Pre-populated from</th>
                <th>Editable (if pre-populated)</th>
                <th>Equivalent fields on other forms that will then be pre-populated</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="containerField of field.fields[1]" :key="containerField">
                <tr :id="containerField.id">
                  <td>{{ containerField.id }}</td>
                  <td>
                    {{ containerField.name }}
                    <template v-if="containerField.value">
                      {{ containerField.value }}
                    </template>
                  </td>
                  <td />
                  <td>
                    {{ containerField.placeholder }}
                  </td>
                  <td>{{ capitalize(containerField.type.replaceAll('_', ' ').replaceAll('-', ' ')) }}</td>
                  <td v-if="containerField.options">
                    <p v-for="option of containerField.options" :key="option.id">
                      {{ option.name }}
                    </p>
                  </td>
                  <td v-else />
                  <td v-if="containerField.className === 'hidden-control' || field.className === 'hidden-control'">
                    Hidden
                  </td>
                  <td v-else-if="containerField.visibilityCondition !== null">
                    <p v-for="condition in unpackVisibilityConditions(containerField.visibilityCondition)" :key="condition.leftFormFieldId">
                      If <a :href="`#${condition.leftFormFieldId}`" @click="highlightField(condition.leftFormFieldId)">{{ condition.leftFormFieldId }}</a> {{ condition.operator }} {{ condition.rightValue }}{{ condition.rightFormFieldId }}
                    </p>
                  </td>
                  <td v-else>
                    Always
                  </td>
                  <td v-if="containerField.required == true">
                    Required
                  </td>
                  <td v-else>
                    Optional
                  </td>
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                </tr>
                <template v-if="containerField.type === 'configurable_table_input'">
                  <tr v-for="configurableTableInputField of JSON.parse(containerField.params.customProperties.tableItemsConfiguration).items" :key="configurableTableInputField.id">
                    <td>(Table column)</td>
                    <td>{{ configurableTableInputField.label }}</td>
                    <td />
                    <td>{{ configurableTableInputField.placeholder }}</td>
                    <td>{{ transformCamelCase(configurableTableInputField.type) }}</td>
                    <td>
                      <template v-if="configurableTableInputField.type === 'buttonGroup'">
                        <template v-for="option of configurableTableInputField.typeConfig.buttonControlItems.split('\n')" :key="option">
                          <p>
                            {{ option.split(',')[0] }}
                          </p>
                        </template>
                      </template>
                    </td>
                    <td>{{ configurableTableInputFieldVisibility(configurableTableInputField.visibilityCondition ,configurableTableInputField.isHidden) }}</td>
                    <td>{{ configurableTableInputField.required ? 'Required' : 'Optional' }}</td>
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                  </tr>
                </template>
              </template>
            </tbody>
          </table>
        </div>
        <div v-else>
          <table>
            <thead>
              <th>Field ID</th>
              <th>Label</th>
              <th>PDF Label</th>
              <th>Placeholder</th>
            </thead>
            <tbody>
              <tr>
                <td>{{ field.id }}</td>
                <td>{{ field.name }}</td>
                <td />
                <td>{{ field.placeholder }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div v-else>
      <p>poop</p>
    </div>
  </main>
</template>

<script setup lang="ts">
const route = useRoute()
const { data: form } = useFetch(`/api/form/${route.params.id}`,
    {
        key: 'getForm',
        method: 'GET'
    })

interface VisiblityCondition {
  operator: string
  rightFormFieldId: string | null
  rightValue: string | null
  leftFormFieldId: string
  leftRestResponseId: string | null
  rightRestResponseId: string | null
  nextCondition: VisiblityCondition | null
  nextConditionOperator: string | null
  rightType: string | null
}

interface InputTableVisiblityCondition {
  condition: string;
  nextConditionOperator?: string;
  controlId?: string;
  tableControlId?: string;
  processVariable?: string;
  value?: string;
  key?: string;
  operand?: string | boolean;
}

function capitalize (string: string, lower = false) {
    return (lower ? string.toLowerCase() : string).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase())
}

function unpackVisibilityConditions (nestedVisibilityCondition: VisiblityCondition | null) {
    const conditions = []
    while (nestedVisibilityCondition != null) {
        conditions.push(nestedVisibilityCondition)
        nestedVisibilityCondition = nestedVisibilityCondition.nextCondition
    }
    return conditions
}

function highlightField (id: string) {
    const card = document.getElementById(id)
    if (card) {
        card.animate(
            [
                {
                    boxShadow: '0 0 10px var(--red)'
                },
                {
                    boxShadow: 'none'
                }
            ],
            {
                duration: 2000,
                iterations: 1
            }
        )
    }
}

function transformCamelCase (text: string) {
    const result = text.replace(/([A-Z])/g, ' $1')
    return result.charAt(0).toUpperCase() + result.slice(1)
}

function configurableTableInputFieldVisibility (visibilityConditions: InputTableVisiblityCondition[] | null | undefined, isHidden: boolean | null | undefined) {
    const conditions = []
    if (visibilityConditions != null) {
        for (const condition of visibilityConditions) {
            conditions.push(`${condition.controlId}${condition.processVariable}${condition.tableControlId} ${condition.operand}${condition.condition} ${condition.value}`)
        }
        return conditions.join('\n')
    } else if (isHidden != null) {
        return isHidden ? 'Hidden' : 'Always'
    } else {
        return 'Always'
    }
}

</script>
