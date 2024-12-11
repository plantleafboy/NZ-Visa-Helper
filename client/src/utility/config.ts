const BASE_URL = process.env.NODE_ENV === 'production'
    ? 'https://petition-webapp-with-docker-7brc8.ondigitalocean.app:5000'
    : `http://localhost:4941`;
export {BASE_URL}