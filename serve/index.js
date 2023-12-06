const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('E:\\sqlite\\test.db');
const port = 4000;
// 获取所有用户
const cors = require('cors')
app.use(cors())
app.use(bodyParser.json());
app.get('/shuju', function(req, res) {
  db.all('SELECT * FROM todolist', (err, rows) => {
    if(rows){
      res.send(rows)
    }  
  });
});
let j=0
app.post('/tijiao',function(req,res){
  const data = req.body;
  const dataArray = Object.values(data.xyz);
  let i=0;
  db.get(`SELECT COUNT(*) AS lieshu FROM todolist`,(err,row)=>{
    if (err) 
    {
      console.error('Failed to get row count:', err);
    } 
    else 
    {
      console.log(row.lieshu)
      j=row.lieshu//lieshu是数据库的列数，j用来判断是否需要新增或者删除。
      for(i;i<dataArray.length;i++)
      {
          db.run(`UPDATE todolist SET thing=${"'"+dataArray[i].thing+"'"}  WHERE id = ${dataArray[i].id}`)//更新行
          db.run(`UPDATE todolist SET result=${dataArray[i].result}  WHERE id = ${dataArray[i].id}`)
      }
    }
  })

  res.send("更新成功");
})
app.post('/delete',function(req,res){
  const data = req.body.chose_id;
  db.run(`DELETE FROM todolist WHERE id=${data};`)//删除行
  res.send("删除成功！");
})
app.post('/add',function(req,res){
  const data = req.body.new_item;
  db.run(`INSERT INTO todolist (id,thing,result) VALUES (null,${"'"+data.thing+"'"},${data.result});`)//新增行
  res.send("添加成功");
})
// 终端打印如下信息
app.listen(port, function() {
  console.log('Server is running on port ' + port);
});