import axios from 'axios';

/**
 * This is a custom axios instance for making API requests to the backend.
 */

const apiClient = axios.create({
  baseURL: process.env.API_BASE_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
})

export { apiClient }