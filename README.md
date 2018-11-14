# envato-api-request

Cara mudah berinteraksi dengan [Envato API](https://build.envato.com/api/) menggunakan **personal token**.

## Instal Package

Sebelum menggunakan package ini, pertama-tama kamu harus membuat **personal token** di [https://build.envato.com](https://build.envato.com/create-token/).

Setelah mendapatkan token-nya, sekarang lakukan penginstall package pada node project kamu:

```bash
npm i envato-api-request
```

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

