<template>
  <div class="app">{{value}}</div>
</template>
<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup(){
    const value = ref('hello vue3')
    return {
      value
    }
  }
})
</script>