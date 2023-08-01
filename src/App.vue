<template>
  <div id="Border">
    <div id="Name"><h1>Todolist</h1>
    <input type="text" v-model="item"><button @click="Add()">add</button></div>
    <div id="Things"><div v-for="(item,index) in items" class="Thing"><input type="checkbox" v-model="item.result"><div class="doWhat">{{ item.thing }}</div><button @click="shanchu(index)">删除</button></div></div>
  </div>
</template>
<script setup lang="ts">
import { ref ,onMounted} from "vue";
import axios from "axios"
  let items=ref();
  items.value=[{id:0,thing:"吃饭",result:"true"},{id:1,thing:"睡觉",result:"true"},{id:2,thing:"学习",result:"false"},{id:3,thing:"工作",result:"false"}];
  let item=ref('');
  console.log(items.value)
  const posts = ref([])
  onMounted(async () => {
    axios.get('/')
      .then(response => {
        console.log(response.data);
        items.value=response.data
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
      })
      .catch(error => console.log(error));
  }
    )
  function Add(){
    let new_item={thing:item.value,result:"false"}
    items.value.push(new_item)
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
  }
  .Thing{
    margin-top: 5%;
    display: flex;
    justify-content: space-between;
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