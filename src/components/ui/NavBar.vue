<template>
    <nav class="navbar orange lighten-1">
      <div class="nav-wrapper">
        <div class="navbar-left">
          <a href="#" @click.prevent="$emit('click')">
            <i class="material-icons black-text">dehaze</i>
          </a>
          <span class="black-text">{{dateFilter(date, 'datetime')}}</span>
        </div>
          
        <ul class="right hide-on-small-and-down">
          <li>
            <a
                class="dropdown-trigger black-text"
                href="#"
                data-target="dropdown"
                ref="dropdown"
            >
                {{name.value}}
              <i class="material-icons right">arrow_drop_down</i>
            </a>

            <ul id='dropdown' class='dropdown-content'>
              <li>
                <router-link to="/profile" class="black-text">
                  <i class="material-icons">account_circle</i>Профиль
                </router-link>
              </li>
              <li class="divider" tabindex="-1"></li>
              <li>
                <a href.prevent="#" @click="logout" class="black-text">
                  <i class="material-icons">assignment_return</i>Выйти
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
</template>
<script>
import M from 'materialize-css'
import dateFilter from "../../filter/date.filter";
import {ref, onMounted, onUnmounted, computed   } from 'vue'
import {useRouter} from 'vue-router'
import { useStore } from 'vuex';
export default {

  emits : ['click'],
  setup() {
    const store = useStore()
    const router = useRouter()
    const drop = ref('');
    const interval = ref('');
    const date = ref(new Date());
    const dropdown = ref('');
    const name = ref('')

    onMounted(async ()=>{
        interval.value = setInterval(() => {
        date.value = new Date()
      }, 1000);
      drop.value = M.Dropdown.init(dropdown.value)
       const token =store.getters.getToken
      await store.dispatch('load', {token})
      
     
       })
      name.value = computed(()=>{
        return store.getters.name
      })

    
      


    onUnmounted(()=>{
      clearInterval(interval.value);
      if(drop.value) {
        drop.value = null;
     
        
      }
    })

    
    

    return {
      drop, interval, date, dropdown, dateFilter, name,
     async logout(){
       router.push('/login?message=login'); 
       await store.dispatch('logout');
    },
    
    }
  },

    
}
</script>