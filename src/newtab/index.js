import Vue from "vue";
import AppComponent from "./App/App.vue";
import {Select, Option, Form, FormItem,Input,Row,Col,Container,Header,Main,Footer,Aside,Card,Table,TableColumn,Button,Checkbox,Tag,Menu,MenuItem,MenuItemGroup,Submenu,Dialog } from "element-ui"

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
Vue.use(MenuItemGroup)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)

new Vue({
  el: "#app",
  render: createElement => {
    return createElement(AppComponent);
  }
});