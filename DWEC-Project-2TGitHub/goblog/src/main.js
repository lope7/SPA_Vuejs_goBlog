import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import LastEntries from './components/LastEntries.vue';
import Use from './components/Use.vue';
import Album from './components/Album.vue';
import ErrorComponent from './components/ErrorComponent.vue';
import Search from './components/Search.vue';
import Redirect from './components/Redirect.vue';
import Entry from './components/Entry.vue';
import CreateEntry from './components/CreateEntry.vue';
import EditEntry from './components/EditEntry.vue';


Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(require('vue-moment'));

const routes = [
  {path: '/home', component: LastEntries},
  {path: '/', component: LastEntries},
  {path: '/use',component:Use},
  {path: '/blog', component: Blog},
  {path: '*', component: ErrorComponent},
  {path: '/search/:searchString', component: Search},
  {path: '/redirect/:searchString', component: Redirect},
  {path: '/entry/:id', name: 'entry', component: Entry},
  {path: '/create-entry', name: 'create', component: CreateEntry},
  {path: '/edit/:id', name: 'edit', component: EditEntry},
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
