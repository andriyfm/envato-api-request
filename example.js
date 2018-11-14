const EnvatoAPI = require('./index')
const envato = EnvatoAPI({
  username: 'YOUR_USERNAME',
  token: 'YOUR_TOKEN'
})

envato.getUserBadges({ username: 'collis' })
.then(result => console.log(result))
.catch(err => console.log(err))