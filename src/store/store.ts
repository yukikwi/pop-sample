import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'

// define your typings for the store state
export interface State {
  score: number,
  click: boolean
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    score: Number(localStorage.getItem('score')),
    click: false
  },
  mutations: {
    increment (state) {
      state.score++;
      localStorage.setItem('score', String(state.score));
    },
    click (state, val) {
        state.click = val;
    }
  }
})