import axios from 'axios'

export const api = axios.create({
  // baseURL: 'https://university-crud-server.herokuapp.com',
  baseURL: 'http://192.168.1.102:5000'
})