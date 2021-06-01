<template>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Сумма</th>
          <th>Дата</th>
          <th>Категория</th>
          <th>Тип</th>
          <th>Открыть</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(r, idx) in records" :key="r.id">
          <td>{{idx+1}} </td>
          <td>{{filterCurrency(r.amount)}} </td>
          <td>{{r.date}} </td>
          <td>{{r.categoryName}} </td>
          <td>
            <span class="white-text badge" :class="[r.typeClass]">{{r.typeText}} </span>
          </td>
          <td>
            <button class="btn-small btn"
             @click.prevent="$router.push('/detail/' + r.recordId)"
             v-toolTip = " 'Посмотреть запись' "
             >
              <i class="material-icons">open_in_new</i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
</template>

<script>
import filterCurrency from '../filter/currency.filter'
export default {
    props : {
        records : {
            type : Array,
            required : true
        }
    },
    data() {
        return {
        filterCurrency
        }
    },    
}
</script>