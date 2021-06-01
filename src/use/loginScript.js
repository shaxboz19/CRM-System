import {useField, useForm} from 'vee-validate'
import * as yup from 'yup'
import {useStore} from 'vuex'
import { useRouter, useRoute} from 'vue-router'
import messages from '../plugin/messages'
export function useLoginScript() {
         const router =useRouter();
         const route = useRoute()
         const store = useStore(); 
        const {handleSubmit, isSubmitting} = useForm();
            const {value : email , errorMessage : eMessage, handleBlur : eBlur} = useField(
                'email',
                yup.string()
                .trim()
                    .required('Пожалуйста введите email')
                    .email('Некоректный email адресс') 
            );
            const {value : password, errorMessage: pMessage, handleBlur : pBlur} = useField(
                'password',
                yup.string()
                .trim()
                    .required('Пожалуйста введите пароль')
                    .min(6, 'Минимальная длина символов 6')
            )
                const onSubmit =handleSubmit(async val =>{
                    try {
                     await store.dispatch('login', val)
                            router.push('/')    
                    } catch(e){
                        console.log(e);
                    }
                })
        if(messages[route.query.message]) {
            store.commit('setMessage', messages[route.query.message])
            
            }
            return {
                email,
                eMessage,
                eBlur, 
                password,
                pMessage,
                pBlur,
                handleSubmit,
                isSubmitting, onSubmit, 
                
            }

    }
