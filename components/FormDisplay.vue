<template>
    <div class="card-error" v-if="forms == null">
        <p class="card-error-text">Could not fetch forms at this time.</p>
    </div>
    <div class="display-cards" v-else>
        <div class="display-card" v-for="form in forms">
            <a v-bind:href="`/forms/${form._id}`" class="display-card-link">
                <div class="display-card-container">
                    <p>{{ form._id }}</p>
                    <p>{{ form.name }}</p>
                    <div class="display-card-buttons">
                        <!-- <a class="form-button" v-bind:href="`${form.location}`" download>
                            <button class="button button-primary">Download</button>
                        </a> -->
                    </div>
                </div>
            </a>
        </div>
    </div>
</template>

<script setup lang="ts">
const { data: forms, pending, error, refresh: refreshFormsDisplay, status } = useFetch("/api/form", { key: "getFormsForFormDisplay" });
</script>
