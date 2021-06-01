<template>
    <div class="grey darken-1 empty-layout">

<form class="card auth-card" @submit.prevent="onSubmit">
  <div class="card-content">
    <span class="card-title">Домашняя бухгалтерия</span>
    <div class="input-field">
      <input
          id="email"
          type="text"
          v-model="email"
      >
      <label for="email">Email</label>
      <small class="helper-text invalid">{{eMessage}} </small>
    </div>
    <div class="input-field">
      <input
          id="password"
          type="password"
          class="validate"
          v-model="password"
      >
      <label for="password">Пароль</label>
      <small class="helper-text invalid">{{pMessage}} </small>
    </div>
    <div class="input-field">
      <input
          id="name"
          type="text"
          class="validate"
          v-model="name"
      >
      <label for="name">Имя</label>
      <small class="helper-text invalid">{{nMessage}} </small>
    </div>
    <p>
      <label>
        <input type="checkbox" v-model="checkbox" />
        <span>С правилами согласен</span>
      </label> 
    </p>
  </div>
  <div class="card-action">
    <div>
      <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
          :disabled = '!checkbox'
      >
        Зарегистрироваться
        <i class="material-icons right">send</i>
      </button>
    </div>

    <p class="center">
      Уже есть аккаунт?
      <a href="/login">Войти!</a>
    </p>
  </div>
</form>

</div>
</template>

<script>
import {useRegisterScript} from '../use/registerSript'
import {ref} from 'vue'
export default {
    setup() {
      document.title = `Регистрация | crm system`
      const checkbox = ref('')
      return {
        checkbox,
        ...useRegisterScript()
      }
      
    }
}
</script>