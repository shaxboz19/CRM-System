import axios from 'axios';
import { createStore } from 'vuex'
import auth from './modules/auth'
import info from './modules/info'
import categories from './modules/categories'
import record from './modules/record'
export default createStore({
  state: {
    errors : null,
  },
  mutations: {
    setError(state, e) {
      state.errors = e; 
    },
    clearError(state) {
      state.errors = null;
    }
  },
  actions: {
   async getCurrency() {
    const key = process.env.VUE_APP_FIXER;
    const {data} = await axios.get(`http://data.fixer.io/api/latest?access_key=${key}&symbols=UZS,RUB,USD,EUR`);
    return data
    }
  },
  getters : {
    getError : s => s.errors
  },
  modules: {
    auth, 
    info,
    categories,
    record

  }
})
