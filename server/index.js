const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const mysql = require('mysql2/promise')
const port = 8000

app.use(bodyparser.json())

let users = []

let conn = null

const initMySQL = async () => {
  conn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'my_secret_password',
    database: 'app_db',
    port: 3306
  })
}


app.get('/users',  async(req, res) => {
  const results = conn.query('SELECT * FROM users')
    res.json(results[0])
})


app.get('/users/:id', async(req, res) => {
  try {
    let id = req.params.id
    const results = await conn.query('SELECT * FROM users WHERE id = ?', id)

    if(results[0].length == 0){
      throw {statusCode: 404, message: 'not found' } 
    }
    res.json(results[0][0])
  }catch (error) {
    console.error('error message', error.message)
    let statusCode = error.statusCode || 500
    res.status(statusCode).json({
      message: 'something wrong',
      errorMessage: error.message
    })
  }
})

//path = POST / user

app.post('/user', async (req, res) => {
  try {
    let user = req.body
    const results = await conn.query('INSERT INTO users SET ?', user)
    res.json({
      message: 'insert ok',
      data: results[0]
    })
  }catch(error){
    console.error('error message', error.message)
    res.status(500).json({
      message: 'something wrong',
    })
  }
})

app.put('/user/:id', async (req, res) => {
  
  try {
    let id = req.params.id
    let updateUser = req.body
    const results = await conn.query('UPDATE users SET ? WHERE id = ?', 
      [updateUser, id]
    )
    res.json({
      message: 'update ok',
      data: results[0]
    })
  }catch(error){
    console.error('error message', error.message)
    res.status(500).json({
      message: 'something wrong',
    })
  }
  
})

app.delete('user/:id', async(req, res)=>{
  try {
    let id = req.params.id
    const results = await conn.query('DELETE from users WHERE id = ?', id)
    res.json({
      message: 'delete ok',
      data: results[0]
    })
  }catch(error){
    console.error('error message', error.message)
    res.status(500).json({
      message: 'something wrong',
    })
  }
  


})

app.listen(port, async (req, res) => {
  await initMySQL()
  console.log('http server run at ' + port)
})