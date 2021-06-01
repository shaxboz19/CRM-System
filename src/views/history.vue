<template>
<div>
  <div class="page-title">
    <h3>История записей</h3>
  </div>

  <div class="history-chart">
    <canvas ref="canvas" ></canvas>
  </div>
  <app-loader v-if="loading"></app-loader>
  <p class="center" v-else-if="!categories.length">Записей пока нет. <router-link to='/record'>Может добавите первую?</router-link> </p>
  <section v-else>
    <history-table :records = "items"  ></history-table>
    <div class="pagination">
    <Pagination
    v-model="page" 
    :pages="pageCount"
    :range-size="1"
    active-color="#ffa726"
    @update:modelValue="onChangePage"
    
    />
    </div>  
     
  </section>
</div>
</template>


<script>
import appLoader from '../components/app/loader'
import historyTable from '../components/historyTable'
import dateFilter from '../filter/date.filter'
import paginationMixin from '../mixins/pagination.mixin'
import { Pie } from 'vue3-chart-v2'

export default {
    extends : Pie,
    mixins : [paginationMixin,  ],
  data() {
    document.title = `История | crm system`
    return {
      categories : [],
      records : [],
      loading : true,
      
      
    }
  },

 async mounted() {
     this.categories = await this.$store.dispatch('loadCategories');
     const records = await this.$store.dispatch('loadRecords') ;
     this.loading = false
     this.setupTable(records)
     


  },
  methods: {
    setupTable(records) {
       this.records =  records.map(record => {
       return {
         ...record, 
          date : dateFilter(new Date(record.date), 'datetime'),
         categoryName: this.categories.find(c => c.id === record.id).name,
         typeClass: record.type ==='income' ? 'green' : 'red',
         typeText : record.type ==='income' ? 'Доход' : 'Расход',
        categoryId : record.id,
        id : null
       }
       
     })
     this.setupPagination(this.records)
     this.renderChart({
      labels: this.categories.map(c =>c.name),
      datasets: [
        {
          label: 'Расходы',
          backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
             borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1,
            data: this.categories.map(c =>{
              return this.records.reduce((total, r)=>{
                if(c.id === r.categoryId && r.type === 'outcome') {
                  total += +r.amount
                }
                return total
              }, 0)
            })
        }
      ]
      
    },
    )


  
    }
    
   
  },
  components : {
    historyTable, appLoader, 
  },

}
</script>

