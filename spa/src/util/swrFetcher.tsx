import axios from 'axios';

export const fetcher = (url: string) => axios(url, {
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': 'http://localhost:2223',
    },
  }).then((res) => res.data);
