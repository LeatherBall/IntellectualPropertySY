import Vue from 'vue'
import App from './App'
import uniIcon from './components/uni-icon/uni-icon.vue'


Vue.config.productionTip = false

Vue.prototype.$formatRes = function(res) {
	return JSON.parse(res.data.substring(1, res.data.length - 1))
}

Vue.component('uni-icon', uniIcon);

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
