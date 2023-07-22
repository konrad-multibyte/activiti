<template>
    <div class="card-error" v-if="forms == null">
            <p class="card-error-text">Could not fetch forms at this time.</p>
        </div>
    <div class="display-cards" v-else>
        <div class="display-card" v-for="form in forms">
            <div class="display-card-container">
                <p>{{ form._id }}</p>
                <p>{{ form.name }}</p>
                <div class="display-card-buttons">
                    <!-- <a class="form-button" v-bind:href="`${form.location}`" download>
                        <button class="button button-primary">Download</button>
                    </a> -->
                    <button class="display-card-button button button-danger" :data-form-id="`${form._id}`"
                        @click="deleteForm">
                        Remove
                    </button>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script setup lang="ts">
const { data: forms, pending, error, refresh: refreshFormsDisplay, status } = useFetch("/api/form", { key: "getFormsForFormDisplay" });

async function deleteForm(event: MouseEvent) {
    if (event.target != null && event.target instanceof Element) {
        const formId = event.target.getAttribute("data-form-id");
        await fetch(`/api/form/${formId}`, { method: 'DELETE' });
        await refreshFormsDisplay();
    }
}

</script>
