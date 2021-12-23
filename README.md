# RN SSO Web authentication

This project attempts to find a suitable method to integrate to a Web SSO server with minimal-zero modifications.

## Sections
The repo contains
1. `server` directory
    Which holds a mock server that simulates the different basic SSO mechanisms
2. `App.tsx` component file
    Which is the ReactNative App component that holds the WebView

## SSO Mechanisms
The following are the mechanisms that the repo attempts to simulate

1. Grabbing cookie from HttpOnly token ❌
2. Grabbing cookie from non-HttpOnly token ✅
3. Communicating token with web page ✅

## Running project

#### Start by installing the required dependencies
```bash
yarn
```

#### Then run the HTTP server
```bash
yarn dev
```

#### In another terminal run metro server
```bash
yarn start
```

#### In yet another terminal Install pods
```bash
cd ios && pod install && cd ..
```

#### Finally build your client
```
yarn ios # This project was run and tested on IOS, Android setup may be required
```
