<template>
<div>
  <div class="page-title">
    <h3>Новая запись</h3>
  </div>

  <app-loader v-if="loading"></app-loader>
  <p v-else-if="!categories.length " class="center">Категорий пока нет, <router-link to="/categories" >но вы може создать первую</router-link></p>
  <form class="form" v-else @submit.prevent="onSubmit">
    <div class="input-field" >
      <select ref="select" v-model="current" >
        <option v-for="category in categories" :key="category.id" :value="category.id"
        >{{category.name}} </option>
      </select>
      <label>Выберите категорию</label>
    </div>

    <p>
      <label>
        <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="type"
        />
        <span>Доход</span>
      </label>
    </p>

    <p>
      <label>
        <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="type"
        />
        <span>Расход</span>
      </label>
    </p>

    <div class="input-field">
      <input
          id="amount"
          type="number"
          v-model.number="amount"
          :blur = "aBlur"
      >
      <label for="amount">Сумма</label>
      <span class="helper-text invalid" :class="{invalid : aMessage} " >{{aMessage}} </span>
    </div>

    <div class="input-field">
      <input
          id="description"
          type="text"
          v-model="description"
          :blur = "dBlur"
      >
      <label for="description">Описание</label>
      <span
            class="helper-text invalid" :class="{invalid : dMessage}">{{dMessage}} </span>
    </div>

    <button class="btn waves-effect waves-light" type="submit">
      Создать
      <i class="material-icons right">send</i>
    </button>
  </form>

<div class="fixed-action-btn">
  <a class="btn-floating btn-large blue" href="#">
    <i class="large material-icons">add</i>
  </a>
</div>
</div>
</template>

<script>
import {ref, onMounted, watch, computed,  } from 'vue'
import {  useStore,  } from 'vuex'
import appLoader from '../components/app/loader'
import M from 'materialize-css'
import {useField, useForm} from 'vee-validate'
import *as yup from 'yup'
export default {
  name : 'record',
  components :{
    appLoader
  },
  setup() {
  document.title = `Запись | crm system`

    const store = useStore();
    const categories = ref({});
    const loading = ref(true);
    const selectPlugin = ref(null);
    const select = ref('');
    const current = ref('');
    const type = ref('income');
    const {handleSubmit, handleReset} = useForm()
    const cash = ref('')
  


    const {value : amount, errorMessage : aMessage, handleBlur : aBlur } =useField(
      'amount', 
      yup.number('Введите число')
         .required('Введите значение')
         .min(1, 'Введите корректное значение')
         
         
    )
    const {value : description, errorMessage : dMessage, handleBlur : dBlur } =useField(
      'description',
      yup.string()
         .required('Введите описание')
         
    )
    
    onMounted(async () => {
    categories.value = await store.dispatch('loadCategories');
    loading.value = false;
    
    
    

    

      setTimeout(() => {
        selectPlugin.value =  M.FormSelect.init(select.value);
        M.updateTextFields()
        cash.value =  store.getters.info.cash

      }, 0);  
      if(categories.value.length){
        current.value = categories.value[0].id
      }
      
        
    })
    watch(type, val=>{
      console.log(val);
    })
  
    const canCreateRecord =computed(()=>{
        if(type.value === 'income') {
          return true
        }
        
       return store.getters.info.cash >= amount.value
    });
    
    
    const onSubmit = handleSubmit( async val=>{
      console.log(val);

      if(canCreateRecord.value) {
        store.dispatch('createRecord', {
          ...val, 
          id : current.value,
          type : type.value,
          date : new Date().toJSON()
        })
        const bill = (type.value === 'income') ? cash.value + amount.value : cash.value - amount.value
        store.dispatch('updateInfo', {cash:bill})
        store.commit('setMessage', 'Запись успешно создана!')
        
      } else {
        console.log('sdsd');
        store.commit('setMessage', `Недостаточно средств на вашем счете, вам не хватает еще ${amount.value-cash.value}`)
      }



      handleReset()
    })



    return {
      categories, loading, select, current, type, amount, description, aMessage, aBlur, dMessage, dBlur, onSubmit, canCreateRecord,
      
    }
  
   }
}
</script>