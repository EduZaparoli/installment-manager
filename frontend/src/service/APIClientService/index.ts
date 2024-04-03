import axios, { CreateAxiosDefaults } from 'axios'

const axiosConfig: CreateAxiosDefaults = {
  baseURL: process.env.REACT_APP_API_CLIENT_BASE_URL,
}

const apiClientService = axios.create(axiosConfig)

export default apiClientService