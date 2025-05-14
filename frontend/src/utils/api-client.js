import axios from 'axios';
import { getSession } from 'next-auth/react';
import { makeUrl } from './url';

const API_BASE =
  process.env.NEXT_PUBLIC_BACKEND_API_BASE+'/api' || "http://127.0.0.1:8000/api";

/**
 * Create an axios instance with authorization header
 * @param {string} token - The access token
 * @returns {import('axios').AxiosInstance} Axios instance with auth headers
 */
const createAuthClient = (token) => {
  return axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};

/**
 * Make an authenticated GET request
 * @param {string} endpoint - API endpoint
 * @param {object} options - Request options
 * @returns {Promise<any>} - Response data
 */
export const authGet = async (endpoint, options = {}) => {
  const session = await getSession();
  if (!session?.accessToken) {
    throw new Error('No access token available');
  }
  
  const client = createAuthClient(session.accessToken);
  const url = makeUrl(API_BASE, endpoint);
  const response = await client.get(url, options);
  return response.data;
};

/**
 * Make an authenticated POST request
 * @param {string} endpoint - API endpoint
 * @param {object} data - Request body
 * @param {object} options - Request options
 * @returns {Promise<any>} - Response data
 */
export const authPost = async (endpoint, data = {}, options = {}) => {
  const session = await getSession();
  if (!session?.accessToken) {
    throw new Error('No access token available');
  }
  
  const client = createAuthClient(session.accessToken);
  const url = makeUrl(API_BASE, endpoint);
  const response = await client.post(url, data, options);
  return response.data;
};

/**
 * Make an authenticated PUT request
 * @param {string} endpoint - API endpoint
 * @param {object} data - Request body
 * @param {object} options - Request options
 * @returns {Promise<any>} - Response data
 */
export const authPut = async (endpoint, data = {}, options = {}) => {
  const session = await getSession();
  if (!session?.accessToken) {
    throw new Error('No access token available');
  }
  
  const client = createAuthClient(session.accessToken);
  const url = makeUrl(API_BASE, endpoint);
  const response = await client.put(url, data, options);
  return response.data;
};

/**
 * Make an authenticated DELETE request
 * @param {string} endpoint - API endpoint
 * @param {object} options - Request options
 * @returns {Promise<any>} - Response data
 */
export const authDelete = async (endpoint, options = {}) => {
  const session = await getSession();
  if (!session?.accessToken) {
    throw new Error('No access token available');
  }
  
  const client = createAuthClient(session.accessToken);
  const url = makeUrl(API_BASE, endpoint);
  const response = await client.delete(url, options);
  return response.data;
};
