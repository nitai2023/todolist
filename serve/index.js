const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('E:\\sqlite\\test.db');
const port = 3000;
// 获取所有用户
const cors = require('cors')
app.use(cors())
app.get('/', function(req, res) {
  db.all('SELECT * FROM todolist', (err, rows) => {
    if(rows){
      res.send(rows)

    }  
    
  });

});
// 终端打印如下信息
app.listen(port, function() {
  console.log('Server is running on port ' + port);
});