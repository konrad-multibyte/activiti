<template>
    <div class="display-cards">
        <div class="display-card" v-for="form in forms.forms">
            <div class="display-card-container">
                <p>{{ form._id }}</p>
                <p>{{ form.name }}</p>
                <div class="display-card-buttons">
                    <!-- <a class="form-button" v-bind:href="`${form.location}`" download>
                        <button class="button button-primary">Download</button>
                    </a> -->
                    <button class="display-card-button button button-danger" :data-form-id="`${form._id}`" @click="deleteForm">
                        Remove
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const { data: forms } = useFetch("/api/form");

async function deleteForm(event) {
    const formId =  event.target.getAttribute("data-form-id");
    await fetch(`/api/form/${formId}`, { method: 'DELETE' });
    refreshNuxtData(); 
}

</script>
