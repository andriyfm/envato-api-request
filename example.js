const envato = require('./index')
const EnvatoAPI = envato({
  username: 'Actionart',
  token: 'xl99QdWfWQji6MWCs8N3mUmW9e5TObDY'
})

// EnvatoAPI.getTotalItems()
// .then(items => console.log(items))
// .catch(err => console.log(err))

// EnvatoAPI.getTotalUsers()
// .then(users => console.log(users))
// .catch(err => console.log(err))

// EnvatoAPI.getNumberOfFiles('themeforest')
// .then(files => console.log(files))
// .catch(err => console.log(err))

// EnvatoAPI.getSearchItems({
//   term: 'black',
//   site: 'graphicriver.net',
// })
// .then(items => console.log(items.matches.map(item => item.id)))
// .catch(err => console.log(err))

// EnvatoAPI.getSearchComment({
//   item_id: 11
// })
// .then(item => console.log(item))
// .catch(err => console.log(err))

EnvatoAPI.getRandomNewFiles({ site: 'themeforest' })
.then(files => console.log(files))
.catch(err => console.log(err))