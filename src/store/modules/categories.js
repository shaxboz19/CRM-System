import firebase from 'firebase/app'
export default {
    actions : {
      async loadCategories({dispatch, commit}) {
        try {
          const uid = await dispatch('getUid')
          const categories = (await firebase.database().ref(`/users/${uid}/categories`).once('value')).val() || {}
          return Object.keys(categories).map(id => ({...categories[id], id:id}))
        }catch(e){
          commit('setError', e)
          throw e
        }
      },
      async loadCategoryById({dispatch, commit}, id) {
        try {
          const uid = await dispatch('getUid')
          const category = (await firebase.database().ref(`/users/${uid}/categories`).child(id).once('value')).val() || {}
          return {
            ...category,
            id
          }
        }catch(e){
          commit('setError', e)
          throw e
        }
      },

      async createCategory({dispatch, commit}, val) {
          try {
            const uid = await dispatch('getUid')
            const category = await firebase.database().ref(`/users/${uid}/categories`).push({...val})
            return {...val, id : category.key }
            
          } catch(e) {
              commit('setError', e)
            throw e
          }
            
        },
      async updateCategory({dispatch, commit}, {name, limit, id}) {
          try {
            const uid = await dispatch('getUid')
            const category = await firebase.database().ref(`/users/${uid}/categories`).child(id).update({name, limit})
            console.log(category);
            
          } catch(e) {
              commit('setError', e)
            throw e
          }
            
        },
     
    }
}