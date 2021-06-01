//import axios from "axios"
import firebase from 'firebase/app'

export default {
  state() {
      return{
          info : null,
          name : localStorage.getItem('name'),
      }
  } ,
  mutations: {
    setInfo(state, info) {
        state.info =  info
        localStorage.setItem('info', info)
    },
    clearInfo(state) {
        state.info = null
        localStorage.removeItem('name')
    },
    setName(state, name) {
      state.name = name,
      localStorage.setItem('name', name)
    }
    

    
  },
  actions : {
     async load({commit, dispatch}) {
         try {
             
        const uid =await dispatch('getUid')
        //const {data} = await axios.get(`https://crm-system-86efe-default-rtdb.firebaseio.com/users/${uid}/info.json?auth = ${payload.token}`);
        const data = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
        console.dir(data);
        commit('setName', data.name)
        commit('setInfo', {...data})
        
        } catch(e) {
            console.log(e);
        }
      },
      async updateInfo({commit, dispatch, getters}, record) {
          try { 
            const uid = await dispatch('getUid');
            const updateInfo = {...getters.info, ...record}
            await firebase.database().ref(`/users/${uid}/info/`).update(updateInfo)
            commit('setName', updateInfo.name)
            commit('setInfo', {...updateInfo})
          }catch(e) {
            commit('setError', e)
            throw e
          }
      },
 },
 getters :{
    name : (state)=> state.name, 
    info : (state) => state.info

     

 },


}