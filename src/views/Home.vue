<template>
<div>
  <div class="page-title">
    <h3>Счет</h3>
    <button class="btn waves-effect waves-light btn-small" @click = 'refresh'>
      <i class="material-icons">refresh</i>
    </button>
  </div>
    <app-loader v-if="loading"></app-loader>
  <div class="row" v-else >
    <app-homebill :rates ='currency.rates' :info ='info' ></app-homebill>
    <app-currency :date = 'currency.data' :rates = 'currency.rates'></app-currency>
  </div>

<div class="fixed-action-btn">
  <a class="btn-floating btn-large blue" href="#">
    <i class="large material-icons">add</i>
  </a>
</div>
</div>
    
</template>

<script>
// @ is an alias to /src
 import appLoader from '../components/app/loader'
 import appHomebill from '../components/app/homeBill'
 import appCurrency from '../components/app/homeCurrency'


export default {
  name: 'Home',
  
  components:{
    appLoader, appHomebill, appCurrency
  },
  data() {
    document.title = `Главная | crm system`
    return {
    loading : true,
    currency : null, 
    info : {} 
        }
  },
  async mounted() {
    if(!this.$store.getters.info) {
         const token = this.$store.getters.getToken
         await this.$store.dispatch('load', {token})
      this.info = this.$store.getters.info
            
    } 
    
    this.currency = await this.$store.dispatch('getCurrency')
    this.loading = false
  },
  methods: {
   async refresh() {
    await this.$store.dispatch('getCurrency')
   }
  },
  
  

}
</script>
