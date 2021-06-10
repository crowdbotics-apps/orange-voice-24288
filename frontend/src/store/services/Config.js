// eslint-disable-next-line no-undef
const url =
  window.location.protocol +
  '//' +
  window.location.hostname +
  ':' +
  window.location.port +
  '/';
  
export const API_URL = window.location.protocol.includes('s')
  ? url
  : process.env.REACT_APP_API_BASE_URL ||
    'https://orange-voice-24288.botics.co/';
