const BASE_URL = process.env.NODE_ENV === 'production'
    ? ''
    : `http://localhost:3000`;
export {BASE_URL}