<template>
    <div v-for="project in projects">
        {{ project }}
    </div>
</template>

<script>

export default {
    name: "ProjectDisplay",
    data() {
        return {
            projects: ""
        };
    },
    mounted: async () => {
        projects = await fetch("/api/project/", {
            method: "get"
        })
    }
}
</script>