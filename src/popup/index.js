import Vue from "vue";
import AppComponent from "./App/App.vue";
import {Row,Col,Container,Header,Main,Footer,Aside,Card,Table,TableColumn,Button,Checkbox,Tag,Menu,MenuItem,Submenu} from "element-ui"

Vue.component("app-component", AppComponent);
Vue.use(Row)
Vue.use(Col)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Aside)
Vue.use(Card)
Vue.use(Button)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Checkbox)
Vue.use(Tag)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)

new Vue({
  el: "#app",
  render: createElement => {
    return createElement(AppComponent);
  }
});
