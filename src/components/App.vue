<template>
  <div id="app">
    <Suspense>
      <template #default>
        <HelloWorld />
      </template>
      <template #fallback>
        ...loading
      </template>
    </Suspense>
  </div>
</template>

<script lang="ts">
import HelloWorld from './HelloWorld.vue';

export default {
  name: 'App',
  components: {
    HelloWorld
  }
};
</script>

<style lang="scss">
@import "../../node_modules/bulma/bulma.sass";
</style>