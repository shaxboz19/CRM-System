<template>
  <div>
    <div class="grey darken-1 empty-layout">
      <form class="card auth-card" @submit.prevent="onSubmit">
        <div class="card-content">
          <span class="card-title">Домашняя бухгалтерия</span>
          <div class="input-field">
            <input id="email" type="text" class="validate" v-model="email" />
            <label for="email">Email</label>
            <small class="helper-text invalid">{{ eMessage }} </small>
          </div>
          <div class="input-field">
            <input
              id="password"
              type="password"
              class="validate"
              v-model="password"
            />
            <label for="password">Пароль</label>
            <small class="helper-text invalid">{{ pMessage }} </small>
          </div>
        </div>
        <div class="card-action">
          <div>
            <button
              class="btn waves-effect waves-light auth-submit"
              type="submit"
              :disabled="isSubmitting"
            >
              Войти
              <i class="material-icons right">send</i>
            </button>
          </div>

          <p class="center">
            Нет аккаунта?
            <router-link to="register">Зарегистрироваться</router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useLoginScript } from "../use/loginScript";
export default {
  setup() {
    document.title = `Вход | crm system`;
    return {
      ...useLoginScript(),
    };
  },
};
</script>