const savedState = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
const token = localStorage.getItem('token') ?? null;

const store = {
  state: {
    user: {
      userId: savedState?.userId ?? null,
      userStatus: savedState?.userStatus ?? null,
      firstName: savedState?.firstName ?? null,
      lastName: savedState?.lastName ?? null,
      mobile: savedState?.mobile ?? null,
      profilePhoto: savedState?.profilePhoto ?? null,
    },
    token,
  },
  actions: {
    setToken: ({ commit }, payload) => {
      commit('setToken', payload);
      localStorage.setItem('token', payload);
    },
    updateUser: ({ getters, commit }, payload) => {
      commit('updateUser', payload);
      localStorage.setItem("user", JSON.stringify(getters.getUser));
    },
    signOut({ commit }) {
      commit('signOut');
      commit('socketDisconnect', null, { root: true })
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },
  mutations: {
    setToken: (state, payload) => {
      state.token = payload
    },
    updateUser: (state, payload) => {
      const { user } = state
      const { userId, userStatus, firstName, lastName, mobile, profilePhoto } = payload
      user.userId = userId ?? user.userId;
      user.userStatus = userStatus ?? user.userStatus;
      user.firstName = firstName ?? user.firstName;
      user.lastName = lastName ?? user.lastName;
      user.mobile = mobile ?? user.mobile;
      user.profilePhoto = profilePhoto ?? user.profilePhoto;
    },
    signOut: (state) => {
      state.user = {
        userId: null,
        userStatus: null,
        firstName: null,
        lastName: null,
        mobile: null,
        profilePhoto: null,
      };
      state.token = null;
    }
  },
  getters: {
    getToken: state => state.token,
    getUser: state => state.user,
    isLoggedIn: state => state.user.userId !== null,
  }
}

export default store