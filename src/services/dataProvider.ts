import axios from 'axios'
import { APP_CONSTANTS } from '../common/constants'
const getToken = () => localStorage.getItem(APP_CONSTANTS.WEB_TOKEN)
/**
 * TODO: Call api
 * @param {string | { customUrl: string }} sourceUrl
 * @param {{ method: 'GET' | 'POST', headers: Headers, filter, params, data}} option
 * @returns {Promise<{error?: any, data?: any}>} return
 */
export const dataProvider = async (
  sourceUrl: string | { customUrl: string },
  option: {
    method?: 'GET' | 'POST',
    headers?: Headers,
    filter?: any,
    params?: any,
    data?: any,
    withToken: boolean
  }): Promise<{ error?: any; data?: any }> => {
  try {
    let url = ''
    if (typeof sourceUrl !== 'string') {
      url = sourceUrl.customUrl
    } else {
      // url = await AsyncStorage.getItem(AS_API_URL) as string
      // url = url.concat(sourceUrl)
    } 
    option = option || {}
    const token = option.withToken ? getToken() : null
    const headers = {
      'content-type': 'application/json; charset=utf-8',
      'Authorization': option.withToken ? `Device ${token}` : undefined,
    }
    const method = option.method || 'GET'
    const options = { headers , params: null }
    let filter = ''
    if (option.filter) {
      filter = `?filter=${JSON.stringify(option.filter)}`
    }
    if (option.params) {
      options.params = option.params
    }
    if (method === 'GET') {
      return new Promise((resolve, reject) => {
        axios
          .get(`${url}${filter}`, options)
          .then(response => resolve(response))
          .catch(error => {
            if (error.response) {
              reject(error.response)
            } else {
              reject({ status: 404, error })
            }
          })
      })
    } else {
      const { data } = option
      return new Promise((resolve, reject) => {
        axios
          .post(url, data, options)
          .then(response => resolve(response))
          .catch(error => {
            if (error.response) {
              reject(error.response)
            } else {
              reject({ status: 404, error })
            }
          })
      })
    }
  } catch (err) {
    console.log(err)
    return {
      error: {
        message: err
      }
    }
  }
}
