const BASE_URL = process.env.NODE_ENV === 'production'
    ? 'https://nzvisahelper.com'
    : `http://localhost:4941`;
export {BASE_URL}