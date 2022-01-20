const store = {
  state: {
    firstName: null,
    lastName: null,
    mobile: null,
    profilePhoto: null,
  },
  mutations: {
    setProfile: (state, payload) => {
      state.firstName = payload.firstName ?? state.firstName;
      state.lastName = payload.lastName ?? state.lastName;
      state.mobile = payload.mobile ?? state.mobile;
      state.profilePhoto = payload.profilePhoto ?? state.profilePhoto;
    }
  },
  getters: {
    getProfile: state => state
  },
}

export default store;