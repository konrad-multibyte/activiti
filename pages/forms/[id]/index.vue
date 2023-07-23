<template>
    <div v-bind="form">
        <h1 class="form-header">{{ form.name }}</h1>
        <p class="from-description" v-if="form.description != null || form.description != ''">{{ form.description }}</p>
        <p class="form-description-none" v-if="form.description === ''">No description provided.</p>
        <div class="form-action-buttons">
            <a href="/forms/">
                <button class="form-action-button button button-danger" :data-form-id="`${form._id}`" @click="deleteForm">
                    Remove
                </button>
                
            </a>
            <FormUpdate :formId="form._id" />
        </div>
        <h2>Preview</h2>
        <div class="form-preview">
            <div class="form-preview-tabs" v-if="form.editorJson.tabs.length > 0">
                <a class="form-preview-tab" href="#" v-for="tab in form.editorJson.tabs" @click="selectTab"
                    :data-tab-id="`${tab.id}`">
                    {{ tab.title }}
                </a>
            </div>
        </div>
        <div class="form-preview-representation">
            <div v-for="field in form.editorJson.fields">
                <div v-if="field.tab">
                    <div v-if="field.tab === 'tab1'">
                        <h4>{{ field.name }}</h4>
                        <p>class: {{ field.className }}</p>
                        <div v-for="childFieldCollection in field.fields"
                            v-if="field.fieldType === 'ContainerRepresentation'">
                            <div v-for="childField in childFieldCollection" v-if="childFieldCollection.length > 0">
                                <p>
                                    {{ childField }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <h4>{{ field.name }}</h4>
                    <p>class: {{ field.className }}</p>
                    <div v-for="childFieldCollection in field.fields" v-if="field.fieldType === 'ContainerRepresentation'">
                        <div v-for="childField in childFieldCollection" v-if="childFieldCollection.length > 0">
                            <p>
                                {{ childField }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const route = useRoute();
const { data: form, pending, error, refresh: refreshForm, status } = useFetch(`/api/form/${route.params.id}`,
    {
        key: "getForm",
        method: "GET"
    });

async function deleteForm(event: MouseEvent) {
    if (event.target != null && event.target instanceof Element) {
        const formId = event.target.getAttribute("data-form-id");
        await fetch(`/api/form/${formId}`, { method: 'DELETE' });
    }
}

async function selectTab(event: MouseEvent) {
    if (event.target != null && event.target instanceof Element) {
        selectedTabId = event.target.getAttribute("data-tab-id");
    }
}
</script>