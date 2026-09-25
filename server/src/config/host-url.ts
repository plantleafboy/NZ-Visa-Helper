const BASE_URL = process.env.NODE_ENV === 'production'
    ? 'https://nzvisahelper.com'
    : `http://localhost:3000`;
export {BASE_URL}