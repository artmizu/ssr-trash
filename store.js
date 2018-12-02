// store.js
import Vue from 'vue'
import Vuex from 'vuex'
import fetch from 'node-fetch'

Vue.use(Vuex)

let fetchItem = fetch('https://jsonplaceholder.typicode.com/users');

export function createStore () {
  return new Vuex.Store({
    state: {
      items: []
    },
    actions: {
      fetchItem ({ commit }, id) {
        // return the Promise via `store.dispatch()` so that we know
        // when the data has been fetched
        return fetch('https://jsonplaceholder.typicode.com/users')
          .then(response => response.json())
          .then(json => commit('setItems', json))
      }
    },
    mutations: {
      setItems (state, items) {
        Vue.set(state, 'items', items)
      }
    }
  })
}