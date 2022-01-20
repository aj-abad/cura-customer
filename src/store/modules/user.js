const store = {
  state: {
    profile: {
      firstName: null,
      lastName: null,
      mobile: null,
    },
    userId: null,
    userStatus: null,
    token: null,
  },
  actions: {

  },
  mutations: {

  },
  getters: {
    getProfile: state => state.profile
    , getUserId: state => state.userId,
    getUserStatus: state => state.userStatus,
    getToken: state => state.token,
  }
}

export default store