<template>
  <div>
    xuy
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'Some comp', 

  computed: {
    // display the item from store state.
    items() {
      return this.$store.state.items
    }
  }
}
</script