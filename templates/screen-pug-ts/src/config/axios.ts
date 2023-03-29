import axios from 'axios'
import { isDev, isMock } from '@/utils/env'

// 接口开启了CORS，开发阶段联调地址（后端开发人员本机地址，开发时请与对应后端人员沟通联调）
const devUrl = isMock ? '' : ''

axios.defaults.timeout = 5000
axios.defaults.baseURL = isDev ? devUrl : ''
