<template>
  <div id="Border">
    <div id="Name"><h1>Todolist</h1>
      <input type="text" v-model="item" @keyup.enter="Add()" id="First_input">
      <button @click="Add()" >add</button>
    </div>
    <div id="Things">
      <div v-for="(item,index) in items" class="Thing">
        <!-- <input type="checkbox" v-model="item.result">
        <div class="doWhat">{{ item.thing }}</div> -->
        <el-checkbox  v-model="item.result" :label=item.thing size="large"  border />
        <el-button     type="primary" size="large" @click="shanchu(index)" plain>删除</el-button>
        <!-- <button @click="shanchu(index)">删除</button> -->
      </div>
    </div>
    <!-- <button id="tijiao" @click="tijiao">
      提交
    </button> -->
    <el-button     type="success" size="large" @click="tijiao" plain>删除</el-button>
  </div>
</template>
<script setup lang="ts">
import { ref ,onMounted} from "vue";
import axios from "axios"
import { ElCheckbox,ElButton } from "element-plus";

  let items=ref();
  items.value=[{id:0,thing:"吃饭",result:"true"},{id:1,thing:"睡觉",result:"true"},{id:2,thing:"学习",result:"false"},{id:3,thing:"工作",result:"false"}];
  let item=ref('');
  let xyz=items.value
  console.log(items.value)
  onMounted(async () => {
    axios.get('/shuju')
      .then(response => {
        console.log(response.data);
        items.value=response.data
        xyz=response.data
        for(var i=0;i<items.value.length;i++)
        {
          if(items.value[i].result==1)
          {
            items.value[i].result=true
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
    )
  function tijiao(){
    //axios.post('/tijiao',"尝试").then(response=>{console.log(response.data)})
    axios({
    method: 'post',
    url: '/tijiao',
    data: {
      xyz
    }
    }).then(response=>{console.log(response.data)});
  }
  function Add(){
    let new_item={id:items.value.length+1,thing:item.value,result:false}
    items.value.push(new_item)
    item.value=""
  }
  function shanchu(a:number){
    items.value.splice(a,1)
    console.log(a)
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
