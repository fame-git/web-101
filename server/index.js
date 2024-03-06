const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const port = 8000

app.use(bodyparser.json())

let users = []
let counter = 1


app.get('/users', (req, res) => {
  const filterUsers = users.map(user => {
    return {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      fullname: user.firstname + ' ' + user.lastname
    }
  })
  res.json(filterUsers)
})


app.get('/users/:id', (req, res) => {
  let id = req.params.id

  let selectedIndex = users.findIndex(user => user.id == id)
 
  res.json(users[selectedIndex])
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


  //patch approach
  //update that user
  // if (updateUser.firstname){
  //   users[selectedIndex].firstname = updateUser.firstname
  // }
  // if (updateUser.lastname) {
  //   users[selectedIndex].lastname = users[selectedIndex].lastname
  // }

  //put approach
  users[selectedIndex].firstname = updateUser.firstname || users[selectedIndex].firstname
  users[selectedIndex].lastname = users[selectedIndex].lastname || users[selectedIndex].lastname
  users[selectedIndex].age = updateUser.age || users[selectedIndex].age
  users[selectedIndex].gender = updateUser.gender || users[selectedIndex].gender

  res.json({
    message: 'update user complete',
    data: {
      user: updateUser,
      indexUpdate: selectedIndex,
    }
  })
})

app.delete('user/:id', (req, res)=>{
  let id = req.params.id

  //find index
  let selectedIndex = users.findIndex(user => user.id == id)

  // delete
  users.splice(selectedIndex, 1)

  res.json({
    message: 'deleted complete',
    idexDeleted: selectedIndex
  })
  


})

app.listen(port, (req, res) => {
  console.log('http server run at ' + port)
})