import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
import './assets/css/icon.css';
import './components/common/directives';
import "babel-polyfill";

Vue.config.productionTip = false
Vue.use(ElementUI, {
    size: 'small'
});

Vue.prototype.$http = axios;
axios.defaults.baseURL="http://localhost:8081/"

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    const role = sessionStorage.getItem('role');
    console.log(role)
    console.log(to.path)
    if(to.path=="/login"){
        next();
    }
    else if(role=="2"){
        if(to.path=="/accountManagement"||to.path=="/roleManagement"||to.path=="/taskManagement"||to.path=="/deviceManagement"){
            next('/403');
        }
        else{
            next();
        }
    }
    else{
        next();
    }
})



new Vue({
    router,
    render: h => h(App)
}).$mount('#app')