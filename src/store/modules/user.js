const store = {
  state: {
    user: {
      userId: null,
      userStatus: null,
      firstName: null,
      lastName: null,
      mobile: null,
      profilePhoto: null,
    },
    token: null,
  },
  actions: {
    signIn: ({ getters, commit }, payload) => {
      commit('setUser', payload.user);
      commit('setToken', payload.token);
      localStorage.setItem("token", payload.token);
      localStorage.setItem("user", JSON.stringify(getters.getUser));
    },
  },
  mutations: {
    setToken: (state, payload) => {
      state.token = payload
    },
    setUser: (state, payload) => {
      const { user } = state
      const { userId, userStatus, firstName, lastName, mobile, profilePhoto } = payload
      user.userId = userId ?? user.userId;
      user.userStatus = userStatus ?? user.userStatus;
      user.firstName = firstName ?? user.firstName;
      user.lastName = lastName ?? user.lastName;
      user.mobile = mobile ?? user.mobile;
      user.profilePhoto = profilePhoto ?? user.profilePhoto;
    }
  },
  getters: {
    getToken: state => state.token,
    getUser: state => state.user,
  }
}

export default store