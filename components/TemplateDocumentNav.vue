<template>
  <h3>
    Templates
  </h3>
  <div class="card-nav">
    <a v-for="template in templateDocuments" :key="template" class="card" :href="`/template/${template.id}`">
      <h3>
        {{ template.filename }}
      </h3>
      <div class="cute-labels">
        <span class="cute-label info">Menu in Development</span>
      </div>
      <p>
        {{ template.id }}
      </p>
    </a>
  </div>
</template>

<script setup lang="ts">
const { data: templateDocuments } = useFetch('/api/template')
</script>
