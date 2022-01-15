import { io } from 'socket.io-client'
const store = {
  state: {
    socket: null
  },
  getters: {
    getSocket: state => state.socket
  },
  mutations: {
    socketConnect: state => {
      const socket = io(process.env.VUE_APP_API, {
        path: '/socket',
        reconnectionDelayMax: 10000,
        transports: ['websocket'],
        auth: {
          token: '123'
        }
      })
    },
    socketDisconnect: state => {
      state.socket?.disconnect()
      state.socket = null
    }
  }
}

export default store
