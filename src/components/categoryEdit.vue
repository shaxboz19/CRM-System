<template>
   <div class="col s12 m6">
        <div>
          <div class="page-subtitle">
            <h4>Редактировать</h4>
          </div>
         
          

          <form @submit.prevent="onSubmit">
            <div class="input-field" >
            
              <select  ref="select"  v-model="current" >
                <option
                v-for="category of categories" :key="category.id" :value="category.id"
                >{{category.name}} </option>
              </select>
              <label>Выберите категорию</label>
            </div>

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
              Обновить
              <i class="material-icons right">send</i>
            </button>
          </form>
        </div>
      </div>
</template>

<script>
import {useField, useForm}  from 'vee-validate'
import *as yup from 'yup'
import {ref, onBeforeMount, onMounted, watch, onUnmounted} from 'vue'
import M from 'materialize-css'
import { useStore } from 'vuex'
export default {
  props : {
    categories : {
      type : Array,
      required : true  
    }
  },
    setup(props, {emit}){
      const select = ref('')
      const current = ref(null)
      const selectPlugin = ref(null)
      const store = useStore()
     const {handleSubmit} = useForm()
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
        
        );
      onBeforeMount(()=>{
        const {name : title, limit :limitValue, id} = props.categories[0]
         current.value = id;
         name.value = title;
         limit.value = limitValue
      })  
      onMounted(() => {
         M.updateTextFields();  
        selectPlugin.value =  M.FormSelect.init(select.value);
         console.log('props', props.categories);
         
      })
        watch(current, (id)=>{
           const {name : title, limit : limitValue} = props.categories.find(c => c.id === id)
            name.value = title,
            limit.value = limitValue  
        }) 
      const onSubmit = handleSubmit(async val =>{
          try {
            console.log(val);
           await store.dispatch('updateCategory', {...val, id : current.value});
          store.commit('setMessage', 'Категория успешно обновлена');
          emit('update', {...val, id:current.value});
          } catch(e) {
            store.commit('setError', e);
          }
          
        })
        onUnmounted(()=>{
          selectPlugin.value = null;
        })
       
         return {
          name, nMessage, nBlur, limit, lMessage, lBlur, onSubmit, select, current, 
        }

        
    }
}
</script>