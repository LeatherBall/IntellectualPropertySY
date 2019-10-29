import Vue from 'vue'
import App from './App'
import uniIcons from './components/uni-icons/uni-icons.vue'
import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"

Vue.config.productionTip = false

// Vue.prototype.$servicePath = 'http://192.168.141.203:98/TradeArea/';
Vue.prototype.$servicePath = 'http://218.60.25.133/TradeArea/';

Vue.component('uni-icons', uniIcons);
Vue.component('uni-load-more', uniLoadMore)

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
