import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import leaderboardObj from "../interface/leaderboardObj";

// define your typings for the store state
export interface State {
  oldscore: number;
  score: number;
  click: boolean;
  leaderBoard: Array<leaderboardObj>;
  bot: boolean;
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    oldscore: Number(localStorage.getItem("old_score")),
    score: Number(localStorage.getItem("score")),
    click: false,
    leaderBoard: [],
    bot: Boolean(String(localStorage.getItem("bot")) === "yes")
  },
  mutations: {
    increment(state) {
      if(state.bot === false){
        state.score++;
        localStorage.setItem("score", String(state.score));
      }
    },
    click(state, val) {
      if(state.bot === false){
        state.click = val;
      }
    },
    update_socket(state, socket) {
      //Ban bot
      if((state.score - state.oldscore) > 80) {
        state.oldscore = state.score;
        localStorage.setItem("old_score", String(state.oldscore));
        state.bot = true
        localStorage.setItem("bot", "yes");
      }

      if(state.bot === false){
        socket.emit("pop_data", {
          country: "th",
          score: state.score - state.oldscore,
        });

        state.oldscore = state.score;
        localStorage.setItem("old_score", String(state.oldscore));
      }
    },
    setleaderBoard(state, data) {
      state.leaderBoard = data;
    },
  },
});
