<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{showTitle}}</span>
        <span>{{content}}</span>
        <el-button v-if="dateStep >= 0" @click="addClick" style="float: right;padding:4px" type="primary" icon="el-icon-plus" circle></el-button>
      </div>
      <!-- <el-row :gutter="24">
        <el-col :span="24"> -->
      <div v-for="(item,index) in list" :key="index" :class="[item.isFinished?'finished':'','text item']" >
        <el-row :gutter="24">
          <el-col :span="3">
            <el-checkbox @change="stateChange(item)" :data-index="index" style="margin-top:20px" v-model="item.isFinished"></el-checkbox>
          </el-col>
          <el-col :span="18">
            <el-row :gutter="24">
              <el-col :span="24">
                  {{item.title}}
              </el-col>
            </el-row>
              <el-row :gutter="24">
              <el-col :span="24">
                  <el-tag type="warning" >{{item.levelText}}</el-tag>
                  <el-tag type="success" >{{item.useTime}}{{
                    getUnitText(item.unit)
                    }}</el-tag>
              </el-col>
            </el-row>
          </el-col>
          <el-col v-if="!item.isFinished" :span="3">
            <div style="padding: 10px 2px;">
              <a href="#" style="cursor:hand"><i class="el-icon-setting" style="cursor:hand" @click="modifyItem(item,index)"></i></a>
              <a href="#" style="cursor:hand"><i class="el-icon-delete" style="cursor:hand" @click="deleteItem(item,index)"></i></a>
            </div>
          </el-col>
        </el-row> 
        <!-- <el-tag type="success" style="padding: 1px 1px;height: auto;line-height: 16px;">{{Math.floor((index-1)/2) + 5}}{{ index%2 === 1? ':00': ':30'}}</el-tag> -->
        <!-- <el-checkbox v-model="item.isFinished"></el-checkbox>
        <span> {{item.title}} </span>
        <el-tag type="warning" style="padding: 1px 1px;height: auto;line-height: 16px;">{{item.levelText}}</el-tag>
        <el-tag type="success" style="padding: 1px 1px;height: auto;line-height: 16px;">预计用时{{item.useTime}}{{
          getUnitText(item.unit)
          }}</el-tag> -->
      </div>
      <div  class="clearfix" v-if="type != 0">
        <a href="#" style="cursor:hand"> <i class="el-icon-back"  style="float:left" @click="pre()"></i></a>
        <a href="#" style="cursor:hand"><i class="el-icon-right"  style="float:right" @click="next()"></i></a>
      </div>
        <!-- </el-col>
      </el-row> -->
    </el-card>
    <!-- 添加任务 -->
    <el-dialog title="添加任务"  width="40%" :visible.sync="taskDialogVisible">
      <el-form :model="taskForm">
        <el-form-item label="任务名:" :label-width="formLabelWidth">
          <el-input style="width: 250px" v-model="taskForm.title" autocomplete="off" placeholder="任务名"></el-input>
        </el-form-item>
        <el-form-item label="等级:" :label-width="formLabelWidth">
           <el-select style="width: 250px" v-model="taskForm.level" placeholder="请选择">
            <el-option
              v-for="item in levelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="预计用时:" :label-width="formLabelWidth">
           <el-select style="width: 100px" v-model="taskForm.unit" placeholder="请选择">
            <el-option
              v-for="item in unitOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
           <el-input style="width: 150px" v-model="taskForm.useTime" autocomplete="off" placeholder="用时"></el-input>
        </el-form-item>
        <el-form-item label="对应目标:" :label-width="formLabelWidth">
           <el-select style="width: 250px" v-model="taskForm.parentTaskId" placeholder="请选择">
            <el-option
              v-for="item in parentTasks"
              :key="item.id"
              :label="item.title"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务描述:"   :label-width="formLabelWidth">
          <el-input  type="textarea"  style="width: 250px" rows="5"  v-model="taskForm.introduce" autocomplete="off"  placeholder="请填写任务描述"></el-input>
        </el-form-item>
      </el-form>
   
      <div slot="footer" class="dialog-footer">
        <el-button @click="taskDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitTask">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'DayTodoList',
  props: ['title', 'content', 'todoList', 'type'],
  data () {
    return {
      checked: false,
      dateIndex: 0,
      yearIndex: 2020,
      formLabelWidth: '120px',
      showTitle: '',
      taskDialogVisible: false,
      taskForm: {
        id: 0,
        title:'',
        parentTaskId: null,
        level: null,
        introduce: '',
        tType: null,
        dateindex: 0,
        yearindex: 2020,
        useTime: null,
        unit: null
      },
      dateStep: 0,
      yearStep: 0,
      parentTasks: [],
      levelOptions: [{
          value: 1,
          label: '重要紧急'
        }, {
          value: 2,
          label: '重要不紧急'
        }, {
          value: 3,
          label: '不重要紧急'
        }, {
          value: 4,
          label: '不重要不紧急'
        }],
      unitOptions: [
        {
          value: 1,
          label: '年'
        }, {
          value: 2,
          label: '月'
        }, {
          value: 3,
          label: '日'
        }, {
          value: 4,
          label: '时'
        }, {
          value: 5,
          label: '分'
        }
      ],
      list: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    getParentTask (yearIndex,dateIndex,type) {
      let _this = this
      chrome.storage.sync.get('userInfo', function(data) {
        
        if (data && data.userInfo) {
          let access_token = data.userInfo.access_token
        let url = 'https://api.shuhai360.com/wx/todo/list'
        const options = {
          method: 'GET',
          headers: { 'content-type': 'application/json','access_token': access_token},
          params: {'yearIndex' : yearIndex,'dateIndex': dateIndex,'type': type},
          url: url,
        }
        axios(options).then(function (response) {
          console.log(response.data)
          if (response.data.errno === 0) {
            _this.parentTasks =response.data.data
          } else if (response.data.errno === 501) {
             _this.$emit('showLogin',{})
          }
        })
        } else {
          _this.$emit('showLogin',{})
        }
      })
    }, 
    init (dateStep) {
      console.log('type ' + this.type)
      var today = new Date()
      this.yearIndex = today.getFullYear()
      let unit = ""
      console.log(this.unitOptions.count)
      // 总
      if (this.type == 0) {
        this.dateIndex = 0
        this.yearIndex =0
        if(this.unitOptions.length === 5)
          this.unitOptions.splice(2,3)
        
      } else if (this.type == 1) {
        this.yearIndex = this.yearIndex + this.dateStep
        this.dateIndex = this.yearIndex
        unit = '(' + this.dateIndex + '年)'
        if(this.unitOptions.length === 5)
          this.unitOptions.splice(2,3)
        
        this.getParentTask(0,0,0)
      } else if (this.type == 2) {
        this.dateIndex = today.getMonth() + 1
        this.dateIndex = this.dateIndex + this.dateStep
        unit = '(第' + this.dateIndex + '月)'
        if(this.unitOptions.length === 5) {
          this.unitOptions.splice(0,1)
          this.unitOptions.splice(3,1)
        }
        this.getParentTask(this.yearIndex,this.yearIndex,1)
      } else if (this.type == 3) {
        this.dateIndex = this.getWeekNumber(today)
        this.dateIndex = this.dateIndex + this.dateStep
        unit = '(第' + this.dateIndex + '周)'
        if(this.unitOptions.length === 5) {
          this.unitOptions.splice(0,2)
        }

        this.getParentTask(this.yearIndex,today.getMonth() + 1,2)

      } else if (this.type == 4) {
        this.dateIndex = this.getDayNumber(today)
        this.dateIndex = this.dateIndex + this.dateStep
        unit = '(第' + this.dateIndex + '天)'
        if(this.unitOptions.length === 5) {
          this.unitOptions.splice(0,2)
        }
        this.getParentTask(this.yearIndex,this.getWeekNumber(today),3)
      }
      this.taskForm.dateindex = this.dateIndex
      this.taskForm.yearindex = this.yearIndex
      this.taskForm.tType = this.type
      this.showTitle = (this.dateStep ==0 ? this.title :"")+ unit
      console.log(this.showTitle)
      this.getData()
    },
    pre () {
      this.dateStep --
      this.init(this.dateStep)
    },
    next () {
      this.dateStep ++
      this.init(this.dateStep)
    },
    submitTask () {
      let _this = this
      chrome.storage.sync.get('userInfo', function(data) {
       
        if (data && data.userInfo ) { 
          let access_token = data.userInfo.access_token
        let url = 'https://api.shuhai360.com/wx/todo/add'
        if(_this.taskForm.id >0) {
          url = 'https://api.shuhai360.com/wx/todo/modify'
        }
        const options = {
          method: 'POST',
          headers: { 'content-type': 'application/json','access_token': access_token},
          data: _this.taskForm,
          url: url,
        }
        axios(options).then(function (response) {
          console.log(response.data)
          if (response.data.errno === 0) {
            _this.taskDialogVisible = false
            if(_this.taskForm.id < 1) {
              _this.list.push(_this.taskForm)
            }
          } else if (response.data.errno === 501) {
            // todo
            _this.$emit('showLogin',{})
            // _this.loginDialogVisible = true
          }
        })
        } else {
          _this.$emit('showLogin',{})
        }
      })
      
    },
    modify (item) {
      let _this = this
      chrome.storage.sync.get('userInfo', function(data) {
        
        
        if (data && data.userInfo) { 
          let access_token = data.userInfo.access_token
        let url = 'https://api.shuhai360.com/wx/todo/modify'
        const options = {
          method: 'POST',
          headers: { 'content-type': 'application/json','access_token': access_token},
          data: item,
          url: url,
        }
        axios(options).then(function (response) {
          console.log(response.data)
          if (response.data.errno === 0) {
            _this.taskDialogVisible = false
          } else if (response.data.errno === 501) {
            _this.$emit('showLogin',{})
          }
        })
        } else {
          _this.$emit('showLogin',{})
        }
      })
    },
    modifyItem (item, index) {
      this.taskForm = item
      this.taskDialogVisible = true
    },
    deleteItem (item, index) {
      item.deleted = true
      this.modify(item)
      this.list.splice(index,1)
    },
    stateChange (item, val) {
      let _this = this
      chrome.storage.sync.get('userInfo', function(data) {
        
        
        if (data && data.userInfo ) { 
        let access_token = data.userInfo.access_token
        let url = 'https://api.shuhai360.com/wx/todo/modify'
        const options = {
          method: 'POST',
          headers: { 'content-type': 'application/json','access_token': access_token},
          data: item,
          url: url,
        }
        axios(options).then(function (response) {
          console.log(response.data)
          if (response.data.errno === 0) {
            _this.taskDialogVisible = false
          } else if (response.data.errno === 501) {
             _this.$emit('showLogin',{})
          }
        })
        } else {
          _this.$emit('showLogin',{})
        }
      })
    },
    getUnitText (unit) {
      return  unit == 1? '年': unit == 2?'月': unit == 3?'日': unit == 4?'时': unit == 5?'分': unit == 6?'秒':''
    },
    // 获取基础数据
    getData () {
      let _this = this
      chrome.storage.sync.get('userInfo', function(data) {
        
        if (data && data.userInfo ) {
          let access_token = data.userInfo.access_token
        let url = 'https://api.shuhai360.com/wx/todo/list'
        const options = {
          method: 'GET',
          headers: { 'content-type': 'application/json','access_token': access_token},
          params: {'yearIndex' :_this.yearIndex,'dateIndex':_this.dateIndex,'type': _this.type},
          url: url,
        }
        axios(options).then(function (response) {
          console.log(response.data)
          if (response.data.errno === 0) {
            _this.list =response.data.data
          } else if (response.data.errno === 501) {
             _this.$emit('showLogin',{})
          }
        })
        } else {
          _this.$emit('showLogin',{})
        }
      })
    },
    getDayNumber (d) {
      var start = new Date(d.getFullYear(), 0, 0)
      var diff = d - start
      var oneDay = 1000 * 60 * 60 * 24
      var day = Math.floor(diff / oneDay)
      console.log('Day of year: ' + day)
      return day
    },
    getWeekNumber (d) {
      // Copy date so don't modify original
      d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
      // Set to nearest Thursday: current date + 4 - current day number
      // Make Sunday's day number 7
      d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7))
      // Get first day of year
      var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1))
      // Calculate full weeks to nearest Thursday
      var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7)
      // Return array of year and week number
      return  weekNo
    },
    addClick: function () {
      console.log('add click')
      this.taskDialogVisible = true
      // this.$emit('addClick' , { tType:this.type,dateIndex:this.dateIndex, yearIndex:this.yearIndex})
    }
  }
}
</script>

<style>
.el-tag {
  padding: 1px 1px !important;
  height: auto !important;
  line-height: 16px !important;
  margin: 5px 2px  !important;
}
.finished {
  background-color:  rgba(103,194,58,0.2) !important;
  border-radius: 7px;
}
.item {
  background-color:  rgba(236, 245, 255,0.2);
  border-radius: 7px;
}
</style>
