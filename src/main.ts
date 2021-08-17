import { createApp } from "vue";
import App from "./App.vue";
import { store, key } from "./store/store";
import "./assets/main.css";
import VueSocketIO from "vue-3-socket.io";
import SocketIO from "socket.io-client";

const app = createApp(App);
app.use(store, key);
app.use(
  new VueSocketIO({
    debug: true,
    connection: SocketIO(process.env.VUE_APP_SOCKET_SERVER),
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_",
    },
  })
);
app.mount("#app");
