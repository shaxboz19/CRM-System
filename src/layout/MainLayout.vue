<template>
    <div>
        
    <div class="app-main-layout" >
     <main :class="{'app-content' : true, full : !isOpen} " >
      <div class="app-page">
          <nav-bar @click="click" ></nav-bar>
          <side-bar :value = 'isOpen'></side-bar>
       <router-view></router-view>
    </div>
 </main>
 
<div class="fixed-action-btn">
  <router-link class="btn-floating btn-large blue" to="/record" v-toolTip= " 'Создать новую запись' ">
    <i class="large material-icons">add</i>
  </router-link>
</div>
</div>
    </div>
</template>

<script>

import NavBar from '../components/ui/NavBar'
import SideBar from '../components/ui/SideBar'
export default {
    data() {
        return {
            isOpen : true
         
        }
    },
    methods: {
        click() {
            this.isOpen = !this.isOpen;
        }
    },
   async mounted() {
       const token = this.$store.getters.getToken
      await this.$store.dispatch('load', {token})
        
    },
    
    
    
   
    components : {
        NavBar,
        SideBar, 
    }
}
</script>