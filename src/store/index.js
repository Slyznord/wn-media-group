import { createStore } from 'vuex'
import { v4 as uuidv4 } from 'uuid'

export const store = createStore({
  state: {
    columns: []
  },
  mutations: {
    addColumn (state) {
      state.columns.push({
        name: 'Новый список',
        cards: []
      })
    },
    removeColumn (state, index) {
      state.columns.splice(index, 1)
    },
    renameColumn (state, { index, value }) {
      state.columns[index].name = value
    },
    addCard (state, index) {
      state.columns[index].cards.push({
        uuid: uuidv4(),
        value: ''
      })
    },
    updateCard (state, { columnIndex, cardIndex, value }) {
      state.columns[columnIndex].cards[cardIndex].value = value
    },
    removeCard (state, { columnIndex, cardIndex }) {
      state.columns[columnIndex].cards.splice(cardIndex, 1)
    },
    setStore (state, payload) {
      state.columns = JSON.parse(payload)
    },
    movingCard (state, { sourceColumnIndex, targetColumnIndex, cardIndex, card }) {
      state.columns[sourceColumnIndex].cards.splice(cardIndex, 1)
      state.columns[targetColumnIndex].cards.push(card)
    }
  },
  actions: {
    getStore ({ commit }) {
      const columns = localStorage.getItem('wn-media-store')
      if (columns === null) return false
      commit('setStore', columns)
    }
  }
})

store.subscribe((mutation, state) => {
  if (mutation.type === 'setStore') return false
  localStorage.setItem('wn-media-store', JSON.stringify(state.columns))
})
