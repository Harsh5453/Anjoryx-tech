import axios from 'axios';
import { API_BASE_URL } from '../utils/config';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

/**
 * Submits the contact form to the Spring Boot backend.
 * Throws a normalised Error with a user-safe message so the UI never has to
 * reach into Axios/Spring response internals.
 */
export async function submitContactForm(payload) {
  try {
    const { data } = await apiClient.post('/contact', payload);
    return data; // ApiResponse<ContactResponseDto>
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 400 && data?.data && typeof data.data === 'object') {
        // Field-level validation errors from GlobalExceptionHandler
        const fieldErrors = data.data;
        const err = new Error(data.message || 'Please check the form and try again.');
        err.fieldErrors = fieldErrors;
        throw err;
      }
      if (status === 429) {
        throw new Error(data?.message || 'Too many requests. Please try again in a little while.');
      }
      throw new Error(data?.message || 'Something went wrong. Please try again.');
    }
    if (error.request) {
      throw new Error('We could not reach the server. Please check your connection and try again.');
    }
    throw new Error('Something went wrong. Please try again.');
  }
}

export default apiClient;
