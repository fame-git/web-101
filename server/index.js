const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const port = 8000

app.use(bodyparser.json())

let users = []
let counter = 1


app.get('/users', (req, res) => {
  res.json(users)
})

//path = POST / user

app.post('/user', (req, res) => {
  let user = req.body
  user.id = counter
  counter += 1
  users.push(user)
  res.json({
    message: 'add ok',
    user: user
  })
})

app.put('/user/:id', (req, res) => {
  let id = req.params.id
  let updateUser = req.body
  //find user
  let selectedIndex = users.findIndex(user => user.id == id)

  //update that user
  users[selectedIndex].firstname = updateUser.firstname || users[selectedIndex].firstname
  users[selectedIndex].lastname = updateUser.lasttname || users[selectedIndex].lastname

  res.json({
    message: 'update user complete',
    data: {
      user: updateUser,
      indexUpdate: selectedIndex,
    }
  })
})

app.listen(port, (req, res) => {
  console.log('http server run at ' + port)
})