<template>
      <div class="col s12 m6 l4">
      <div class="card light-blue bill-card">
        <div class="card-content white-text">
          <span class="card-title">Счет в валюте</span>

          <p v-for="(cur, idx) of currencies" :key="idx"
           class="currency-line">
            <span>{{formatCurrency(getCurrency(cur), cur)  }}</span>
          </p>
        </div>
      </div>
    </div>
</template>

<script>
import formatCurrency from '../../filter/currency.filter'
export default {
    props : ['rates', ],

    data() {
        return {
            currencies : ['UZS', 'RUB', 'USD'],                 
        }
    },   
    computed :{
        base() {
           return  this.$store.getters.info.cash / (this.rates['UZS']/this.rates['EUR'])
        }
    },
    methods: {
      getCurrency(currency) {
        return Math.ceil(this.base * this.rates[currency]);  
      },
      formatCurrency    
    },
   
}
</script>