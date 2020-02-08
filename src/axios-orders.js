import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://react-burger-26d91.firebaseio.com/'
})

export default instance