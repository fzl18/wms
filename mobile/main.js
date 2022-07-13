import Vue from 'vue'
import App from './App'
import store from './store'
import uView from '@/uni_modules/uview-ui';
Vue.use(uView);
Vue.prototype.islogin = function() {
	var isLogin = uni.getStorageSync('login');
	if (!isLogin) {
		uni.navigateTo({
			url: '../login/login'
		});
		return false
	}else{
		return true
	}
}

Vue.config.productionTip = false

App.mpType = 'app'

var app = new Vue({
	...App,
	store
})
app.$mount()
