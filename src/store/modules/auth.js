//import axios from "axios";
import M from "materialize-css";
import router from "../../router";
import firebase from "firebase/app";
import messages from "../../plugin/messages";
export default {
  state() {
    return {
      token: localStorage.getItem("token"),
    };
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem("token", token);
    },
    setMessage(_, val) {
      M.toast({ html: val });
    },

    clearToken(state) {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  actions: {
    //    async login({commit, dispatch}, payload) {
    //     try {
    //         const id = 'AIzaSyBkeDklc3q0qLm9gkh2aFIOCbYaIpfN_28'
    //         const url =`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${id}`
    //         const {data} = await axios.post(url, {...payload, returnSecureToken : true })
    //         const token = data.idToken
    //         commit('setToken', token )
    //         console.log(data);
    //         commit('setId', data.localId)
    //         dispatch('getUid')
    //     } catch(e) {
    //         commit('setError', e)
    //     }
    //     },

    async login({ commit, dispatch }, payload) {
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(payload.email, payload.password);
        const uid = dispatch("getUid");
        commit("setToken", uid);

        console.log(payload);
      } catch (e) {
          console.log(e);
        commit("setMessage", messages[e.code]);
        throw e;
      }
    },
    async logout({ commit }) {
      await firebase.auth().signOut();
      commit("clearToken");
      commit("clearInfo");
    },

    //    async register({commit}, {email, password, name}) {
    //         const id = 'AIzaSyBkeDklc3q0qLm9gkh2aFIOCbYaIpfN_28'
    //         const url =`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${id}`
    //     try {
    //            const {data} =await axios.post(url, {email, password})
    //            const token = data.idToken;
    //            commit('setToken', token);
    //            commit('setLocalId', data.localId);
    //        await  axios.post(`https://crm-system-86efe-default-rtdb.firebaseio.com/users/${data.localId}.json?auth = ${token}`, {name, cash : 10000 })
    //         router.push('/')
    //     } catch(e) {
    //             commit('setError', e)
    //        }
    //    },

    async register({ dispatch, commit }, { email, password, name }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const uid = await dispatch("getUid");
        commit("setToken", uid);
        await firebase
          .database()
          .ref(`/users/${uid}/info`)
          .set({
            cash: 1000000,
            name,
          });
        router.push("/");
      } catch (e) {
        commit("setMessage", messages[e.code]);
        throw e;
      }
    },

    getUid() {
      const user = firebase.auth().currentUser;
      return user ? user.uid : null;
    },
  },
  getters: {
    isAutheticated(state) {
      return !!state.token;
    },
    getToken(state) {
      return state.token;
    },
  },
};
