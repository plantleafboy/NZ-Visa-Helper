const BASE_URL = process.env.NODE_ENV === 'production'
    ? ''
    : `http://localhost:4941`;
export {BASE_URL}