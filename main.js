const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
app.use(cors());
// MySQL连接配置
const pool = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : 'Ywcl8888',
  database : 'the_oasis',
  connectionLimit: 10
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // 执行 SQL 登录查询
  const sql = `SELECT * FROM user WHERE username = '${username}' AND password = '${password}'`;
  pool.query(sql, (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).send('Something went wrong!');
    } else {
      if (results.length === 0) {
        res.status(401).send('请输入正确的用户名与密码');
      } else {
        res.status(200).send('You have successfully logged in!');
      }
    }
  });
});

// 注册
app.post('/register', (req, res) => {
    const { username, password } = req.body; // 从请求对象的body属性中获取用户名和密码
    const sql = 'SELECT * FROM user WHERE username = ?'; // 查询语句
    pool.query(sql, [username], (err, result) => { // 执行查询操作
      if (err) throw err;
      if (result.length > 0) { // 如果查询结果不为空则表示用户名已存在
        res.status(500).send('Something went wrong!');
      } else { // 否则将新用户插入到user表中
        const insertSql = 'INSERT INTO user (username, password) VALUES (?, ?)';
        pool.query(insertSql, [username, password], (err, result) => {
          if (err) throw err;
          res.status(200).send('You have successfully logged in!');
          res.send('注册成功'); // 返回响应信息
        });
      }
    });
  });

app.get('/', (req, res) => {
    const sql = "INSERT INTO user (userName, password) VALUES ('jaychou', '110011')"
    connection.query(sql, (err, results) => {
      if (err) throw err;
      res.send(results);
    });
  });

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});