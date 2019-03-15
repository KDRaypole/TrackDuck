import { spotifyConfig } from '../config'

export const environment = {
  production: false,
  clientId: spotifyConfig.fire.clientId,
  clientSecret: spotifyConfig.fire.clientSecret
};
