<template>
  <div id="app">
    <h1>Se title</h1>
    <router-view/>
  </div>
</template>

<script>
export default { 
  computed: {
    // display the item from store state.
    items() {
      return this.$store.state.items
    }
  }
}
</script>