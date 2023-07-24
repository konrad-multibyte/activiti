<template>
  <div class="display-cards">
    <div v-for="app in apps?.apps" :key="app.id" class="display-card">
      <div class="display-card-container">
        <p>{{ app.id }}</p>
        <p>{{ app.filename }}</p>
        <div class="display-card-buttons">
          <!-- <a class="app-button" v-bind:href="`${app.location}`" download>
                        <button class="button button-primary">Download</button>
                    </a> -->
          <button class="display-card-button button button-danger" :data-app-id="`${app.id}`" @click="deleteFile">
            Remove
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: apps } = useFetch('/api/app')

async function deleteFile (event: MouseEvent) {
    if (event.target != null && event.target instanceof Element) {
        const appId = event.target.getAttribute('data-app-id')
        await useFetch(`/api/app/${appId}`, {
            method: 'DELETE'
        })
        refreshNuxtData()
    }
}

</script>
