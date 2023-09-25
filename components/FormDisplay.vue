<template>
  <h2>Forms</h2>
  <div v-if="forms == null" class="card-error">
    <p class="card-error-text">
      Could not fetch forms at this time.
    </p>
  </div>
  <div v-else class="card-nav">
    <a v-for="form in forms" :key="form" class="card" :href="`/forms/${form.id}`">
      <h3>
        {{ form.data.name }}
      </h3>
      <p>
        {{ form.id }}
      </p>
    </a>
  </div>
</template>

<script setup lang="ts">
const { data: forms } = useFetch('/api/form', { key: 'getFormsForFormDisplay' })
</script>
