import { defineStore } from 'pinia'

export const useTableStore = defineStore({
  id: 'table',
  state: () => ({
    items: []
  }),
  getters: {
    itemsValue: (state) => state.items,
    maskQty: (state) => {
      if (state.count % 2 === 0) return 'even'
      return 'odd'
    }
  }
})
