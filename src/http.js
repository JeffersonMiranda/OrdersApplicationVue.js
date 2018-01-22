import axios from 'axios';

export const http = axios.create({
  baseURL: 'https://young-sea-16423.herokuapp.com/', // URL FOR ACCESS RESTFUL API
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});
