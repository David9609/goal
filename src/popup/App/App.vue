<template>
  <div class="main_app">
    <day-todo-list />
  </div>
</template>

<script>
import {Message} from 'element-ui'
import DayTodoList from '@/components/DayTodoList'
import Favorites from '@/components/Favorites'
export default {
  name: 'newtab',
  components: {
    DayTodoList,Favorites
  },
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
  width: 600px;
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
