const envato = require('./index')
const EnvatoAPI = envato({
  username: 'YOUR_USERNAME',
  token: 'YOUR_TOKEN'
})

// Samples
const item_id = 233775
const site = 'graphicriver'
const username = 'sevenstyles'

EnvatoAPI.getUser({ username })
.then(files => console.log(files))
.catch(err => console.log(err))