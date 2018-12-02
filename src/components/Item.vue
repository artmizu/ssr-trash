<!-- Item.vue -->
<template>
  <div>
    <div v-for="item in items">
      {{ item.name }}
    </div>
    <input v-on:input="getData" type="text">
    <input v-model="req" type="text">
    {{ result }}
  </div>  
</template>

<script>
export default {
  asyncData({ store, route }) {
    // return the Promise from the action
    return store.dispatch('fetchItem')
  },
  data() { 
    return {
      result: null,
      req: null,
    }
  },
  watch: {
    req(newReq, oldReq) {
      this.getDataById(+newReq);
    }
  },
  computed: {
    items() {
      return this.$store.state.items 
    }
  },
  methods: {
    getData(e) {
      this.getDataById(e.target.value);
    },
    getDataById(id) {
      if (id) {
        this.$store.dispatch('fetch', 'https://jsonplaceholder.typicode.com/users/' + id).then(data => this.result = data);
      } else {
        this.result = 'Введите корретный номер';
      }
    }
  }

}
</script>