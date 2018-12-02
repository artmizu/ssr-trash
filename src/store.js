import Vue from 'vue'
import Vuex from 'vuex'
import fetch from 'node-fetch'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
      items: []
    },
    actions: {
      fetch({ commit }, url) {
        return fetch(url)
          .then(response => response.json())
      },
      fetchItem ({ commit }) {
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