import {useField, useForm} from 'vee-validate'
import * as yup from 'yup'
//import { useRouter} from 'vue-router'
import { useStore } from 'vuex';
export function useRegisterScript() {
        //const router = useRouter();
        const store = useStore()
        const {handleSubmit, isSubmitting} = useForm()
        const {value : email, errorMessage : eMessage, handleBlur : eBlur} = useField(
            'email', 
            yup.string()
                .required('Пожайлуйста введите ваш email')
                .trim()
                .email('Некоректный email адресс')
        )
        const {value : password, errorMessage : pMessage, handleBlur : pBlur} = useField(
            'password',
            yup.string()
            .trim()
            .required('Пожалуйста введите ваш пароль')
            .min(6, 'Минимальная длина символов 6')
        )
        const {value : name, errorMessage : nMessage, handleBlur : nBlur} = useField(
            'name',
            yup.string()
            .trim()
            .required('Пожалуйста введите ваше имя')
        )
            const onSubmit = handleSubmit(async val=>{
                console.log(val);
               try {
               await store.dispatch('register', val)
               }catch (e) {
                   console.log(e);
               }              
        });
        return {
            email, eMessage, eBlur, password, pMessage, pBlur, name,  nMessage, nBlur,  
             isSubmitting, handleSubmit, onSubmit, 
        }
    
}