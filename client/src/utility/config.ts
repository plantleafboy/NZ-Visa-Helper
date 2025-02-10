const BASE_URL = process.env.NODE_ENV === 'production'
    ? 'https://squid-app-2inh2.ondigitalocean.app/nz-visa-helper-client2/:5000'
    : `http://localhost:4941`;
export {BASE_URL}