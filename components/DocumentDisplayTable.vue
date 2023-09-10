<template>
  <table class="document-table">
    <thead class="document-table-header">
      <tr>
        <th colspan="2">
          {{ props.header }}
        </th>
      </tr>
    </thead>
    <tbody class="document-table-body">
      <tr v-for="field in props.fields" :key="field" class="document-table-row">
        <td class="document-label">
          {{ field.label }}
          {{ field.placeholder }}
        </td>
        <td class="document-value">
          {{ field.value }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
const props = defineProps({
    header: {
        type: String,
        requied: true,
        default: ''
    },
    fields: {
        type: Object,
        required: true,
        default: Object
    }
})
</script>
