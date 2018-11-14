const envato = require('./index')
const EnvatoAPI = envato({
  username: 'Actionart',
  token: 'xl99QdWfWQji6MWCs8N3mUmW9e5TObDY'
})

const itemID = 233775

EnvatoAPI.getSearchMoreLikeThis({ item_id: itemID, page_size: 1 })
.then(files => console.log(files))
.catch(err => console.log(err))