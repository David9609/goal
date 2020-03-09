<template>
  <div class="main_app">
    <div class="line"></div>
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">任务中心</template>
        <el-menu-item index="/demo/index">今天</el-menu-item>
        <el-menu-item index="/demo/index">本月</el-menu-item>
        <el-menu-item index="/demo/index">年度</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="/demo/index">选项1</el-menu-item>
        <el-menu-item index="/demo/index">选项2</el-menu-item>
        <el-menu-item index="/demo/index">选项3</el-menu-item>
      </el-submenu>
      <el-menu-item index="/demo/index">收藏夹</el-menu-item>
      <el-menu-item index="/demo/index">常用网站</el-menu-item>
    </el-menu>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>今天代办列表</span>
            <el-button style="float: right;padding:4px" type="primary" icon="el-icon-plus" circle></el-button>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            <el-checkbox v-model="checked"></el-checkbox>
            <span> {{'列表内容 ' + o }} </span>
            <el-tag type="warning" style="padding: 1px 1px">标签四</el-tag>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix" style="color:#409EFF">
            <span>本月代办及目标</span>
            <el-button style="float: right;padding:4px;margin-left:3px;" type="primary" icon="el-icon-plus" circle title="添加事项"></el-button>
            <el-button style="float: right;padding:4px;margin-right:4px;" type="primary" icon="el-icon-date" circle title="查看日历试图"></el-button>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{'列表内容 ' + o }}
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix" style="color:#409EFF">
            <span>今年目标</span>
            <el-button style="float: right;padding:4px" type="primary" icon="el-icon-plus" circle></el-button>
            <el-button style="float: right;padding:4px;margin-right:4px;" type="primary" icon="el-icon-date" circle title="查看日历试图"></el-button>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{'列表内容 ' + o }}
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>今天代办列表</span>
            <el-button style="float: right;padding:4px" type="primary" icon="el-icon-plus" circle></el-button>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            <el-checkbox v-model="checked"></el-checkbox>
            <span> {{'列表内容 ' + o }} </span>
            <el-tag type="warning" style="padding: 1px 1px">标签四</el-tag>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card-alter">
          <div slot="header" class="clearfix" style="color:#67C23A">
            <span>总目标</span>
            <el-button style="float: right;padding:4px" type="success" icon="el-icon-plus" circle></el-button>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{'列表内容 ' + o }}
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix" style="color:#409EFF">
            <span>今年目标</span>
            <el-button style="float: right;padding:4px" type="primary" icon="el-icon-plus" circle></el-button>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{'列表内容 ' + o }}
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {Message} from 'element-ui'
export default {
  name: 'newtab',
  data () {
    return {
      tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          tag: '家'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          tag: '公司'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          tag: '家'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          tag: '公司'
        }]
    }
  },
  methods: {
    handleSelect(key, keyPath) {
       Message({
        type: 'info',
        message: `${ key }: ${ keyPath }`
      });
    },
    resetDateFilter() {
      this.$refs.filterTable.clearFilter('date');
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    formatter(row) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    }
  }
}
</script>

<style>
.main_app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 20rpx;
}
 .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
    border-bottom: 1px solid #dbdbdb
  }

  .clearfix {
    font-size: 18px;
    color: #f56c6c;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .el-row {
    margin-top: 3px;
    margin-bottom: 4px;
  }

  .box-card-alter {
    border: 2px solid #f56c6c;
    border-radius: 5px;
  }
</style>
