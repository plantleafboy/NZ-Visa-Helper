const BASE_URL = process.env.NODE_ENV === 'production'
    ? process.env.PROD_URL
    : `http://localhost:4941`;
export {BASE_URL}