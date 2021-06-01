<template>
    <div class="col s12 m6">
        <div>
          <div class="page-subtitle">
            <h4>Создать</h4>
          </div>

          <form @submit.prevent="onSubmit">
            <div class="input-field">
              <input
                  id="name"
                  type="text"
                  v-model="name"
                  :blur = 'nBlur'
                  :class="{'invalid' : nMessage}"
              >
              <label for="name">Название</label>
              <span class="helper-text invalid ">{{nMessage}} </span>
            </div>

            <div class="input-field ">
              <input
                  id="limit"
                  type="number"
                  v-model="limit"
                  :blur = 'lBlur'
                   :class="{'invalid' : nMessage}"
              >
              <label for="limit">Лимит</label>
              <span class="helper-text invalid">{{lMessage}} </span>
            </div>

            <button class="btn waves-effect waves-light" type="submit">
              Создать
              <i class="material-icons right">send</i>
            </button>
          </form>
        </div>
      </div>
</template>

<script>
import {useField, useForm}  from 'vee-validate'
import *as yup from 'yup'
//import axios from 'axios'
import { useStore } from 'vuex'
import { onMounted } from 'vue'
import M from 'materialize-css'
export default {
    setup(_, {emit}) {
      const {handleSubmit, handleReset} = useForm()
      const store = useStore()
        const {value : name, errorMessage : nMessage, handleBlur : nBlur} = useField(
            'name', 
            yup.string()
                .required('Пожалуйта введите название')
                
        )
        const {value : limit, errorMessage : lMessage, handleBlur : lBlur} = useField(
            'limit', 
            yup.number()
                .required('Пожалуйта введите значение')
                .min(100, `Минимальное значение 100 `)
        
        )
        const onSubmit =  handleSubmit(async val =>{
          try {
            const categories = await store.dispatch('createCategory', {...val})
            console.log(categories);
            emit('created', categories)
            handleReset();
          store.commit('setMessage', 'Категория успешно создана')
          } catch(e) {
            store.commit('setError', e)
          }
          
        })
        onMounted(()=>{
             M.updateTextFields()
          })

        return {
          name, nMessage, nBlur, limit, lMessage, lBlur, onSubmit
        }
      
    }
}
</script>