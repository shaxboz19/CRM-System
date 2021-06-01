import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import firebase from 'firebase/app'
import  'firebase/auth'
import  'firebase/database'
import  'materialize-css/dist/js/materialize.min'
import messagePlugin from './plugin/message.plugin'
import toolTip from './directive/tooltip'
import Pagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";




  firebase.initializeApp({
    apiKey: "AIzaSyBkeDklc3q0qLm9gkh2aFIOCbYaIpfN_28",
    authDomain: "crm-system-86efe.firebaseapp.com",
    databaseURL: "https://crm-system-86efe-default-rtdb.firebaseio.com",
    projectId: "crm-system-86efe",
    storageBucket: "crm-system-86efe.appspot.com",
    messagingSenderId: "594288005875",
    appId: "1:594288005875:web:903ba06c06bb9590dd9d86"
  })
  let app
  firebase.auth().onAuthStateChanged(()=>{
    if(!app) {
      app=createApp(App)
      .use(router).use(store)
      .use(messagePlugin)
      .component('Pagination', Pagination)
      .directive('toolTip', toolTip) 
      .mount('#app')
      
      
    }
  })

  



  
  


