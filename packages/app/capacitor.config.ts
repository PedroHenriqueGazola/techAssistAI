import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'tech-assist-ai',
  webDir: 'www',
  cordova: {
    preferences: {
      DisableDeploy: 'true',
    },
  },
  plugins: {
    SocialLogin: {
      google: {
        clientId: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com',
        forceCodeForRefreshToken: true,
      },
    },
  },
};

export default config;
