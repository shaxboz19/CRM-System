<template>
    <div class="col s12 m6 l8">
      <div class="card orange darken-3 bill-card">
        <div class="card-content white-text">
          <div class="card-header">
            <span class="card-title">Курс валют</span>
          </div>
          <table>
            <thead>
            <tr>
              <th>Валюта</th>
              <th>Курс</th>
              <th>Дата</th>
            </tr>
            </thead>

            <tbody>
            <tr v-for="(cur, idx) of currencies" :key="idx" >
              <td>{{cur}} </td>
              <td>{{rates[cur].toFixed(5)}} </td>
              <td>{{dateFilter(date)}} </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
</template>

<script>
import dateFilter from '../../filter/date.filter'
export default {
  props: ['date', 'rates' ],
  data() {
    return {
      currencies : ['UZS', 'RUB', 'USD', 'EUR']
    }
  },
  methods: {
    dateFilter
  },
}
</script>