<template>
  <div id="Border">
    <div id="Name"><h1>Todolist</h1>
      <el-progress :percentage=progress status="success" />
      <el-input v-model="item" @keyup.enter="Add()" placeholder="Please input"   size="large" style="width: 300px"/>
      <el-button @click="Add()" size="large" type="primary" plain><el-text  size="large">添加</el-text></el-button>
    </div>
    <div id="Things">
      <div v-for="(item,index) in items" class="Thing">
        <el-checkbox  v-model="item.result" :label=item.thing size="large"  border />
        <el-button     type="warning" size="large" @click="deletes(index)" plain><el-text  size="large">删除</el-text></el-button>
      </div>
    </div>
    <el-button  type="success" size="large" @click="refresh" plain><el-text  size="large">更新</el-text></el-button>
    <el-button  type="success" size="large" @click="change" plain><el-text  size="large">提交</el-text></el-button>
  </div>
</template>
<script setup lang="ts">
import { ref ,onMounted} from "vue";
import axios from "axios"
import { ElCheckbox,ElButton,ElText,ElInput,ElProgress } from "element-plus";

  let items=ref();
  items.value=[{id:0,thing:"吃饭",result:"true"},{id:1,thing:"睡觉",result:"true"},{id:2,thing:"学习",result:"false"},{id:3,thing:"工作",result:"false"}];
  let item=ref('');
  let progress=ref(0)

  onMounted(async () => {
    refresh()
  }
    )
const change=async()=>{
  let xyz=items.value
  console.log(xyz)
    axios({
    method: 'post',
    url: '/tijiao',
    data: {
      xyz
    }
    }).then(response=>{console.log(response.data)});

  }
const refresh=async()=>{
  axios.get('/shuju')
      .then(response => {
        items.value=response.data
        for(var i=0;i<items.value.length;i++)
        {
          if(items.value[i].result==1)
          {
            items.value[i].result=true
            progress.value+=100/items.value.length
          }
          else{
            items.value[i].result=false
          }
        }
        for(i=0;i<items.value.length;i++)
        {
          for(var j=0;j<items.value.length-i;j++)
          {
            if(items.value[j]>items.value[j+1])
            {
              [items.value[j+1],items.value[j]] = [items.value[j],items.value[j+1]]
            }
          }
        }
      })
      .catch(error => console.log(error));
}
const Add=async()=>{
  let new_item={thing:item.value,result:0}
  item.value=""
    axios({
    method: 'post',
    url: '/add',
    data: {
      new_item
    }
    }).then(response=>{
      
    });
  refresh()
}
const deletes=async(index:number)=>{
  var chose_id=items.value[index].id
  axios({
    method: 'post',
    url: '/delete',
    data: {
      chose_id
    }
    }).then(res=>{

    });
    refresh()
}
</script>
<style scoped>
  #Border{
    position: absolute;
    width: 30%;
    height: auto;
    left: 35%;
    top: 25%;

  }
  #Name{
    position: relative;
    margin: auto;
    width: 100%;
    height: 30%;

    text-align: center;
    padding: auto;

  }
  h1{
    position: relative;
    width: 100%;
    height: 50%;
    /*top: 25%;
    left: 25%;*/
    text-align: center;
    font-size: 50px;

  }
  #Things{
    display: flex;
    justify-content: space-between;
    align-self: center;
    flex-wrap: wrap;
  }
  .Thing{
    margin-top: 5%;
    display: flex;
    justify-content: space-between;
    padding-left: 10px;
  }
  .doWhat{
    display: flex;
    justify-content: center;
    align-self: center;

  }
  #Things input{
    position: relative;
    margin-top: 10%;
    width: 30px;
    height: 30px;
  }

</style>
