<template>
    <div>
      <app-loader v-if="loading"></app-loader>
     <div v-else-if="record">
    <div class="breadcrumb-wrap">
      <router-link to="/history" class="breadcrumb">История</router-link>
      <a @click.prevent class="breadcrumb">
        {{record.typeText}}
      </a>
    </div>
    <div class="row">
      <div class="col s12 m6">
        <div class="card " :class="record.typeClass">
          <div class="card-content white-text">
            <p>Описание: <strong>{{record.description}}</strong> </p>
            <p>Сумма: <strong>{{currencyFilter(record.amount) }}</strong> </p>
            <p>Категория: <strong> {{record.categoryName}} </strong> </p>

            <small>{{record.date}} </small>
          </div>
        </div>
      </div>
    </div>
  </div>
  <p v-else class="center">Запись с таким id = <strong>{{$route.params.id}} </strong> не найден </p>

</div>
    
</template>

<script>
import appLoader from '../components/app/loader'
import dateFilter from '../filter/date.filter'
import currencyFilter from '../filter/currency.filter'
export default {
  data() {
    document.title = `Информация | crm system`
    return {
      record : [],
      loading : true,
      currencyFilter

    }
  },
 async mounted() {
      const record = await this.$store.dispatch('loadRecordById', this.$route.params.id)
      const category = await this.$store.dispatch('loadCategoryById', record.id)
      console.log('record', record);
      console.log('category', category);
     this.record = {
       ...record,
       typeClass : record.type ==='income' ? 'green' : 'red',
       typeText : record.type ==='income' ? 'Доход' : 'Расход',
       date : dateFilter(new Date(record.date), 'datetime'),
       categoryName : category.name
     }
     this.loading =false
    
  },
  components : {
    appLoader
  }
}
</script>