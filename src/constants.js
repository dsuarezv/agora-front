const PROD_API_BASE_URL = 'https://raw.githubusercontent.com/dsuarezv/agora-es/refs/heads/main'
const DEV_API_BASE_URL = '/api-content'

export const API_BASE_URL = import.meta.env.PROD ? PROD_API_BASE_URL : DEV_API_BASE_URL
