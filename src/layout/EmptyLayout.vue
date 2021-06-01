<template>
    <div>
       <router-view></router-view>
    </div>
</template>

<script>
import messages from '../plugin/messages'
export default {
    computed : {
        error() {
            return this.$store.getters.getError
        }
    },
    watch : {
        error(fbError) {
            const code = (messages[fbError.response.data.error.message]) ?messages[fbError.response.data.error.message] : 'Что-то пошло не так' 
            this.$store.commit('setMessage', code)
            console.dir(fbError);
        }
    }
    
}
</script>