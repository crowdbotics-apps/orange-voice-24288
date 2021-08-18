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
console.warn(url)
export const stripeConnectOAuthURL = process.env.REACT_APP_STRIPE_CONNECT_OAUTH_URL || "https://connect.stripe.com/oauth/authorize?response_type=code&client_id="
export const stripeConnectRedirectURL = process.env.REACT_APP_STRIPE_CONNECT_REDIRECT_URL || `${url}admin/stripe-connect`
export const stripeClientId = process.env.REACT_APP_STRIPE_CLIENT_ID || "ca_BBAvjQDgsne50CmwJDypRIS9FmDJ9pCq"; // https://dashboard.stripe.com/test/settings/connect
