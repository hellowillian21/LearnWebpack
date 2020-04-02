import './login.scss'
import '@/test-alias.js'

console.log('login')

fetch('/user', {
  method: "GET",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(err => console.log(err))

fetch('/api/mock')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(err => console.log(err))

fetch("/login", {
  method: "POST",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    username: "admin",
    password: "123123"
  })
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(err => console.log(err))