import axios from 'axios';

export const axiosNonLogin = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
});