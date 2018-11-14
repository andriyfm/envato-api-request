# envato-api-request

Cara mudah berinteraksi dengan Envato API menggunakan **personal token**

## Cara Menggunakan

Sebelum menggunakan package ini, kamu harus meng-import-nya terlebih dulu.

```js
// Import package
const EnvatoAPI = require('envato-api-request')

// Inisialisasi personal token
const envato = EnvatoAPI({
  username: 'YOUR_USERNAME',
  token: 'YOUR_TOKEN_CODE'
})

// getTotalItems
envato.getTotalItems()
.then(items => console.log(items))
.catch(err => console.log(err))
```

