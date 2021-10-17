import axios from 'axios';
import { API_KEY, BASE_URL } from '../api_config';

export default axios.create({
  baseUrl: BASE_URL,
  params: {
    api_key: API_KEY,
  }
})