const store = {
  state: {
    userId: null,
    token: null,
  },
  mutations: {
    setUserId: (state, payload) => state.userId = payload,
    setToken: (state, payload) => state.token = payload,
  },
  getters: {
    getUserId: state => state.userId,
    getToken: state => `Bearer ${state.token}`,
  }
}

export default store