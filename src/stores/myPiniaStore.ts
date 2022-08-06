import { acceptHMRUpdate, defineStore } from 'pinia'

export const useCounter = defineStore({
    id: 'counter',
  
    state: () => ({
      n: 2,
      incrementedTimes: 0,
      decrementedTimes: 0,
      numbers: [] as number[],
    }),
  
    getters: {
      double: (state) => state.n * 2,
    },
  
    actions: {
      increment(amount = 1) {
        this.incrementedTimes++
        this.n += amount
      },
    },
  })