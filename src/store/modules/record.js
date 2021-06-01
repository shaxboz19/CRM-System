import firebase from 'firebase/app'
export default {
    actions : {
       async createRecord({dispatch, commit}, records ) {
            try{
                const uid =await dispatch('getUid');
                const record= await firebase.database().ref(`/users/${uid}/records`).push(records);
                console.log('RECORD', record);
                return {
                  ...record, categoryId : record.key
                }
            }catch(e){
                commit('setError', e);
                throw e;
            }
        },
        async loadRecords({dispatch, commit}) {
            try {
              const uid = await dispatch('getUid')
              const records = (await firebase.database().ref(`/users/${uid}/records`).once('value')).val() || {}
              return Object.keys(records).map(id => ({...records[id], recordId : id}))
              
            }catch(e){
              commit('setError', e)
              throw e
            }
          },
        async loadRecordById({dispatch, commit}, id) {
            try {
              const uid = await dispatch('getUid')
              const record = (await firebase.database().ref(`/users/${uid}/records`).child(id).once('value')).val() || {}
              return {
                ...record,
              }
            }catch(e){
              commit('setError', e)
              throw e
            }
          },
       
    }
}