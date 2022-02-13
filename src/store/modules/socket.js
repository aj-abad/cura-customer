import { io } from 'socket.io-client'

const token = localStorage.getItem("token") ?? null


//TODO register actual events
const registerEvents = (socket) => {
  socket.on("connect", () => { console.log(`%cConnected with ID ${socket.id}` , "font-size: 4rem; color: rebeccapurple; font-family: 'bayshore', 'comic sans ms'") })
}

const connectSocket = (token) => {
  const socket = io(process.env.VUE_APP_API, {
    transports: ['websocket', 'polling'],
    auth: {
      token
    }
  });
  registerEvents(socket);
  return socket
}



const store = {
  state: {
    socket: token ? connectSocket(token) : null
  },
  getters: {
    getSocket: state => state.socket
  },
  mutations: {
    socketConnect: (state, payload) => {
      if (state.socket) return null;
      state.socket = connectSocket(state.socket, payload)
    },
    socketDisconnect: state => {
      state.socket?.disconnect()
      state.socket = null
    }
  }
}



export default store
