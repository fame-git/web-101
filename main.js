const submitData = async() => {
  let firstNameDOM = document.querySelector('input[name=firstname]')
  let lastNameDOM = document.querySelector('input[name=lastname]')
  let ageDOM = document.querySelector('input[name=age]')
  let genderDOM = document.querySelector('input[name=gender]:checked') || {}
  let interestsDOM = document.querySelectorAll('input[name=interest]:checked') || {}
  let descriptionDOM = document.querySelector('textarea[name=description]')
  let messageDOM = document.getElementById('message')

  try{
    let interest = ''

    for(let i = 0; i < interestsDOM.length; i++){
      interest += interestsDOM[i].value 
      if(i != interestsDOM.length - 1 ){
        interest += ', '
      }
      
      }

    
    let userData = {
      firstname: firstNameDOM.value,
      lastname: lastNameDOM.value,
      age: ageDOM.value,
      gender: genderDOM.value,
      description: descriptionDOM.value,
      interests: interest,
    }
  console.log('submit data', userData)

    const response = await axios.post('localhost:8000/users', userData)
    console.log('response', response.data)

    messageDOM.innerText = 'Successfully submit'
    messageDOM.className = 'message success'
  }catch (error) {
    if (error.message) {
      console.log(error.response.data.message)
    }
    messageDOM.innerText = 'failed submit'
    messageDOM.className = 'message fail'
    
  }
  
  
}