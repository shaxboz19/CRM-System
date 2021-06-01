<template>
<div>
  <div class="page-title">
    <h3>Планирование</h3>
    <h4>{{filter(cash)}}  </h4>
  </div>
  <app-loader v-if="loading"></app-loader>
   <p v-else-if="!categories.length " class="center">Категорий пока нет, <router-link to="/categories" >но вы може создать первую</router-link></p>
  <section v-else>
    <div v-for="category of categories" :key="category.id">
      <p>
        <strong>{{category.name}}:</strong>
        {{filter(category.spend)}} из {{filter(category.limit)}}
      </p>
      <div class="progress" v-toolTip="category.toolTip" >
        <div
            class="determinate " :class="category.progressColor"
            :style="{width : category.progressPercent + '%'}"
        ></div>
      </div>
    </div>
  </section>

</div>
</template>

<script>
import filter from '../filter/currency.filter'
import appLoader from '../components/app/loader'

export default {
  data() {
    document.title = `Планирование | crm system`
    return {
      loading : true,
     categories : [],
     filter,
     cash : null
     
    }
  },

  async mounted() {
    const categories = await this.$store.dispatch('loadCategories');
    const records = await this.$store.dispatch('loadRecords') ;
    this.cash = this.$store.getters.info.cash;

    this.loading = false;
    console.log(categories);
    console.log(records);

    this.categories = categories.map(cat =>{
      const spend = records.filter(r=> r.id === cat.id)
      .filter(r=> r.type ==='outcome').reduce((total, record) =>{
        return total += +record.amount
      }, 0 )
      const percent = 100*spend/cat.limit;
      const progressPercent = percent >100 ? 100 : percent 
      const progressColor = percent <= 60 ? 'green' : percent <=100 ? 'yellow' : 'red' 
      const toolTipValue = cat.limit - spend
      const toolTip = `${toolTipValue < 0 ? 'Превышение лимита на ' : 'Вы можете потратить еще  '} ${filter(Math.abs(toolTipValue))}` 
      return {
        ...cat,
        spend,
        progressPercent,
        progressColor,
        toolTip
      } 
    })
    console.log('spend', this.categories);
  },





  components : {
    appLoader
  }

  
}
</script>