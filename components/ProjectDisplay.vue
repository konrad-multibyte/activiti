<template>
    <div class="project-cards">
        <div class="project-card" v-for="project in projects?.projects">
            <div class="project-card-container">
                <p>{{ project.id }}</p>
                <p>{{ project.filename }}</p>
                <div class="project-buttons">
                    <!-- <a class="project-button" v-bind:href="`${project.location}`" download>
                        <button class="button button-primary">Download</button>
                    </a> -->
                    <button class="project-button button button-danger" :data-project-id="`${project.id}`" @click="deleteFile">
                        Remove
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const { data: projects } = useFetch("/api/project");

async function deleteFile(event) {
    const projectId =  event.target.getAttribute("data-project-id")
    await useFetch(`/api/project/${projectId}`, {
        method: "DELETE"
    });
    refreshNuxtData(); 
}

</script>
