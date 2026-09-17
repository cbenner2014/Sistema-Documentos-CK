export const environment = {
  production: true,
  apiUrl: (typeof window !== 'undefined' && window.location.hostname.includes('vercel.app'))
    ? 'https://cottonknit-backend.onrender.com/api'
    : '/api'
};
