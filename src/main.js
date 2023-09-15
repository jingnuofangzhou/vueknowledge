import Vue from 'vue'
import App from './App.vue'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import { Button, Select, Input} from 'element-ui';

Vue.config.productionTip = false
Vue.component(Button.name,Button);
Vue.component(Select.name,Select);
Vue.component(Input.name,Input);
// Vue.use(ElementUI);
new Vue({
  beforeCreate(){
     Vue.prototype.$bus=this;//安装全局事件总线
  },
  render: h => h(App),
}).$mount('#app')
