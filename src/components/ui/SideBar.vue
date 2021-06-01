<template>
     <ul :class="{'open' : value}" class="sidenav app-sidenav" >
      <router-link
        v-for="link of links" :key="link.url"
        :to="link.url"
        custom
        v-slot="{navigate, isExactActive }"
        >
        <li :class="[isExactActive  && 'active']" >
        <a href="#" @click="navigate" class=" waves-orange pointer">{{link.title}}</a></li>
      </router-link>
     </ul>
</template>

<script>
export default {
    props : ['value'],
    data() {
        return {
            links : [
                {title : 'Счет', url : '/'},
                {title : 'История', url : '/history'},
                {title : 'Планирование', url : '/planning'},
                {title : 'Новая запись', url : '/record'},
                {title : 'Категории', url : '/categories'},
            ]
        }
    },
    mounted() {
        console.log('open', this.value);
    },
}
</script>

<style scoped>
    .sidenav{
        min-height: 100vh;
        
    }
    
   
    
</style>