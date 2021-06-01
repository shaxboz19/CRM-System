<template>
  <div>
    <component :is='layout'>
      <router-view></router-view>
    </component>
  </div>
  
</template>
<script>
import EmptyLayout from './layout/EmptyLayout';
import MainLayout from './layout/MainLayout'

export default {
   metaInfo: {
      // title will be injected into parent titleTemplate
      title: 'About Us'
    },
  components : {
    EmptyLayout, MainLayout
  },
  computed: {
    layout() {
      console.log(this.$route.meta);
      return (this.$route.meta.layout || 'empty') + '-layout'
    }
  },

  
}
</script>

<style>
@import '~materialize-css/dist/css/materialize.min.css';
@import './assets/index.css';

</style>
