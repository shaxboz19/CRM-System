<template>
  <div>
    <div class="page-title">
      <h3>Профиль</h3>
    </div>

    <form class="form" @click.prevent="onSubmit">
      <div class="input-field">
        <input id="description" type="text" v-model="name" :blur="nBlur" />
        <label for="description">Имя</label>
        <span class="helper-text" :class="{ invalid: nMessage }"
          >{{ nMessage }}
        </span>
      </div>
      

      <button class="btn waves-effect waves-light" type="submit">
        Обновить
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import M from 'materialize-css'
export default {
  data() {
    document.title = `Профиль | crm system`

    const { handleSubmit } = useForm();
    const { value: name, errorMessage: nMessage, handleBlur: nBlur } = useField(
      "name",
      yup.string().trim().required("Пожалуйста введите ваше имя")
    );


    const onSubmit = handleSubmit(async (val) => {
      console.log(val);
      try {
        await this.$store.dispatch("updateInfo", { name: val.name });
        this.$store.commit("setName", val.name);
      } catch (e) {
        this.$store.commit("setError", e);
        throw e;
      }
    });
    return {
      name,
      nMessage,
      nBlur,
      onSubmit,

    };
  },
  mounted() {
    setTimeout(()=>{
      M.updateTextFields()
    })
  },
  methods: {
    onSubmitting() {
      this.onSubmit();
    },
  },
};
</script>

<style scoped>
  .switch {
    margin-bottom : 20px
  }  
</style>