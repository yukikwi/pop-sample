import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import leaderboardObj from "../interface/leaderboardObj";

// define your typings for the store state
export interface State {
  oldscore: number;
  score: number;
  click: boolean;
  leaderBoard: Array<leaderboardObj>;
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    oldscore: Number(localStorage.getItem("old_score")),
    score: Number(localStorage.getItem("score")),
    click: false,
    leaderBoard: [],
  },
  mutations: {
    increment(state) {
      state.score++;
      localStorage.setItem("score", String(state.score));
    },
    click(state, val) {
      state.click = val;
    },
    update_socket(state, socket) {
      socket.emit("pop_data", {
        country: "th",
        score: state.score - state.oldscore,
      });

      state.oldscore = state.score;
      localStorage.setItem("oldscore", String(state.oldscore));
    },
    setleaderBoard(state, data) {
      state.leaderBoard = data;
    },
  },
});
