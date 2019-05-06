import * as process from 'process';

export const environment = {
  production: false,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.ClientSecret,
  redirectUri: 'http://localhost:4200/login/callback'
};
