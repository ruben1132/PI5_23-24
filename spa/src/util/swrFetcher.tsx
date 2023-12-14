import axios from 'axios';

export const fetcher = (url: string) => axios(url, {
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
  }).then((res) => res.data);
