<template>
    <div class="app-cards">
        <div class="app-card" v-for="app in apps?.apps">
            <div class="app-card-container">
                <p>{{ app.id }}</p>
                <p>{{ app.filename }}</p>
                <div class="app-buttons">
                    <!-- <a class="app-button" v-bind:href="`${app.location}`" download>
                        <button class="button button-primary">Download</button>
                    </a> -->
                    <button class="app-button button button-danger" :data-app-id="`${app.id}`" @click="deleteFile">
                        Remove
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const { data: apps } = useFetch("/api/app");

async function deleteFile(event) {
    const appId =  event.target.getAttribute("data-app-id")
    await useFetch(`/api/app/${appId}`, {
        method: "DELETE"
    });
    refreshNuxtData(); 
}

</script>
