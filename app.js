// app.js
import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import { createStore } from './store'
import { sync } from 'vuex-router-sync'

export function createApp () {
  // create router and store instances
  const router = createRouter()
  const store = createStore()

  // sync so that route state is available as part of the store
  sync(store, router)

  Vue.mixin({
    beforeMount () {
      const { asyncData } = this.$options
      if (asyncData) {
        // assign the fetch operation to a promise
        // so that in components we can do `this.dataPromise.then(...)` to
        // perform other tasks after data is ready
        this.dataPromise = asyncData({
          store: this.$store,
          route: this.$route
        })
      }
    }
  })

  Vue.mixin({
    beforeRouteUpdate (to, from, next) {
      const { asyncData } = this.$options
      if (asyncData) {
        asyncData({
          store: this.$store,
          route: to
        }).then(next).catch(next)
      } else {
        next()
      }
    }
  })

  // create the app instance, injecting both the router and the store
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  // expose the app, the router and the store.
  return { app, router, store }
}