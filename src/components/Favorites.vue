<template>
   <el-row class="tac">
        <el-col :span="12">
            <h5>收藏夹 {{msg}}</h5>
            <el-menu
                default-active="0"
                class="el-menu-vertical-demo"
                @select="menuSelected"
                background-color="#F0F6F6"
                text-color="#3C3F41"
                active-text-color="black">
                <nav-menu :navMenus="leftMenus"></nav-menu>
            </el-menu>
        </el-col>
    </el-row>
</template>

<script>
import NavMenu from './navMenu'

export default {
    name: 'Favorites',
    components: {
        NavMenu
    },
    data () {
        return {
            checked: false,
            menu: {},
            leftMenus: {},
            msg: ''
        }
    },
    created () {
        let _this = this
        console.log('........'); 
        chrome.bookmarks.getTree(function (itemTree) {
           itemTree.forEach(function(item) {
               _this.processNode(item);
           });
        })
    },
    methods: {
        processNode (node) {
            let _this = this
            if(node.children) {
                node.children.forEach(function(child) { _this.processNode(child); });
                // console.log('文件夹名:' + node.title)
            } else {
            }

            // print leaf nodes URLs to console
            if(node.url) { 
                // console.log(node.title +"\t"+ node.url); 
            }
        },
        menuSelected (node) {

        }
    }
}
</script>
