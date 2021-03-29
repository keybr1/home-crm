import Vue from "vue";
import Vuelidate from "vuelidate";
import Paginate from 'vuejs-paginate';
import VueMeta from 'vue-meta';
import App from "./App.vue";
import router from "./router";
import store from "./store";
import dateFilter from "@/filters/date.filter";
import currencyFilter from "@/filters/currency.filter";
import localizeFilter from "@/filters/locale.filter";
import titlePlugin from '@/utils/title.plugin';
import messagePlugin from "@/utils/message.plugin";
import tooltipDirective from "./directives/tooltip.directive";
import Loader from "./components/app/Loader";
import "./registerServiceWorker";
import "materialize-css/dist/js/materialize.min";

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

Vue.config.productionTip = false;
Vue.use(messagePlugin)
Vue.use(titlePlugin)
Vue.use(Vuelidate)
Vue.use(VueMeta)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.filter('locale', localizeFilter)
Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)
Vue.directive('tooltip', tooltipDirective)


firebase.initializeApp({
    apiKey: "AIzaSyCL6n6m1pcJQVFECqff7qNWB5Gr78zypEQ",
    authDomain: "vue-crm-keybr.firebaseapp.com",
    databaseURL: "https://vue-crm-keybr-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "vue-crm-keybr",
    storageBucket: "vue-crm-keybr.appspot.com",
    messagingSenderId: "94393605635",
    appId: "1:94393605635:web:3f762c34ea2580d7527836"
})

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
})


