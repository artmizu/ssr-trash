<!-- Item.vue -->
<template>
  <div>
    <div v-for="item in items">
      {{ item.name }}
    </div>
  </div>
</template>

<script>
export default {
  asyncData({ store, route }) {
    // return the Promise from the action
    return store.dispatch('fetchItem')
  },

  computed: {
    // display the item from store state.
    items() {
      return this.$store.state.items
    }
  }
}
</script>