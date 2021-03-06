const Promise = require('bluebird')
const Request = require('request')
const querystring = require('querystring')

class EnvatoAPI {
  constructor(options) {
    this.token = options.token
    this.username = options.username
    this.baseUrl = 'https://api.envato.com'
    this.baseVersion = 'v1'
  }

  prepareUrl (version, url) {
    return `${this.baseUrl}/${version ? version : this.baseVersion}${url}`
  }

  get (options) {
    
    let url = this.prepareUrl(options.version, options.url)

    if (options.params) {
      url += '?' + querystring.stringify(options.params)
    }

    let requestOptions = {
      uri: url,
      method: 'get',
      headers: { Authorization: `Bearer ${this.token}` }
    }

    return new Promise ((resolve, reject) => {
      Request(requestOptions, (err, response, body) => {
        if (err) return reject(new Error(`Request Error: ${err.message}`))

        const statusCode = response.statusCode
        const statusMessage = response.statusMessage

        switch (statusCode) {
          case 400:
            reject(new Error('Bad Request'))
            break;

          case 401:
            reject(new Error('Unauthorized'))
            break;

          case 403:
            reject(new Error('Access Denied'))
            break;

          case 404:
            reject(new Error('Not Found'))
            break;

          case 500:
            reject(new Error('Internal Server Error'))
            break;

          case !200:
            reject(new Error(`Error code ${statusCode}: ${statusMessage}`))
            break;
        
          default:
            break;
        }
        
        try {
          resolve(JSON.parse(body))
        } catch (e) {
          reject(new Error('Invalid Response'))
        }
      })
    })
  }

  getNumberOfFiles(params) {
    let { site } = params
    return this.get({
      url: `/market/number-of-files:${site}.json`
    })
  }

  getSearchItem(params) {
    return new Promise((resolve, reject) => {

      const site = params.site

      if (!site) {
        return reject(new Error('params.site is required'))
      }

      if (typeof(site) != 'string') {
        return reject(new Error('params.site type error'))
      }
      
      return resolve(this.get({
        url: `/discovery/search/search/item`,
        params: params
      }))
    })
  }

  getSearchComment(params) {
    return new Promise ((resolve, reject) => {
      if (!params.item_id) {
        return reject(new Error('params.item_id is required'))
      }

      if (typeof(params.item_id) != 'number') {
        return reject(new Error('params.item_id type error'))
      }

      return resolve(this.get({
        params: params,
        url: `/discovery/search/search/comment`
      }))
    })
  }

  getRandomNewFiles(params) {
    return new Promise((resolve, reject) => {
      const site = params.site
      
      if (!params.site) return reject(new Error('params.site is required'))
      return resolve(this.get({
        url: `/market/random-new-files:${site}.json`
      }))
    })
  }

  getSearchMoreLikeThis(params) {
    return new Promise ((resolve, reject) => {

      const item_id = params.item_id

      if (!item_id) {
        return reject(new Error('params.item_id is required'))
      }

      if (typeof(item_id) != 'number') {
        return reject(new Error('params.item_id type error'))
      }

      return resolve(this.get({
        params: params,
        url: `/discovery/search/search/more_like_this`
      }))
    })
  }

  getNumberOfFiles(params) {
    return new Promise ((resolve, reject) => {

      const site = params.site
      
      if (!site) {
        return reject(new Error('params.site is required'))
      }

      if (typeof(site) != 'string') {
        return reject(new Error('params.site type error'))
      }

      return resolve(this.get({
        url: `/market/number-of-files:${site}.json`
      }))
    })
  }

  getTotalUsers() {
    return this.get({
      url: `/market/total-users.json`
    })
  }

  getTotalItems() {
    return this.get({
      url: '/market/total-items.json'
    })
  }

  getItemPrices(params) {
    return new Promise((resolve, reject) => {

      const item_id = params.item_id

      if (!item_id) {
        return reject(new Error('params.item_id is required'))
      }

      if (typeof(item_id) != 'number') {
        return reject(new Error('params.item_id type error'))
      }

      return resolve(this.get({
        url: `/market/item-prices:${item_id}.json`
      }))
    })
  }

  getUser(params) {
    return new Promise((resolve, reject) => {

      const username = params.username

      if (!username) {
        return reject(new Error('params.username is required'))
      }

      if (typeof(username) != 'string') {
        return reject(new Error('params.username type error'))
      }

      return resolve(this.get({
        url: `/market/user:${username}.json`
      }))
    })
  }

  getUserItemsBySite(params) {
    return new Promise((resolve, reject) => {

      const username = params.username

      if (!username) {
        return reject(new Error('params.username is required'))
      }

      if (typeof(username) != 'string') {
        return reject(new Error('params.username type error'))
      }

      return resolve(this.get({
        url: `/market/user-items-by-site:${username}.json`
      }))
    })
  }

  getPopular(params) {
    return new Promise((resolve, reject) => {

      const site = params.site

      if (!site) {
        return reject(new Error('params.site is required'))
      }

      if (typeof(site) != 'string') {
        return reject(new Error('params.site type error'))
      }

      return resolve(this.get({
        url: `/market/popular:${site}.json`
      }))
    })
  }

  getCategories(params) {
    return new Promise((resolve, reject) => {

      const site = params.site

      if (!site) {
        return reject(new Error('params.site is required'))
      }

      if (typeof(site) != 'string') {
        return reject(new Error('params.site type error'))
      }

      return resolve(this.get({
        url: `/market/categories:${site}.json`
      }))
    })
  }

  getFeatures(params) {
    return new Promise((resolve, reject) => {

      const site = params.site

      if (!site) {
        return reject(new Error('params.site is required'))
      }

      if (typeof(site) != 'string') {
        return reject(new Error('params.site type error'))
      }

      return resolve(this.get({
        url: `/market/features:${site}.json`
      }))
    })
  }

  getNewFiles(params) {
    return new Promise((resolve, reject) => {

      const site = params.site
      const category = params.category

      if (!site || !category) {
        return reject(new Error('params.site or params.category is required'))
      }

      if (typeof(site) != 'string' || typeof(category) != 'string') {
        return reject(new Error('params.site or params.category type error'))
      }

      return resolve(this.get({
        url: `/market/new-files:${site},${category}.json`
      }))
    })
  }

  getNewFilesFromUser(params) {
    return new Promise((resolve, reject) => {

      const site = params.site
      const username = params.username

      if (!site || !username) {
        return reject(new Error('params.site or params.username is required'))
      }

      if (typeof(site) != 'string' || typeof(username) != 'string') {
        return reject(new Error('params.site or params.username type error'))
      }

      return resolve(this.get({
        url: `/market/new-files-from-user:${username},${site}.json`
      }))
    })
  }

  getUserBadges(params) {
    return new Promise((resolve, reject) => {

      const username = params.username

      if (!username) {
        return reject(new Error('params.username is required'))
      }

      if (typeof(username) != 'string') {
        return reject(new Error('params.username type error'))
      }

      return resolve(this.get({
        url: `/market/user-badges:${username}.json`
      }))
    })
  }

  getCatalogCollection(params) {
    return new Promise((resolve, reject) => {

      const id = params.id

      if (!id) {
        return reject(new Error('params.id is required'))
      }

      if (typeof(id) != 'number') {
        return reject(new Error('params.id type error'))
      }

      return resolve(this.get({
        url: `/market/catalog/collection`,
        params: params,
        version: 'v3'
      }))
    })
  }

  getCatalogItemVersion(params) {
    return new Promise((resolve, reject) => {

      const id = params.id

      if (!id) {
        return reject(new Error('params.id is required'))
      }

      if (typeof(id) != 'number') {
        return reject(new Error('params.id type error'))
      }

      return resolve(this.get({
        url: `/market/catalog/item-version`,
        params: params,
        version: 'v3'
      }))
    })
  }

  getUserCollections(params) {
    return new Promise((resolve, reject) => {
      return resolve(this.get({
        url: `/market/user/collections`,
        params: params,
        version: 'v3'
      }))
    })
  }

  getLookSingleItem(id) {
    return new Promise((resolve, reject) => {

      if (!id) {
        return reject(new Error('params.id is required'))
      }
      
      return resolve(this.get({
        url: '/market/catalog/item',
        params: { id },
        version: 'v3'
      }))
    })
  }
}

module.exports = function (options) {
  return new EnvatoAPI(options)
}