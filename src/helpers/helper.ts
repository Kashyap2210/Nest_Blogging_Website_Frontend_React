import axios from 'axios';

export function getJwt(): string | null {
  const jwt: string | null = localStorage.getItem('accessToken');
  if (jwt) {
    axios.defaults.headers.common['authorization'] = `Bearer ${jwt}`; // Set JWT in Axios headers
  }
  return jwt;
}
