# envato-api-request

This projects helps you to make HTTP requests to the Envato API.

## Installation

```bash
npm i envato-api-request
```

## Usage

First you must require the package into your module. Note that the package exports a function which is used for setting your personal token and user agent.

Be sure to replace the two variables.

- `TOKEN` is the secret token you retrieved from https://build.envato.com/my-apps.
- `USERNAME` is a description of your script only visible to the Envato API team.

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

## Methods

Each method is detailed at https://build.envato.com/api/. All parameter names are the same, and should be passed inside an object.

### Envato Market Catalog

#### Look up a public collection: `getCatalogCollection(params)`

Returns details of, and items contained within, a public collection

```js
envato.getCatalogCollection({ id: 5087427 , page: 1 })
.then(result => console.log(result))
.catch(err => console.log(err))
```

#### Look up a single item: `getLookSingleItem(id)`

Returns all details of a particular item on Envato Market

```js
// Envato Item ID
let itemId = 2833226

envato.getCatalogItem(itemId)
.then(result => console.log(result))
.catch(err => console.log(err))
```

#### Look up a wordpress theme/plugin version: `getCatalogItemVersion(params)`

Returns the latest available version of a theme/plugin. This is the recommended endpoint for Wordpress theme/plugin authors building an auto-upgrade system into their item that needs to check if a new version is available. This public endpoint doesn't require a token.

```js
envato.getCatalogItemVersion({ id: 22857100 })
.then(result => console.log(result))
.catch(err => console.log(err))
```

#### Search for items: `getSearchItem(params)`

```js
envato.getSearchItem({ term: 'dog', site: 'graphicriver.net' })
.then(result => console.log(result))
.catch(err => console.log(err))
```

#### Search for comments: `getSearchComment(params)`

```js
envato.getSearchComment({ item_id: 233775 })
.then(result => console.log(result))
.catch(err => console.log(err))
```

#### Search more like this: `getSearchMoreLikeThis(params)`

```js
envato.getSearchMoreLikeThis({ item_id: 233775 })
.then(result => console.log(result))
.catch(err => console.log(err))
```

#### Popular items by site: `getPopular()`

Returns the popular files for a particular site. Requires a site parameter, e.g. popular:themeforest

```js
envato.getPopular({ site: 'graphicriver' })
.then(result => console.log(result))
.catch(err => console.log(err))
```

#### Categories by site `getCategories(params)`

Lists the categories of a particular site. Requires a site parameter, e.g. themeforest

```js
envato.getCategories({ site: 'graphicriver' })
.then(result => console.log(result))
.catch(err => console.log(err))
```

#### Prices for a particular item: `getItemPrices(params)`

Return available licenses and prices for the given item ID

```js
envato.getItemPrices({ item_id: 233775 })
.then(result => console.log(result))
.catch(err => console.log(err))
```

#### New items by site and category: `getNewFiles(params)`

New files, recently uploaded to a particular site. Requires site and category parameters, e.g. new-files:themeforest,site-templates or new-files:graphicriver,graphics

```js
envato.getNewFiles({ site: 'graphicriver', category: 'graphics' })
.then(result => console.log(result))
.catch(err => console.log(err))
```

#### Find featured items `getFeatures(params)`

Shows the current site features.

```js
envato.getFeatures({ site: 'graphicriver' })
.then(result => console.log(result))
.catch(err => console.log(err))
```

#### Random new items: `getRandomNewFiles(params)`

Shows a random list of newly uploaded files from a particular site (i.e. like the homepage). Requires a site parameter, e.g. random-new-files:themeforest

```js
envato.getFeatures({ site: 'graphicriver' })
.then(result => console.log(result))
.catch(err => console.log(err))
```

### User Details

#### User account details `getUser(params)`

Shows username, country, number of sales, number of followers, location and image for a user. Requires a username, e.g. collis

```js
envato.getUser({ username: 'collis' })
.then(result => console.log(result))
.catch(err => console.log(err))
```

#### List a user's badges: `getUserBadges(params)`

Shows a list of badges for the given user

```js
envato.getUserBadges({ username: 'collis' })
.then(result => console.log(result))
.catch(err => console.log(err))
```

#### A user's items by site: `getUserItemsBySite(params)`

Show the number of items an author has for sale on each site. Requires a username, e.g. collis

```js
envato.getUserItemsBySite({ username: 'collis' })
.then(result => console.log(result))
.catch(err => console.log(err))
```

#### New Items by user: `getNewFilesFromUser(params)`

Shows up to 1000 newest files uploaded by a user to a particular site. Requires username and site parameters, e.g. new-files-from-user:collis,themeforest

```js
envato.getNewFilesFromUser({ username: 'collis', site: 'graphicriver' })
.then(result => console.log(result))
.catch(err => console.log(err))
```

### Envato Market Stats

#### Total Envato Market users: `getTotalUsers()`

Shows the total number of subscribed users to Envato Market

```js
envato.getTotalUsers()
.then(result => console.log(result))
.catch(err => console.log(err))
```

#### Total Envato Market items: `getTotalItems()`

Shows the total number of items available on Envato Market

```js
envato.getTotalItems()
.then(result => console.log(result))
.catch(err => console.log(err))
```

#### Number of files in category: `getNumberOfFiles(params)`

Shows the number of files in the major categories of a particular site. Requires a site parameter, e.g. number-of-files:themeforest

```js
envato.getNumberOfFiles({ site: 'themeforest' })
.then(result => console.log(result))
.catch(err => console.log(err))
```

## Return

Each method will return a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) which will resolve with the parsed JSON object or reject with an error. The output is not modified, so the output is the same as on [build.envato.com](build.envato.com).

```js
envato.getUser({ username: 'collis' })
.then(result => console.log(result))
.catch(err => console.log(err))

// or

envato.getUser({ username: 'collis' })
.then(function(result) {
  console.log(result)
})
.catch(function(err) {
  console.log(err)
})
```

## Errors

The `error.message` property will contain the following under these circumstances:

- Bad Request when invalid parameters are sent or required parameters are missing.
- `Unauthorized` when the personal token is invalid.
- `Access Denied` when you've reached your rate limit or are banned.
- `Not Found` when no matches or results were found by the endpoint.
- `Internal Server Error` when the API is experiencing problems.
- `Request Error: <message>` when there's an error executing the HTTP request.
  - Timeout errors
  - Connection errors
  - SSL errors
- `Error code <000>: <message>` when another HTTP code is received than those above.