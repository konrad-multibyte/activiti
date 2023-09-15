<template>
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
      <div class="cute-labels">
        <span class="cute-label info">Menu in Development</span>
      </div>
      <p>
        {{ form.id }}
      </p>
    </a>
  </div>
  <div class="display-cards">
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
