<template>
  <div>
    <button v-show="!isQuickTestFormVisible" class="button button-primary" @click="isQuickTestFormVisible = true">
      Quick Test
    </button>
    <button v-show="isQuickTestFormVisible" class="button button-primary" @click="isQuickTestFormVisible = false">
      Abort
    </button>
    <form v-show="isQuickTestFormVisible" id="containerSpecForm" class="form" @submit.prevent="uploadForm()">
      <button type="submit" class="button button-primary" @click="isQuickTestFormVisible = false">
        Test
      </button>
      <textarea name="column" />
    </form>
  </div>
</template>

<script>
export default {
    name: 'ContainerQuickTest',
    data () {
        return {
            isQuickTestFormVisible: false
        }
    },
    methods: {
        async uploadForm () {

        }
    }
}
</script>
