const Promise = require('bluebird')
const Request = require('request')
const querystring = require('querystring')

const token = 'xl99QdWfWQji6MWCs8N3mUmW9e5TObDY'

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
    console.log(url)

    let requestOptions = {
      uri: url,
      method: 'get',
      headers: { Authorization: `Bearer ${token}` }
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

  getTotalItems () {
    return this.get({
      url: '/market/total-items.json'
    })
  }

  getTotalUsers () {
    return this.get({
      url: `/market/total-users.json`
    })
  }

  getNumberOfFiles(params) {
    let { site } = params
    return this.get({
      url: `/market/number-of-files:${site}.json`
    })
  }

  getSearchItems(params) {
    return this.get({
      url: `/discovery/search/search/item`,
      params: params
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

}

module.exports = function (options) {
  return new EnvatoAPI(options)
}