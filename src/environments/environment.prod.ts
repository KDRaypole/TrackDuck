import * as process from 'process';

export const environment = {
  production: true,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: 'https://trackduck.herokuapp.com/login/callback'
};
