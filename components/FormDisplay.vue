<template>
  <div v-if="forms == null" class="card-error">
    <p class="card-error-text">
      Could not fetch forms at this time.
    </p>
  </div>
  <div v-else class="display-cards">
    <div v-for="form in forms" :key="form" class="display-card">
      <a :href="`/forms/${form.id}`" class="display-card-link">
        <div class="display-card-container">
          <p>{{ form.id }}</p>
          <p>{{ form.data.name }}</p>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: forms } = useFetch('/api/form', { key: 'getFormsForFormDisplay' })
</script>
